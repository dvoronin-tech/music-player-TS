import { FC } from 'react';
import styles from './icons.module.scss';

import { TiHeartFullOutline } from 'react-icons/ti';
import { FaPause, FaPlay, FaRandom } from 'react-icons/fa';
import { BsFillRewindFill } from 'react-icons/bs';
import { LuRepeat, LuRepeat1 } from 'react-icons/lu';
import { PiPlaylistBold } from 'react-icons/pi';
import { TbPlaylistAdd } from 'react-icons/tb';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { BsArrowsAngleContract } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { FaUserCheck } from 'react-icons/fa';

interface IProps {
	scale?: number;
	type?: 'active' | 'idle' | 'disable';
	className?: string;
	style?: React.CSSProperties;
}

const getClassList = (
	type: 'active' | 'idle' | 'disable',
	className: string | undefined,
): string => {
	let classList: string = ``;

	if (type === 'active') {
		classList += styles.active_icon;
	} else if (type === 'disable') {
		classList += styles.disable_icon;
	} else {
		classList += styles.idle_icon;
	}
	if (className) {
		return `${classList} ${className}`;
	} else {
		return classList;
	}
};

export const Like: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	switch (type) {
		case 'idle':
			return (
				<TiHeartFullOutline
					className={
						getClassList(type, className) + ` ${styles.like_icon}`
					}
					style={{
						width: `${scale}px`,
						height: `${scale}px`,
						...style,
					}}
				/>
			);
		case 'active':
			return (
				<TiHeartFullOutline
					className={getClassList(type, className)}
					style={{
						width: `${scale}px`,
						height: `${scale}px`,
						...style,
					}}
				/>
			);
		case 'disable':
			return (
				<TiHeartFullOutline
					className={
						getClassList(type, className) + ` ${styles.like_icon}`
					}
					style={{
						width: `${scale}px`,
						height: `${scale}px`,
						...style,
					}}
				/>
			);
	}
};

export const Random: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<FaRandom
			className={getClassList(type, className)}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const Rewind: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<BsFillRewindFill
			className={getClassList(type, className)}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const Repeat: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	const propClass = className ? className : '';
	if (type === 'idle') {
		return (
			<LuRepeat
				className={`${styles.idle_icon} ${propClass}`}
				style={{
					width: `${scale}px`,
					height: `${scale}px`,
					strokeWidth: 2.5,
					...style,
				}}
			/>
		);
	} else if (type === 'active') {
		return (
			<LuRepeat1
				className={`${styles.active_icon} ${propClass}`}
				style={{
					width: `${scale}px`,
					height: `${scale}px`,
					strokeWidth: 2.5,
					...style,
				}}
			/>
		);
	} else {
		return (
			<LuRepeat
				className={`${styles.disable_icon} ${propClass}`}
				style={{
					width: `${scale}px`,
					height: `${scale}px`,
					strokeWidth: 2.5,
					...style,
				}}
			/>
		);
	}
};

export const PlayOrPause: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	const propClass = className ? className : '';
	if (type === 'active') {
		return (
			<FaPause
				className={`${styles.idle_icon} ${propClass}`}
				style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
			/>
		);
	} else if (type === 'idle') {
		return (
			<FaPlay
				className={`${styles.active_icon} ${propClass}`}
				style={{
					width: `${scale - 2}px`,
					height: `${scale - 2}px`,
					...style,
				}}
			/>
		);
	} else {
		return (
			<FaPlay
				className={`${styles.disable_icon} ${propClass}`}
				style={{
					width: `${scale - 2}px`,
					height: `${scale - 2}px`,
					...style,
				}}
			/>
		);
	}
};

export const CurrentPlayList: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<PiPlaylistBold
			className={getClassList(type, className)}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const AddToPlayList: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<TbPlaylistAdd
			className={
				getClassList(type, className) + ` ${styles.add_playlist}`
			}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const FullScreen: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	if (type === 'idle') {
		return (
			<BsArrowsAngleExpand
				strokeWidth={1.5}
				className={getClassList(type, className)}
				style={{
					width: `calc(${scale}px - 35%)`,
					height: `calc(${scale}px - 35%)`,
					...style,
				}}
			/>
		);
	} else if (type === 'active') {
		return (
			<BsArrowsAngleContract
				strokeWidth={1.5}
				className={getClassList(type, className)}
				style={{
					width: `calc(${scale}px - 35%)`,
					height: `calc(${scale}px - 35%)`,
					...style,
				}}
			/>
		);
	} else {
		return (
			<BsArrowsAngleExpand
				strokeWidth={1.5}
				className={getClassList(type, className)}
				style={{
					width: `calc(${scale}px - 35%)`,
					height: `calc(${scale}px - 35%)`,
					...style,
				}}
			/>
		);
	}
};
export const Follow: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<FaUserPlus
			className={
				getClassList(type, className) + ` ${styles.add_playlist}`
			}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const Cross: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<RxCross2
			className={getClassList(type, className)}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
			strokeWidth={0.5}
		/>
	);
};

export const UnFollow: FC<IProps> = ({
	scale = 20,
	type = 'idle',
	className,
	style,
}) => {
	return (
		<FaUserCheck
			className={
				getClassList(type, className) + ` ${styles.add_playlist}`
			}
			style={{ width: `${scale}px`, height: `${scale}px`, ...style }}
		/>
	);
};

export const PlayingTrackTag: FC<{ height?: number }> = ({ height = 30 }) => {
	return (
		<div
			className={styles.playing_tag}
			style={
				{
					'--tag-height': `${height}px`,
					'--bar-width': `${height === 30 ? 7 : 11}px`,
				} as React.CSSProperties
			}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
