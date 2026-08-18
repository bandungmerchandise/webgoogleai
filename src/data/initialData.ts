import { CategoryConfig, PortfolioItem, FaqItem, ClientLogoItem, ProductItem } from '../types';

export const BDGMERCH_CATEGORIES: CategoryConfig[] = [
  {
    id: 'apparel',
    name: 'Apparel & Seragam',
    shortTitle: 'Kaos, Hoodie & Polo',
    tag: 'KONVEKSI BANDUNG',
    description: 'Bahan Cotton Combed 24s/30s asli distro, Fleece tebal 330 gsm, & Lacoste CVC dengan sablon Plastisol tahan cuci 100x.',
    specs: [
      'Pola Reguler, Oversize & Boxy Cut Distro',
      'Sablon DTF HD / Plastisol Karet / Bordir Komputer',
      'Free Custom Hangtag, Label Leher & Plastik Klip'
    ],
    iconName: 'Shirt',
    sampleMoq: 'Min. 24 Pcs',
    popularItems: 'Kaos Combed • Hoodie Fleece • Polo Lacoste',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'rubber',
    name: 'Rubber Merchandise',
    shortTitle: 'Gelang Karet & Keychain 3D',
    tag: 'SPESIALIS BANDUNG',
    description: 'Pabrikasi langsung gelang karet tanpa sambungan, gantungan kunci 3D timbul, & label karet seragam.',
    specs: [
      'Pilihan Model: Deboss Isi Warna, Emboss Timbul, Motif Kotak',
      'Fitur Tambahan: Glow In The Dark & Double Layer',
      'Ukuran Lengkap: Dewasa (202mm), Remaja (190mm), Anak (160mm)'
    ],
    iconName: 'CircleDot',
    sampleMoq: 'Min. 100 Pcs',
    popularItems: 'Gelang Deboss Sambung • Gelang Glow in Dark • Keychain Karet 3D',
    images: [
      'https://images.unsplash.com/photo-1611591475152-473559db2d4f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'accessories',
    name: 'Aksesoris & Badge',
    shortTitle: 'Pin Enamel & Lanyard HD',
    tag: 'CORING LOGAM & DIGITAL',
    description: 'Pin enamel lapis emas/perak, medali cor, & tali lanyard tisu cetak sublimasi full color HD.',
    specs: [
      'Material: Kuningan Asli & Zinc Alloy Logam Cor',
      'Finishing Plating Gold 24k, Silver Chrome & Antique Bronze',
      'Lanyard Tisu Halus Sublimasi 2 Sisi + Stopper Klip'
    ],
    iconName: 'Award',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Pin Enamel Kuningan • Medali Cor Logam • Lanyard Tisu Sublim',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'bags',
    name: 'Tas & Pouch',
    shortTitle: 'Tactical, Totebag & Pouch',
    tag: 'KONVEKSI TAS PROMOSI',
    description: 'Tas ransel militer cordura waterproof, totebag canvas marsoto tebal, & pouch kosmetik elegan.',
    specs: [
      'Bahan Kanvas Marsoto, Cordura 1000D, Twill & Blacu Super',
      'Jahitan Double Stitching Kuat Menahan Beban Hingga 15 Kg',
      'Resleting Original YKK & Aksesoris Acetal Awet'
    ],
    iconName: 'ShoppingBag',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Tactical Backpack Cordura • Totebag Canvas • Pouch Kosmetik',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'headwear',
    name: 'Topi & Headwear',
    shortTitle: 'Snapback, Trucker & Bucket',
    tag: 'CUSTOM TOPI BANDUNG',
    description: 'Topi snapback bordir 3D timbul, bucket hat bolak-balik, & topi trucker distro jahitan presisi.',
    specs: [
      'Bahan Rafel Denim 7s, Twill Sueding, Kanvas & Drill Premium',
      'Bordir Timbul 3D Busa Padat & Jahitan Rapi Bersih',
      'Pengatur Belakang: Gesper Besi Cakop, Strap Kulit, & Snap Plastik'
    ],
    iconName: 'Box',
    sampleMoq: 'Min. 36 Pcs',
    popularItems: 'Snapback Bordir 3D • Topi Trucker Distro • Bucket Hat 2 Sisi',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'packaging',
    name: 'Packaging & Souvenir Set',
    shortTitle: 'Hardbox VIP & Seminar Kit',
    tag: 'PREMIUM B2B HAMPERS',
    description: 'Hardbox eksklusif penutup magnet, finishing poly foil emas/silver, & paket bundling seminar kit.',
    specs: [
      'Karton Greyboard No. 30/40 Kuat & Presisi Dilapis Art Paper Doff',
      'Finishing Mewah: Hot Print Emas/Perak & Emboss / Deboss Timbul',
      'Busa Inlay EVA Sponge Dipotong Presisi Mengikuti Bentuk Produk'
    ],
    iconName: 'Package',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Hardbox Magnetik Foil • Goodie Bag Spunbond • Paket Seminar Kit',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Gelang Karet Custom Glow in the Dark',
    category: 'Rubber Wristband',
    client_name: 'Komunitas Otomotif Bandung',
    caption: 'Gelang karet PVC deboss timbul warna fosfor glow in the dark untuk event touring malam.',
    image_url: 'https://images.unsplash.com/photo-1611591475152-473559db2d4f?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 1
  },
  {
    id: 'port-2',
    title: 'Kaos Cotton Combed 24s DTF HD',
    category: 'Apparel & Seragam',
    client_name: 'Festival Musik 2026',
    caption: 'Kaos merchandise official festival musik bahan 100% cotton combed asli distro Bandung.',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 2
  },
  {
    id: 'port-3',
    title: 'Enamel Pin Logam Cor Kuningan Emas',
    category: 'Pin & Aksesoris',
    client_name: 'BUMN Corporate VIP Badge',
    caption: 'Pin kuningan lapis emas finishing hard enamel presisi tinggi dengan kancing kupu-kupu kuat.',
    image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 3
  },
  {
    id: 'port-4',
    title: 'Tactical Backpack Cordura 1000D',
    category: 'Tas & Pouch',
    client_name: 'Mining & Outdoor Event',
    caption: 'Tas ransel lapangan water resistant dengan sistem webbing MOLLE dan panel custom rubber patch.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 4
  },
  {
    id: 'port-5',
    title: 'Gantungan Kunci Karet 3D Die-Cut Relief',
    category: 'Rubber Keychain',
    client_name: 'Official Merchandise Brand',
    caption: 'Keychain karet 3 dimensi bertingkat dengan moulding CNC presisi tinggi dan ring gantungan putar anti karat.',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 5
  },
  {
    id: 'port-6',
    title: 'Tali Lanyard Printing Tisu Full HD + ID Case',
    category: 'Event Lanyard',
    client_name: 'National Tech Summit 2026',
    caption: 'Tali lanyard bahan tisu super lembut sablon sublimasi 2 sisi tidak luntur + stopper klip safety.',
    image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 6
  },
  {
    id: 'port-7',
    title: 'Snapback Bordir 3D Timbul Komputer',
    category: 'Topi & Headwear',
    client_name: 'Extreme Sports Community',
    caption: 'Topi rafel denim tebal dengan bordir 3D timbul padat serta jahitan dalam berlisensi rapi.',
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 7
  },
  {
    id: 'port-8',
    title: 'Luxury Hardbox Magnet & Seminar Gift Set',
    category: 'Packaging & Souvenir',
    client_name: 'Corporate Onboarding Kit',
    caption: 'Hardbox kado custom finishing gold foil emboss dengan busa eva presisi untuk welcoming merchandise.',
    image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    post_url: 'https://www.instagram.com/bdgmerch.id',
    display_order: 8
  }
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: "Berapa Minimum Order Quantity (MOQ) di BDGMERCH?",
    answer: "Untuk produk Kaos/Apparel (T-Shirt, Polo, Hoodie), MOQ kami adalah 24 pcs per desain. Untuk produk Rubber/Karet (Gelang Karet, Keychain, Label Karet), MOQ adalah 100 pcs. Untuk Pin Enamel Cor Logam, MOQ mulai dari 50 pcs.",
    display_order: 1
  },
  {
    id: 'faq-2',
    question: "Berapa lama proses pengerjaan produksi?",
    answer: "Rata-rata waktu pengerjaan Kaos & Apparel berkisar antara 5-7 hari kerja. Produk Rubber Karet membutuhkan waktu 5-7 hari kerja. Pin Enamel Cor membutuhkan waktu 8-12 hari kerja. Kami juga menyediakan layanan Express (3-4 hari) untuk kebutuhan mendesak / deadline event.",
    display_order: 2
  },
  {
    id: 'faq-3',
    question: "Apakah bisa membuat sampel (proofing) terlebih dahulu?",
    answer: "Tentu! Untuk pesanan di atas 100 pcs, kami dapat membuatkan sample fisik (approval sample) terlebih dahulu sebelum melanjutkan produksi massal agar Anda yakin 100% dengan warna, kain, dan detail cetak.",
    display_order: 3
  },
  {
    id: 'faq-4',
    question: "Format file desain apa yang harus saya siapkan?",
    answer: "Format terbaik adalah file vector seperti Adobe Illustrator (.AI), CorelDraw (.CDR), PDF Vector, atau Photoshop (.PSD) dengan resolusi minimal 300 DPI. Jika Anda hanya memiliki sketsa kasar atau file JPG/PNG, tim desainer kami siap membantu merapikannya tanpa biaya tambahan!",
    display_order: 4
  },
  {
    id: 'faq-5',
    question: "Bagaimana dengan jaminan garansi jika ada barang yang cacat?",
    answer: "BDGMERCH memberikan Garansi Ganti Baru 100% atau perbaikan gratis jika terdapat cacat produksi akibat kesalahan jahit, sablon luntur, atau salah warna dari kesepakatan PO awal.",
    display_order: 5
  },
  {
    id: 'faq-6',
    question: "Apakah BDGMERCH bisa menerbitkan Faktur Pajak untuk pengadaan kantor/B2B?",
    answer: "Ya, kami berbadan hukum resmi (PT) dan dapat menerbitkan Surat Penawaran Resmi, Invoice, Kwitansi, serta Faktur Pajak PPN sesuai kebutuhan administrasi procurement perusahaan atau instansi Anda.",
    display_order: 6
  }
];

export const DEFAULT_CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'client-1',
    client_name: 'Bank BJB',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bank_BJB_logo.svg/320px-Bank_BJB_logo.svg.png',
    display_order: 1,
    size_scale: 'medium'
  },
  {
    id: 'client-2',
    client_name: 'Telkomsel',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Telkomsel_2021_icon.svg/320px-Telkomsel_2021_icon.svg.png',
    display_order: 2,
    size_scale: 'medium'
  },
  {
    id: 'client-3',
    client_name: 'Eiger Adventure',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eiger_logo.svg/320px-Eiger_logo.svg.png',
    display_order: 3,
    size_scale: 'medium'
  },
  {
    id: 'client-4',
    client_name: 'Pertamina',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pertamina_Logo.svg/320px-Pertamina_Logo.svg.png',
    display_order: 4,
    size_scale: 'medium'
  },
  {
    id: 'client-5',
    client_name: 'ITB Bandung',
    logo_url: 'https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Logo_Institut_Teknologi_Bandung.png/320px-Logo_Institut_Teknologi_Bandung.png',
    display_order: 5,
    size_scale: 'medium'
  },
  {
    id: 'client-6',
    client_name: 'BCA',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/320px-Bank_Central_Asia.svg.png',
    display_order: 6,
    size_scale: 'medium'
  },
  {
    id: 'client-7',
    client_name: 'Grab Indonesia',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Grab_Logo.svg/320px-Grab_Logo.svg.png',
    display_order: 7,
    size_scale: 'medium'
  }
];

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'kaos-cotton-combed',
    category: 'apparel',
    categoryLabel: 'Apparel & Seragam',
    name: 'Kaos Custom Cotton Combed 24s/30s',
    moq: '24 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 45.000 - Rp 75.000',
    description: 'Bahan 100% Cotton Combed asli distro Bandung. Sangat adem, menyerap keringat maksimal dengan sablon Plastisol / DTF High Definition anti retak.',
    features: ['Bahan Combed 24s/30s Original', 'Sablon Plastisol / DTF / Discharge', 'Jahitan Rantai Standar Ekspor', 'Free Custom Label Leher & Plastik Klip'],
    badge: 'BEST SELLER',
    tagline: 'Favorit Komunitas & Event Kantor'
  },
  {
    id: 'gelang-karet-wristband',
    category: 'rubber',
    categoryLabel: 'Rubber Merchandise',
    name: 'Gelang Karet Custom (Rubber Wristband)',
    moq: '100 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 3.500 - Rp 8.000',
    description: 'Gelang karet PVC 100% sintetis elastis dan tahan air. Pilihan model huruf timbul (emboss), huruf cekung (deboss) isi warna, atau glow in the dark.',
    features: ['Material Rubber 100% Anti Alergi', 'Model Deboss Isi Warna / Emboss Timbul', 'Tersedia Ukuran Dewasa (202mm) & Anak (180mm)', 'Pilihan Efek Glow In The Dark'],
    badge: 'SPESIALIS BANDUNG',
    tagline: 'Aksesoris Tiket Event & Merchandise Komunitas'
  },
  {
    id: 'gantungan-kunci-karet',
    category: 'rubber',
    categoryLabel: 'Rubber Merchandise',
    name: 'Gantungan Kunci Karet Custom (Keychain 2D/3D)',
    moq: '100 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 3.000 - Rp 9.500',
    description: 'Keychain karet tebal 4-5mm dengan ring putar anti karat. Bentuk bebas die-cut mengikuti logo brand/event dengan warna presisi tinggi.',
    features: ['Bentuk Bebas Die-Cut Sesuai Logo', 'Ring Putar Rantai Tebal Anti Karat', 'Pilihan Model 1 Sisi atau 2 Sisi Bolak-balik', 'Tekstur Karet Halus Tanpa Cacat Moulding'],
    badge: 'POPULAR SOUVENIR',
    tagline: 'Souvenir Konser, Otomotif & Brand'
  },
  {
    id: 'hoodie-crewneck',
    category: 'apparel',
    categoryLabel: 'Apparel & Seragam',
    name: 'Hoodie & Crewneck Fleece Cotton',
    moq: '24 Pcs',
    leadTime: '7-10 Hari Kerja',
    priceRange: 'Rp 95.000 - Rp 145.000',
    description: 'Cotton Fleece tebal gramasi 280-330 gsm dengan bordir komputer presisi atau sablon high-density.',
    features: ['Heavyweight Cotton Fleece Lembut', 'Bordir Komputer Tajam Presisi', 'Tali Hood Tebal & Eyelet Logam', 'Rib Karet Elastis Tahan Melar'],
    badge: 'PREMIUM QUALITY',
    tagline: 'Merchandise Premium Perusahaan'
  },
  {
    id: 'rubber-patch-3d',
    category: 'rubber',
    categoryLabel: 'Rubber Merchandise',
    name: 'Label Karet / Rubber Patch 3D Timbul',
    moq: '100 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 2.500 - Rp 8.000',
    description: 'Karet PVC sintetis murni kualitas ekspor untuk patch rompi, jaket taktis, topi, dan tas dengan opsi jahitan tepi atau velcro.',
    features: ['Material Karet PVC Lembut & Tahan Cuci', 'Model 3D Relief Bergradasi Tajam', 'Tersedia Opsi Backing Velcro / Jahit', 'Gratis Master Moulding untuk Repeat Order'],
    badge: 'PABRIKASI LANGSUNG',
    tagline: 'Patch Rompi Touring & Tactical'
  },
  {
    id: 'polo-shirt',
    category: 'apparel',
    categoryLabel: 'Apparel & Seragam',
    name: 'Polo Shirt Lacoste Pique CVC',
    moq: '24 Pcs',
    leadTime: '6-8 Hari Kerja',
    priceRange: 'Rp 65.000 - Rp 95.000',
    description: 'Seragam polo semi-formal untuk gathering kantor, pameran, seragam SPG, dan merchandise premium.',
    features: ['Lacoste CVC 24s Adem & Rapi', 'Kerah Rajut Tebal Tidak Mudah Keriting', 'Bordir Logo Dada & Lengan', 'Pilihan 30+ Warna Kain'],
    tagline: 'Seragam Gathering & Corporate'
  },
  {
    id: 'pin-enamel-logam',
    category: 'accessories',
    categoryLabel: 'Aksesoris & Badge',
    name: 'Enamel Pin Logam Cor & Lapel Pin VIP',
    moq: '50 Pcs',
    leadTime: '8-12 Hari Kerja',
    priceRange: 'Rp 12.000 - Rp 28.000',
    description: 'Pin logam cor kuningan/zinc alloy dengan pilihan hard enamel, soft enamel, lapis emas/perak, dan pengait magnet/kupu-kupu.',
    features: ['Material Logam Kuningan / Zinc Alloy', 'Finishing Gold, Silver, Black Nickel', 'Pengait Butterfly Clutch / Magnet Kuat', 'Packaging Plastik Satuan Premium'],
    badge: 'EXCLUSIVE',
    tagline: 'Collectible & VIP Badge'
  },
  {
    id: 'lanyard-id-card',
    category: 'accessories',
    categoryLabel: 'Aksesoris & Badge',
    name: 'Tali Lanyard Printing HD & Holder ID Card',
    moq: '50 Pcs',
    leadTime: '3-5 Hari Kerja',
    priceRange: 'Rp 6.000 - Rp 15.000',
    description: 'Lanyard tisu printing sublimasi full colour 2 sisi dengan stopper klip & kait putar oval kokoh.',
    features: ['Bahan Tisu Halus Lembut di Leher', 'Printing Sublimasi HD Anti Luntur', 'Stopper Buka-Tutup & Kait Oval Tebal', 'Bisa Tambah Holder Kulit / Mika'],
    badge: 'EXPRESS SERVICE',
    tagline: 'Perlengkapan Event & ID Kantor'
  },
  {
    id: 'tactical-backpack-cordura',
    category: 'bags',
    categoryLabel: 'Tas & Pouch',
    name: 'Tactical Backpack & Waistbag Cordura 1000D',
    moq: '50 Pcs',
    leadTime: '10-14 Hari Kerja',
    priceRange: 'Rp 85.000 - Rp 185.000',
    description: 'Tas ransel militer & waistbag tahan air dengan material Cordura 1000D tebal, sistem MOLLE webbing, resleting YKK, dan slot velcro custom patch.',
    features: ['Bahan Cordura 1000D Waterproof', 'Resleting YKK & Buckle Acetal Kuat', 'Slot Khusus Laptop & Busa Punggung Tebal', 'Panel Velcro untuk Custom Rubber Patch'],
    badge: 'HEAVY DUTY',
    tagline: 'Tas Lapangan, Event Outdoor & Merchandise Kantor'
  },
  {
    id: 'tote-bag-canvas-pouch',
    category: 'bags',
    categoryLabel: 'Tas & Pouch',
    name: 'Tote Bag Canvas Premium & Cosmetic Pouch',
    moq: '50 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 18.000 - Rp 45.000',
    description: 'Tote bag canvas twill tebal, canvas marsoto atau blacu grade A dengan sablon DTF/Plastisol tajam serta pouch kosmetik / dompet kulit sintetis.',
    features: ['Bahan Canvas Marsoto / Twill Tebal', 'Sablon DTF High Definition / Bordir', 'Pilihan Resleting / Magnet / Kancing Klip', 'Tersedia Model Pouch Kulit Sintetis'],
    badge: 'ECO FRIENDLY',
    tagline: 'Souvenir Seminar, Pameran & Retail Brand'
  },
  {
    id: 'topi-trucker-snapback',
    category: 'headwear',
    categoryLabel: 'Topi & Headwear',
    name: 'Topi Custom Snapback, Trucker & Baseball',
    moq: '36 Pcs',
    leadTime: '7-10 Hari Kerja',
    priceRange: 'Rp 25.000 - Rp 45.000',
    description: 'Topi bahan Rafel Denim, Drill grade A, atau jaring trucker dengan bordir 3D timbul komputer atau patch woven presisi tinggi.',
    features: ['Bahan Rafel Denim / Drill Grade A', 'Bordir Timbul 3D Komputer Tajam', 'Pengait Belakang Cakop Besi / Snap Plastik', 'Pola Topi Pas, Kokoh & Nyaman Dipakai'],
    badge: 'DISTRO STANDAR',
    tagline: 'Apparel Komunitas, Otomotif & Brand'
  },
  {
    id: 'bucket-hat-bordir',
    category: 'headwear',
    categoryLabel: 'Topi & Headwear',
    name: 'Bucket Hat Reversible & Tactical Hat Bordir',
    moq: '36 Pcs',
    leadTime: '7-10 Hari Kerja',
    priceRange: 'Rp 28.000 - Rp 50.000',
    description: 'Bucket hat 2 sisi (bolak-balik dua warna) dengan bahan canvas/drill tebal dan bordir logo presisi di kedua sisi.',
    features: ['Bisa Model 2 Sisi Bolak-balik (Reversible)', 'Bahan Drill / Canvas / Ripstop Kuat', 'Bordir Logo Rapi Depan & Samping', 'Tersedia Opsi Tali Leher Stopper'],
    tagline: 'Merchandise Festival Musik & Komunitas'
  },
  {
    id: 'custom-hardbox-packaging',
    category: 'packaging',
    categoryLabel: 'Packaging & Souvenir Set',
    name: 'Custom Hardbox Magnet & Packaging Eksklusif',
    moq: '50 Pcs',
    leadTime: '8-12 Hari Kerja',
    priceRange: 'Rp 35.000 - Rp 95.000',
    description: 'Kotak kado rigid hardbox tebal dengan penutup magnet, finishing poly foil emas/silver, spot UV, dan busa eva moulding presisi di dalam.',
    features: ['Board Tebal 30A/40A Dilapis Fancy Paper', 'Finishing Foil Emas/Silver / Emboss / Spot UV', 'Kancing Magnet Kuat & Presisi', 'Custom Busa Eva / Satin Foam di Dalam'],
    badge: 'LUXURY GIFT',
    tagline: 'Kemasan VIP, Onboarding Kit & Plakat'
  },
  {
    id: 'seminar-kit-goodie-bag',
    category: 'packaging',
    categoryLabel: 'Packaging & Souvenir Set',
    name: 'Paket Seminar Kit & Custom Goodie Bag Set',
    moq: '50 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 25.000 - Rp 75.000',
    description: 'Paket bundling seminar & gathering lengkap: Tas goodie bag / spunbond, buku agenda notes, tumbler, pulpen custom, dan lanyard id card.',
    features: ['Paket Lengkap Siap Pakai untuk Event', 'Goodie Bag Spunbond / Blacu Sablon 2 Sisi', 'Bundling Buku Agenda, Pulpen & Tumbler', 'Bisa Custom Isi Sesuai Budget Perusahaan'],
    badge: 'ALL-IN-ONE',
    tagline: 'Solusi Praktis Seminar, Workshop & RUPS'
  }
];
