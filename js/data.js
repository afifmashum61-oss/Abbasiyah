// ==========================================================================
// DATA STORE: MEDIA PEMBELAJARAN INTERAKTIF SEJARAH KEBUDAYAAN ISLAM (SKI)
// KELAS VIII MADRASAH TSANAWIYAH (KMA NO. 183 TAHUN 2019)
// TOPIK UTAMA: MASA KEJAYAAN DINASTI ABBASIYAH (THE GOLDEN AGE OF ISLAM)
// ==========================================================================

const APP_DATA = {
  // Profil Narator Utama
  activeReciter: {
    id: "ski_narrator",
    name: "Edukator Sejarah Kebudayaan Islam",
    title: "Kemenag RI • Kurikulum KMA 183",
    avatar: "🏛️"
  },

  // 1. Peta Kurikulum KMA No. 183 Tahun 2019 Bidang SKI MTs
  curriculum: {
    title: "Peta Kompetensi Inti & Kompetensi Dasar SKI (KMA No. 183 Tahun 2019)",
    subject: "Sejarah Kebudayaan Islam (SKI) Madrasah Tsanawiyah (MTs)",
    levels: [
      {
        grade: "Kelas VII",
        semesters: [
          {
            semester: "Semester Ganjil & Genap",
            ki: [
              "KI-1: Menghayati dan mengamalkan ajaran agama Islam.",
              "KI-2: Menunjukkan perilaku jujur, disiplin, santun, peduli, dan bertanggung jawab.",
              "KI-3: Memahami pengetahuan faktual dan konseptual tentang sejarah peradaban Islam.",
              "KI-4: Mengolah, menyaji, dan menalar dalam ranah konkret sejarah dakwah Nabi SAW dan Khulafaur Rasyidin."
            ],
            kd: [
              "KD 3.1: Memahami misi Nabi Muhammad SAW sebagai rahmat bagi seluruh alam.",
              "KD 3.2: Menganalisis strategi dakwah Rasulullah SAW di Makkah dan Madinah.",
              "KD 3.3: Menganalisis prestasi Khulafaur Rasyidin dalam mengembangkan dakwah Islam.",
              "KD 3.4: Menganalisis sejarah berdirinya dan perkembangan peradaban Dinasti Umayyah di Damaskus."
            ]
          }
        ]
      },
      {
        grade: "Kelas VIII (Fokus Materi: Dinasti Abbasiyah)",
        semesters: [
          {
            semester: "Semester Ganjil",
            ki: [
              "KI-1: Menghayati nilai-nilai kejuangan dan keteladanan para khalifah serta ilmuwan muslim.",
              "KI-2: Menunjukkan sikap ilmiah, kritis, toleran, dan gemar menuntut ilmu sebagaimana dicontohkan cendekiawan Abbasiyah.",
              "KI-3: Menganalisis sejarah berdirinya Dinasti Abbasiyah, fase keemasan, dan perkembangan peradaban Islam.",
              "KI-4: Menyajikan dan merekonstruksi biografi ilmuwan muslim, karya monumental, dan peran Bayt al-Hikmah dalam kemajuan dunia."
            ],
            kd: [
              "KD 3.1: Menganalisis sejarah berdirinya Dinasti Abbasiyah (tokoh pendiri, latar belakang runtuhnya Umayyah, dan pemindahan ibu kota ke Baghdad).",
              "KD 4.1: Menyajikan rangkaian peristiwa sejarah berdirinya Dinasti Abbasiyah dalam bentuk garis waktu (timeline).",
              "KD 3.2: Menganalisis perkembangan peradaban dan kemakmuran Islam pada masa kejayaan Dinasti Abbasiyah (Khalifah Harun Ar-Rasyid dan Al-Ma'mun).",
              "KD 4.2: Memaparkan kemajuan peradaban, administrasi pemerintahan, dan perekonomian pada masa Dinasti Abbasiyah."
            ]
          },
          {
            semester: "Semester Genap",
            ki: [
              "KI-3: Menganalisis biografi, spesialisasi, dan karya monumental para ilmuwan muslim serta ulama penyusun kutubussittah pada masa Abbasiyah.",
              "KI-4: Mengomunikasikan hikmah dan inspirasi kemajuan sains Islam untuk membangun peradaban modern."
            ],
            kd: [
              "KD 3.3: Menganalisis tokoh ilmuwan muslim dan perannya dalam kemajuan peradaban Islam masa Abbasiyah (Ibnu Sina, Al-Khawarizmi, Ar-Razi, Al-Kindi, Jabir bin Hayyan, Al-Farabi).",
              "KD 4.3: Mengolah informasi tentang keteladanan ilmuwan muslim Dinasti Abbasiyah dalam memadukan wahyu dan riset empiris.",
              "KD 3.4: Menganalisis biografi dan peran para ulama mazhab fiqih (Abu Hanifah, Malik, Syafi'i, Ahmad bin Hanbal) dan ulama hadits penyusun Kutubus Sittah (Bukhari, Muslim, Abu Dawud, Tirmidzi, An-Nasa'i, Ibnu Majah).",
              "KD 4.4: Mempresentasikan keteladanan ulama hadits dan fiqih pada masa Abbasiyah dalam menjaga orisinalitas ajaran Islam."
            ]
          }
        ]
      },
      {
        grade: "Kelas IX",
        semesters: [
          {
            semester: "Semester Ganjil & Genap",
            ki: [
              "KI-3: Memahami sejarah perkembangan Islam di Nusantara dan peran Dinasti Ayyubiyah.",
              "KI-4: Menyajikan jejak kebudayaan dan nilai kearifan lokal Islam di Indonesia."
            ],
            kd: [
              "KD 3.1: Menganalisis sejarah Dinasti Ayyubiyah dan peran Shalahuddin Al-Ayyubi dalam Perang Salib.",
              "KD 3.2: Menganalisis masuknya Islam ke Nusantara melalui perdagangan, perkawinan, dan pendidikan pesantren.",
              "KD 3.3: Menganalisis sejarah kerajaan-kerajaan Islam di tanah Jawa, Sumatra, Sulawesi, dan Maluku."
            ]
          }
        ]
      }
    ]
  },

  // 2. Data Galeri Kejayaan: Cendekiawan Muslim & Pusat Peradaban Abbasiyah
  tajwid: {
    // Kategori 1: Cendekiawan & Ilmuwan Muslim (Sains & Agama)
    mad: [
      {
        id: "tokoh_ibnu_sina",
        title: "Ibnu Sina (Avicenna)",
        subtitle: "Bapak Kedokteran Modern • Al-Qanun fi at-Tibb",
        hukumKey: "kedokteran",
        hukumName: "Ilmu Kedokteran & Farmakologi",
        surah: 1,
        ayahs: [],
        surahName: "Biografi Kedokteran Abbasiyah",
        ayahRange: "980 – 1037 M",
        reciter: "Edukator Sejarah Islam",
        ketukan: 2,
        beatsText: "Penyusun Ensiklopedia Kedokteran 5 Jilid",
        ruleGuide: "Ibnu Sina (Avicenna) adalah ilmuwan genius serba bisa yang meletakkan dasar kedokteran klinis modern, metode karantina penularan penyakit, dan farmakologi. Karyanya 'Al-Qanun fi at-Tibb' (The Canon of Medicine) diterjemahkan ke bahasa Latin dan menjadi rujukan wajib fakultas kedokteran Eropa selama lebih dari 5 abad.",
        mouthGuide: "Metode Ilmiah: Mengintegrasikan pengamatan klinis empiris dengan penalaran logika Aristotelian dan etika Islam.",
        mission: "Klik kata kunci yang merupakan mahakarya & penemuan monumental Ibnu Sina!",
        verseTokens: [
          { word: "Al-Qanun fi at-Tibb", isTarget: true, reason: "MAHAKARYA IBNU SINA: Ensiklopedia medis 5 volume terlengkap yang merangkum anatomi, farmakologi, dan pengobatan penyakit menular." },
          { word: "Penemu Aljabar", isTarget: false, reason: "Bukan Ibnu Sina, penemu Aljabar dan angka nol adalah Muhammad bin Musa Al-Khawarizmi." },
          { word: "Metode Karantina", isTarget: true, reason: "PENEMUAN IBNU SINA: Pertama kali merumuskan konsep isolasi/karantina medis untuk mencegah penularan wabah patogen lewat udara dan air." },
          { word: "Bapak Kimia", isTarget: false, reason: "Bukan Ibnu Sina, gelar Bapak Kimia Modern adalah milik Jabir bin Hayyan." },
          { word: "Asy-Syaikh ar-Ra'is", isTarget: true, reason: "GELAR KEHORMATAN: Gelar agung 'Pemimpin Para Cendekiawan' yang diberikan dunia Timur atas keluasan ilmunya di bidang filsafat dan sains." },
          { word: "Penyusun Shahih", isTarget: false, reason: "Bukan Ibnu Sina, kodifikasi hadits shahih dipelopori oleh Imam Al-Bukhari dan Imam Muslim." }
        ],
        fullArabic: "إِنَّ الْعِلْمَ حَيَاةُ الْقُلُوبِ مِنَ الْعَمَى وَنُورُ الْأَبْصَارِ مِنَ الظُّلْمَةِ",
        targetLafadz: "Al-Qanun fi at-Tibb (القانون في الطب)",
        translation: "Ibnu Sina (Avicenna, 980–1037 M) adalah mahaguru kedokteran dunia asal Bukhara. Ia membuktikan bahwa penyakit infeksi menyebar melalui mikroorganisme di air dan tanah, serta menemukan metode anestesi bedah dan teori sirkulasi darah paru.",
        audioPhonetic: "Ibnu Sina: Al-Qanun fi at-Tibb, Pelopor Kedokteran Klinis dan Karantina Dunia"
      },
      {
        id: "tokoh_al_khawarizmi",
        title: "Al-Khawarizmi (Algoritma)",
        subtitle: "Bapak Aljabar Dunia • Matematika & Astronomi",
        hukumKey: "matematika",
        hukumName: "Ilmu Matematika, Aljabar & Geografi",
        surah: 2,
        ayahs: [],
        surahName: "Riset Matematika Bayt al-Hikmah",
        ayahRange: "780 – 850 M",
        reciter: "Edukator Sejarah Islam",
        ketukan: 4,
        beatsText: "Penemu Konsep Angka Nol & Aljabar",
        ruleGuide: "Muhammad bin Musa Al-Khawarizmi bertugas sebagai astronom utama dan kepala perpustakaan di Bayt al-Hikmah Baghdad pada masa Khalifah Al-Ma'mun. Ia menciptakan cabang ilmu matematika baru yaitu Aljabar (Al-Jabr wa Al-Muqabalah), memperkenalkan angka Hindu-Arab termasuk angka nol (Sifr), dan menciptakan algoritma dasar pemrograman modern.",
        mouthGuide: "Metode Ilmiah: Memecahkan persoalan praktis pembagian waris syariah (faraidh), survei tanah, dan navigasi bintang melalui rumus matematika.",
        mission: "Klik kata kunci yang merupakan kontribusi orisinal Al-Khawarizmi!",
        verseTokens: [
          { word: "Kitab Al-Jabr", isTarget: true, reason: "MAHAKARYA AL-KHAWARIZMI: Buku 'Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala' yang melahirkan istilah Aljabar." },
          { word: "Penemu Cacar", isTarget: false, reason: "Bukan Al-Khawarizmi, penemu diagnosis diferensial cacar dan campak adalah ilmuwan kedokteran Ar-Razi." },
          { word: "Konsep Angka Nol", isTarget: true, reason: "KONTRIBUSI BESAR: Memperkenalkan angka nol (Sifr) ke dunia Islam dan Eropa yang merevolusi sistem hitung desimal dunia." },
          { word: "Filsuf Pertama", isTarget: false, reason: "Bukan Al-Khawarizmi, gelar filosof Muslim pertama disandang oleh Abu Yusuf Ya'qub Al-Kindi." },
          { word: "Peta Bumi Surat al-Ard", isTarget: true, reason: "GEOGRAFI MONUMENTAL: Buku 'Surat al-Ard' yang mengoreksi peta koordinat bumi Ptolemeus bersama 70 geografer Baghdad." },
          { word: "Penyair Abu Nawas", isTarget: false, reason: "Abu Nawas adalah sastrawan istana Harun Ar-Rasyid, bukan ilmuwan matematika." }
        ],
        fullArabic: "إِنَّ الْحِسَابَ مِيزَانُ الْمُعَامَلَاتِ وَأَسَاسُ فَرَائِضِ الْمَوَارِيثِ",
        targetLafadz: "Al-Jabr wal-Muqabalah (الجبر والمقابلة)",
        translation: "Muhammad bin Musa Al-Khawarizmi merevolusi peradaban dengan mengenalkan sistem desimal, logaritma/algoritma, dan aljabar. Tanpa penemuannya tentang konsep angka nol dan persamaan aljabar, teknologi komputer modern tidak akan pernah ada.",
        audioPhonetic: "Al-Khawarizmi: Penemu Aljabar, Angka Nol, dan Peletak Dasar Algoritma Modern"
      },
      {
        id: "tokoh_jabir_bin_hayyan",
        title: "Jabir bin Hayyan (Geber)",
        subtitle: "Bapak Kimia Modern • Laboratorium Eksperimental",
        hukumKey: "kimia",
        hukumName: "Eksperimen Kimia & Metalurgi",
        surah: 3,
        ayahs: [],
        surahName: "Laboratorium Kufah & Baghdad",
        ayahRange: "721 – 815 M",
        reciter: "Edukator Sejarah Islam",
        ketukan: 6,
        beatsText: "Pelopor Metode Eksperimen Laboratorium",
        ruleGuide: "Jabir bin Hayyan mengubah alkimia kuno mistis menjadi ilmu kimia ilmiah modern berbasis eksperimen terukur di laboratorium. Ia menemukan berbagai asam mineral penting (asam sulfat, asam klorida, asam nitrat), teknik distilasi, kristalisasi, sublimasi, dan alat lab seperti retor & alembik.",
        mouthGuide: "Metode Ilmiah: 'Syarat utama dalam kimia adalah melakukan riset eksperimen praktis, sebab siapa yang tidak beruji coba tidak akan mencapai kebenaran'.",
        mission: "Klik penemuan ilmiah yang dipelopori oleh Jabir bin Hayyan!",
        verseTokens: [
          { word: "Teknik Distilasi", isTarget: true, reason: "PENEMUAN JABIR: Menciptakan alat alembik dan teknik penyulingan/distilasi zat cair murni." },
          { word: "Mazhab Syafi'i", isTarget: false, reason: "Bukan kimia, Imam Asy-Syafi'i adalah ulama peletak dasar Ushul Fiqih." },
          { word: "Asam Sulfat & Nitrat", isTarget: true, reason: "KIMIA ANORGANIK: Berhasil mengisolasi asam mineral pekat yang menjadi fondasi industri kimia modern." },
          { word: "Astronomi Optik", isTarget: false, reason: "Optik modern dipelopori Ibnu Al-Haitsam (Alhazen)." },
          { word: "Zat Anti Karat", isTarget: true, reason: "METALURGI MAJU: Menciptakan formula pelapis anti air pada kain dan pelindung karat pada besi." },
          { word: "Kitab Al-Hawi", isTarget: false, reason: "Kitab Al-Hawi adalah ensiklopedia kedokteran karya Ar-Razi." }
        ],
        fullArabic: "مَنْ لَمْ يُجَرِّبْ لَمْ يَصِلْ إِلَى حَقِيقَةِ الْعِلْمِ وَالْبُرْهَانِ",
        targetLafadz: "Ilmu Kimia Eksperimental (علم الكيمياء التجريبي)",
        translation: "Jabir bin Hayyan (Geber) membongkar rahasia materi melalui ratusan riset laboratorium presisi di Kufah dan Baghdad. Ia menyusun tabel sifat zat kimia dan menjadi bapak kimia modern yang diakui dunia internasional.",
        audioPhonetic: "Jabir bin Hayyan: Peletak Dasar Ilmu Kimia Eksperimen dan Metalurgi Modern"
      },
      {
        id: "tokoh_ar_razi",
        title: "Ar-Razi (Rhazes)",
        subtitle: "Pelopor Bedah Pediatri • Al-Hawi fit-Tibb",
        hukumKey: "medis",
        hukumName: "Klinik Medis & Rumah Sakit Bimaristan",
        surah: 4,
        ayahs: [],
        surahName: "Rumah Sakit Al-Adudi Baghdad",
        ayahRange: "865 – 925 M",
        reciter: "Edukator Sejarah Islam",
        ketukan: 2,
        beatsText: "Spesialis Penyakit Cacar & Farmasi",
        ruleGuide: "Abu Bakar Muhammad bin Zakaria Ar-Razi menjabat sebagai kepala dokter Rumah Sakit Rayy dan Bimaristan Baghdad. Ia orang pertama di dunia yang berhasil membedakan penyakit cacar air (smallpox) dan campak (measles), serta menemukan benang bedah dari usus hewan (catgut) dan penggunaan alkohol untuk sterilisasi medis.",
        mouthGuide: "Metode Ilmiah: Memilih lokasi rumah sakit paling steril di Baghdad dengan menggantung potongan daging segar di penjuru kota dan memilih tempat di mana daging paling lambat membusuk.",
        mission: "Klik terobosan medis luar biasa yang dihasilkan oleh Ar-Razi!",
        verseTokens: [
          { word: "Pembeda Cacar & Campak", isTarget: true, reason: "TEROBOSAN AR-RAZI: Kitab Al-Jadari wal-Hasbah yang pertama memisahkan gejala klinis cacar dan campak secara ilmiah." },
          { word: "Penemu Angka Nol", isTarget: false, reason: "Angka nol ditemukan dan disebarluaskan oleh Al-Khawarizmi." },
          { word: "Benang Bedah Catgut", isTarget: true, reason: "INOVASI BEDAH: Menggunakan benang dari usus hewan untuk menjahit rongga perut pasien yang dapat terserap alami oleh tubuh." },
          { word: "Teori Geosentris", isTarget: false, reason: "Geosentris adalah teori astronomi kuno Yunani." },
          { word: "Kitab Al-Hawi", isTarget: true, reason: "ENSIKLOPEDIA AR-RAZI: Buku raksasa 23 jilid yang menghimpun seluruh diagnosa klinis dan catatan pasiennya." },
          { word: "Alf Lailah wa Lailah", isTarget: false, reason: "Cerita Seribu Satu Malam adalah karya sastra fiksi rakyat, bukan buku kedokteran." }
        ],
        fullArabic: "إِذَا كَانَتْ مُعَالَجَةُ الْمَرِيضِ بِالْأَغْذِيَةِ فَلَا تَعْدِلْ إِلَى الْأَدْوِيَةِ",
        targetLafadz: "Al-Hawi fit-Tibb (الحاوي في الطب)",
        translation: "Ar-Razi mempraktikkan kedokteran humanis di mana seluruh pasien miskin di Bimaristan Baghdad diobati gratis tanpa pungutan biaya. Ia menekankan pentingnya makanan bergizi dan kebersihan lingkungan sebelum memberi obat keras.",
        audioPhonetic: "Ar-Razi: Pelopor Diagnosis Penyakit Cacar, Benang Jahit Catgut, dan Rumah Sakit Modern"
      },
      {
        id: "tokoh_imam_hadits",
        title: "Imam Bukhari & Muslim",
        subtitle: "Penyusun Kutubus Sittah • Hadits Shahih",
        hukumKey: "hadits",
        hukumName: "Kodifikasi Hadits & Sanad",
        surah: 5,
        ayahs: [],
        surahName: "Puncak Kodifikasi Hadits Abbasiyah",
        ayahRange: "Abad ke-3 H / 810 – 875 M",
        reciter: "Edukator Sejarah Islam",
        ketukan: 2,
        beatsText: "Metodologi Kritik Sanad & Matan Tertinggi",
        ruleGuide: "Pada masa Dinasti Abbasiyah, ilmu hadits mencapai zaman keemasan melalui penyusunan Kutubus Sittah (Enam Kitab Induk Hadits). Imam Al-Bukhari meneliti 600.000 hadits dengan kriteria sanad bersambung dan perawi tsiqah (jujur, kuat ingatan, dan bertemu langsung), melahirkan Al-Jami' As-Shahih sebagai kitab paling otentik setelah Al-Qur'an.",
        mouthGuide: "Metode Ilmiah: Kritik sanad (keotentikan transmiter riwayat) dan kritik matan (keselarasan teks hadits dengan Al-Qur'an dan logika sehat).",
        mission: "Klik karya monumental ulama hadits di masa Dinasti Abbasiyah!",
        verseTokens: [
          { word: "Shahih Al-Bukhari", isTarget: true, reason: "KITAB TEROTENTIK: Karya Imam Bukhari yang menyaring ribuan hadits shahih murni dengan standar validasi tertinggi." },
          { word: "Al-Qanun fi at-Tibb", isTarget: false, reason: "Al-Qanun adalah buku kedokteran karya Ibnu Sina." },
          { word: "Shahih Muslim", isTarget: true, reason: "SISTEMATIKA UNGGUL: Karya Imam Muslim bin Hajjaj dengan penyusunan bab tematik dan pengelompokan jalur riwayat teratur." },
          { word: "Kitab Al-Jabr", isTarget: false, reason: "Kitab Al-Jabr adalah karya matematika Al-Khawarizmi." },
          { word: "Sunan Abu Dawud & Tirmidzi", isTarget: true, reason: "BAGIAN KUTUBUS SITTAH: Kitab hadits rujukan hukum fiqih yang disusun pada era keemasan Abbasiyah." },
          { word: "Bimaristan", isTarget: false, reason: "Bimaristan adalah nama fasilitas rumah sakit umum di Baghdad." }
        ],
        fullArabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        targetLafadz: "Al-Kutubus Sittah (الكتب الستة)",
        translation: "Para ulama hadits masa Abbasiyah menempuh ribuan kilometer perjalanan ilmiah (rihlah ilmiyyah) melintasi Bukhara, Baghdad, Makkah, dan Madinah untuk memverifikasi keaslian sabda Rasulullah SAW demi menjaga kemurnian syariat Islam.",
        audioPhonetic: "Imam Bukhari dan Muslim: Pelopor Kodifikasi Hadits Shahih dan Metodologi Kritik Sanad"
      }
    ],

    // Kategori 2: Pusat Peradaban & Khalifah Utama Dinasti Abbasiyah
    gharib: [
      {
        id: "peradaban_bayt_al_hikmah",
        title: "Bayt al-Hikmah (Baitul Hikmah)",
        surah: 10,
        ayahs: [],
        surahName: "Pusat Riset Terbesar Dunia di Baghdad",
        ayahRange: "Didirikan 800 M",
        reciter: "Edukator Sejarah Islam",
        type: "lembaga",
        hukumName: "Pusat Ilmu & Perpustakaan",
        ketukan: 2,
        beatsText: "The Grand Library of Baghdad",
        ruleGuide: "Bayt al-Hikmah (House of Wisdom) didirikan oleh Khalifah Harun Ar-Rasyid dan mencapai puncak kejayaan di masa Khalifah Al-Ma'mun. Lembaga ini berfungsi sebagai perpustakaan raksasa, balai penerjemahan karya-karya Yunani, Persia, Sanskerta, dan India, observatorium astronomi, serta akademi riset interdisipliner tempat berkumpulnya sarjana dari berbagai latar belakang suku dan agama.",
        mouthGuide: "Fakta Historis: Khalifah Al-Ma'mun menimbang naskah terjemahan berbahasa Arab dengan emas murni setimpal bobot fisiknya untuk menghargai keringat para ilmuwan.",
        mission: "Klik fakta sejarah yang mencirikan kehebatan lembaga Bayt al-Hikmah!",
        verseTokens: [
          { word: "Gerakan Penerjemahan Massal", isTarget: true, reason: "PERAN UTAMA: Menerjemahkan karya filosofis, sains, kedokteran, dan astronomi dari Yunani, Persia, dan India ke dalam bahasa Arab." },
          { word: "Ibu Kota Damaskus", isTarget: false, reason: "Damaskus adalah ibu kota Dinasti Umayyah, sedangkan Abbasiyah berpusat di Baghdad." },
          { word: "Imbalan Emas Seberat Buku", isTarget: true, reason: "APRESIASI LUAR BIASA: Kebijakan Khalifah Al-Ma'mun memberi upah emas murni seberat naskah buku yang diterjemahkan ilmuwan." },
          { word: "Perang Saudara", isTarget: false, reason: "Bayt al-Hikmah adalah pusat perdamaian intelektual dan riset kolaboratif." },
          { word: "Akademi Lintas Agama & Suku", isTarget: true, reason: "PLURALITAS ILMIAH: Merekrut cendekiawan Muslim, Kristen Nestorian, Yahudi, dan Persia untuk berkolaborasi memajukan sains." },
          { word: "Piramida Giza", isTarget: false, reason: "Piramida berada di Mesir kuno, tidak terkait dengan Bayt al-Hikmah di Baghdad." }
        ],
        fullArabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَىٰ كُلِّ مُسْلِمٍ وَالْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ",
        targetLafadz: "Bayt al-Hikmah (بيت الحكمة)",
        translation: "Bayt al-Hikmah di Baghdad adalah mercusuar pengetahuan dunia abad pertengahan. Di sinilah sains global diselamatkan dari kepunahan, diperluas, dan disempurnakan hingga menjadi pemicu era Renaisans di Eropa.",
        audioPhonetic: "Bayt al-Hikmah: Pusat Riset, Perpustakaan Agung, dan Gerakan Penerjemahan Dunia"
      },
      {
        id: "peradaban_kota_baghdad",
        title: "Kota Baghdad (Madinatussalam)",
        surah: 11,
        ayahs: [],
        surahName: "Kota Bundar Karya Abu Ja'far Al-Mansur",
        ayahRange: "Didirikan 762 M",
        reciter: "Edukator Sejarah Islam",
        type: "arsitektur",
        hukumName: "Tata Kota Bundar (Madinatussalam)",
        ketukan: 4,
        beatsText: "Kota Pusat Perdagangan & Diplomasi",
        ruleGuide: "Baghdad dibangun pada tahun 762 M oleh Khalifah kedua Dinasti Abbasiyah, Abu Ja'far Al-Mansur, dengan nama resmi Madinatussalam (Kota Perdamaian). Dirancang dengan denah bundar konsentris yang dikelilingi parit dan dinding bertingkat, berlokasi strategis di tepi Sungai Tigris (Dajlah) yang mempertemukan jalur perdagangan dunia antara Timur Jauh (Tiongkok/India) dan Barat (Mediterania).",
        mouthGuide: "Fakta Historis: Memiliki 4 gerbang utama mengarah ke Kufah, Basrah, Damaskus, dan Khurasan, dengan istana emas Qasr Az-Zahab di pusat lingkaran.",
        mission: "Klik karakteristik keistimewaan Kota Bundar Baghdad!",
        verseTokens: [
          { word: "Denah Bundar Konsentris", isTarget: true, reason: "ARSITEKTUR UNIK: Dirancang berbentuk lingkaran sempurna dengan 3 lapis benteng pertahanan dan gerbang megah." },
          { word: "Didirikan Muawiyah", isTarget: false, reason: "Muawiyah bin Abi Sufyan adalah pendiri Dinasti Umayyah di Damaskus." },
          { word: "Tepi Sungai Tigris (Dajlah)", isTarget: true, reason: "LOKASI STRATEGIS: Memberikan pasokan air melimpah, jalur pelayaran kapal dagang, dan kesuburan pertanian." },
          { word: "Ibu Kota Cordoba", isTarget: false, reason: "Cordoba adalah pusat pemerintahan Dinasti Umayyah di Spanyol (Andalusia)." },
          { word: "Poros Jalur Sutra Dunia", isTarget: true, reason: "PERDAGANGAN GLOBAL: Menjadi pasar internasional bagi rempah-rempah Asia, sutra Tiongkok, gading Afrika, dan kaca Eropa." },
          { word: "Menara Pisa", isTarget: false, reason: "Menara Pisa berada di Italia, bukan di Baghdad." }
        ],
        fullArabic: "مَدِينَةُ السَّلَامِ بَغْدَادُ حَاضِرَةُ الدُّنْيَا وَقِبْلَةُ الْعُلَمَاءِ",
        targetLafadz: "Madinatussalam (مدينة السلام - بغداد)",
        translation: "Baghdad tumbuh pesat menjadi kota metropolis terbesar di dunia pada abad ke-9 dengan penduduk melampaui 1 juta jiwa, ribuan pemandian umum, saluran sanitasi modern, dan perpustakaan di setiap distrik.",
        audioPhonetic: "Kota Bundar Baghdad: Madinatussalam, Mahakarya Arsitektur dan Metropolis Dunia"
      },
      {
        id: "peradaban_harun_ar_rasyid",
        title: "Khalifah Harun Ar-Rasyid",
        surah: 12,
        ayahs: [],
        surahName: "Puncak Kemakmuran Abbasiyah (786–809 M)",
        ayahRange: "786 – 809 M (Khalifah ke-5)",
        reciter: "Edukator Sejarah Islam",
        type: "khalifah",
        hukumName: "Era Keemasan Kesejahteraan",
        ketukan: 2,
        beatsText: "Pemberantasan Kemiskinan & Diplomasi",
        ruleGuide: "Khalifah Harun Ar-Rasyid memimpin masa kejayaan keemasan di mana perekonomian sangat makmur, kas Baitul Mal melimpah ruah, dan rakyat hidup sejahtera hingga sulit mencari orang yang berhak menerima zakat di Baghdad. Ia mendirikan rumah sakit modern Bimaristan Al-Adudi, menjaga keadilan hukum bersama Qadhi Abu Yusuf, dan menjalin hubungan diplomatik setara dengan Kaisar Charlemagne dari Prancis.",
        mouthGuide: "Fakta Historis: Harun Ar-Rasyid mengirim hadiah teknologi jam air hidrolik mekanik kuningan kepada Kaisar Charlemagne yang membuat bangsa Eropa terpukau.",
        mission: "Klik kebijakan luar biasa di masa kekhalifahan Harun Ar-Rasyid!",
        verseTokens: [
          { word: "Bimaristan Rumah Sakit Gratis", isTarget: true, reason: "PELAYANAN SOSIAL: Membangun rumah sakit modern dengan dokter bergaji negara dan obat gratis bagi semua warga." },
          { word: "Menyerang Ka'bah", isTarget: false, reason: "Tuduhan salah, Harun Ar-Rasyid rajin berhaji dan bersedekah ke penduduk Haramain." },
          { word: "Hadiah Jam Air Charlemagne", isTarget: true, reason: "DIPLOMASI DUNIA: Mengirim jam hidrolik canggih kepada Raja Franka membuktikan tingginya teknologi rekayasa Islam." },
          { word: "Menghapus Pajak Petani", isTarget: false, reason: "Bukan menghapus, melainkan menata ulang sistem kharaj secara berkeadilan melalui Kitab Al-Kharaj karya Abu Yusuf." },
          { word: "Kemakmuran Kas Baitul Mal", isTarget: true, reason: "EKONOMI KUAT: Surplus anggaran negara dialokasikan untuk jaminan sosial fakir miskin, anak yatim, dan beasiswa ilmuwan." },
          { word: "Perang Salib Pertama", isTarget: false, reason: "Perang Salib baru terjadi 300 tahun kemudian pada abad ke-11 M." }
        ],
        fullArabic: "أَمْطِرِي حَيْثُ شِئْتِ فَإِنَّ خَرَاجَكِ سَيَأْتِينِي بِإِذْنِ اللَّهِ",
        targetLafadz: "Harun Ar-Rasyid (هارون الرشيد)",
        translation: "Khalifah Harun Ar-Rasyid dikenal sebagai pemimpin yang adil, taat beribadah, dan dermawan. Kisah keadilannya dan keindahan peradaban Baghdad di eranya menginspirasi mahakarya sastra dunia 'Seribu Satu Malam' (One Thousand and One Nights).",
        audioPhonetic: "Khalifah Harun Ar-Rasyid: Puncak Kemakmuran, Diplomasi Global, dan Rumah Sakit Bimaristan"
      },
      {
        id: "peradaban_khalifah_al_mamun",
        title: "Khalifah Al-Ma'mun",
        surah: 13,
        ayahs: [],
        surahName: "Revolusi Riset & Observatorium (813–833 M)",
        ayahRange: "813 – 833 M (Khalifah ke-7)",
        reciter: "Edukator Sejarah Islam",
        type: "khalifah",
        hukumName: "Puncak Intelektualisme Islam",
        ketukan: 2,
        beatsText: "Pemberdayaan Ilmuwan & Observatorium",
        ruleGuide: "Khalifah Abdullah Al-Ma'mun adalah khalifah yang sangat mencintai ilmu pengetahuan, filsafat, dan perdebatan akademis (Munazharah). Ia mengembangkan Bayt al-Hikmah secara besar-besaran, mendanai pembangunan Observatorium Astronomi Syammasiyyah di Baghdad, dan membiayai para astronom untuk mengukur keliling bumi secara ilmiah.",
        mouthGuide: "Fakta Historis: Al-Ma'mun mengundang ilmuwan lintas agama dan menggelar diskusi teologi serta filsafat secara terbuka di istananya setiap pekan.",
        mission: "Klik kontribusi penting Khalifah Al-Ma'mun dalam bidang sains!",
        verseTokens: [
          { word: "Pengukuran Keliling Bumi", isTarget: true, reason: "ASTRONOMI AKURAT: Memerintahkan tim ilmuwan mengukur derajat busur meridian bumi di gurun Sinjar dengan hasil sangat mendekati angka modern." },
          { word: "Runtuhnya Abbasiyah", isTarget: false, reason: "Abbasiyah runtuh pada tahun 1258 M oleh Mongol, bukan pada era Al-Ma'mun." },
          { word: "Observatorium Syammasiyyah", isTarget: true, reason: "STASIUN ASTRONOMI: Membangun fasilitas pengamatan pergerakan matahari, bulan, dan rasi bintang paling canggih di zamannya." },
          { word: "Menolak Filsafat", isTarget: false, reason: "Sebaliknya, Al-Ma'mun sangat mengagumi filsafat dan mensponsori penerjemahan dialog Aristoteles dan Plato." },
          { word: "Debat Ilmiah Terbuka (Munazharah)", isTarget: true, reason: "KEBEBASAN AKADEMIK: Membudayakan forum diskusi ilmiah dan filsafat terbuka di balai istana kekhalifahan." },
          { word: "Membangun Taj Mahal", isTarget: false, reason: "Taj Mahal dibangun oleh Dinasti Mughal di India pada abad ke-17 M." }
        ],
        fullArabic: "لَا سَبِيلَ إِلَى مَعْرِفَةِ الْحَقِّ إِلَّا بِالْعَقْلِ الصَّرِيحِ وَالنَّقْلِ الصَّحِيحِ",
        targetLafadz: "Al-Ma'mun bin Harun Ar-Rasyid (المأمون)",
        translation: "Khalifah Al-Ma'mun menjadikan Baghdad sebagai ibu kota sains dunia. Gerakan penerjemahan massal yang dipimpinnya menyelamatkan khazanah ilmu dunia kuno dan melahirkan fondasi revolusi ilmiah modern.",
        audioPhonetic: "Khalifah Al-Ma'mun: Bapak Kebangkitan Intelektual, Observatorium, dan Gerakan Penerjemahan"
      }
    ]
  },

  // 3. Data Arena Sejarah: Speed Matching & Puzzle Kronologi
  tahfidz: {
    matchingSets: [
      {
        id: "set_ilmuwan",
        name: "Tokoh Ilmuwan & Penemuan Monumental",
        surah: 1,
        ayahs: [],
        reciter: "Edukator Sejarah Islam",
        pairs: [
          { id: 1, ar: "Ibnu Sina (Avicenna)", id_txt: "Al-Qanun fi at-Tibb & Bapak Kedokteran" },
          { id: 2, ar: "Al-Khawarizmi", id_txt: "Penemu Aljabar & Konsep Angka Nol" },
          { id: 3, ar: "Jabir bin Hayyan", id_txt: "Bapak Kimia Modern & Metode Lab" },
          { id: 4, ar: "Ar-Razi (Rhazes)", id_txt: "Pembeda Cacar-Campak & Benang Bedah" },
          { id: 5, ar: "Al-Kindi", id_txt: "Filosof Muslim Pertama & Kriptografi" },
          { id: 6, ar: "Imam Al-Bukhari", id_txt: "Penyusun Kitab Shahih Hadits Terotentik" }
        ]
      },
      {
        id: "set_peradaban",
        name: "Lembaga & Fasilitas Peradaban Abbasiyah",
        pairs: [
          { id: 7, ar: "Bayt al-Hikmah", id_txt: "Perpustakaan & Lembaga Riset Baghdad" },
          { id: 8, ar: "Madinatussalam", id_txt: "Sebutan Kota Bundar Baghdad (Kota Damai)" },
          { id: 9, ar: "Bimaristan", id_txt: "Rumah Sakit Umum & Fasilitas Medis Gratis" },
          { id: 10, ar: "Baitul Mal", id_txt: "Lembaga Kas & Keuangan Negara" },
          { id: 11, ar: "Diwanul Jund", id_txt: "Departemen Administrasi Militer & Pertahanan" },
          { id: 12, ar: "Al-Wazir", id_txt: "Perdana Menteri Pembantu Khalifah" }
        ]
      },
      {
        id: "set_khalifah",
        name: "Khalifah & Peristiwa Kunci Abbasiyah",
        pairs: [
          { id: 13, ar: "Abu Abbas As-Saffah", id_txt: "Khalifah Pertama Pendiri Dinasti (750 M)" },
          { id: 14, ar: "Abu Ja'far Al-Mansur", id_txt: "Pembangun Kota Bundar Baghdad (762 M)" },
          { id: 15, ar: "Harun Ar-Rasyid", id_txt: "Puncak Kemakmuran & Kirim Jam ke Prancis" },
          { id: 16, ar: "Al-Ma'mun", id_txt: "Pelopor Gerakan Terjemah Emas Bayt al-Hikmah" },
          { id: 17, ar: "Pertempuran Zab (750 M)", id_txt: "Runtuhnya Dinasti Umayyah di Damaskus" },
          { id: 18, ar: "Hulagu Khan (1258 M)", id_txt: "Invasi Pasukan Mongol Penghancur Baghdad" }
        ]
      }
    ],

    puzzles: [
      {
        id: "puz_1",
        title: "Tantangan 1: Urutan 4 Khalifah Era Keemasan Abbasiyah",
        translation: "Susunlah urutan 4 khalifah paling berpengaruh pada fase pendirian hingga puncak keemasan Dinasti Abbasiyah!",
        correctSequence: [
          "1. Abu Abbas As-Saffah (Pendiri)",
          "2. Abu Ja'far Al-Mansur (Baghdad)",
          "3. Harun Ar-Rasyid (Kemakmuran)",
          "4. Al-Ma'mun (Sains & Terjemah)"
        ],
        wordsScrambled: [
          "3. Harun Ar-Rasyid (Kemakmuran)",
          "1. Abu Abbas As-Saffah (Pendiri)",
          "4. Al-Ma'mun (Sains & Terjemah)",
          "2. Abu Ja'far Al-Mansur (Baghdad)"
        ],
        hukumNotes: "Urutan kronologis ini membentang dari tahun 750 M hingga 833 M yang menjadi fondasi abad kejayaan Islam (The Golden Age).",
        audioPhonetic: "Abu Abbas As-Saffah, Abu Ja'far Al-Mansur, Harun Ar-Rasyid, Abdullah Al-Ma'mun"
      },
      {
        id: "puz_2",
        title: "Tantangan 2: Semboyan Khalifah Al-Ma'mun di Bayt al-Hikmah",
        translation: "Susunlah potongan kata tentang penghargaan emas Khalifah Al-Ma'mun kepada penerjemah buku sains!",
        correctSequence: [
          "مَنْ تَرْجَمَ كِتَابًا",
          "أَعْطَيْنَاهُ وَزْنَهُ",
          "ذَهَبًا خَالِصًا",
          "تَقْدِيرًا لِلْعِلْمِ"
        ],
        wordsScrambled: [
          "ذَهَبًا خَالِصًا",
          "مَنْ تَرْجَمَ كِتَابًا",
          "تَقْدِيرًا لِلْعِلْمِ",
          "أَعْطَيْنَاهُ وَزْنَهُ"
        ],
        hukumNotes: "Artinya: 'Barangsiapa menerjemahkan satu buku ke bahasa Arab, Kami timbang buku itu dan memberinya emas murni seberat buku tersebut sebagai penghormatan ilmu'.",
        audioPhonetic: "Man tarjama kitaaban a'thainaahu waznahu dzahaban khaalishan taqdiiran lil-'ilmi"
      },
      {
        id: "puz_3",
        title: "Tantangan 3: Gelar Kehormatan Dunia untuk Ibnu Sina",
        translation: "Susunlah 4 gelar monumental yang disematkan kepada Ibnu Sina dalam khazanah ilmiah dunia!",
        correctSequence: [
          "Bapak Kedokteran Modern",
          "Asy-Syaikh ar-Ra'is",
          "Pangeran Para Dokter",
          "Penulis Al-Qanun fi at-Tibb"
        ],
        wordsScrambled: [
          "Pangeran Para Dokter",
          "Penulis Al-Qanun fi at-Tibb",
          "Bapak Kedokteran Modern",
          "Asy-Syaikh ar-Ra'is"
        ],
        hukumNotes: "Ibnu Sina diakui sebagai jembatan ilmu pengetahuan kedokteran dunia Timur dan Barat yang tak tertandingi pada zamannya.",
        audioPhonetic: "Bapak Kedokteran Modern, Asy-Syaikh ar-Ra'is, Pangeran Para Dokter, Penulis Al-Qanun fi at-Tibb"
      }
    ],

    classmates: [
      { name: "Ahmad Fathoni", grade: "VIII-A", score: 420, avatar: "👨‍🎓", badge: "Pustakawan Baitul Hikmah" },
      { name: "Siti Fatimah Azzahra", grade: "VIII-B", score: 395, avatar: "🧕", badge: "Sejarawan Muda" },
      { name: "Raihan Al-Ghifari", grade: "VIII-A", score: 370, avatar: "👦", badge: "Ahli Manuskrip" },
      { name: "Nabila Zahra", grade: "VIII-C", score: 340, avatar: "👩‍🎓", badge: "Duta Kebudayaan Islam" },
      { name: "Zaidan Al-Ayyubi", grade: "VIII-B", score: 310, avatar: "🧑", badge: "Peneliti Baghdad" },
      { name: "Aisyah Humaira", grade: "VIII-A", score: 280, avatar: "🧕", badge: "Kolektor Naskah" },
      { name: "M. Farhan", grade: "VIII-C", score: 250, avatar: "👦", badge: "Santri Cendekia" },
      { name: "Khadijah Putri", grade: "VIII-B", score: 220, avatar: "👧", badge: "Pengagum Ibnu Sina" }
    ]
  },

  // 4. Data Simulator Kontekstual AI: Dilema Kepemimpinan & Kebijakan Abbasiyah (HOTS)
  scenarios: [
    {
      id: "scen_1",
      title: "Skenario 1: Anggaran Riset Bayt al-Hikmah vs Ambisi Militer",
      dalilRef: "Kebijakan Anggaran Khalifah Al-Ma'mun (Tahun 820 M)",
      surah: 1,
      ayahs: [],
      surahName: "Baitul Mal & Alokasi Riset Negara",
      reciter: "Edukator Sejarah Islam",
      arabicDalil: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
      background: "Pada era Khalifah Al-Ma'mun, kas negara (Baitul Mal) mengalami surplus besar dari pajak perdagangan internasional. Para jenderal militer mendesak agar seluruh dana dialokasikan untuk melipatgandakan jumlah prajurit dan membeli persenjataan perang demi memperluas wilayah kekuasaan. Di saat yang sama, dewan ilmuwan Bayt al-Hikmah mengajukan proposal biaya ekspedisi besar ke Konstantinopel dan Alexandria untuk memborong dan menerjemahkan ribuan naskah kuno sains dan kedokteran demi masa depan peradaban umat.",
      question: "Sebagai penasihat utama Khalifah Al-Ma'mun yang memahami tujuan peradaban Islam dan nilai KMA 183, saran kebijakan strategis apa yang akan kamu berikan?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Keliru / Militeristik Sempit)",
          text: "Menyetujui 100% permintaan jenderal militer karena kekuasaan dinasti hanya bisa dijaga dengan kekuatan pedang, sedangkan buku dan riset sains tidak mendatangkan kemenangan teritorial langsung."
        },
        {
          key: "B",
          title: "Pilihan B (Solusi HOTS & Visi Peradaban Unggul - Ideal)",
          text: "Menetapkan kebijakan anggaran seimbang dan bervisi jangka panjang: memprioritaskan pembiayaan riset, beasiswa ilmuwan, dan ekspedisi naskah Bayt al-Hikmah sebagai fondasi hegemoni intelektual dunia, sembari mengalokasikan anggaran pertahanan secara proporsional dan profesional demi menjaga stabilitas keamanan dari ancaman luar."
        },
        {
          key: "C",
          title: "Pilihan C (Pasif / Tanpa Visi)",
          text: "Menyimpan seluruh surplus kas Baitul Mal di brankas istana tanpa dibelanjakan untuk riset maupun militer agar negara tidak mengalami defisit di masa depan."
        }
      ],
      idealAnswer: "Pilihan B adalah keputusan kepemimpinan yang paling mencerminkan ruh kejayaan Islam Abbasiyah. Sejarah membuktikan bahwa sebuah imperium tidak akan bertahan lama jika hanya mengandalkan kekuatan militer tanpa fondasi sains dan peradaban. Dengan mendanai Bayt al-Hikmah, Khalifah Al-Ma'mun berhasil mengubah Baghdad menjadi episentrum intelektual dunia yang melahirkan teknologi kedokteran, matematika, dan navigasi. Pertahanan militer tetap diperlukan secara proporsional untuk menjamin stabilitas, namun investasi pada pendidikan dan riset adalah kunci kejayaan peradaban yang manfaatnya dirasakan oleh seluruh umat manusia hingga berabad-abad kemudian.",
      keywords: ["al-ma'mun", "baitul hikmah", "riset", "sains", "militer", "seimbang", "jangka panjang", "intelektual", "baitul mal", "peradaban", "kma 183", "investasi", "pendidikan", "baghdad", "keamanan"]
    },
    {
      id: "scen_2",
      title: "Skenario 2: Merekrut Ilmuwan Non-Muslim & Toleransi Ilmiah",
      dalilRef: "Keteladanan Pengangkatan Hunayn bin Ishaq di Bayt al-Hikmah",
      surah: 2,
      ayahs: [],
      surahName: "Universalitas Ilmu & Piagam Toleransi Abbasiyah",
      reciter: "Edukator Sejarah Islam",
      arabicDalil: "الْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ فَحَيْثُ وَجَدَهَا فَهُوَ أَحَقُّ بِهَا",
      background: "Khalifah Al-Ma'mun menunjuk Hunayn bin Ishaq (seorang dokter dan ilmuwan beragama Kristen Nestorian yang fasih bahasa Yunani, Suryani, dan Arab) untuk memimpin dewan penerjemahan naskah kedokteran Galen dan Hippocrates di Bayt al-Hikmah dengan upah emas setara berat buku. Sebagian kelompok konservatif di istana melayangkan protes keras dan menuduh bahwa mempekerjakan sarjana non-Muslim serta mempelajari naskah filsafat Yunani dapat merusak akidah masyarakat Islam.",
      question: "Bagaimana seharusnya Khalifah merespons protes tersebut dengan berpijak pada universalitas sains dalam Islam dan toleransi peradaban?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Menyerah pada Sentimen Sektarian)",
          text: "Membatalkan pengangkatan Hunayn bin Ishaq dan melarang penerjemahan naskah asing untuk menghindari perdebatan politik di lingkungan istana."
        },
        {
          key: "B",
          title: "Pilihan B (Toleransi Ilmiah HOTS & Universalitas Hikmah - Ideal)",
          text: "Menegaskan prinsip bahwa ilmu pengetahuan kedokteran dan sains bersifat universal (Hikmah yang menjadi hak setiap pencari kebenaran). Merangkul ilmuwan kompeten tanpa memandang latar belakang agama demi kemaslahatan umum (rahmatan lil 'alamin), seraya melibatkan ulama Muslim untuk mengkaji dan menyelaraskan nilai filosofis tersebut dengan tauhid."
        },
        {
          key: "C",
          title: "Pilihan C (Otoriter Tanpa Edukasi)",
          text: "Memenjarakan semua pihak yang mengajukan protes tanpa memberikan penjelasan argumen agama maupun manfaat sains yang sedang dikembangkan."
        }
      ],
      idealAnswer: "Pilihan B adalah manifestasi etos keterbukaan intelektual Islam masa Abbasiyah. Rasulullah SAW bersabda bahwa hikmah (kebijaksanaan/ilmu) adalah barang milik orang beriman yang hilang; di mana pun ia menemukannya, ia berhak mengambilnya (HR. Tirmidzi). Menunjuk Hunayn bin Ishaq membuktikan bahwa Dinasti Abbasiyah menerapkan prinsip meritokrasi dan profesionalisme: menilai seseorang berdasarkan integritas keilmuan, bukan fanatisme sektarian. Keterbukaan ini justru memperkaya peradaban Islam tanpa mengorbankan akidah, karena para sarjana Muslim menyaring dan mengislamisasikan ilmu tersebut menjadi karya orisinal yang beradab.",
      keywords: ["hunayn bin ishaq", "non-muslim", "toleransi", "universal", "hikmah", "meritokrasi", "tirmidzi", "profesional", "keterbukaan", "akidah", "rahmatan lil alamin", "kemaslahatan", "sains", "baghdad", "intelektual"]
    },
    {
      id: "scen_3",
      title: "Skenario 3: Menghidupkan Spirit Bayt al-Hikmah bagi Generasi Muda",
      dalilRef: "Relevansi Sejarah Abbasiyah untuk Abad ke-21 (KMA 183)",
      surah: 3,
      ayahs: [],
      surahName: "Transformasi Digital Pelajar Madrasah",
      reciter: "Edukator Sejarah Islam",
      arabicDalil: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
      background: "Di era digital saat ini, banyak remaja madrasah menghabiskan waktu berjam-jam untuk bermain game online, mengonsumsi konten media sosial tanpa saringan, dan memiliki minat baca yang sangat rendah. Akibatnya, generasi muda muslim rentan terpapar hoaks dan tertinggal dalam penguasaan sains, teknologi, rekayasa, serta riset modern.",
      question: "Berdasarkan keteladanan para pemuda dan cendekiawan pada masa kejayaan Dinasti Abbasiyah, langkah konkret apa yang harus dilakukan siswa madrasah hari ini?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Nostalgia Pasif)",
          text: "Cukup berbangga dengan kejayaan masa lalu Dinasti Abbasiyah dan Ibnu Sina dalam pidato lomba, tanpa perlu bersusah payah belajar sains atau teknologi modern."
        },
        {
          key: "B",
          title: "Pilihan B (Transformasi Riset & Literasi Unggul - Ideal)",
          text: "Menghidupkan kembali 'Spirit Bayt al-Hikmah' di lingkungan madrasah: memanfaatkan teknologi dan internet untuk riset ilmiah, membiasakan budaya membaca kritis (Iqra'), menguasai bahasa asing untuk menyerap teknologi global, serta berani menciptakan karya inovatif yang bermanfaat bagi masyarakat luas."
        },
        {
          key: "C",
          title: "Pilihan C (Menolak Teknologi Modern)",
          text: "Menjauhi sama sekali komputer dan smartphone karena menganggap teknologi modern buatan luar negeri sebagai bahaya bagi keagamaan."
        }
      ],
      idealAnswer: "Pilihan B merupakan pengamalan nyata dari spirit KMA No. 183 Tahun 2019. Mempelajari sejarah kejayaan Dinasti Abbasiyah bukan sekadar mengenang romantisme masa lampau, melainkan mengambil ibrah (pelajaran hidup) untuk direplikasi di masa kini. Kejayaan peradaban Islam di era Harun Ar-Rasyid dan Al-Ma'mun lahir dari budaya literasi yang sangat kuat, penguasaan bahasa internasional, rasa haus akan riset ilmiah, serta etos kerja keras memadukan iman dan ilmu (QS. Al-Mujadilah: 11). Remaja madrasah abad ke-21 harus bertransformasi dari sekadar konsumen teknologi pasif menjadi produsen ilmu pengetahuan dan kreator peradaban baru.",
      keywords: ["spirit", "bayt al-hikmah", "literasi", "iqra", "teknologi", "riset", "bahasa asing", "inovasi", "kma 183", "ibrah", "al-mujadilah", "kritis", "produsen", "madrasah", "kejayaan"]
    }
  ],

  // 5. Daftar Fokus Materi & Peristiwa Kunci Dinasti Abbasiyah (Beranda)
  surahList: [
    {
      id: "surah_fatihah",
      num: 1,
      title: "1. Berdirinya Dinasti Abbasiyah (750 M)",
      arabic: "تأسيس الدولة العباسية",
      subtitle: "Runtuhnya Umayyah • Abu Abbas As-Saffah & Abu Ja'far Al-Mansur",
      surah: 1,
      ayahs: [],
      reciter: "Edukator Sejarah Islam",
      targetTab: "tajwid"
    },
    {
      id: "surah_baqarah",
      num: 2,
      title: "2. Kemakmuran Khalifah Harun Ar-Rasyid",
      arabic: "هارون الرشيد",
      subtitle: "Puncak Ekonomi Baitul Mal • Bimaristan • Diplomasi Charlemagne",
      surah: 2,
      ayahs: [],
      reciter: "Edukator Sejarah Islam",
      targetTab: "tajwid"
    },
    {
      id: "surah_fajr",
      num: 3,
      title: "3. Bayt al-Hikmah & Khalifah Al-Ma'mun",
      arabic: "بيت الحكمة والمأمون",
      subtitle: "Gerakan Penerjemahan Emas • Observatorium • Revolusi Naskah",
      surah: 3,
      ayahs: [],
      reciter: "Edukator Sejarah Islam",
      targetTab: "tajwid"
    },
    {
      id: "surah_naba",
      num: 4,
      title: "4. Mahakarya Cendekiawan Muslim",
      arabic: "علماء الحضارة الإسلامية",
      subtitle: "Ibnu Sina (Kedokteran) • Al-Khawarizmi (Aljabar) • Bukhari & Muslim",
      surah: 4,
      ayahs: [],
      reciter: "Edukator Sejarah Islam",
      targetTab: "tahfidz"
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.APP_DATA = APP_DATA;
}
