// Grand Hotel Ma'lumotlar to'plami (12 ta viloyat filiallari va ko'p rasmli xonalar)

export const initialBranches = [
  {
    id: 'tashkent',
    region: 'Toshkent shahri',
    name: 'Grand Hotel Tashkent (Flagship)',
    city: 'Toshkent',
    address: 'Amir Temur shoh ko‘chasi, 88-uy',
    landmark: 'Amir Temur xiyoboniga 3 daqiqa, Xalqaro Aeroportga 15 daqiqa',
    phone: '+998 71 200 88 88',
    rating: 5.0,
    rooms_count: 150,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Poytaxt markazidagi bosh flagman 5 yulduzli bino. Hashamatli prezident apartamentlari, panoramali basseyn va xalqaro kongress-holl.'
  },
  {
    id: 'samarkand',
    region: 'Samarqand viloyati',
    name: 'Grand Hotel Samarkand Regency',
    city: 'Samarqand',
    address: 'Universitet xiyoboni, 12-uy',
    landmark: 'Registon maydoniga 7 daqiqalik piyoda masofa',
    phone: '+998 66 230 40 00',
    rating: 5.0,
    rooms_count: 120,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Qadimiy Registon manzarasi, sharqona milliy naqshlar va zamonaviy lyuks uyg‘unligi. VIP sayohatchilar uchun eng nufuzli manzil.'
  },
  {
    id: 'bukhara',
    region: 'Buxoro viloyati',
    name: 'Grand Hotel Bukhara Palace',
    city: 'Buxoro',
    address: 'Bahouddin Naqshband ko‘chasi, 45-uy',
    landmark: 'Labi Hovuz tarixiy majmuasiga 400 metr',
    phone: '+998 65 224 55 55',
    rating: 4.9,
    rooms_count: 95,
    image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Buxoroi Sharif qalbida joylashgan karvonsaroy uslubidagi zamonaviy saroy-mehmonxona. Fin saunasi va an’anaviy sharqona choyxona.'
  },
  {
    id: 'khiva',
    region: 'Xorazm viloyati (Xiva)',
    name: 'Grand Hotel Khiva Oasis',
    city: 'Xiva',
    address: 'Paxlavon Mahmud ko‘chasi, 7-uy',
    landmark: 'Ichan Qal‘a Ota Darvozasiga 200 metr',
    phone: '+998 62 375 88 00',
    rating: 4.9,
    rooms_count: 80,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    description: 'Ochiq osmon ostidagi muzey shahar ro‘parasida joylashgan ertaknamo mehmonxona. Minoralarga qaragan shaxsiy panoramik ayvonlar.'
  },
  {
    id: 'fergana',
    region: 'Farg‘ona viloyati',
    name: 'Grand Hotel Fergana Valley',
    city: 'Farg‘ona',
    address: 'Alisher Navoiy shoh ko‘chasi, 34-uy',
    landmark: 'Markaziy xiyobon va shahar istirohat bog‘i',
    phone: '+998 73 244 11 22',
    rating: 4.8,
    rooms_count: 90,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    description: 'So‘lim Farg‘ona vodiysining eng zamonaviy biznes mehmonxonasi. Katta konferens-zal, yapon bog‘i va sokin xiyobon manzarasi.'
  },
  {
    id: 'andijan',
    region: 'Andijon viloyati',
    name: 'Grand Hotel Andijan',
    city: 'Andijon',
    address: 'Milliy tiklanish ko‘chasi, 18-uy',
    landmark: 'Zahiriddin Muhammad Bobur maydoni',
    phone: '+998 74 223 90 90',
    rating: 4.8,
    rooms_count: 85,
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    description: 'Ishbilarmonlar va oilaviy dam oluvchilar uchun ideal maskan. Keng fitnes zali va milliy Andijon taomlari restorani.'
  },
  {
    id: 'namangan',
    region: 'Namangan viloyati',
    name: 'Grand Hotel Namangan Flowers',
    city: 'Namangan',
    address: 'Islom Karimov ko‘chasi, 22-uy',
    landmark: 'Afsonalar vodiysi xalqaro tematik bog‘i yonida',
    phone: '+998 69 227 33 44',
    rating: 4.8,
    rooms_count: 90,
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Gullar shahri Namanganning nufuzli mehmonxonasi. Oilaviy lyukslar va bolalar ko‘ngilochar markazi bilan boyitilgan.'
  },
  {
    id: 'qarshi',
    region: 'Qashqadaryo viloyati (Qarshi)',
    name: 'Grand Hotel Qarshi Nasaf',
    city: 'Qarshi',
    address: 'Nasaf ko‘chasi, 15-uy',
    landmark: 'Qarshi ko‘prigi va markaziy amfiteatr',
    phone: '+998 75 221 60 00',
    rating: 4.8,
    rooms_count: 75,
    image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=80',
    description: 'Qadimiy Nasaf zaminidagi 5 yulduzli qulayliklar. Yopiq basseyn, tennis korti va keng VIP apartamentlar.'
  },
  {
    id: 'termez',
    region: 'Surxondaryo viloyati (Termiz)',
    name: 'Grand Hotel Termez Silk Road',
    city: 'Termiz',
    address: 'Al-Hakim at-Termiziy ko‘chasi, 50-uy',
    landmark: 'Termiz arxeologiya muzeyi yaqinida',
    phone: '+998 76 228 12 12',
    rating: 4.8,
    rooms_count: 70,
    image_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    description: 'Janub gavhari Termizdagi hashamatli mehmonxona. Iqlim nazorati tizimi va xalqaro delegatsiyalar uchun barcha sharoitlar.'
  },
  {
    id: 'navoi',
    region: 'Navoiy viloyati',
    name: 'Grand Hotel Navoi Industrial & Spa',
    city: 'Navoiy',
    address: 'G‘alaba shoh ko‘chasi, 9-uy',
    landmark: 'Zarafshon bog‘i va shahar markazi',
    phone: '+998 79 224 80 80',
    rating: 4.8,
    rooms_count: 80,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    description: 'Erkin iqtisodiy zona mehmonlari uchun qulay biznes markazi, spa va fitnes klubi.'
  },
  {
    id: 'jizzakh',
    region: 'Jizzax viloyati',
    name: 'Grand Hotel Jizzakh Zaamin View',
    city: 'Jizzax',
    address: 'Sharof Rashidov shoh ko‘chasi, 28-uy',
    landmark: 'Zomin tog‘lari yo‘nalishida',
    phone: '+998 72 226 40 40',
    rating: 4.8,
    rooms_count: 70,
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    description: 'Tabiat qo‘ynida dam olish va ish safari uchun qulay sokin maskan. Milliy Jizzax somsasi va taomlari.'
  },
  {
    id: 'guliston',
    region: 'Sirdaryo viloyati (Guliston)',
    name: 'Grand Hotel Guliston',
    city: 'Guliston',
    address: 'Do‘stlik ko‘chasi, 14-uy',
    landmark: 'Markaziy xiyobon va shahar hokimiyati',
    phone: '+998 67 225 15 15',
    rating: 4.7,
    rooms_count: 60,
    image_url: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80',
    description: 'Sirdaryoning markazida joylashgan zamonaviy mehmonxona, tezkor qulay transfer va shinam xonalar.'
  },
  {
    id: 'nukus',
    region: 'Qoraqalpog‘iston Respublikasi (Nukus)',
    name: 'Grand Hotel Nukus Savitsky',
    city: 'Nukus',
    address: 'Berdaq shoh ko‘chasi, 3-uy',
    landmark: 'Dunyoga mashhur Savitskiy san’at muzeyi yonida',
    phone: '+998 61 222 77 00',
    rating: 4.8,
    rooms_count: 70,
    image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'Orolbo‘yi gavhari Nukusda san’at va qulaylik uyg‘unligi. Xalqaro sayyohlar va mehmonlar uchun 5 yulduzli servis.'
  }
];

// 4 xil xona — har birida 4 tadan yuqori sifatli rasmlar (karusel uchun)
export const initialRooms = [
  {
    id: 1,
    name: 'Standard Xona',
    type: 'standard',
    price_per_night: 60,
    capacity: 2,
    size: '32 m²',
    bed_type: '1 ta Queen-size kravat',
    description: 'Zamonaviy va qulay dizayndagi shinam xona. Qulay dam olish va ish safari uchun ajoyib tanlov. Shahar manzarasi va barcha asosiy qulayliklar bilan jihozlangan.',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Yuqori tezlikdagi Wi-Fi', 'Konditsioner', 'Smart TV (4K)', 'Mini-bar', 'Xavfsiz seyf', 'Shinam vanna'],
    is_available: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Deluxe Xona',
    type: 'deluxe',
    price_per_night: 110,
    capacity: 3,
    size: '48 m²',
    bed_type: '1 ta King-size kravat + divan',
    description: 'Kengaytirilgan maydon, hashamatli marmar qoplamalar va shahar panoramik manzarasi bilan ajralib turuvchi yuqori darajadagi xona. Orom va go‘zallik uyg‘unligi.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Balkon va shahar panoramasi', 'King-size qulay to‘shak', 'Nespresso kofe apparati', 'Marmar hammom & Jakuzi', 'Bepul premium nonushta', '24/7 xona xizmati'],
    is_available: true,
    rating: 4.9
  },
  {
    id: 3,
    name: 'VIP Prezident Suite',
    type: 'vip',
    price_per_night: 220,
    capacity: 4,
    size: '85 m²',
    bed_type: '2 ta Super King-size kravat',
    description: 'Grand Hotelning eng hashamatli xonasi. Alohida mehmonxona zali, shaxsiy jakuzi, oltin naqshli interyer va eksklyuziv VIP konsyerj xizmati bilan ta’minlangan.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Shaxsiy terassa', 'VIP Aeroport transferi', 'Shaxsiy shveysar & konsyerj', 'Jakuzi & fin saunasi', 'To‘liq bar va sharob to‘plami', 'Cheklanmagan SPA xizmatlari'],
    is_available: true,
    rating: 5.0
  },
  {
    id: 4,
    name: 'Family Oila Xonasi',
    type: 'family',
    price_per_night: 160,
    capacity: 5,
    size: '68 m²',
    bed_type: '2 ta Katta ikki kishilik kravat',
    description: 'Butun oila bilan qulay va xavfsiz hordiq chiqarish uchun maxsus loyihalashtirilgan ikki xonali keng lyuks xona. Bolalar uchun maxsus qulayliklar mavjud.',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    amenities: ['2 ta alohida yotoqxona', 'Bolalar o‘yin burchagi', 'Katta muzlatgich va oshxona maydoni', 'Oila uchun bepul nonushta', 'Bolalar uchun xavfsiz vanna', 'Smart ko‘ngilochar tizim'],
    is_available: true,
    rating: 4.9
  }
];

export const initialServices = [
  {
    id: 'restaurant',
    title: 'Restoran va nonushta',
    description: 'Har kuni ertalabki sarxil shved stoli va kun bo‘yi milliy hamda xalqaro gurme taomlar.',
    icon: 'Utensils',
    highlight: 'Shved stoli bepul'
  },
  {
    id: 'wifi',
    title: 'Bepul Wi-Fi',
    description: 'Barcha xonalar va mehmonxona hududida 500 Mbit/s gacha bo‘lgan ultra-tezkor internet.',
    icon: 'Wifi',
    highlight: '500 Mbit/s tezlik'
  },
  {
    id: 'pool',
    title: 'Panoramali Basseyn',
    description: 'Yopiq isitiladigan va ochiq quyoshli terassali moviy panoramik basseyn majmuasi.',
    icon: 'Waves',
    highlight: 'Harorat nazorati'
  },
  {
    id: 'gym',
    title: 'Sport zali & Fitnes',
    description: 'Eng so‘nggi TechnoGym trenajyorlari, kardio zonasi va tajribali shaxsiy instruktorlar.',
    icon: 'Dumbbell',
    highlight: '24/7 ochiq'
  },
  {
    id: 'parking',
    title: 'Xavfsiz Avtoturargoh',
    description: 'Video-kuzatuv ostidagi yer osti qo‘riqlanadigan bepul keng avtoturargoh.',
    icon: 'Car',
    highlight: '24/7 video-kuzatuv'
  },
  {
    id: 'airport',
    title: 'Aeroportdan kutib olish',
    description: 'O‘zbekiston barcha aeroportlaridan qulay VIP transfer va kutib olish xizmati.',
    icon: 'Plane',
    highlight: 'VIP Mercedes transfer'
  },
  {
    id: 'reception',
    title: '24/7 Resepshn',
    description: 'Har qanday savol va istaklaringizni kechayu-kunduz hal qiluvchi professional konsyerj.',
    icon: 'Clock',
    highlight: 'Har daqiqa siz bilan'
  },
  {
    id: 'room-service',
    title: 'Xonaga ovqat yetkazish',
    description: '24 soat davomida sevimli taom va ichimliklaringizni to‘g‘ridan-to‘g‘ri xonangizga yetkazish.',
    icon: 'BellRing',
    highlight: 'Tezkor yetkazish'
  }
];

export const initialRestaurantMenu = [
  {
    id: 1,
    name: 'Maxsus To‘y Oshi (Palov)',
    category: 'milliy',
    price: 85000,
    description: 'Lazer guruchi, sarxil barra qo‘zi go‘shti, qazi, bedana tuxumi va mayiz bilan damlangan afsonaviy o‘zbek milliy taomi.',
    image_url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    preparation_time: '20 daqiqa',
    is_special: true
  },
  {
    id: 2,
    name: 'Tandir Somsa Assorti',
    category: 'milliy',
    price: 45000,
    description: 'Tandirda pishirilgan qarsildoq xamirli, shirador mayin go‘sht va piyozli 3 xil milliy somsa to‘plami.',
    image_url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    preparation_time: '15 daqiqa',
    is_special: false
  },
  {
    id: 3,
    name: 'Qozon Kabob (Grand uslubida)',
    category: 'milliy',
    price: 98000,
    description: 'Qizargan mayin yosh qo‘zi go‘shti va qovurilgan tillarang kartoshka, sarxil ko‘katlar hamda maxsus marinadlangan piyoz bilan.',
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    preparation_time: '25 daqiqa',
    is_special: true
  },
  {
    id: 4,
    name: 'Norveg Qizil Balig‘i (Salmon Steak)',
    category: 'xalqaro',
    price: 145000,
    description: 'Grilda pishirilgan barra qizil baliq filesi, parhezbop sarsabil (sparja) va limonli kremli-sarimsoq sous bilan.',
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    preparation_time: '25 daqiqa',
    is_special: true
  },
  {
    id: 5,
    name: 'Black Angus Ribeye Steyki',
    category: 'xalqaro',
    price: 195000,
    description: 'Oliy navli marmar mol go‘shti, olovda qovurilgan sabzavotlar, rozmarin va murchli demi-glas sousi.',
    image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    preparation_time: '30 daqiqa',
    is_special: true
  },
  {
    id: 6,
    name: 'Klassik Sezar Salati (Krevetkali)',
    category: 'xalqaro',
    price: 75000,
    description: 'Qarsildoq aysberg barglari, yirik yoqimli qirollik krevetkalari, parmezan pishlog‘i va xushbo‘y suxariklar.',
    image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    preparation_time: '15 daqiqa',
    is_special: false
  },
  {
    id: 7,
    name: 'Italyancha Tiramisu',
    category: 'desertlar',
    price: 45000,
    description: 'Haqiqiy Maskarpone kremi, espressoga botirilgan Savoiardi pechenyelari va toza kakao kukuni bilan tayyorlangan nozik desert.',
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    preparation_time: '10 daqiqa',
    is_special: false
  },
  {
    id: 8,
    name: 'Grand Signature Kokteyli',
    category: 'ichimliklar',
    price: 40000,
    description: 'Sarxil mevalar, yalpiz, laym va tabiiy sharbatlardan tayyorlangan tetiklantiruvchi mualliflik ichimligi.',
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    preparation_time: '5 daqiqa',
    is_special: true
  }
];

export const initialTestimonials = [
  {
    id: 1,
    name: 'Rustam Saidov',
    city: 'Toshkent',
    rating: 5,
    comment: 'Toshkent va Samarqanddagi Grand Hotel filiallarida bo‘ldim. Xonalar tozaligi, xizmat ko‘rsatish madaniyati va milliy taomlari a‘lo darajada!',
    role: 'Doimiy mehmon'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    city: 'Moskva, Rossiya',
    rating: 5,
    comment: 'Останавливались в Grand Hotel Samarkand и Bukhara. Потрясающий восточный колорит в сочетании с пятизвездочным комфортом!',
    role: 'Biznes sayohatchi'
  },
  {
    id: 3,
    name: 'David Wilson',
    city: 'London, Buyuk Britaniya',
    rating: 5,
    comment: 'Visited Grand Hotel Khiva right next to Ichan Qala. Absolutely magical view from the balcony! Best hotel experience in Central Asia.',
    role: 'Xalqaro sayyoh'
  }
];
