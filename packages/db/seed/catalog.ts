type SeedArtist = {
	name: string;
	artistImg: string;
	bigImg: string;
};

type SeedTrack = {
	id: string;
	title: string;
	albumImg: string;
	music: string;
	auditions?: number;
};

type SeedLink = {
	artistName: string;
	trackId: string;
};

export const catalogSeed: {
	artists: SeedArtist[];
	tracks: SeedTrack[];
	links: SeedLink[];
} = {
	artists: [
		{
			name: 'Тринадцать карат',
			artistImg: '/images/artistsImg/artist2.webp',
			bigImg: '/images/artistsBigImg/artist2.webp',
		},
		{
			name: 'Даниил Ким',
			artistImg: '/images/artistsImg/artist7.webp',
			bigImg: '/images/artistsBigImg/artist7.webp',
		},
		{
			name: 'Камбулат',
			artistImg: '/images/artistsImg/artist9.webp',
			bigImg: '/images/artistsBigImg/artist9.webp',
		},
		{
			name: 'Космонавтов нет',
			artistImg: '/images/artistsImg/artist24.webp',
			bigImg: '/images/artistsBigImg/artist24.webp',
		},
		{
			name: 'Просто лера',
			artistImg: '/images/artistsImg/artist22.webp',
			bigImg: '/images/artistsBigImg/artist22.webp',
		},
		{
			name: 'Макс Корж',
			artistImg: '/images/artistsImg/artist21.webp',
			bigImg: '/images/artistsBigImg/artist21.webp',
		},
		{
			name: 'Надя Дорофеева',
			artistImg: '/images/artistsImg/artist7.webp',
			bigImg: '/images/artistsBigImg/artist7.webp',
		},
		{
			name: 'Нервы',
			artistImg: '/images/artistsImg/artist6.webp',
			bigImg: '/images/artistsBigImg/artist6.webp',
		},
		{
			name: 'Скриптонит',
			artistImg: '/images/artistsImg/artist20.webp',
			bigImg: '/images/artistsBigImg/artist20.webp',
		},
		{
			name: 'Тима Белорусских',
			artistImg: '/images/artistsImg/artist4.webp',
			bigImg: '/images/artistsBigImg/artist4.webp',
		},
		{
			name: 'Три дня дождя',
			artistImg: '/images/artistsImg/artist1.webp',
			bigImg: '/images/artistsBigImg/artist1.webp',
		},
		{
			name: 'Элджей',
			artistImg: '/images/artistsImg/artist11.webp',
			bigImg: '/images/artistsBigImg/artist11.webp',
		},
		{
			name: 'Амура',
			artistImg: '/images/artistsImg/artist12.webp',
			bigImg: '/images/artistsBigImg/artist12.webp',
		},
		{
			name: 'charusha',
			artistImg: '/images/artistsImg/artist13.webp',
			bigImg: '/images/artistsBigImg/artist13.webp',
		},
		{
			name: 'Фогель',
			artistImg: '/images/artistsImg/artist14.webp',
			bigImg: '/images/artistsBigImg/artist14.webp',
		},
		{
			name: 'Гнилая лирика',
			artistImg: '/images/artistsImg/artist15.webp',
			bigImg: '/images/artistsBigImg/artist15.webp',
		},
		{
			name: 'Лали',
			artistImg: '/images/artistsImg/artist16.webp',
			bigImg: '/images/artistsBigImg/artist16.webp',
		},
		{
			name: 'MONA',
			artistImg: '/images/artistsImg/artist17.webp',
			bigImg: '/images/artistsBigImg/artist17.webp',
		},
		{
			name: 'Morgenshtern',
			artistImg: '/images/artistsImg/artist8.webp',
			bigImg: '/images/artistsBigImg/artist8.webp',
		},
		{
			name: 'Мукка',
			artistImg: '/images/artistsImg/artist18.webp',
			bigImg: '/images/artistsBigImg/artist18.webp',
		},
		{
			name: 'Nikitata',
			artistImg: '/images/artistsImg/artist3.webp',
			bigImg: '/images/artistsBigImg/artist3.webp',
		},
		{
			name: 'T-Fest',
			artistImg: '/images/artistsImg/artist19.webp',
			bigImg: '/images/artistsBigImg/artist19.webp',
		},
	],
	tracks: [
		{
			id: 'amura-khotelos-brosit',
			title: 'Хотелось бросить',
			albumImg: '/images/albumsImg/amura_khotelos_brosit.webp',
			music: '/music/music/Amura_Khotelos_brosit.ogg',
		},
		{
			id: 'amura-minimum',
			title: 'Minimum',
			albumImg: '/images/albumsImg/amura_minimum.webp',
			music: '/music/music/Amura_Minimum.ogg',
		},
		{
			id: 'amura-ne-perestanu-ulybatsya',
			title: 'Не перестану улыбаться',
			albumImg: '/images/albumsImg/amura_ne_perestanu_ulybatsya.webp',
			music: '/music/music/Amura_Ne_perestanu_ulybatsya.ogg',
		},
		{
			id: 'amura-feat-kambulat-kak-dela',
			title: 'Как дела',
			albumImg: '/images/albumsImg/amura_feat_kambulat_kak_dela.webp',
			music: '/music/music/Amura_feat_Kambulat_Kak_dela.ogg',
		},
		{
			id: 'daniil-kim-komety',
			title: 'Кометы',
			albumImg: '/images/albumsImg/daniil_kim_komety.webp',
			music: '/music/music/Daniil_Kim_Komety.ogg',
		},
		{
			id: 'daniil-kim-luchshe-by-ne-znal',
			title: 'Лучше бы не знал',
			albumImg: '/images/albumsImg/daniil_kim_luchshe_by_ne_znal.webp',
			music: '/music/music/Daniil_Kim_luchshe_by_ne_znal.ogg',
		},
		{
			id: 'daniil-kim-momenty',
			title: 'Моменты',
			albumImg: '/images/albumsImg/daniil_kim_momenty.webp',
			music: '/music/music/Daniil_Kim_momenty.ogg',
		},
		{
			id: 'daniil-kim-moya-lyubov-mertva',
			title: 'Моя любовь мертва',
			albumImg: '/images/albumsImg/daniil_kim_moya_lyubov_mertva.webp',
			music: '/music/music/Daniil_Kim_moya_lyubov_mertva.ogg',
		},
		{
			id: 'daniil-kim-nenavizhu',
			title: 'Ненавижу',
			albumImg: '/images/albumsImg/daniil_kim_nenavizhu.webp',
			music: '/music/music/Daniil_Kim_nenavizhu.ogg',
		},
		{
			id: 'daniil-kim-plany-na-leto',
			title: 'Планы на лето',
			albumImg: '/images/albumsImg/daniil_kim_plany_na_leto.webp',
			music: '/music/music/Daniil_Kim_plany_na_leto.ogg',
		},
		{
			id: 'daniil-kim-proschay',
			title: 'Прощай',
			albumImg: '/images/albumsImg/daniil_kim_proschay.webp',
			music: '/music/music/Daniil_Kim_proschay.ogg',
		},
		{
			id: 'fogel-feat-amura-ne-moroch-mne-golovu',
			title: 'Не морочь мне голову',
			albumImg: '/images/albumsImg/fogel_feat_amura_ne_moroch_mne_golovu.webp',
			music: '/music/music/FOGEL_feat_Amura_Ne_moroch_mne_golovu.ogg',
		},
		{
			id: 'kambulat-polyubila-duraka',
			title: 'Полюбила дурака',
			albumImg: '/images/albumsImg/kambulat_polyubila_duraka.webp',
			music: '/music/music/Kambulat_Polyubila_Duraka.ogg',
		},
		{
			id: 'kambulat-privet',
			title: 'Привет',
			albumImg: '/images/albumsImg/kambulat_privet.webp',
			music: '/music/music/Kambulat_Privet.ogg',
		},
		{
			id: 'kambulat-tomas-shelbi',
			title: 'Томас Шелби',
			albumImg: '/images/albumsImg/kambulat_tomas_shelbi.webp',
			music: '/music/music/Kambulat_Tomas_Shelbi.ogg',
		},
		{
			id: 'kambulat-vypey-menya',
			title: 'Выпей меня',
			albumImg: '/images/albumsImg/kambulat_vypey_menya.webp',
			music: '/music/music/Kambulat_Vypey_menya.ogg',
		},
		{
			id: 'maks-korzh-2-tipa-lyudey',
			title: '2 типа людей',
			albumImg: '/images/albumsImg/maks_korzh_2_tipa_lyudey.webp',
			music: '/music/music/Maks_Korzh_2_tipa_lyudey.ogg',
		},
		{
			id: 'maks-korzh-endorfin',
			title: 'Эндорфин',
			albumImg: '/images/albumsImg/maks_korzh_endorfin.webp',
			music: '/music/music/Maks_Korzh_Endorfin.ogg',
		},
		{
			id: 'maks-korzh-malinovyy-zakat',
			title: 'Малиновый закат',
			albumImg: '/images/albumsImg/maks_korzh_malinovyy_zakat.webp',
			music: '/music/music/Maks_Korzh_Malinovyy_zakat.ogg',
		},
		{
			id: 'maks-korzh-motylek',
			title: 'Мотылёк',
			albumImg: '/images/albumsImg/maks_korzh_motylek.webp',
			music: '/music/music/Maks_Korzh_Motylek.ogg',
		},
		{
			id: 'maks-korzh-optimist',
			title: 'Оптимист',
			albumImg: '/images/albumsImg/maks_korzh_optimist.webp',
			music: '/music/music/Maks_Korzh_Optimist.ogg',
		},
		{
			id: 'maks-korzh-pyanyy-dozhd',
			title: 'Пьяный дождь',
			albumImg: '/images/albumsImg/maks_korzh_pyanyy_dozhd.webp',
			music: '/music/music/Maks_Korzh_Pyanyy_dozhd.ogg',
		},
		{
			id: 'maks-korzh-stan',
			title: 'Стану',
			albumImg: '/images/albumsImg/maks_korzh_stan.webp',
			music: '/music/music/Maks_Korzh_Stan.ogg',
		},
		{
			id: 'maks-korzh-traliki',
			title: 'Траллики',
			albumImg: '/images/albumsImg/maks_korzh_traliki.webp',
			music: '/music/music/Maks_Korzh_Traliki.ogg',
		},
		{
			id: 'morgenshtern-chernyy-russkiy',
			title: 'Чёрный русский',
			albumImg: '/images/albumsImg/morgenshtern_chernyy_russkiy.webp',
			music: '/music/music/Morgenshtern_Chernyy_Russkiy.ogg',
		},
		{
			id: 'morgenshtern-noch-taksi-zametki',
			title: 'Ночь. Такси. Заметки',
			albumImg: '/images/albumsImg/morgenshtern_noch_taksi_zametki.webp',
			music: '/music/music/Morgenshtern_Noch_Taksi_Zametki.ogg',
		},
		{
			id: 'morgenshtern-poslednyaya-lyubov',
			title: 'Последняя любовь',
			albumImg: '/images/albumsImg/morgenshtern_poslednyaya_lyubov.webp',
			music: '/music/music/Morgenshtern_Poslednyaya_Lyubov.ogg',
		},
		{
			id: 'morgenshtern-selavi',
			title: 'Селяви',
			albumImg: '/images/albumsImg/morgenshtern_selavi.webp',
			music: '/music/music/Morgenshtern_Selavi.ogg',
		},
		{
			id: 'morgenshtern-feat-eldzhey-cadillac',
			title: 'Кадилак',
			albumImg: '/images/albumsImg/morgenshtern_feat_eldzhey_cadillac.webp',
			music: '/music/music/Morgenshtern_feat_Eldzhey_Cadillac.ogg',
		},
		{
			id: 'morgenshtern-feat-eldzhey-location',
			title: 'Location',
			albumImg: '/images/albumsImg/morgenshtern_feat_eldzhey_location.webp',
			music: '/music/music/Morgenshtern_feat_Eldzhey_Location.ogg',
		},
		{
			id: 'nervy-otricatelnyy-geroy',
			title: 'Отрицательный герой',
			albumImg: '/images/albumsImg/nervy_otricatelnyy_geroy.webp',
			music: '/music/music/Nervy_Otricatelnyy_geroy.ogg',
		},
		{
			id: 'nervy-slishkom-vlyublen',
			title: 'Слишком влюблён',
			albumImg: '/images/albumsImg/nervy_slishkom_vlyublen.webp',
			music: '/music/music/Nervy_Slishkom_vlyublen.ogg',
		},
		{
			id: 'nervy-vorony',
			title: 'Вороны',
			albumImg: '/images/albumsImg/nervy_vorony.webp',
			music: '/music/music/Nervy_Vorony.ogg',
		},
		{
			id: 'nikitata-navsegda',
			title: 'Навсегда',
			albumImg: '/images/albumsImg/nikitata_navsegda.webp',
			music: '/music/music/Nikitata_Navsegda.ogg',
		},
		{
			id: 'nikitata-ne-poteryai',
			title: 'Не потеряй',
			albumImg: '/images/albumsImg/nikitata_ne_poteryai.webp',
			music: '/music/music/Nikitata_Ne_Poteryai.ogg',
		},
		{
			id: 'nikitata-polyubi-menya-silney',
			title: 'Полюби меня сильней',
			albumImg: '/images/albumsImg/nikitata_polyubi_menya_silney.webp',
			music: '/music/music/Nikitata_Polyubi_Menya_Silney.ogg',
		},
		{
			id: 'nikitata-taimaut',
			title: 'Таймаут',
			albumImg: '/images/albumsImg/nikitata_taimaut.webp',
			music: '/music/music/Nikitata_Taimaut.ogg',
		},
		{
			id: 'skriptonit-eto-lyubov',
			title: 'Это любовь',
			albumImg: '/images/albumsImg/skriptonit_eto_lyubov.webp',
			music: '/music/music/Skriptonit_Eto_lyubov.ogg',
		},
		{
			id: 'skriptonit-moskva-lyubit',
			title: 'Москва любит',
			albumImg: '/images/albumsImg/skriptonit_moskva_lyubit.webp',
			music: '/music/music/Skriptonit_Moskva_lyubit.ogg',
		},
		{
			id: 'skriptonit-polozhenie',
			title: 'Положение',
			albumImg: '/images/albumsImg/skriptonit_polozhenie.webp',
			music: '/music/music/Skriptonit_Polozhenie.ogg',
		},
		{
			id: 'skriptonit-priton',
			title: 'Притон',
			albumImg: '/images/albumsImg/skriptonit_priton.webp',
			music: '/music/music/Skriptonit_Priton.ogg',
		},
		{
			id: 'skriptonit-tancuy-sama',
			title: 'Танцуй сама',
			albumImg: '/images/albumsImg/skriptonit_tancuy_sama.webp',
			music: '/music/music/Skriptonit_Tancuy_sama.ogg',
		},
		{
			id: 'skriptonit-feat-charusha-kosmos',
			title: 'Космос',
			albumImg: '/images/albumsImg/skriptonit_feat_charusha_kosmos.webp',
			music: '/music/music/Skriptonit_feat_Charusha_Kosmos.ogg',
		},
		{
			id: 'skriptonit-feat-nadya-dorofeeva-ne-zabirai-menya-s-pati',
			title: 'Не забирай меня с пати',
			albumImg: '/images/albumsImg/skriptonit_feat_nadya_dorofeeva_ne_zabirai_menya_s_pati.webp',
			music: '/music/music/Skriptonit_feat_Nadya_Dorofeeva_Ne_zabirai_menya_s_pati.ogg',
		},
		{
			id: 'skriptonit-feat-t-fest-lambada',
			title: 'Ламбада',
			albumImg: '/images/albumsImg/skriptonit_feat_t-fest_lambada.webp',
			music: '/music/music/Skriptonit_feat_T-Fest_Lambada.ogg',
		},
		{
			id: 'tima-belorusskih-iskry',
			title: 'Искры',
			albumImg: '/images/albumsImg/tima_belorusskih_iskry.webp',
			music: '/music/music/Tima_Belorusskih_Iskry.ogg',
		},
		{
			id: 'tima-belorusskih-nezabudka',
			title: 'Незабудка',
			albumImg: '/images/albumsImg/tima_belorusskih_nezabudka.webp',
			music: '/music/music/Tima_Belorusskih_Nezabudka.ogg',
		},
		{
			id: 'tima-belorusskih-otpusti',
			title: 'Отпусти',
			albumImg: '/images/albumsImg/tima_belorusskih_otpusti.webp',
			music: '/music/music/Tima_Belorusskih_Otpusti.ogg',
		},
		{
			id: 'tima-belorusskih-pod-zvezdopadom',
			title: 'Под звездопадом',
			albumImg: '/images/albumsImg/tima_belorusskih_pod_zvezdopadom.webp',
			music: '/music/music/Tima_Belorusskih_Pod_zvezdopadom.ogg',
		},
		{
			id: 'tima-belorusskih-tebe-luchshe-ne-znat',
			title: 'Тебе лучше не знать',
			albumImg: '/images/albumsImg/tima_belorusskih_tebe_luchshe_ne_znat.webp',
			music: '/music/music/Tima_Belorusskih_Tebe_luchshe_ne_znat.ogg',
		},
		{
			id: 'tima-belorusskih-vitaminka',
			title: 'Витаминка',
			albumImg: '/images/albumsImg/tima_belorusskih_vitaminka.webp',
			music: '/music/music/Tima_Belorusskih_Vitaminka.ogg',
		},
		{
			id: 'tima-belorusskih-prosto-lera-minuta-vechera',
			title: 'Минута вечера',
			albumImg: '/images/albumsImg/tima_belorusskih_prosto_lera_minuta_vechera.webp',
			music: '/music/music/Tima_Belorusskih_prosto_Lera_Minuta_vechera.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-gde-ty',
			title: 'Где ты',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_gde_ty.webp',
			music: '/music/music/Tri_dnya_dozhdya_Gde_ty.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-otpuskay',
			title: 'Отпускай',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_otpuskay.webp',
			music: '/music/music/Tri_dnya_dozhdya_Otpuskay.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-perezaryazhai',
			title: 'Перезаряжай',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_perezaryazhai.webp',
			music: '/music/music/Tri_dnya_dozhdya_Perezaryazhai.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-slezy-na-veter',
			title: 'Слёзы на ветер',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_slezy_na_veter.webp',
			music: '/music/music/Tri_dnya_dozhdya_Slezy_na_veter.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-ya-i-odinochestvo',
			title: 'Я и одиночество',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_ya_i_odinochestvo.webp',
			music: '/music/music/Tri_dnya_dozhdya_Ya_i_odinochestvo.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-feat-lali-kosmos',
			title: 'Космос',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_feat_lali_kosmos.webp',
			music: '/music/music/Tri_dnya_dozhdya_feat_Lali_Kosmos.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-feat-mona-proshchanie',
			title: 'Прощание',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_feat_mona_proshchanie.webp',
			music: '/music/music/Tri_dnya_dozhdya_feat_MONA_Proshchanie.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-feat-mukka-vesna',
			title: 'Весна',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_feat_mukka_vesna.webp',
			music: '/music/music/Tri_dnya_dozhdya_feat_MUKKA_Vesna.ogg',
		},
		{
			id: 'tri-dnya-dozhdya-feat-mukka-voda',
			title: 'Вода',
			albumImg: '/images/albumsImg/tri_dnya_dozhdya_feat_mukka_voda.webp',
			music: '/music/music/Tri_dnya_dozhdya_feat_MUKKA_Voda.ogg',
		},
		{
			id: 'trinadtsat-karat-davay-rasskazhem',
			title: 'Давай расскажем',
			albumImg: '/images/albumsImg/trinadtsat_karat_davay_rasskazhem.webp',
			music: '/music/music/Trinadtsat_Karat_Davay_rasskazhem.ogg',
		},
		{
			id: 'trinadtsat-karat-ostanovi-menya',
			title: 'Останови меня',
			albumImg: '/images/albumsImg/trinadtsat_karat_ostanovi_menya.webp',
			music: '/music/music/Trinadtsat_Karat_Ostanovi_menya.ogg',
		},
		{
			id: 'trinadtsat-karat-posledniy-lepestok',
			title: 'Последний лепесток',
			albumImg: '/images/albumsImg/trinadtsat_karat_posledniy_lepestok.webp',
			music: '/music/music/Trinadtsat_Karat_Posledniy_lepestok.ogg',
		},
		{
			id: 'trinadtsat-karat-taksi',
			title: 'Такси',
			albumImg: '/images/albumsImg/trinadtsat_karat_taksi.webp',
			music: '/music/music/Trinadtsat_Karat_Taksi.ogg',
		},
		{
			id: 'trinadtsat-karat-tolko-ty-nikogda-ne-uznaesh',
			title: 'Только ты никогда не узнаешь',
			albumImg: '/images/albumsImg/trinadtsat_karat_tolko_ty_nikogda_ne_uznaesh.webp',
			music: '/music/music/Trinadtsat_Karat_Tolko_ty_nikogda_ne_uznaesh.ogg',
		},
		{
			id: 'trinadtsat-karat-ty',
			title: 'Ты',
			albumImg: '/images/albumsImg/trinadtsat_karat_ty.webp',
			music: '/music/music/Trinadtsat_Karat_Ty.ogg',
		},
		{
			id: 'trinadtsat-karat-vo-snah',
			title: 'Во снах',
			albumImg: '/images/albumsImg/trinadtsat_karat_vo_snah.webp',
			music: '/music/music/Trinadtsat_Karat_Vo_snah.ogg',
		},
		{
			id: 'trinadtsat-karat-zhvachka',
			title: 'Жвачка',
			albumImg: '/images/albumsImg/trinadtsat_karat_zhvachka.webp',
			music: '/music/music/Trinadtsat_Karat_Zhvachka.ogg',
		},
		{
			id: 'trinadtsat-karat-feat-kosmonavtov-net-kak-dela',
			title: 'Как дела',
			albumImg: '/images/albumsImg/trinadtsat_karat_feat_kosmonavtov_net_kak_dela.webp',
			music: '/music/music/Trinadtsat_Karat_feat_Kosmonavtov_Net_Kak_dela.ogg',
		},
		{
			id: 'gnilayalirika-mosty-goryat',
			title: 'Мосты горят',
			albumImg: '/images/albumsImg/gnilayalirika_mosty_goryat.webp',
			music: '/music/music/gnilayalirika_Mosty_goryat.ogg',
		},
		{
			id: 'gnilayalirika-ne-slezai',
			title: 'Не слезай',
			albumImg: '/images/albumsImg/gnilayalirika_ne_slezai.webp',
			music: '/music/music/gnilayalirika_Ne_slezai.ogg',
		},
		{
			id: 'gnilayalirika-roki-prosti-proschay',
			title: 'Прости, прощай',
			albumImg: '/images/albumsImg/gnilayalirika_roki_prosti_proschay.webp',
			music: '/music/music/gnilayalirika_Roki_Prosti_proschay.ogg',
		},
		{
			id: 'gnilayalirika-u-vhoda-v-paradnuyu',
			title: 'У входа в парадную',
			albumImg: '/images/albumsImg/gnilayalirika_u_vhoda_v_paradnuyu.webp',
			music: '/music/music/gnilayalirika_U_vhoda_v_paradnuyu.ogg',
		},
		{
			id: 'gnilayalirika-uxknow-no-ty-ne-prihodish',
			title: 'Но ты не приходишь',
			albumImg: '/images/albumsImg/gnilayalirika_uxknow_no_ty_ne_prihodish.webp',
			music: '/music/music/gnilayalirika_uxknow_no_ty_ne_prihodish.ogg',
		},
	],
	links: [
		{
			artistName: 'Амура',
			trackId: 'amura-khotelos-brosit',
		},
		{
			artistName: 'Амура',
			trackId: 'amura-minimum',
		},
		{
			artistName: 'Амура',
			trackId: 'amura-ne-perestanu-ulybatsya',
		},
		{
			artistName: 'Амура',
			trackId: 'amura-feat-kambulat-kak-dela',
		},
		{
			artistName: 'Камбулат',
			trackId: 'amura-feat-kambulat-kak-dela',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-komety',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-luchshe-by-ne-znal',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-momenty',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-moya-lyubov-mertva',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-nenavizhu',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-plany-na-leto',
		},
		{
			artistName: 'Даниил Ким',
			trackId: 'daniil-kim-proschay',
		},
		{
			artistName: 'Фогель',
			trackId: 'fogel-feat-amura-ne-moroch-mne-golovu',
		},
		{
			artistName: 'Амура',
			trackId: 'fogel-feat-amura-ne-moroch-mne-golovu',
		},
		{
			artistName: 'Камбулат',
			trackId: 'kambulat-polyubila-duraka',
		},
		{
			artistName: 'Камбулат',
			trackId: 'kambulat-privet',
		},
		{
			artistName: 'Камбулат',
			trackId: 'kambulat-tomas-shelbi',
		},
		{
			artistName: 'Камбулат',
			trackId: 'kambulat-vypey-menya',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-2-tipa-lyudey',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-endorfin',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-malinovyy-zakat',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-motylek',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-optimist',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-pyanyy-dozhd',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-stan',
		},
		{
			artistName: 'Макс Корж',
			trackId: 'maks-korzh-traliki',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-chernyy-russkiy',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-noch-taksi-zametki',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-poslednyaya-lyubov',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-selavi',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-feat-eldzhey-cadillac',
		},
		{
			artistName: 'Элджей',
			trackId: 'morgenshtern-feat-eldzhey-cadillac',
		},
		{
			artistName: 'Morgenshtern',
			trackId: 'morgenshtern-feat-eldzhey-location',
		},
		{
			artistName: 'Элджей',
			trackId: 'morgenshtern-feat-eldzhey-location',
		},
		{
			artistName: 'Нервы',
			trackId: 'nervy-otricatelnyy-geroy',
		},
		{
			artistName: 'Нервы',
			trackId: 'nervy-slishkom-vlyublen',
		},
		{
			artistName: 'Нервы',
			trackId: 'nervy-vorony',
		},
		{
			artistName: 'Nikitata',
			trackId: 'nikitata-navsegda',
		},
		{
			artistName: 'Nikitata',
			trackId: 'nikitata-ne-poteryai',
		},
		{
			artistName: 'Nikitata',
			trackId: 'nikitata-polyubi-menya-silney',
		},
		{
			artistName: 'Nikitata',
			trackId: 'nikitata-taimaut',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-eto-lyubov',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-moskva-lyubit',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-polozhenie',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-priton',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-tancuy-sama',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-feat-charusha-kosmos',
		},
		{
			artistName: 'charusha',
			trackId: 'skriptonit-feat-charusha-kosmos',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-feat-nadya-dorofeeva-ne-zabirai-menya-s-pati',
		},
		{
			artistName: 'Надя Дорофеева',
			trackId: 'skriptonit-feat-nadya-dorofeeva-ne-zabirai-menya-s-pati',
		},
		{
			artistName: 'Скриптонит',
			trackId: 'skriptonit-feat-t-fest-lambada',
		},
		{
			artistName: 'T-Fest',
			trackId: 'skriptonit-feat-t-fest-lambada',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-iskry',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-nezabudka',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-otpusti',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-pod-zvezdopadom',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-tebe-luchshe-ne-znat',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-vitaminka',
		},
		{
			artistName: 'Тима Белорусских',
			trackId: 'tima-belorusskih-prosto-lera-minuta-vechera',
		},
		{
			artistName: 'Просто лера',
			trackId: 'tima-belorusskih-prosto-lera-minuta-vechera',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-gde-ty',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-otpuskay',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-perezaryazhai',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-slezy-na-veter',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-ya-i-odinochestvo',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-feat-lali-kosmos',
		},
		{
			artistName: 'Лали',
			trackId: 'tri-dnya-dozhdya-feat-lali-kosmos',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-feat-mona-proshchanie',
		},
		{
			artistName: 'MONA',
			trackId: 'tri-dnya-dozhdya-feat-mona-proshchanie',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-feat-mukka-vesna',
		},
		{
			artistName: 'Мукка',
			trackId: 'tri-dnya-dozhdya-feat-mukka-vesna',
		},
		{
			artistName: 'Три дня дождя',
			trackId: 'tri-dnya-dozhdya-feat-mukka-voda',
		},
		{
			artistName: 'Мукка',
			trackId: 'tri-dnya-dozhdya-feat-mukka-voda',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-davay-rasskazhem',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-ostanovi-menya',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-posledniy-lepestok',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-taksi',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-tolko-ty-nikogda-ne-uznaesh',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-ty',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-vo-snah',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-zhvachka',
		},
		{
			artistName: 'Тринадцать карат',
			trackId: 'trinadtsat-karat-feat-kosmonavtov-net-kak-dela',
		},
		{
			artistName: 'Космонавтов нет',
			trackId: 'trinadtsat-karat-feat-kosmonavtov-net-kak-dela',
		},
		{
			artistName: 'Гнилая лирика',
			trackId: 'gnilayalirika-mosty-goryat',
		},
		{
			artistName: 'Гнилая лирика',
			trackId: 'gnilayalirika-ne-slezai',
		},
		{
			artistName: 'Гнилая лирика',
			trackId: 'gnilayalirika-roki-prosti-proschay',
		},
		{
			artistName: 'Гнилая лирика',
			trackId: 'gnilayalirika-u-vhoda-v-paradnuyu',
		},
		{
			artistName: 'Гнилая лирика',
			trackId: 'gnilayalirika-uxknow-no-ty-ne-prihodish',
		},
	],
};
