import {
	type FC,
	useCallback,
	useEffect,
	useRef,
	useState,
	PointerEvent,
	KeyboardEvent,
} from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { seekTo } from '@/store/slices/player';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import styles from './PlayBack.module.scss';

const MIN_DOTS = 28;
const MAX_DOTS = 60;
const DOT_SLOT_PX = 8;
const BASE_DOT_PX = 6;
const WAVE_GAIN_PX = 74;
const SIGMA_BEHIND = 0.06;
const SIGMA_AHEAD = 0.02;
const COLOR_FEATHER = 0.07;

/**
 * Returns a value between 0 and 1
 * @param value - value to clamp
 * @returns clamped value
 * @example
 * clamp01(2) // 1
 * clamp01(-1) // 0
 * clamp01(0.5) // 0.5
 */
function clamp01(value: number) {
	return Math.min(1, Math.max(0, value));
}

function smoothstep(from: number, to: number, value: number) {
	const t = clamp01((value - from) / (to - from));
	return t * t * (3 - 2 * t);
}

function envelopeAt(x: number, progress: number) {
	const dx = x - progress;
	const sigma = dx < 0 ? SIGMA_BEHIND : SIGMA_AHEAD;
	return Math.exp(-(dx ** 2) / (2 * sigma ** 2));
}

const PlayBack: FC = () => {
	const dispatch = useAppDispatch();
	const { currentTime, duration } = useAppSelector(
		({ player }) => ({
			currentTime: player.currentTime,
			duration: player.duration,
		}),
		shallowEqual,
	);

	const trackRef = useRef<HTMLDivElement>(null);
	const draggingRef = useRef(false);
	const [dotCount, setDotCount] = useState(36);
	const [dragProgress, setDragProgress] = useState<number | null>(null);

	const playedProgress = duration ? clamp01(currentTime / duration) : 0;
	const progress = dragProgress ?? playedProgress;

	useEffect(() => {
		const track = trackRef.current;
		if (!track) {
			return;
		}

		const updateCount = (width: number) => {
			if (!width) {
				return;
			}

			const next = Math.max(
				MIN_DOTS,
				Math.min(MAX_DOTS, Math.round(width / DOT_SLOT_PX)),
			);
			setDotCount((current) => (current === next ? current : next));
		};

		updateCount(track.getBoundingClientRect().width);

		const observer = new ResizeObserver((entries) => {
			updateCount(entries[0]?.contentRect.width ?? 0);
		});
		observer.observe(track);

		return () => observer.disconnect();
	}, []);

	const progressFromClientX = useCallback((clientX: number) => {
		const track = trackRef.current;
		if (!track) {
			return 0;
		}

		const { left, width } = track.getBoundingClientRect();
		if (!width) {
			return 0;
		}

		return clamp01((clientX - left) / width);
	}, []);

	const seekByClientX = useCallback(
		(clientX: number) => {
			if (!duration) {
				return;
			}

			const nextProgress = progressFromClientX(clientX);
			setDragProgress(nextProgress);
			dispatch(seekTo(nextProgress * duration));
		},
		[dispatch, duration, progressFromClientX],
	);

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!duration) {
			return;
		}

		draggingRef.current = true;
		event.currentTarget.setPointerCapture(event.pointerId);
		seekByClientX(event.clientX);
	};

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!draggingRef.current) {
			return;
		}

		seekByClientX(event.clientX);
	};

	const stopDragging = useCallback(() => {
		draggingRef.current = false;
		setDragProgress(null);
	}, []);

	return (
		<div className={styles.playback}>
			<div className={styles.time_wrapper}>
				<span>{humanizingNumbers(currentTime)}</span>
				<span>{humanizingNumbers(duration)}</span>
			</div>
			<div
				ref={trackRef}
				aria-label="Прогресс воспроизведения"
				aria-valuemin={0}
				aria-valuemax={Math.round(duration)}
				aria-valuenow={Math.round(currentTime)}
				aria-valuetext={`${humanizingNumbers(currentTime)} из ${humanizingNumbers(duration)}`}
				className={styles.dots_track}
				data-dragging={!!dragProgress}
				role="slider"
				tabIndex={0}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={stopDragging}
				onPointerCancel={stopDragging}
			>
				{Array.from({ length: dotCount }, (_, index) => {
					const x = index / (dotCount - 1);
					const wave = envelopeAt(x, progress);
					const colorT = smoothstep(
						progress - COLOR_FEATHER,
						progress + COLOR_FEATHER,
						x,
					);
					const accentMix = Math.round((1 - colorT) * 100);

					return (
						<span
							key={index}
							className={styles.dot}
							style={{
								height: `${BASE_DOT_PX + wave * WAVE_GAIN_PX}px`,
								backgroundColor: `color-mix(in srgb, var(--accent-color) ${accentMix}%, var(--text-disable-color))`,
								boxShadow:
									wave > 0.42 && accentMix > 35
										? `0 0 ${Math.round(12 * wave)}px color-mix(in srgb, var(--accent-color) ${Math.round(wave * 65)}%, transparent)`
										: 'none',
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PlayBack;
