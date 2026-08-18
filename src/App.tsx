import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from './lib/supabase';
import {
  ArrowUpRight,
  Check,
  Sparkles,
  Zap,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquare,
  Menu,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  Award,
  Truck,
  Shirt,
  Tag,
  CircleDot,
  Building2,
  Phone,
  RefreshCw,
  Sliders,
  Upload,
  RotateCcw,
  RotateCw,
  Eye,
  CheckCircle2,
  Package,
  Search,
  ExternalLink,
  Info,
  Lock,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Image as ImageIcon,
  AlertCircle,
  Megaphone,
  Move,
  Maximize2,
  Type,
  Palette,
  ShoppingBag,
  Box,
  Briefcase,
  Gift,
  HelpCircle,
  Settings,
  Instagram,
  Camera,
  Heart
} from 'lucide-react';
import { SEO } from './components/SEO';
import { WristbandCanvas } from './components/WristbandCanvas';
import { CategoryCardSlider } from './components/CategoryCardSlider';
import { InstagramPortfolio } from './components/InstagramPortfolio';
import {
  PageId,
  SiteConfig,
  ProductItem,
  CategoryConfig,
  ClientLogoItem,
  FaqItem,
  PortfolioItem
} from './types';

const WA_PHONE_NUMBER = "6281312211161"; // 081312211161 in international format

const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand_name: 'BDGMERCH',
  tagline: 'BANDUNG MERCHANDISE VENDOR',
  logo_url: '',
  meta_title: 'BDGMERCH - Vendor Gelang Karet & Custom Sablon Kaos Bandung',
  meta_description: 'Vendor pembuatan gelang karet silikon custom, sablon kaos, hoodie, dan enamel pin terpercaya di Bandung. Berpengalaman dengan 40+ ulasan positif.',
  meta_keywords: 'vendor gelang karet bandung, sablon kaos bandung, wristband karet custom, konveksi kaos bandung, merchandise bandung, vendor custom merchandise, gantungan kunci karet, pin enamel bandung',
  announcement_enabled: true,
  announcement_badge: 'PROMO PRODUKSI BULAN INI',
  announcement_text: 'Gratis Ongkir / Subsidi Ongkir ke Seluruh Indonesia',
  announcement_link_text: 'Klaim Promo',
  announcement_link_url: 'https://api.whatsapp.com/send/?phone=6281312211161&text=Halo+BDGMERCH%2C+saya+ingin+konsultasi+order+merchandise.&type=phone_number&app_absent=0',
  instagram_handle: '@bdgmerch.id',
  instagram_url: 'https://www.instagram.com/bdgmerch.id'
};

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
    description: 'Pabrikasi langsung moulding karet PVC sintetis berteknologi tinggi. Lentur, presisi tinggi, tahan air, dan awet bertahun-tahun.',
    specs: [
      'Gelang Karet Deboss Isi Warna / Emboss Timbul / Glow',
      'Gantungan Kunci Karet Die-cut 3D Relief Bergradasi',
      'Patch Karet Velcro untuk Rompi Touring, Tas & Jaket'
    ],
    iconName: 'Layers',
    sampleMoq: 'Min. 100 Pcs',
    popularItems: 'Wristband • Keychain 3D • Patch Karet',
    images: [
      'https://images.unsplash.com/photo-1611591475152-473559db2d4f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'accessories',
    name: 'Aksesoris & Badge',
    shortTitle: 'Pin Enamel Logam & Lanyard',
    tag: 'EVENT & VIP BADGE',
    description: 'Pin logam cor kuningan/zinc alloy mewah dengan hard/soft enamel, serta lanyard printing full colour anti luntur.',
    specs: [
      'Hard / Soft Enamel Pin Logam Cor Kuningan Presisi',
      'Tali Lanyard Tisu 2 Sisi + Stopper Klip & Kait Oval',
      'Medali Cor Logam Kejuaraan & Badge Eksklusif'
    ],
    iconName: 'Award',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Pin Enamel • Lanyard Tisu • Medali Cor',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'bags',
    name: 'Tas & Pouch',
    shortTitle: 'Tactical Backpack, Tote & Pouch',
    tag: 'CUSTOM B2B MERCH',
    description: 'Produksi ransel taktis cordura, tote bag canvas tebal, cosmetic pouch, dan pouch kulit sintetis berstandar ekspor.',
    specs: [
      'Material Canvas Tebal, Cordura 1000D & Leatherette',
      'Sablon DTF Full Colour, Bordir Komputer, atau Deboss Logo',
      'Resleting YKK Original & Jahitan Bartack Ekstra Kuat'
    ],
    iconName: 'ShoppingBag',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Tactical Backpack • Canvas Tote • Leather Pouch',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'headwear',
    name: 'Topi & Headwear',
    shortTitle: 'Snapback, Trucker & Bucket Hat',
    tag: 'PABRIKASI TOPI',
    description: 'Topi custom berbagai model dengan bahan Rafel denim, Drill grade A, dan jaring premium berstandar distro Bandung.',
    specs: [
      'Pilihan Model Snapback, Trucker Hat, & Bucket Hat Reversible',
      'Bordir Timbul 3D Komputer Tajam & Patch Woven',
      'Pengait Gesper Besi Cakop Anti Karat / Snap Plastik Kuat'
    ],
    iconName: 'CircleDot',
    sampleMoq: 'Min. 36 Pcs',
    popularItems: 'Snapback Bordir • Trucker Jaring • Bucket Hat',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'packaging',
    name: 'Packaging & Souvenir Set',
    shortTitle: 'Custom Box, Seminar Kit & Goodie Bag',
    tag: 'CORPORATE GIFT',
    description: 'Paket merchandise lengkap & kemasan eksklusif hardbox custom finishing foil emas/silver untuk seminar & onboarding kit kantor.',
    specs: [
      'Hardbox Magnet / Corrugated Box Printing Full Colour',
      'Paket Seminar Kit & Onboarding Gift Set Lengkap',
      'Non-Woven & Spunbond Custom Goodie Bag Sablon HD'
    ],
    iconName: 'Package',
    sampleMoq: 'Min. 50 Pcs',
    popularItems: 'Custom Hardbox • Seminar Kit • Goodie Bag',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

// DEFAULT PORTFOLIO ITEMS (PREPARATION FOR N8N & SUPABASE DYNAMIC SYNC)
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

// DEFAULT FAQS
const DEFAULT_FAQS: FaqItem[] = [
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

// DEFAULT CLIENT / PARTNER LOGOS
const DEFAULT_CLIENT_LOGOS: ClientLogoItem[] = [
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

// DEFAULT CATALOG ITEMS (B2B Bandung Merchandise)
const DEFAULT_PRODUCTS: ProductItem[] = [
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

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'katalog', 'custom-studio', 'kenapa-bdgmerch', 'faq'];
      if (validPages.includes(hash)) return hash;
    }

  // Modal & Mobile Menu State
  const [isPenawaranOpen, setIsPenawaranOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    company: '',
    productType: 'Kaos Custom Cotton Combed 24s/30s',
    quantity: '50',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Supabase Catalog State (with localStorage fallback)
  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('products') || localStorage.getItem('bdgmerch_products_v1');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Error reading products from localStorage:', e);
      }
    }
    return DEFAULT_PRODUCTS;
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Faq State (with localStorage fallback & Supabase sync)
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('faqs') || localStorage.getItem('bdgmerch_faqs_v1');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Error reading faqs from localStorage:', e);
      }
    }
    return DEFAULT_FAQS;
  });
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);

  // Client Logos State (with localStorage fallback)
  const [clientLogos, setClientLogos] = useState<ClientLogoItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('client_logos') || localStorage.getItem('bdgmerch_client_logos_v1');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Error reading client logos from localStorage:', e);
      }
    }
    return DEFAULT_CLIENT_LOGOS;
  });
  const [isLoadingLogos, setIsLoadingLogos] = useState(false);

  // Portfolio / Instagram Feed State (with localStorage fallback & Supabase sync for n8n)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bdgmerch_portfolio_v1') || localStorage.getItem('portfolio') || localStorage.getItem('instagram_posts');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Error reading portfolio from localStorage:', e);
      }
    }
    return DEFAULT_PORTFOLIO;
  });
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

  // ==========================================
  // SITE CONFIGURATION (HEADER / BRANDING / LOGO)
  // ==========================================
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bdgmerch_site_config_v1');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Error reading site config from localStorage:', e);
      }
    }
    return DEFAULT_SITE_CONFIG;
  });
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isUploadingSiteLogo, setIsUploadingSiteLogo] = useState(false);
  const siteLogoInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // ADMIN PANEL STATE (HIDDEN SECRET DOT)
  // ==========================================
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bdgmerch_admin_auth') === 'true';
    }
    return false;
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'products' | 'clients' | 'faqs' | 'settings' | 'seo'>('products');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Admin Product Form State
  const [adminEditingProduct, setAdminEditingProduct] = useState<ProductItem | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'apparel' as 'apparel' | 'rubber' | 'accessories',
    categoryLabel: 'Kaos / Apparel',
    moq: '24 Pcs',
    leadTime: '5-7 Hari Kerja',
    priceRange: 'Rp 45.000 - Rp 75.000',
    description: '',
    featuresText: 'Bahan Berkualitas Tinggi, Pengerjaan Cepat & Presisi, Garansi Kualitas 100%',
    badge: '',
    tagline: '',
    image_url: ''
  });
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [adminStatusMessage, setAdminStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const adminImageInputRef = useRef<HTMLInputElement>(null);

  // Admin Client Logo Form State
  const [adminEditingLogo, setAdminEditingLogo] = useState<ClientLogoItem | null>(null);
  const [clientLogoForm, setClientLogoForm] = useState<{
    client_name: string;
    logo_url: string;
    size_scale: 'small' | 'medium' | 'large';
    display_order: number;
  }>({
    client_name: '',
    logo_url: '',
    size_scale: 'medium',
    display_order: 1
  });
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSavingLogo, setIsSavingLogo] = useState(false);
  const adminLogoInputRef = useRef<HTMLInputElement>(null);

  // Admin FAQ Form State
  const [adminEditingFaq, setAdminEditingFaq] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<{
    question: string;
    answer: string;
    display_order: number;
  }>({
    question: '',
    answer: '',
    display_order: 1
  });
  const [isSavingFaq, setIsSavingFaq] = useState(false);

  // ==========================================
  // CUSTOM STUDIO / LIVE MOCKUP STATE (2 TABS)
  // ==========================================
  const [studioMainTab, setStudioMainTab] = useState<'kaos' | 'gelang'>('kaos');
  const [mobileStudioTab, setMobileStudioTab] = useState<'product' | 'upload' | 'text' | 'position'>('product');

  // TAB 1: KAOS STATE (CustomInk Style)
  const [shirtColor, setShirtColor] = useState<string>('#000000'); // Swatches: Hitam, Putih, Navy, Merah, Hijau Army, Yellow, Misty Grey
  const [shirtPreset, setShirtPreset] = useState<'left-chest' | 'front-center' | 'custom'>('front-center');
  const [shirtItemType, setShirtItemType] = useState<'logo' | 'text' | 'both'>('both');
  const [shirtUploadedLogo, setShirtUploadedLogo] = useState<string | null>(null);
  const [shirtCustomText, setShirtCustomText] = useState<string>('BDGMERCH 2026');
  const [shirtTextColor, setShirtTextColor] = useState<string>('#facc15');
  const [shirtFontSize, setShirtFontSize] = useState<number>(20);
  
  // Interactive Transformation State (Drag, Resize, Rotate)
  const [elementPos, setElementPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elementScale, setElementScale] = useState<number>(100);
  const [elementRotation, setElementRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; elemX: number; elemY: number }>({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });

  // TAB 2: GELANG KARET SIMULATOR STATE
  const [wristbandWidth, setWristbandWidth] = useState<'1.2' | '1.5' | '1.7' | '2.0' | '2.5'>('1.5');
  const [wristbandColor, setWristbandColor] = useState<string>('#facc15');
  const [wristbandText, setWristbandText] = useState<string>('BDGMERCH EVENT WRISTBAND');
  const [wristbandTextColor, setWristbandTextColor] = useState<string>('#000000');
  const [wristbandStyle, setWristbandStyle] = useState<'emboss' | 'deboss'>('emboss');
  const [wristbandLogo, setWristbandLogo] = useState<string | null>(null);

  const [isProcessingBg, setIsProcessingBg] = useState(false);
  const [autoRemoveBg, setAutoRemoveBg] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wristbandLogoInputRef = useRef<HTMLInputElement>(null);

  // Synchronize hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'katalog', 'custom-studio', 'kenapa-bdgmerch', 'faq'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // REUSABLE FETCH PRODUCTS DIRECTLY FROM SUPABASE CLIENT
  const fetchSupabaseProducts = async () => {
    try {
      setIsLoadingProducts(true);
      // Fetch from products table (ordered by created_at or id)
      let res = await supabase.from('products').select('*');
      
      // Check for error or alternative ordering
      if (res.error) {
        console.warn('Supabase products table note:', res.error.message, res.error.code);
        const altRes = await supabase.from('katalog').select('*');
        if (!altRes.error && altRes.data && altRes.data.length > 0) {
          res = altRes;
        }
      }

      if (res.data && res.data.length > 0) {
        const mapped: ProductItem[] = res.data.map((item: any) => ({
          id: String(item.id || item.slug || Math.random()),
          category: (item.category || item.kategori || 'apparel').toLowerCase() as any,
          categoryLabel: item.category_label || item.categoryLabel || item.category || (item.category === 'rubber' ? 'Gelang Karet' : item.category === 'accessories' ? 'Pin & Aksesoris' : 'Kaos / Apparel'),
          name: item.title || item.name || item.nama || 'Produk Custom BDGMERCH',
          moq: item.moq || (item.min_order ? `${item.min_order} Pcs` : '24 Pcs'),
          leadTime: item.lead_time || item.leadTime || item.estimasi || '5-7 Hari Kerja',
          priceRange: item.price_range || item.priceRange || (item.price ? `Rp ${Number(item.price).toLocaleString('id-ID')}` : 'Hubungi CS'),
          description: item.description || item.deskripsi || 'Merchandise berkualitas tinggi pabrikasi langsung Bandung.',
          features: item.features ? (Array.isArray(item.features) ? item.features : typeof item.features === 'string' ? item.features.split(',').map((s: string) => s.trim()) : ['Bahan Berkualitas Tinggi']) : ['Bahan Berkualitas Tinggi', 'Pengerjaan Cepat & Presisi', 'Garansi Kualitas 100%'],
          badge: item.badge || item.tag || '',
          tagline: item.tagline || '',
          image_url: item.image_url || item.imageUrl || item.foto || ''
        }));
        setProducts(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('products', JSON.stringify(mapped));
          localStorage.setItem('bdgmerch_products_v1', JSON.stringify(mapped));
        }
      } else {
        // If Supabase table is empty or errored, load from localStorage if present
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('products') || localStorage.getItem('bdgmerch_products_v1');
          if (saved !== null) {
            try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed)) {
                setProducts(parsed);
              }
            } catch (_) {}
          }
        }
      }
    } catch (err: any) {
      console.warn('Supabase catalog fallback active (localStorage/defaults used):', err?.message || err);
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('products') || localStorage.getItem('bdgmerch_products_v1');
        if (saved !== null) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setProducts(parsed);
            }
          } catch (_) {}
        }
      }
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // REUSABLE FETCH CLIENT LOGOS FROM SUPABASE CLIENT (WITH 42P01 & RLS FALLBACK)
  const fetchSupabaseClientLogos = async () => {
    try {
      setIsLoadingLogos(true);
      let res = await supabase.from('client_logos').select('*');
      
      // Handle table error or fallback
      if (res.error) {
        console.warn('Supabase client_logos table notice:', res.error.message, res.error.code);
        const partnerRes = await supabase.from('client_partners').select('*');
        if (!partnerRes.error && partnerRes.data && partnerRes.data.length > 0) {
          res = partnerRes;
        } else {
          const mitraRes = await supabase.from('mitra_logos').select('*');
          if (!mitraRes.error && mitraRes.data && mitraRes.data.length > 0) {
            res = mitraRes;
          }
        }
      }

      if (res.data && res.data.length > 0) {
        const mapped: ClientLogoItem[] = res.data.map((item: any) => ({
          id: String(item.id || item.slug || Math.random()),
          client_name: item.client_name || item.name || item.nama || 'Partner Client',
          logo_url: item.logo_url || item.logoUrl || item.foto || item.image_url || '',
          display_order: Number(item.display_order || item.urutan || 1),
          size_scale: (item.scale_size || item.size_scale || item.size || 'medium') as any
        }));
        // Sort by display order
        mapped.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
        setClientLogos(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('client_logos', JSON.stringify(mapped));
          localStorage.setItem('bdgmerch_client_logos_v1', JSON.stringify(mapped));
        }
      } else {
        // If Supabase table is empty or errored, load from localStorage if present
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('client_logos') || localStorage.getItem('bdgmerch_client_logos_v1');
          if (saved !== null) {
            try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed)) {
                setClientLogos(parsed);
              }
            } catch (_) {}
          }
        }
      }
    } catch (err: any) {
      console.warn('Supabase client logos fallback active (localStorage/defaults used):', err?.message || err);
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('client_logos') || localStorage.getItem('bdgmerch_client_logos_v1');
        if (saved !== null) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setClientLogos(parsed);
            }
          } catch (_) {}
        }
      }
    } finally {
      setIsLoadingLogos(false);
    }
  };

  // REUSABLE FETCH FAQS FROM SUPABASE CLIENT
  const fetchSupabaseFaqs = async () => {
    try {
      setIsLoadingFaqs(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.warn('Supabase faqs table notice:', error.message);
      } else if (data && data.length > 0) {
        const mapped: FaqItem[] = data.map((item: any) => ({
          id: String(item.id || Math.random()),
          question: item.question || item.pertanyaan || '',
          answer: item.answer || item.jawaban || '',
          display_order: Number(item.display_order || item.urutan || 1)
        }));
        mapped.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
        setFaqs(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('faqs', JSON.stringify(mapped));
          localStorage.setItem('bdgmerch_faqs_v1', JSON.stringify(mapped));
        }
      }
    } catch (err: any) {
      console.warn('Supabase faqs fetch note:', err?.message || err);
    } finally {
      setIsLoadingFaqs(false);
    }
  };

  // REUSABLE FETCH SITE CONFIGURATION / SETTINGS FROM SUPABASE
  const fetchSupabaseSiteConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (!error && data) {
        const mapped: SiteConfig = {
          brand_name: data.brand_name || data.brandName || DEFAULT_SITE_CONFIG.brand_name,
          tagline: data.tagline || DEFAULT_SITE_CONFIG.tagline,
          logo_url: data.logo_url || data.logoUrl || '',
          meta_title: data.meta_title || DEFAULT_SITE_CONFIG.meta_title,
          meta_description: data.meta_description || DEFAULT_SITE_CONFIG.meta_description,
          meta_keywords: data.meta_keywords || DEFAULT_SITE_CONFIG.meta_keywords,
          announcement_enabled: data.announcement_enabled !== undefined ? data.announcement_enabled : DEFAULT_SITE_CONFIG.announcement_enabled,
          announcement_badge: data.announcement_badge || DEFAULT_SITE_CONFIG.announcement_badge,
          announcement_text: data.announcement_text || DEFAULT_SITE_CONFIG.announcement_text,
          announcement_link_text: data.announcement_link_text || DEFAULT_SITE_CONFIG.announcement_link_text,
          announcement_link_url: data.announcement_link_url || DEFAULT_SITE_CONFIG.announcement_link_url,
          instagram_handle: data.instagram_handle || data.instagramHandle || DEFAULT_SITE_CONFIG.instagram_handle,
          instagram_url: data.instagram_url || data.instagramUrl || DEFAULT_SITE_CONFIG.instagram_url,
        };
        setSiteConfig(mapped);
        setConfigForm(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bdgmerch_site_config_v1', JSON.stringify(mapped));
        }
      }
    } catch (err: any) {
      console.warn('Supabase site_settings fetch note:', err?.message || err);
    }
  };

  // REUSABLE FETCH PORTFOLIO / INSTAGRAM FEED FROM SUPABASE CLIENT (FOR N8N AUTOMATION)
  const fetchSupabasePortfolio = async () => {
    try {
      setIsLoadingPortfolio(true);
      // Try fetching from 'portfolio' table first, with fallback to 'instagram_posts'
      let res = await supabase.from('portfolio').select('*').order('display_order', { ascending: true });
      if (res.error) {
        const altRes = await supabase.from('instagram_posts').select('*');
        if (!altRes.error && altRes.data && altRes.data.length > 0) {
          res = altRes;
        }
      }

      if (res.data && res.data.length > 0) {
        const mapped: PortfolioItem[] = res.data.map((item: any) => ({
          id: String(item.id || item.slug || Math.random()),
          title: item.title || item.nama || item.name || 'Hasil Produksi BDGMERCH',
          category: item.category || item.kategori || 'Merchandise Custom',
          image_url: item.image_url || item.imageUrl || item.foto_url || item.image || '',
          caption: item.caption || item.deskripsi || item.description || '',
          client_name: item.client_name || item.client || item.customer || '',
          post_url: item.post_url || item.instagram_url || item.url || 'https://www.instagram.com/bdgmerch.id',
          display_order: Number(item.display_order || item.urutan || 1),
          likes_count: item.likes_count || item.likes || undefined
        })).filter(item => Boolean(item.image_url && item.image_url.trim() !== ''));

        if (mapped.length > 0) {
          mapped.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
          setPortfolioItems(mapped);
          if (typeof window !== 'undefined') {
            localStorage.setItem('bdgmerch_portfolio_v1', JSON.stringify(mapped));
          }
        }
      }
    } catch (err: any) {
      console.warn('Supabase portfolio fetch note:', err?.message || err);
    } finally {
      setIsLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    fetchSupabaseProducts();
    fetchSupabaseClientLogos();
    fetchSupabaseFaqs();
    fetchSupabaseSiteConfig();
    fetchSupabasePortfolio();
  }, []);

  // Auto-dismiss admin status message after 4.5 seconds
  useEffect(() => {
    if (adminStatusMessage) {
      const timer = setTimeout(() => {
        setAdminStatusMessage(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [adminStatusMessage]);

  // Handle Secret Dot Click in Footer
  const handleSecretDotClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDrawerOpen(true);
    } else {
      setAdminPasswordInput('');
      setAdminLoginError('');
      setIsAdminLoginOpen(true);
    }
  };

  // Handle Admin Login Form
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'bdgmerch2026') {
      setIsAdminLoggedIn(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bdgmerch_admin_auth', 'true');
      }
      setIsAdminLoginOpen(false);
      setIsAdminDrawerOpen(true);
      setAdminLoginError('');
    } else {
      setAdminLoginError('Password salah. Silakan coba lagi.');
    }
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bdgmerch_admin_auth');
    }
    setIsAdminDrawerOpen(false);
    setIsAdminLoginOpen(false);
  };

  // Prepare Edit Product Form
  const handleStartEditProduct = (prod: ProductItem) => {
    setAdminEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      categoryLabel: prod.categoryLabel || (prod.category === 'rubber' ? 'Gelang Karet' : prod.category === 'accessories' ? 'Pin & Aksesoris' : 'Kaos / Apparel'),
      moq: prod.moq,
      leadTime: prod.leadTime || '5-7 Hari Kerja',
      priceRange: prod.priceRange || 'Rp 45.000 - Rp 75.000',
      description: prod.description,
      featuresText: prod.features ? prod.features.join(', ') : '',
      badge: prod.badge || '',
      tagline: prod.tagline || '',
      image_url: prod.image_url || ''
    });
    setAdminStatusMessage(null);
  };

  const handleResetProductForm = () => {
    setAdminEditingProduct(null);
    setProductForm({
      name: '',
      category: 'apparel',
      categoryLabel: 'Kaos / Apparel',
      moq: '24 Pcs',
      leadTime: '5-7 Hari Kerja',
      priceRange: 'Rp 45.000 - Rp 75.000',
      description: '',
      featuresText: 'Bahan Berkualitas Tinggi, Pengerjaan Cepat & Presisi, Garansi Kualitas 100%',
      badge: '',
      tagline: '',
      image_url: ''
    });
    setAdminStatusMessage(null);
  };

  // Upload Product Image directly to Supabase Storage Bucket 'katalog-produk'
  const handleAdminImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      setAdminStatusMessage(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to bucket 'katalog-produk'
      const { data, error } = await supabase.storage
        .from('katalog-produk')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        // Fallback: convert to base64 Data URL if bucket permissions are restricted
        console.warn('Storage bucket upload notice:', error.message);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Url = event.target?.result as string;
          setProductForm(prev => ({ ...prev, image_url: base64Url }));
          setAdminStatusMessage({
            type: 'success',
            text: 'Foto berhasil dimuat (preview lokal).'
          });
        };
        reader.readAsDataURL(file);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('katalog-produk')
          .getPublicUrl(filePath);

        setProductForm(prev => ({ ...prev, image_url: publicUrlData.publicUrl }));
        setAdminStatusMessage({
          type: 'success',
          text: 'Gambar berhasil diunggah ke Supabase Storage!'
        });
      }
    } catch (err: any) {
      console.error('Upload image error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Gagal mengunggah gambar: ' + (err.message || 'Error tidak diketahui')
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle Save Product (Insert / Update to Supabase)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Nama produk wajib diisi!' });
      return;
    }

    try {
      setIsSavingProduct(true);
      setAdminStatusMessage(null);

      const featuresArray = productForm.featuresText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        title: productForm.name.trim(),
        name: productForm.name.trim(),
        category: productForm.category,
        category_label: productForm.categoryLabel,
        moq: productForm.moq.trim(),
        lead_time: productForm.leadTime.trim(),
        price_range: productForm.priceRange.trim(),
        description: productForm.description.trim(),
        features: featuresArray,
        badge: productForm.badge.trim(),
        tagline: productForm.tagline.trim(),
        image_url: productForm.image_url.trim()
      };

      if (adminEditingProduct) {
        // Direct Supabase Update
        const { error: updateErr } = await supabase
          .from('products')
          .update(payload)
          .eq('id', adminEditingProduct.id);

        if (updateErr) {
          console.warn('Supabase product update warning:', updateErr.message);
        }

        // UPDATE existing product in local state & localStorage
        setProducts(prev => {
          const updated = prev.map(p => {
            if (p.id === adminEditingProduct.id) {
              return {
                ...p,
                name: payload.name,
                category: payload.category,
                categoryLabel: payload.category_label,
                moq: payload.moq,
                leadTime: payload.lead_time,
                priceRange: payload.price_range,
                description: payload.description,
                features: payload.features,
                badge: payload.badge,
                tagline: payload.tagline,
                image_url: payload.image_url
              };
            }
            return p;
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem('bdgmerch_products_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `Produk "${payload.name}" berhasil diperbarui!` });
      } else {
        // INSERT new product
        const newId = `prod_${Date.now()}`;
        const insertPayload = {
          ...payload,
          id: newId,
          created_at: new Date().toISOString()
        };

        // Direct Supabase Insert
        const { error: insertErr } = await supabase
          .from('products')
          .insert([insertPayload]);

        if (insertErr) {
          console.warn('Supabase product insert warning:', insertErr.message);
        }

        const newProductItem: ProductItem = {
          id: newId,
          name: payload.name,
          category: payload.category,
          categoryLabel: payload.category_label,
          moq: payload.moq,
          leadTime: payload.lead_time,
          priceRange: payload.price_range,
          description: payload.description,
          features: payload.features,
          badge: payload.badge,
          tagline: payload.tagline,
          image_url: payload.image_url
        };

        // Add to local state & localStorage immediately
        setProducts(prev => {
          const updated = [newProductItem, ...prev];
          if (typeof window !== 'undefined') {
            localStorage.setItem('bdgmerch_products_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `Produk baru "${payload.name}" berhasil ditambahkan!` });
      }

      handleResetProductForm();
    } catch (err: any) {
      console.error('Save product error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Terjadi kesalahan saat menyimpan: ' + (err.message || 'Coba lagi')
      });
    } finally {
      setIsSavingProduct(false);
    }
  };

  // ==========================================
  // DELETE PRODUCT (FORCE INSTANT UI DELETE + LOGS + ASYNC SUPABASE)
  // ==========================================
  const handleDeleteProduct = async (id: string, name?: string) => {
    console.log("Tombol delete produk diklik untuk ID:", id, "Nama:", name);
    
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus produk ini?${name ? ` (${name})` : ''}`);
    if (!isConfirmed) {
      console.log("Penghapusan produk dibatalkan oleh pengguna.");
      return;
    }

    console.log("Menghapus produk dari React State dan localStorage:", id);

    // 1. Langsung hapus dari layar (UI) & LocalStorage secara instan
    setProducts(prev => {
      const updated = prev.filter(item => String(item.id) !== String(id));
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updated));
        localStorage.setItem('bdgmerch_products_v1', JSON.stringify(updated));
      }
      return updated;
    });

    if (adminEditingProduct?.id === id) {
      handleResetProductForm();
    }

    setAdminStatusMessage({
      type: 'success',
      text: 'Item berhasil dihapus!'
    });

    // 2. Hapus dari Supabase di background
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error("Error Supabase saat hapus produk:", error.message);
      } else {
        console.log("Produk berhasil dihapus permanen dari database Supabase:", id);
      }
    } catch (err) {
      console.error("Failed to delete product from Supabase:", err);
    }
  };

  // ==========================================
  // CLIENT LOGOS ADMIN HANDLERS
  // ==========================================
  const handleStartEditLogo = (logo: ClientLogoItem) => {
    setAdminEditingLogo(logo);
    setClientLogoForm({
      client_name: logo.client_name,
      logo_url: logo.logo_url,
      size_scale: logo.size_scale || 'medium',
      display_order: logo.display_order || 1
    });
    setAdminStatusMessage(null);
  };

  const handleResetLogoForm = () => {
    setAdminEditingLogo(null);
    setClientLogoForm({
      client_name: '',
      logo_url: '',
      size_scale: 'medium',
      display_order: clientLogos.length + 1
    });
    setAdminStatusMessage(null);
  };

  // Upload Client Logo to Supabase Storage Bucket 'client-logos'
  const handleAdminLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingLogo(true);
      setAdminStatusMessage(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `logo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      // Upload to bucket 'client-logos'
      const { data, error } = await supabase.storage
        .from('client-logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('Storage bucket client-logos upload notice:', error.message);
        // Fallback preview
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Url = event.target?.result as string;
          setClientLogoForm(prev => ({ ...prev, logo_url: base64Url }));
          setAdminStatusMessage({
            type: 'success',
            text: 'Logo berhasil dimuat (preview lokal).'
          });
        };
        reader.readAsDataURL(file);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('client-logos')
          .getPublicUrl(filePath);

        setClientLogoForm(prev => ({ ...prev, logo_url: publicUrlData.publicUrl }));
        setAdminStatusMessage({
          type: 'success',
          text: 'Logo berhasil diunggah ke Supabase Storage!'
        });
      }
    } catch (err: any) {
      console.error('Upload logo error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Gagal mengunggah logo: ' + (err.message || 'Error tidak diketahui')
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Save Client Logo (Insert / Update to Supabase)
  const handleSaveClientLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientLogoForm.client_name.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Nama perusahaan / klien wajib diisi!' });
      return;
    }
    if (!clientLogoForm.logo_url.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Logo URL / File gambar wajib diunggah!' });
      return;
    }

    try {
      setIsSavingLogo(true);
      setAdminStatusMessage(null);

      const payload = {
        client_name: clientLogoForm.client_name.trim(),
        name: clientLogoForm.client_name.trim(),
        logo_url: clientLogoForm.logo_url.trim(),
        scale_size: clientLogoForm.size_scale,
        size_scale: clientLogoForm.size_scale,
        display_order: Number(clientLogoForm.display_order || 1)
      };

      if (adminEditingLogo) {
        // Direct Supabase Update
        const { error: updateErr } = await supabase
          .from('client_logos')
          .update(payload)
          .eq('id', adminEditingLogo.id);

        if (updateErr) {
          console.warn('Supabase client_logos update warning:', updateErr.message);
        }

        // UPDATE existing client logo in local state & localStorage
        setClientLogos(prev => {
          const updated = prev.map(item => {
            if (item.id === adminEditingLogo.id) {
              return { ...item, ...payload };
            }
            return item;
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem('bdgmerch_client_logos_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `Logo klien "${payload.client_name}" berhasil diperbarui!` });
      } else {
        // INSERT new client logo
        const newId = `logo_${Date.now()}`;
        const insertPayload = {
          ...payload,
          id: newId,
          created_at: new Date().toISOString()
        };

        // Direct Supabase Insert
        const { error: insertErr } = await supabase
          .from('client_logos')
          .insert([insertPayload]);

        if (insertErr) {
          console.warn('Supabase client_logos insert warning:', insertErr.message);
        }

        const newLogoItem: ClientLogoItem = {
          id: newId,
          ...payload
        };

        // Add to local state & localStorage immediately
        setClientLogos(prev => {
          const updated = [...prev, newLogoItem];
          if (typeof window !== 'undefined') {
            localStorage.setItem('bdgmerch_client_logos_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `Logo baru "${payload.client_name}" berhasil ditambahkan!` });
      }

      handleResetLogoForm();
    } catch (err: any) {
      console.error('Save client logo error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Gagal menyimpan logo: ' + (err.message || 'Coba lagi')
      });
    } finally {
      setIsSavingLogo(false);
    }
  };

  // ==========================================
  // DELETE CLIENT LOGO (FORCE INSTANT UI DELETE + LOGS + ASYNC SUPABASE)
  // ==========================================
  const handleDeleteClientLogo = async (id: string, name?: string) => {
    console.log("Tombol delete logo diklik untuk ID:", id, "Nama Klien:", name);
    
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus logo ini?${name ? ` (${name})` : ''}`);
    if (!isConfirmed) {
      console.log("Penghapusan logo dibatalkan oleh pengguna.");
      return;
    }

    console.log("Menghapus logo dari React State dan localStorage:", id);

    // 1. Langsung hapus dari layar (UI) & LocalStorage secara instan
    setClientLogos(prev => {
      const updated = prev.filter(item => String(item.id) !== String(id));
      if (typeof window !== 'undefined') {
        localStorage.setItem('client_logos', JSON.stringify(updated));
        localStorage.setItem('bdgmerch_client_logos_v1', JSON.stringify(updated));
      }
      return updated;
    });

    if (adminEditingLogo?.id === id) {
      handleResetLogoForm();
    }

    setAdminStatusMessage({
      type: 'success',
      text: 'Logo berhasil dihapus!'
    });

    // 2. Hapus dari Supabase di background
    try {
      const { error } = await supabase.from('client_logos').delete().eq('id', id);
      if (error) {
        console.error("Error Supabase saat hapus logo:", error.message);
      } else {
        console.log("Logo berhasil dihapus permanen dari database Supabase:", id);
      }
    } catch (err) {
      console.error("Failed to delete logo from Supabase:", err);
    }
  };

  // ==========================================
  // FAQ ADMIN HANDLERS (STATE-FIRST OPTIMISTIC UPDATE)
  // ==========================================
  const handleStartEditFaq = (faq: FaqItem) => {
    setAdminEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      display_order: faq.display_order || 1
    });
    setAdminStatusMessage(null);
  };

  const handleResetFaqForm = () => {
    setAdminEditingFaq(null);
    setFaqForm({
      question: '',
      answer: '',
      display_order: faqs.length + 1
    });
    setAdminStatusMessage(null);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Pertanyaan FAQ wajib diisi!' });
      return;
    }
    if (!faqForm.answer.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Jawaban FAQ wajib diisi!' });
      return;
    }

    try {
      setIsSavingFaq(true);
      setAdminStatusMessage(null);

      const payload = {
        question: faqForm.question.trim(),
        answer: faqForm.answer.trim(),
        display_order: Number(faqForm.display_order || 1)
      };

      if (adminEditingFaq) {
        // Optimistic State Update
        setFaqs(prev => {
          const updated = prev.map(item => {
            if (item.id === adminEditingFaq.id) {
              return { ...item, ...payload };
            }
            return item;
          });
          updated.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
          if (typeof window !== 'undefined') {
            localStorage.setItem('faqs', JSON.stringify(updated));
            localStorage.setItem('bdgmerch_faqs_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `FAQ berhasil diperbarui!` });

        // Sync to Supabase in background
        const { error: updateErr } = await supabase
          .from('faqs')
          .update(payload)
          .eq('id', adminEditingFaq.id);

        if (updateErr) {
          console.warn('Supabase faqs update warning:', updateErr.message);
        }
      } else {
        // INSERT new FAQ (Optimistic)
        const newId = `faq_${Date.now()}`;
        const newFaqItem: FaqItem = {
          id: newId,
          ...payload
        };

        setFaqs(prev => {
          const updated = [...prev, newFaqItem];
          updated.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
          if (typeof window !== 'undefined') {
            localStorage.setItem('faqs', JSON.stringify(updated));
            localStorage.setItem('bdgmerch_faqs_v1', JSON.stringify(updated));
          }
          return updated;
        });

        setAdminStatusMessage({ type: 'success', text: `FAQ baru berhasil ditambahkan!` });

        // Direct Supabase Insert
        const { error: insertErr } = await supabase
          .from('faqs')
          .insert([{
            id: newId,
            ...payload,
            created_at: new Date().toISOString()
          }]);

        if (insertErr) {
          console.warn('Supabase faqs insert warning:', insertErr.message);
        }
      }

      handleResetFaqForm();
    } catch (err: any) {
      console.error('Save FAQ error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Gagal menyimpan FAQ: ' + (err.message || 'Coba lagi')
      });
    } finally {
      setIsSavingFaq(false);
    }
  };

  const handleDeleteFaq = async (id: string, question?: string) => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus FAQ ini?${question ? `\n"${question}"` : ''}`);
    if (!isConfirmed) return;

    // 1. Langsung hapus dari layar (UI) & LocalStorage secara instan
    setFaqs(prev => {
      const updated = prev.filter(item => String(item.id) !== String(id));
      if (typeof window !== 'undefined') {
        localStorage.setItem('faqs', JSON.stringify(updated));
        localStorage.setItem('bdgmerch_faqs_v1', JSON.stringify(updated));
      }
      return updated;
    });

    if (adminEditingFaq?.id === id) {
      handleResetFaqForm();
    }

    setAdminStatusMessage({
      type: 'success',
      text: 'FAQ berhasil dihapus!'
    });

    // 2. Hapus dari Supabase di background
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) {
        console.error("Error Supabase saat hapus FAQ:", error.message);
      }
    } catch (err) {
      console.error("Failed to delete FAQ from Supabase:", err);
    }
  };

  // ==========================================
  // SITE CONFIGURATION (HEADER / BRAND) HANDLERS
  // ==========================================
  const handleSaveSiteConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configForm.brand_name.trim()) {
      setAdminStatusMessage({ type: 'error', text: 'Nama Brand / Judul Header wajib diisi!' });
      return;
    }

    try {
      setIsSavingConfig(true);
      setAdminStatusMessage(null);

      const payload: SiteConfig = {
        brand_name: configForm.brand_name.trim(),
        tagline: configForm.tagline.trim(),
        logo_url: configForm.logo_url.trim(),
        meta_title: configForm.meta_title?.trim(),
        meta_description: configForm.meta_description?.trim(),
        meta_keywords: configForm.meta_keywords?.trim(),
        announcement_enabled: configForm.announcement_enabled !== false,
        announcement_badge: configForm.announcement_badge?.trim() || 'PROMO PRODUKSI BULAN INI',
        announcement_text: configForm.announcement_text?.trim() || 'Free Sampel Bahan & Mockup 3D untuk Order di atas 100 Pcs!',
        announcement_link_text: configForm.announcement_link_text?.trim() || 'Klaim Promo',
        announcement_link_url: configForm.announcement_link_url?.trim() || '',
        instagram_handle: configForm.instagram_handle?.trim() || '@bdgmerch.id',
        instagram_url: configForm.instagram_url?.trim() || 'https://www.instagram.com/bdgmerch.id',
      };

      // Optimistic State Update
      setSiteConfig(payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bdgmerch_site_config_v1', JSON.stringify(payload));
      }

      setAdminStatusMessage({ type: 'success', text: 'Pengaturan Brand, Media Sosial, & Header berhasil disimpan!' });

      // Sync with Supabase
      await supabase.from('site_settings').upsert([
        {
          id: 1,
          brand_name: payload.brand_name,
          tagline: payload.tagline,
          logo_url: payload.logo_url,
          meta_title: payload.meta_title,
          meta_description: payload.meta_description,
          meta_keywords: payload.meta_keywords,
          announcement_enabled: payload.announcement_enabled,
          announcement_badge: payload.announcement_badge,
          announcement_text: payload.announcement_text,
          announcement_link_text: payload.announcement_link_text,
          announcement_link_url: payload.announcement_link_url,
          instagram_handle: payload.instagram_handle,
          instagram_url: payload.instagram_url,
          updated_at: new Date().toISOString()
        }
      ]);
    } catch (err: any) {
      console.warn('Save site_settings note:', err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleAdminSiteLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingSiteLogo(true);
      setAdminStatusMessage(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `brand_logo_${Date.now()}.${fileExt}`;
      const filePath = `branding/${fileName}`;

      const { data, error } = await supabase.storage
        .from('branding')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        // Fallback preview locally
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Url = event.target?.result as string;
          setConfigForm(prev => ({ ...prev, logo_url: base64Url }));
          setAdminStatusMessage({
            type: 'success',
            text: 'Logo Brand berhasil dimuat (preview lokal).'
          });
        };
        reader.readAsDataURL(file);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('branding')
          .getPublicUrl(filePath);

        setConfigForm(prev => ({ ...prev, logo_url: publicUrlData.publicUrl }));
        setAdminStatusMessage({
          type: 'success',
          text: 'Logo Brand berhasil diunggah ke Supabase Storage!'
        });
      }
    } catch (err: any) {
      console.error('Upload brand logo error:', err);
      setAdminStatusMessage({
        type: 'error',
        text: 'Gagal mengunggah logo: ' + (err.message || 'Coba lagi')
      });
    } finally {
      setIsUploadingSiteLogo(false);
    }
  };

  const handleResetSiteConfig = () => {
    setConfigForm(DEFAULT_SITE_CONFIG);
    setAdminStatusMessage({ type: 'success', text: 'Pengaturan dikembalikan ke default.' });
  };

  // Open Penawaran Modal with prefilled data
  const openPenawaranModal = (productName = 'Kaos Custom Cotton Combed 24s/30s', qty = '50') => {
    setFormData(prev => ({
      ...prev,
      productType: productName,
      quantity: qty
    }));
    setIsPenawaranOpen(true);
  };

  // HANDLE FORM SUBMISSION -> DIRECT WHATSAPP URL COMPOSITION
  const handleSubmitPenawaran = async (e: React.FormEvent) => {
    e.preventDefault();

    const nama = formData.name.trim() || '-';
    const noWa = formData.whatsapp.trim() || '-';
    const perusahaan = formData.company.trim() || '-';
    const jenisProduk = formData.productType || '-';
    const qty = formData.quantity || '0';
    const catatan = formData.notes.trim() || '-';

    // Formatted WhatsApp Message according to instruction:
    const message = 
`Halo BDGMERCH, saya mau minta penawaran harga:
- Nama: ${nama}
- Perusahaan/Komunitas: ${perusahaan}
- Jenis Produk: ${jenisProduk}
- Qty: ${qty} Pcs
- Catatan: ${catatan}`;


    
    // Target link to 081312211161 (international: 6281312211161)
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#facc15', '#000000', '#ffffff', '#eab308']
    });

    // Also attempt background sync to Supabase table
    try {
      supabase.from('penawaran_bdgmerch').insert([
        {
          name: nama,
          whatsapp: noWa,
          company_or_community: perusahaan,
          product_type: jenisProduk,
          quantity: qty,
          notes: catatan,
          created_at: new Date().toISOString()
        }
      ]).then(() => {});
    } catch (err) {
      console.warn('Background Supabase log:', err);
    }

    setIsPenawaranOpen(false);

    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  // Pure JS Background Remover for Uploaded Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'shirt' | 'wristband' = 'shirt') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (autoRemoveBg) {
        processRemoveBackground(src, (cleaned) => {
          if (target === 'shirt') {
            setShirtUploadedLogo(cleaned);
          } else {
            setWristbandLogo(cleaned);
          }
        });
      } else {
        if (target === 'shirt') {
          setShirtUploadedLogo(src);
        } else {
          setWristbandLogo(src);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const processRemoveBackground = (imageSrc: string, callback?: (res: string) => void) => {
    setIsProcessingBg(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        if (callback) callback(imageSrc);
        setIsProcessingBg(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample top-left corner background color
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];
      const threshold = 40;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel is pure white / near-white or matches corner color
        const isWhite = r > 235 && g > 235 && b > 235;
        const colorDiff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);

        if (isWhite || colorDiff < threshold) {
          data[i + 3] = 0; // set alpha transparent
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const cleanedResult = canvas.toDataURL('image/png');
      if (callback) callback(cleanedResult);
      setIsProcessingBg(false);
    };
    img.onerror = () => {
      if (callback) callback(imageSrc);
      setIsProcessingBg(false);
    };
  };

  // Preset Position Snap for Kaos
  const handleSnapPreset = (preset: 'left-chest' | 'front-center') => {
    setShirtPreset(preset);
    if (preset === 'left-chest') {
      setElementPos({ x: -48, y: -45 });
      setElementScale(70);
    } else {
      setElementPos({ x: 0, y: 0 });
      setElementScale(100);
    }
  };

  // Mouse / Touch Dragging on Interactive Mockup Box
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: elementPos.x,
      elemY: elementPos.y
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        mouseX: e.touches[0].clientX,
        mouseY: e.touches[0].clientY,
        elemX: elementPos.x,
        elemY: elementPos.y
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      setElementPos({
        x: Math.max(-85, Math.min(85, dragStartRef.current.elemX + dx * 0.7)),
        y: Math.max(-80, Math.min(80, dragStartRef.current.elemY + dy * 0.7))
      });
      setShirtPreset('custom');
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - dragStartRef.current.mouseX;
      const dy = e.touches[0].clientY - dragStartRef.current.mouseY;
      setElementPos({
        x: Math.max(-85, Math.min(85, dragStartRef.current.elemX + dx * 0.7)),
        y: Math.max(-80, Math.min(80, dragStartRef.current.elemY + dy * 0.7))
      });
      setShirtPreset('custom');
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Direct WA URL for quick links
  const getDirectWhatsAppUrl = (customText?: string) => {
    const text = customText || `Halo BDGMERCH, saya ingin konsultasi produksi merchandise custom.`;
    return `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  // Filtered catalog
  const filteredProducts = products.filter(item => {
    const matchesCategory = catalogFilter === 'all' || 
      item.category === catalogFilter || 
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(catalogFilter));
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.tagline && item.tagline.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#000000] font-sans selection:bg-[#facc15] selection:text-black flex flex-col relative overflow-x-hidden">
      <SEO 
        title={siteConfig.meta_title} 
        description={siteConfig.meta_description}
        keywords={siteConfig.meta_keywords}
        brandName={siteConfig.brand_name}
      />

      {/* SELIPKAN PROMOBAR TEPAT DI SINI */}
      <PromoBar />
      
      {/* BACKGROUND NEO-BRUTALIST DOT GRID */}
      <div className="fixed inset-0 pointer-events-none dot-pattern opacity-60 z-0" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-[#facc15]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -left-40 w-96 h-96 bg-black/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* TOP ANNOUNCEMENT BANNER */}
      {siteConfig.announcement_enabled !== false && (
        <div className="relative z-30 bg-black text-white text-xs md:text-sm font-black py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2 border-b-2 border-black">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#facc15] text-black font-black text-[10px] uppercase tracking-wider">
            {siteConfig.announcement_badge || 'PROMO PRODUKSI BULAN INI'}
          </span>
          <span>{siteConfig.announcement_text || 'Free Sampel Bahan & Mockup 3D untuk Order di atas 100 Pcs!'}</span>
          {siteConfig.announcement_link_url && siteConfig.announcement_link_url.startsWith('http') ? (
            <a 
              href={siteConfig.announcement_link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#facc15] transition-colors ml-1 font-black inline-flex items-center gap-0.5 cursor-pointer"
            >
              {siteConfig.announcement_link_text || 'Klaim Promo'} <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </a>
          ) : (
            <button 
              onClick={() => openPenawaranModal(`Klaim Promo: ${siteConfig.announcement_text || 'Free Sampel Bahan'}`, '100')}
              className="underline hover:text-[#facc15] transition-colors ml-1 font-black inline-flex items-center gap-0.5 cursor-pointer"
            >
              {siteConfig.announcement_link_text || 'Klaim Promo'} <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          )}
        </div>
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#f8f8f8]/95 backdrop-blur-md border-b-2 border-black transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with optional custom image + dynamic text & tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group cursor-pointer text-left"
            >
              {siteConfig.logo_url ? (
                <img 
                  src={siteConfig.logo_url} 
                  alt={siteConfig.brand_name} 
                  className="h-10 max-h-10 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <img 
                  src="logo.png" 
                  alt={siteConfig.brand_name} 
                  className="h-10 max-h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-black leading-none flex items-center gap-1.5">
                  {siteConfig.brand_name || 'BDGMERCH'}
                  <span className="w-2.5 h-2.5 bg-[#facc15] border border-black rounded-full inline-block shrink-0"></span>
                </span>
                <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mt-0.5">
                  {siteConfig.tagline || 'BANDUNG MERCHANDISE VENDOR'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Multi-Page Navigation with Yellow Neon Highlights */}
          <nav className="hidden md:flex items-center gap-1 font-black text-xs uppercase tracking-wider">
            
            <button 
              onClick={() => navigateTo('home')} 
              className={`px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
              }`}
            >
              Beranda
            </button>

            <button 
              onClick={() => navigateTo('katalog')} 
              className={`px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
                currentPage === 'katalog'
                  ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
              }`}
            >
              Katalog Produk
            </button>

            <button 
              onClick={() => navigateTo('custom-studio')} 
              className={`px-4 py-2 rounded-full border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'custom-studio'
                  ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Studio</span>
            </button>

            <button 
              onClick={() => navigateTo('kenapa-bdgmerch')} 
              className={`px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
                currentPage === 'kenapa-bdgmerch'
                  ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
              }`}
            >
              Kenapa BDGMERCH
            </button>

            <button 
              onClick={() => navigateTo('faq')} 
              className={`px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
                currentPage === 'faq'
                  ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* Action CTA: MINTA PENAWARAN (Kuning Neon - No Cart Counter) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openPenawaranModal()}
              className="bg-[#facc15] text-black px-5 sm:px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-2 group border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
            >
              <span>MINTA PENAWARAN</span>
              <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <svg className="w-3 h-3 text-[#facc15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border-2 border-black bg-white cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b-2 border-black px-6 py-5 space-y-2 font-black shadow-xl animate-fadeIn">
            <button 
              onClick={() => navigateTo('home')} 
              className={`block w-full text-left py-2.5 px-3 rounded-lg border-2 ${
                currentPage === 'home' ? 'bg-black text-white border-black' : 'bg-transparent border-transparent text-black'
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => navigateTo('katalog')} 
              className={`block w-full text-left py-2.5 px-3 rounded-lg border-2 ${
                currentPage === 'katalog' ? 'bg-[#facc15] text-black border-black' : 'bg-transparent border-transparent text-black'
              }`}
            >
              Katalog Produk
            </button>
            <button 
              onClick={() => navigateTo('custom-studio')} 
              className={`block w-full text-left py-2.5 px-3 rounded-lg border-2 ${
                currentPage === 'custom-studio' ? 'bg-[#facc15] text-black border-black' : 'bg-transparent border-transparent text-black'
              }`}
            >
              Custom Studio (Live Mockup 3 Objek)
            </button>
            <button 
              onClick={() => navigateTo('kenapa-bdgmerch')} 
              className={`block w-full text-left py-2.5 px-3 rounded-lg border-2 ${
                currentPage === 'kenapa-bdgmerch' ? 'bg-[#facc15] text-black border-black' : 'bg-transparent border-transparent text-black'
              }`}
            >
              Kenapa BDGMERCH
            </button>
            <button 
              onClick={() => navigateTo('faq')} 
              className={`block w-full text-left py-2.5 px-3 rounded-lg border-2 ${
                currentPage === 'faq' ? 'bg-[#facc15] text-black border-black' : 'bg-transparent border-transparent text-black'
              }`}
            >
              FAQ (Tanya Jawab)
            </button>
            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); openPenawaranModal(); }}
                className="w-full bg-[#facc15] text-black py-3 rounded-xl border-2 border-black font-black text-center shadow-[3px_3px_0px_#000]"
              >
                MINTA PENAWARAN HARGA
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MAIN MULTI-PAGE RENDERER */}
      {/* ========================================================================= */}
      <main className="flex-1 relative z-10">

        {/* ------------------------------------------------------------- */}
        {/* PAGE 1: BERANDA / HOME */}
        {/* ------------------------------------------------------------- */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            
            {/* HERO SECTION */}
            <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 overflow-hidden min-h-[calc(100vh-140px)] flex flex-col justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 relative w-full">

                {/* POLAROID FLOATING CARDS (Positioned Outward with Safe Z-Index) */}
                {/* Card 1: Top Left - Kaos Cotton Combed (-4deg) */}
                <div className="hidden lg:block absolute top-4 left-0 xl:left-4 2xl:left-8 w-44 xl:w-52 bg-white border-2 border-black p-2.5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-[-4deg] z-10 hover:rotate-0 hover:scale-105 transition-all cursor-pointer animate-float-1">
                  <div className="aspect-[4/5] bg-neutral-900 rounded-xl mb-2.5 overflow-hidden border-2 border-black relative p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-[10px] font-black">
                      <span className="bg-[#facc15] text-black px-2 py-0.5 rounded">COTTON 30s</span>
                      <span>MOQ 24</span>
                    </div>
                    <div className="text-center py-4">
                      <Shirt className="w-14 xl:w-16 h-14 xl:h-16 mx-auto text-[#facc15] mb-2" />
                      <div className="font-black text-xs xl:text-sm uppercase">Custom Apparel</div>
                      <div className="text-[10px] text-neutral-300">Sablon Plastisol HD</div>
                    </div>
                    <div className="text-[9px] bg-black/60 backdrop-blur-sm p-1.5 rounded text-center font-bold text-neutral-300">
                      Jahitan Rantai Standar Distro
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black text-black uppercase">Apparel Bandung</span>
                    <span className="text-[10px] font-black text-black bg-[#facc15] px-1 rounded">✓ 5-7 Hari</span>
                  </div>
                </div>

                {/* Card 2: Top Right - Gelang Karet & Rubber Patch (+4deg) */}
                <div className="hidden lg:block absolute top-6 right-0 xl:right-4 2xl:right-8 w-48 xl:w-56 bg-white border-2 border-black p-2.5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-[4deg] z-10 hover:rotate-0 hover:scale-105 transition-all cursor-pointer animate-float-2">
                  <div className="aspect-video bg-black rounded-xl mb-2.5 p-3.5 border-2 border-black flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-[#facc15] tracking-widest">PABRIKASI LANGSUNG</span>
                      <span className="w-2 h-2 rounded-full bg-[#facc15] animate-ping"></span>
                    </div>
                    <div className="text-center">
                      <div className="text-lg xl:text-xl font-black text-white tracking-tight">RUBBER WRISTBAND</div>
                      <div className="text-[10px] xl:text-[11px] text-[#facc15] font-black">Gelang Karet Timbul PVC</div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold text-neutral-400">
                      <span>MOQ: 100 Pcs</span>
                      <span>Emboss / Deboss</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black text-black">Spesialis Karet Bandung</span>
                    <div className="w-5 h-5 bg-[#facc15] border border-black rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black stroke-[3]" />
                    </div>
                  </div>
                </div>

                {/* Card 3: Bottom Left - Pin Enamel (-3deg) */}
                <div className="hidden xl:block absolute bottom-6 left-6 2xl:left-12 w-44 bg-white border-2 border-black p-2.5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-[-3deg] z-10 hover:rotate-0 hover:scale-105 transition-all cursor-pointer animate-float-3">
                  <div className="aspect-square bg-gradient-to-br from-neutral-900 to-black rounded-xl mb-2 border-2 border-black p-3 flex flex-col items-center justify-center text-center text-white">
                    <Award className="w-10 h-10 text-[#facc15] mb-2" />
                    <div className="text-xs font-black uppercase tracking-wider text-white">PIN ENAMEL LOGAM</div>
                    <div className="text-[10px] text-neutral-400 font-bold">Hard & Soft Enamel Cor</div>
                  </div>
                  <div className="text-[10px] font-black text-center text-black uppercase tracking-wider">
                    VIP & Event Badge
                  </div>
                </div>

                {/* Card 4: Bottom Right - Gantungan Kunci Karet (+5deg) */}
                <div className="hidden xl:block absolute bottom-6 right-6 2xl:right-12 w-44 bg-white border-2 border-black p-2.5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-[5deg] z-10 hover:rotate-0 hover:scale-105 transition-all cursor-pointer animate-float-4">
                  <div className="aspect-[4/3] bg-yellow-50 rounded-xl mb-2 p-3 border-2 border-black flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <Tag className="w-5 h-5 text-black" />
                      <span className="text-[9px] font-black bg-black text-[#facc15] px-1.5 py-0.5 rounded">CUSTOM DIE-CUT</span>
                    </div>
                    <div className="font-black text-xs text-black">KEYCHAIN KARET 3D</div>
                    <div className="text-[9px] font-bold text-neutral-600">Ring Putar Anti Karat</div>
                  </div>
                  <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest text-center">
                    Souvenir Komunitas
                  </div>
                </div>

                {/* HERO CENTER TEXT (High Z-Index, Top Layer, Centered) */}
                <div className="max-w-4xl mx-auto text-center relative z-30 flex flex-col items-center">

                  {/* HEADLINE */}
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] font-black tracking-tighter text-black mb-6 max-w-[880px] uppercase relative z-30 select-text">
                    Bikin Merchandise &<br />
                    <span className="relative inline-block text-black">
                      Apparel Custom
                      <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3.5 sm:h-5 bg-[#facc15] -z-10 -rotate-1 rounded-sm"></span>
                    </span><br />
                    Tanpa Ribet.
                  </h1>

                  {/* SUB-HEADLINE */}
                  <p className="max-w-[640px] text-base sm:text-lg lg:text-xl text-neutral-700 font-medium leading-relaxed mb-6 relative z-30">
                    Vendor resmi terpercaya 10+ tahun di Bandung. Pengerjaan cepat untuk Komunitas, Event, dan Korporasi.
                  </p>

                  {/* TRUST BADGE / GOOGLE MAPS SOCIAL PROOF (CENTERED BELOW DESCRIPTION & INDONESIAN AVATARS) */}
                  <div className="bg-white border-2 border-black px-4 py-2 rounded-full shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-default relative z-30 inline-flex items-center justify-center gap-3 mb-8 mx-auto">
                    <div className="flex -space-x-2">
                      {[
                        { name: 'Rizki Pratama - Event Organizer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Nadia Salsabila - Brand Owner', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Dimas Aditya - Komunitas Motor', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Siti Rahmawati - Procurement Corp', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' }
                      ].map((person, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center overflow-hidden z-10 relative" title={person.name}>
                          <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-7 h-7 rounded-full border-2 border-black bg-[#facc15] text-black text-[9px] font-black flex items-center justify-center z-20">
                        +42
                      </div>
                    </div>
                    <div className="text-left pr-2">
                      <div className="flex items-center gap-1 text-black font-black text-xs">
                        ⭐ 4.8/5.0 Google Maps
                      </div>
                      <div className="text-[9px] font-black text-neutral-500 uppercase tracking-tight">
                        42+ Ulasan Pelanggan Terverifikasi
                      </div>
                    </div>
                  </div>

                  {/* CTA PRIMARY: KONSULTASI DESAIN (WA) & LIHAT KATALOG */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-30 w-full sm:w-auto mb-8">
                    
                    {/* BUTTON 1: KONSULTASI DESAIN (WA to 081312211161) */}
                    <a
                      href={getDirectWhatsAppUrl("Halo BDGMERCH, saya ingin konsultasi desain dan estimasi harga merchandise untuk keperluan kami.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#facc15] text-black border-2 border-black px-8 py-4 rounded-full font-black flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer w-full sm:w-auto text-base group"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>KONSULTASI DESAIN (WA)</span>
                      <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 text-[#facc15] stroke-[3]" />
                      </span>
                    </a>

                    {/* BUTTON 2: LIHAT KATALOG */}
                    <button
                      onClick={() => navigateTo('katalog')}
                      className="bg-black text-white border-2 border-black px-8 py-4 rounded-full font-black flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(250,204,21,0.6)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer w-full sm:w-auto text-base group"
                    >
                      <span>LIHAT KATALOG</span>
                      <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                        <ArrowRight className="w-4 h-4 text-[#facc15] stroke-[3]" />
                      </span>
                    </button>
                  </div>

                  {/* GUARANTEE & STATS */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-black text-black uppercase tracking-wide mb-12 sm:mb-4 relative z-30">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-black" />
                      <span>GARANSI GANTI BARU 100%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-black" />
                      <span>PENGERJAAN ON-TIME</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-black" />
                      <span>KIRIM KE SELURUH INDONESIA</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* CLIENTS & PARTNERS STRIP */}
            <section className="border-y-2 border-black bg-white py-6 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-600 whitespace-nowrap">
                    DIPERCAYA OLEH 500+ PERUSAHAAN & KOMUNITAS:
                  </span>
                  {isAdminLoggedIn && (
                    <button
                      onClick={() => {
                        setAdminActiveTab('clients');
                        setIsAdminDrawerOpen(true);
                      }}
                      className="p-1 rounded bg-[#facc15] text-black border border-black hover:bg-yellow-400 text-[10px] font-black flex items-center gap-1 cursor-pointer"
                      title="Kelola Logo Klien (Admin)"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                      <span>Edit Klien</span>
                    </button>
                  )}
                </div>

                {/* DYNAMIC LOGO CONTAINER WITH MONOCHROME & HOVER EFFECT */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
                  {clientLogos.map((client) => {
                    const heightClass = 
                      client.size_scale === 'small' ? 'h-7 sm:h-8 max-h-8' :
                      client.size_scale === 'large' ? 'h-10 sm:h-12 max-h-12' :
                      'h-8 sm:h-10 max-h-10';

                    return (
                      <div 
                        key={client.id}
                        className="group flex items-center justify-center p-2 rounded-xl hover:bg-neutral-100/80 transition-colors"
                        title={client.client_name}
                      >
                        {client.logo_url ? (
                          <img
                            src={client.logo_url}
                            alt={client.client_name}
                            className={`${heightClass} max-w-[130px] sm:max-w-[150px] object-contain grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
                            onError={(e) => {
                              // If image fails, replace with text fallback
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}

                        {/* Fallback Text Badge */}
                        <div 
                          className="hidden items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-300 rounded-lg text-xs font-black text-neutral-800 uppercase tracking-tight"
                          style={{ display: client.logo_url ? 'none' : 'flex' }}
                        >
                          <Building2 className="w-3.5 h-3.5 text-black shrink-0" />
                          <span>{client.client_name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* INSTAGRAM PORTFOLIO & SOCIAL PROOF SECTION */}
            {/* ========================================================= */}
            <InstagramPortfolio
              items={portfolioItems}
              instagramHandle={siteConfig.instagram_handle || '@bdgmerch.id'}
              instagramUrl={siteConfig.instagram_url || 'https://www.instagram.com/bdgmerch.id'}
            />

            {/* BANNER CTA: CUSTOM STUDIO PREVIEW */}
            <section className="max-w-7xl mx-auto px-6 sm:px-10 my-12 mb-16">
              <div className="bg-black text-white rounded-3xl p-8 sm:p-12 border-2 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#facc15] text-black text-xs font-black uppercase mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fitur Interaktif Baru</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none mb-4">
                    Coba Live Mockup Studio Kami!
                  </h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-6">
                    Upload logo brand Anda, hapus background otomatis dalam 1 detik, dan lihat visualisasinya langsung di atas <strong>Kaos, Gelang Karet, atau Gantungan Kunci Karet</strong>.
                  </p>
                  <button
                    onClick={() => navigateTo('custom-studio')}
                    className="bg-[#facc15] text-black font-black px-6 py-3.5 rounded-full border-2 border-black shadow-[4px_4px_0px_#fff] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <span>BUKA CUSTOM STUDIO SEKARANG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full md:w-80 h-56 bg-neutral-900 border-2 border-[#facc15] rounded-2xl p-4 flex flex-col items-center justify-center text-center relative shadow-[4px_4px_0px_#facc15]">
                  <div className="w-16 h-16 bg-[#facc15] rounded-2xl flex items-center justify-center mb-3 text-black">
                    <Shirt className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black text-white uppercase">Instant Mockup Generator</span>
                  <span className="text-[10px] text-neutral-400 mt-1">Kaos • Gelang Karet • Gantungan Kunci</span>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PAGE 2: KATALOG PRODUK (DARI SUPABASE CLIENT) */}
        {/* ------------------------------------------------------------- */}
        {currentPage === 'katalog' && (
          <div className="py-12 max-w-7xl mx-auto px-6 sm:px-10 animate-fadeIn">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#facc15] text-xs font-black uppercase tracking-wider mb-3">
                  Pabrikasi B2B Bandung
                </div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
                  Katalog Merchandise
                </h1>
                <p className="text-neutral-600 text-sm sm:text-base font-medium mt-2 max-w-2xl">
                  Pilihan produk terbaik untuk seragam korporasi, apparel distro, aksesoris event, dan cinderamata komunitas.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-72 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Cari kaos, rubber, pin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-black bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#facc15] shadow-[2px_2px_0px_#000]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10">
              <button
                onClick={() => setCatalogFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-black border-2 border-black transition-all cursor-pointer ${
                  catalogFilter === 'all'
                    ? 'bg-black text-[#facc15] shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                Semua Produk ({products.length})
              </button>
              {BDGMERCH_CATEGORIES.map((cat) => {
                const count = products.filter(
                  p => p.category === cat.id || (p.categoryLabel && p.categoryLabel.toLowerCase().includes(cat.id))
                ).length;
                const isActive = catalogFilter === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setCatalogFilter(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-black border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#facc15] text-black shadow-[3px_3px_0px_#000]'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.shortTitle}</span>
                    {count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-black text-[#facc15]' : 'bg-neutral-200 text-neutral-800'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Product Grid with Neo-Brutalist Thick Borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-white border-2 border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-[7px_7px_0px_#000] transition-all"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-black uppercase bg-black text-white px-2.5 py-1 rounded-md">
                        {prod.categoryLabel || prod.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {prod.badge && (
                          <span className="text-[10px] font-black uppercase bg-[#facc15] text-black px-2 py-0.5 rounded border border-black">
                            {prod.badge}
                          </span>
                        )}
                        {isAdminLoggedIn && (
                          <button
                            onClick={() => {
                              handleStartEditProduct(prod);
                              setIsAdminDrawerOpen(true);
                            }}
                            className="p-1 rounded bg-[#facc15] text-black border border-black hover:bg-yellow-400"
                            title="Edit Produk (Admin)"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Optional Product Image Preview */}
                    {prod.image_url && (
                      <div className="mb-4 aspect-video bg-neutral-100 rounded-xl overflow-hidden border-2 border-black relative">
                        <img 
                          src={prod.image_url} 
                          alt={prod.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                    )}

                    {/* Product Name */}
                    <h3 className="text-xl font-black uppercase text-black leading-tight mb-2">
                      {prod.name}
                    </h3>
                    
                    {/* Tagline */}
                    {prod.tagline && (
                      <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-3">
                        {prod.tagline}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-5">
                      {prod.description}
                    </p>

                    {/* Specs Box (MOQ & Price Range) */}
                    <div className="bg-[#f8f8f8] border-2 border-black rounded-xl p-3 mb-5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-600">Minimum Order (MOQ):</span>
                        <span className="font-black text-black bg-[#facc15] px-2 py-0.5 rounded text-[11px] border border-black">
                          {prod.moq}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-600">Estimasi Produksi:</span>
                        <span className="font-bold text-black">{prod.leadTime || '5-7 Hari Kerja'}</span>
                      </div>
                      {prod.priceRange && (
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-300">
                          <span className="font-bold text-neutral-600">Kisaran Harga:</span>
                          <span className="font-black text-black">{prod.priceRange}</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    {prod.features && prod.features.length > 0 && (
                      <div className="space-y-1.5 mb-6">
                        {prod.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-bold text-neutral-800">
                            <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions: Minta Penawaran / Chat WA */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-black">
                    <button
                      onClick={() => openPenawaranModal(prod.name, prod.moq.replace(/\D/g, '') || '50')}
                      className="w-full py-2.5 rounded-xl bg-[#facc15] text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-center"
                    >
                      Minta Penawaran
                    </button>
                    <a
                      href={getDirectWhatsAppUrl(`Halo BDGMERCH, saya tertarik dengan produk ${prod.name}. Mohon info pricelist dan detailnya.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-black text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>Chat WA</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Order Box */}
            <div className="mt-16 bg-white border-2 border-black rounded-3xl p-8 text-center shadow-[6px_6px_0px_#000]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-black mb-2">
                Punya Spesifikasi atau Produk Custom Lainnya?
              </h3>
              <p className="text-sm text-neutral-600 font-medium max-w-xl mx-auto mb-6">
                Kami siap memproduksi item custom sesuai rancangan teknis & budget Anda (Jaket Bomber, Goodie Bag Spunbond, Flashdisk Card, Rompi, dll).
              </p>
              <button
                onClick={() => openPenawaranModal('Produk Kustom Spesifik', '100')}
                className="bg-black text-[#facc15] font-black px-8 py-3.5 rounded-full border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-xs uppercase inline-flex items-center gap-2"
              >
                <span>KONSULTASI ITEM SPESIFIK KE TIM PRODUKSI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PAGE 3: CUSTOM STUDIO / LIVE MOCKUP GENERATOR (2 TAB UTAMA) */}
        {/* TAB 1: Custom Kaos (CustomInk Style) | TAB 2: Gelang Karet Simulator */}
        {/* ------------------------------------------------------------- */}
        {currentPage === 'custom-studio' && (
          <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8 animate-fadeIn pb-24 md:pb-12">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-[#facc15] text-xs font-black uppercase tracking-wider mb-3 border border-black shadow-[2px_2px_0px_#facc15]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Design Studio</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black">
                Custom Merchandise Studio
              </h1>
              <p className="text-neutral-600 text-xs sm:text-sm md:text-base font-medium mt-2">
                Simulasikan desain merchandise Anda secara interaktif dengan kontrol warna instan, drag & drop mockup, serta live preview 3D!
              </p>
            </div>

            {/* TAB SELECTOR: CUSTOM KAOS VS GELANG KARET */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-neutral-100 p-1.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] inline-flex gap-2">
                <button
                  type="button"
                  onClick={() => setStudioMainTab('kaos')}
                  className={`px-5 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm uppercase flex items-center gap-2 transition-all cursor-pointer ${
                    studioMainTab === 'kaos'
                      ? 'bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-transparent border-2 border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Custom Kaos (CustomInk Style)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStudioMainTab('gelang')}
                  className={`px-5 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm uppercase flex items-center gap-2 transition-all cursor-pointer ${
                    studioMainTab === 'gelang'
                      ? 'bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-transparent border-2 border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <CircleDot className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Gelang Karet Simulator</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: CUSTOM KAOS (CUSTOMINK STYLE) */}
            {/* ========================================================================= */}
            {studioMainTab === 'kaos' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* DESKTOP CONTROLS & SETTINGS (5 COLS) */}
                <div className="hidden lg:block lg:col-span-5 bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6">
                  
                  {/* 1. Palet Warna Kaos (Color Selector) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Palette className="w-4 h-4" />
                        <span>1. Warna Kaos (Realtime Preview):</span>
                      </label>
                      <span className="text-[11px] font-bold text-neutral-500">
                        {shirtColor === '#000000' ? 'Hitam' :
                         shirtColor === '#ffffff' ? 'Putih' :
                         shirtColor === '#1e293b' ? 'Navy' :
                         shirtColor === '#dc2626' ? 'Merah' :
                         shirtColor === '#3f4f34' ? 'Hijau Army' :
                         shirtColor === '#facc15' ? 'Yellow' : 'Misty Grey'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {[
                        { name: 'Hitam', hex: '#000000' },
                        { name: 'Putih', hex: '#ffffff' },
                        { name: 'Navy', hex: '#1e293b' },
                        { name: 'Merah', hex: '#dc2626' },
                        { name: 'Hijau Army', hex: '#3f4f34' },
                        { name: 'Yellow', hex: '#facc15' },
                        { name: 'Misty Grey', hex: '#9ca3af' }
                      ].map((swatch) => (
                        <button
                          key={swatch.hex}
                          type="button"
                          onClick={() => setShirtColor(swatch.hex)}
                          className={`w-10 h-10 rounded-full border-2 border-black transition-all cursor-pointer flex items-center justify-center ${
                            shirtColor === swatch.hex
                              ? 'scale-110 ring-2 ring-black shadow-[2px_2px_0px_#000]'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                        >
                          {shirtColor === swatch.hex && (
                            <Check className={`w-4 h-4 stroke-[3] ${
                              swatch.hex === '#ffffff' || swatch.hex === '#facc15' || swatch.hex === '#9ca3af'
                                ? 'text-black'
                                : 'text-white'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Print Area Presets */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4" />
                      <span>2. Preset Posisi Sablon:</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSnapPreset('left-chest')}
                        className={`py-2.5 px-3 rounded-xl border-2 font-black text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          shirtPreset === 'left-chest'
                            ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#000]'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        <span>Left Chest (Dada Kiri)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSnapPreset('front-center')}
                        className={`py-2.5 px-3 rounded-xl border-2 font-black text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          shirtPreset === 'front-center'
                            ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        <span>Front Center (Depan Penuh)</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1">
                      💡 Atau Anda bisa langsung men-drag (geser) logo/teks di atas kaos secara bebas.
                    </p>
                  </div>

                  {/* 3. Upload Logo Brand */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Upload className="w-4 h-4" />
                        <span>3. Upload File Logo Brand:</span>
                      </label>
                      <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoRemoveBg}
                          onChange={(e) => setAutoRemoveBg(e.target.checked)}
                          className="rounded accent-black w-3.5 h-3.5"
                        />
                        <span>Auto Hapus BG</span>
                      </label>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleLogoUpload(e, 'shirt')}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-3 px-4 rounded-xl border-2 border-dashed border-black bg-neutral-50 hover:bg-[#facc15]/20 font-black text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{shirtUploadedLogo ? 'Ganti File Logo' : 'Unggah File Logo'}</span>
                      </button>

                      {shirtUploadedLogo && (
                        <button
                          type="button"
                          onClick={() => setShirtUploadedLogo(null)}
                          className="px-3.5 py-3 rounded-xl border-2 border-black bg-red-100 hover:bg-red-200 text-red-700 font-black text-xs cursor-pointer"
                          title="Hapus Logo"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {isProcessingBg && (
                      <p className="text-[11px] font-bold text-black mt-2 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Menghapus background putih otomatis...
                      </p>
                    )}
                  </div>

                  {/* 4. Tambah / Edit Teks Custom */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                      <Type className="w-4 h-4" />
                      <span>4. Tambah Tulisan / Custom Text:</span>
                    </label>
                    <input
                      type="text"
                      value={shirtCustomText}
                      onChange={(e) => setShirtCustomText(e.target.value)}
                      placeholder="Contoh: BDGMERCH 2026"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#facc15] mb-2.5"
                    />

                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div>
                        <span className="block text-[11px] font-black uppercase text-neutral-600 mb-1">Warna Teks:</span>
                        <div className="flex items-center gap-1.5">
                          {['#000000', '#ffffff', '#facc15', '#dc2626', '#1e293b'].map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setShirtTextColor(c)}
                              className={`w-6 h-6 rounded-full border border-black cursor-pointer ${shirtTextColor === c ? 'ring-2 ring-black scale-110' : ''}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="block text-[11px] font-black uppercase text-neutral-600 mb-1">Ukuran Font: {shirtFontSize}px</span>
                        <input
                          type="range"
                          min="12"
                          max="36"
                          value={shirtFontSize}
                          onChange={(e) => setShirtFontSize(Number(e.target.value))}
                          className="w-full accent-black cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Transform Controls (Scale & Rotate) */}
                  <div className="pt-2 border-t border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Move className="w-4 h-4" />
                        <span>5. Skala & Rotasi Interaktif:</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setElementScale(100);
                          setElementRotation(0);
                          setElementPos({ x: 0, y: 0 });
                          setShirtPreset('front-center');
                        }}
                        className="text-[10px] font-black uppercase underline hover:text-black cursor-pointer"
                      >
                        Reset Posisi
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-neutral-600 mb-1">
                          <span>Ukuran:</span>
                          <span>{elementScale}%</span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="180"
                          value={elementScale}
                          onChange={(e) => setElementScale(Number(e.target.value))}
                          className="w-full accent-black cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-neutral-600 mb-1">
                          <span>Rotasi:</span>
                          <span>{elementRotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={elementRotation}
                          onChange={(e) => setElementRotation(Number(e.target.value))}
                          className="w-full accent-black cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const colorName = shirtColor === '#000000' ? 'Hitam' :
                                       shirtColor === '#ffffff' ? 'Putih' :
                                       shirtColor === '#1e293b' ? 'Navy' :
                                       shirtColor === '#dc2626' ? 'Merah' :
                                       shirtColor === '#3f4f34' ? 'Hijau Army' :
                                       shirtColor === '#facc15' ? 'Yellow' : 'Misty Grey';
                      const msg = `Halo BDGMERCH, saya ingin minta penawaran untuk Custom Kaos:\n- Warna Kaos: ${colorName}\n- Posisi Sablon: ${shirtPreset === 'left-chest' ? 'Dada Kiri (Left Chest)' : shirtPreset === 'front-center' ? 'Depan Penuh (Front Center)' : 'Custom Position'}\n- Teks Custom: ${shirtCustomText || '-'}\n- Membawa Logo Sendiri: ${shirtUploadedLogo ? 'Ya' : 'Tidak'}\n- Estimasi Qty: 50 Pcs`;
                      window.open(`https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 rounded-full bg-[#facc15] text-black font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>MINTA PENAWARAN VIA WA (081312211161)</span>
                  </button>

                </div>

                {/* RIGHT COLUMN: INTERACTIVE T-SHIRT CANVAS (7 COLS) */}
                <div className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col items-center justify-center min-h-[560px] relative overflow-hidden select-none">
                  
                  {/* Canvas Tag & Helpers */}
                  <div className="w-full flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 border border-black"></span>
                      <span className="w-3 h-3 rounded-full bg-[#facc15] border border-black"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500 border border-black"></span>
                      <span className="text-xs font-black uppercase text-black ml-2">
                        LIVE MOCKUP: KAOS COTTON COMBED
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase bg-[#facc15] text-black px-2 py-0.5 rounded border border-black">
                        DRAG & DROP ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Main Kaos Preview Box */}
                  <div className="relative w-full max-w-[430px] aspect-[4/5] flex items-center justify-center my-2">
                    
                    {/* SVG Vector T-Shirt Silhouette */}
                    <svg viewBox="0 0 400 480" className="w-full h-full drop-shadow-2xl transition-colors duration-300">
                      <defs>
                        <linearGradient id="shirtShading" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                          <stop offset="50%" stopColor="#000000" stopOpacity="0.05" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>

                      {/* Main Shirt Body Path */}
                      <path
                        d="M 130 50 Q 200 100 270 50 L 375 125 L 325 185 L 285 155 L 285 435 Q 200 445 115 435 L 115 155 L 75 185 L 25 125 Z"
                        fill={shirtColor}
                        stroke="#000000"
                        strokeWidth="5"
                        strokeLinejoin="round"
                      />
                      
                      {/* Realistic Shading Overlay */}
                      <path
                        d="M 130 50 Q 200 100 270 50 L 375 125 L 325 185 L 285 155 L 285 435 Q 200 445 115 435 L 115 155 L 75 185 L 25 125 Z"
                        fill="url(#shirtShading)"
                        stroke="none"
                      />

                      {/* Collar Rib Detail */}
                      <path
                        d="M 130 50 Q 200 100 270 50"
                        fill="none"
                        stroke={shirtColor === '#000000' ? '#333' : '#000000'}
                        strokeWidth="6"
                      />
                      <path
                        d="M 140 54 Q 200 95 260 54"
                        fill="none"
                        stroke={shirtColor === '#ffffff' ? '#ddd' : '#111'}
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />

                      {/* Sleeve Stitches */}
                      <line x1="325" y1="185" x2="285" y2="155" stroke="#000000" strokeWidth="2.5" strokeDasharray="4 3" />
                      <line x1="75" y1="185" x2="115" y2="155" stroke="#000000" strokeWidth="2.5" strokeDasharray="4 3" />
                      
                      {/* Hem Bottom Stitches */}
                      <path d="M 115 422 Q 200 432 285 422" fill="none" stroke={shirtColor === '#ffffff' ? '#bbb' : '#222'} strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    {/* PRINT AREA BOX (Dashed Bounding Preset Overlay) */}
                    <div className="absolute top-[28%] left-[50%] -translate-x-1/2 w-[58%] h-[50%] border-2 border-dashed border-black/30 rounded-lg pointer-events-none flex flex-col justify-between p-1.5">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-neutral-400 tracking-wider">
                        <span>PRINT AREA</span>
                        <span>A3 MAX</span>
                      </div>
                      <div className="text-center text-[8px] font-bold text-neutral-400">
                        Area Sablon Standar 28 x 40 cm
                      </div>
                    </div>

                    {/* INTERACTIVE DRAGGABLE & ROTATABLE LOGO / TEXT CONTAINER */}
                    <div
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleTouchStart}
                      className={`absolute cursor-grab active:cursor-grabbing p-3 transition-transform ${
                        isDragging ? 'opacity-90' : ''
                      }`}
                      style={{
                        transform: `translate(${elementPos.x}px, ${elementPos.y}px) scale(${elementScale / 100}) rotate(${elementRotation}deg)`,
                        touchAction: 'none'
                      }}
                    >
                      {/* Bounding Box Indicator with Corner Handles */}
                      <div className="relative border-2 border-dashed border-[#facc15] bg-black/5 p-2.5 rounded-lg group">
                        
                        {/* 4 Corner Markers */}
                        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#facc15] border border-black rounded-sm pointer-events-none"></span>
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#facc15] border border-black rounded-sm pointer-events-none"></span>
                        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#facc15] border border-black rounded-sm pointer-events-none"></span>
                        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#facc15] border border-black rounded-sm pointer-events-none"></span>

                        {/* Visual Content: Uploaded Logo and/or Custom Text */}
                        <div className="flex flex-col items-center justify-center text-center gap-1.5">
                          {shirtUploadedLogo && (
                            <img
                              src={shirtUploadedLogo}
                              alt="Uploaded Design"
                              className="max-h-24 max-w-32 object-contain drop-shadow-md pointer-events-none"
                            />
                          )}

                          {shirtCustomText && (
                            <div
                              className="font-black uppercase tracking-wider px-2 py-0.5 rounded leading-tight drop-shadow-md whitespace-nowrap"
                              style={{
                                color: shirtTextColor,
                                fontSize: `${shirtFontSize}px`,
                                textShadow: shirtTextColor === '#ffffff' ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
                              }}
                            >
                              {shirtCustomText}
                            </div>
                          )}

                          {!shirtUploadedLogo && !shirtCustomText && (
                            <div className="p-2 text-xs font-black text-black bg-[#facc15] rounded border border-black">
                              Klik & Drag Saya!
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Guidance hint beneath canvas */}
                  <div className="mt-3 text-center">
                    <p className="text-[11px] font-bold text-neutral-600 flex items-center justify-center gap-1">
                      <Move className="w-3.5 h-3.5" />
                      <span>Tahan dan geser elemen di atas untuk memindahkan posisi sablon.</span>
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: GELANG KARET SIMULATOR */}
            {/* ========================================================================= */}
            {studioMainTab === 'gelang' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: GELANG CONTROLS (5 COLS) */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6 lg:col-span-5">
                  
                  {/* Static Standard Dimensions Specs Box */}
                  <div className="p-3.5 bg-[#facc15]/20 border-2 border-black rounded-2xl flex items-center gap-3">
                    <Info className="w-5 h-5 text-black shrink-0" />
                    <div className="text-xs font-black text-black">
                      <span>Spesifikasi Standar Produksi:</span>
                      <p className="text-[11px] font-bold text-neutral-700 mt-0.5">
                        Panjang Standar: <strong className="text-black">19 cm</strong> | Diameter: <strong className="text-black">6 cm</strong> (Dewasa)
                      </p>
                    </div>
                  </div>

                  {/* 1. Dropdown Pilihan Lebar Gelang */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      1. Pilihan Lebar Gelang (Width):
                    </label>
                    <select
                      value={wristbandWidth}
                      onChange={(e) => setWristbandWidth(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 text-xs font-black focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                    >
                      <option value="1.2">1.2 cm (Slim & Ringan)</option>
                      <option value="1.5">1.5 cm (Ukuran Standar Paling Populer)</option>
                      <option value="1.7">1.7 cm (Medium Tebal)</option>
                      <option value="2.0">2.0 cm (Lebar & Gagah)</option>
                      <option value="2.5">2.5 cm (Ekstra Lebar / Promosi Maksimal)</option>
                    </select>
                  </div>

                  {/* 2. Pilihan Warna Dasar Gelang */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-black">
                        2. Warna Dasar Karet (Rubber):
                      </label>
                      <span className="text-[11px] font-bold text-neutral-600">
                        {wristbandColor === '#facc15' ? 'Kuning Neon' :
                         wristbandColor === '#000000' ? 'Hitam Solid' :
                         wristbandColor === '#ffffff' ? 'Putih' :
                         wristbandColor === '#dc2626' ? 'Merah' :
                         wristbandColor === '#2563eb' ? 'Biru Royal' :
                         wristbandColor === '#16a34a' ? 'Hijau' :
                         wristbandColor === '#9333ea' ? 'Ungu' : 'Orange'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {[
                        { name: 'Kuning Neon', hex: '#facc15' },
                        { name: 'Hitam Solid', hex: '#000000' },
                        { name: 'Putih', hex: '#ffffff' },
                        { name: 'Merah', hex: '#dc2626' },
                        { name: 'Biru Royal', hex: '#2563eb' },
                        { name: 'Hijau', hex: '#16a34a' },
                        { name: 'Ungu', hex: '#9333ea' },
                        { name: 'Orange', hex: '#ea580c' }
                      ].map((swatch) => (
                        <button
                          key={swatch.hex}
                          type="button"
                          onClick={() => setWristbandColor(swatch.hex)}
                          className={`w-9 h-9 rounded-full border-2 border-black transition-all cursor-pointer flex items-center justify-center ${
                            wristbandColor === swatch.hex
                              ? 'scale-110 ring-2 ring-black shadow-[2px_2px_0px_#000]'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                        >
                          {wristbandColor === swatch.hex && (
                            <Check className={`w-4 h-4 stroke-[3] ${
                              swatch.hex === '#ffffff' || swatch.hex === '#facc15' ? 'text-black' : 'text-white'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Teks Emboss / Deboss Input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      3. Teks Emboss / Tulisan Timbul Gelang:
                    </label>
                    <input
                      type="text"
                      value={wristbandText}
                      onChange={(e) => setWristbandText(e.target.value)}
                      placeholder="Contoh: BDGMERCH MUSIC FEST 2026"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#facc15] mb-2.5"
                    />

                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div>
                        <span className="block text-[11px] font-black uppercase text-neutral-600 mb-1">Warna Tulisan:</span>
                        <div className="flex items-center gap-1.5">
                          {['#000000', '#ffffff', '#facc15', '#dc2626', '#2563eb'].map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setWristbandTextColor(c)}
                              className={`w-6 h-6 rounded-full border border-black cursor-pointer ${wristbandTextColor === c ? 'ring-2 ring-black scale-110' : ''}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="block text-[11px] font-black uppercase text-neutral-600 mb-1">Model Karet:</span>
                        <select
                          value={wristbandStyle}
                          onChange={(e) => setWristbandStyle(e.target.value as any)}
                          className="w-full px-2.5 py-1.5 rounded-lg border-2 border-black bg-neutral-50 text-[11px] font-bold"
                        >
                          <option value="emboss">Emboss (Huruf Timbul)</option>
                          <option value="deboss">Deboss (Huruf Tenggelam)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. Upload Logo / Icon Gelang */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-black">
                        4. Upload Ikon / Logo Gelang (Opsional):
                      </label>
                      {wristbandLogo && (
                        <button
                          type="button"
                          onClick={() => setWristbandLogo(null)}
                          className="text-[10px] font-bold text-red-600 underline cursor-pointer"
                        >
                          Hapus Ikon
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      ref={wristbandLogoInputRef}
                      onChange={(e) => handleLogoUpload(e, 'wristband')}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => wristbandLogoInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-black bg-neutral-50 hover:bg-neutral-100 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{wristbandLogo ? 'Ganti Ikon Karet' : 'Unggah Ikon / Logo Karet'}</span>
                    </button>
                  </div>

                  {/* WhatsApp Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Halo BDGMERCH, saya ingin minta penawaran untuk Gelang Karet Custom:\n- Lebar Gelang: ${wristbandWidth} cm\n- Warna Dasar: ${wristbandColor}\n- Tulisan Karet: ${wristbandText}\n- Model Cetak: ${wristbandStyle === 'emboss' ? 'Emboss (Timbul)' : 'Deboss (Tenggelam)'}\n- Panjang Standar: 19 cm (Diameter 6 cm)\n- Estimasi Order: 100 Pcs`;
                      window.open(`https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 rounded-full bg-[#facc15] text-black font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>MINTA PENAWARAN VIA WA (081312211161)</span>
                  </button>

                </div>

                {/* RIGHT COLUMN: SIMULATOR DUAL VIEW (7 COLS) */}
                {/* 1. 3D Isometric View + 2. Unrolled Flat Print View */}
                <div className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between min-h-[560px] space-y-6">
                  
                  {/* Header Indicator */}
                  <div className="w-full flex items-center justify-between pb-3 border-b-2 border-black">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 border border-black"></span>
                      <span className="w-3 h-3 rounded-full bg-[#facc15] border border-black"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500 border border-black"></span>
                      <span className="text-xs font-black uppercase text-black ml-2">
                        SIMULATOR GELANG KARET ({wristbandWidth} CM)
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-black text-[#facc15] px-2.5 py-1 rounded">
                      100% SILIKON PVC
                    </span>
                  </div>

                  {/* VIEW 1: 3D ISOMETRIC WRISTBAND */}
                  <div className="relative w-full max-w-[420px] mx-auto aspect-[16/9] flex items-center justify-center">
                    <svg viewBox="0 0 400 220" className="w-full h-full drop-shadow-2xl">
                      <defs>
                        <linearGradient id="band3DGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={wristbandColor} stopOpacity="0.85" />
                          <stop offset="50%" stopColor={wristbandColor} stopOpacity="1" />
                          <stop offset="100%" stopColor={wristbandColor} stopOpacity="0.75" />
                        </linearGradient>
                        <filter id="wristEmbossEffect">
                          <feDropShadow dx="1" dy="2" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.6" />
                        </filter>
                      </defs>

                      {/* Outer Ring Ellipse based on selected width */}
                      <ellipse 
                        cx="200" 
                        cy="110" 
                        rx="160" 
                        ry="65" 
                        fill="none" 
                        stroke="#000000" 
                        strokeWidth={wristbandWidth === '1.2' ? '22' : wristbandWidth === '1.5' ? '28' : wristbandWidth === '1.7' ? '32' : wristbandWidth === '2.0' ? '38' : '44'} 
                      />
                      <ellipse 
                        cx="200" 
                        cy="110" 
                        rx="160" 
                        ry="65" 
                        fill="none" 
                        stroke="url(#band3DGrad)" 
                        strokeWidth={wristbandWidth === '1.2' ? '18' : wristbandWidth === '1.5' ? '24' : wristbandWidth === '1.7' ? '28' : wristbandWidth === '2.0' ? '34' : '40'} 
                      />
                      
                      {/* Inner Hole Cutout */}
                      <ellipse cx="200" cy="110" rx="136" ry="46" fill="#f8f8f8" stroke="#000000" strokeWidth="4" />

                      {/* Front Curve Highlight */}
                      <path
                        d="M 40 110 C 40 170, 360 170, 360 110"
                        fill="none"
                        stroke="#000000"
                        strokeWidth={wristbandWidth === '1.2' ? '22' : wristbandWidth === '1.5' ? '28' : wristbandWidth === '1.7' ? '32' : wristbandWidth === '2.0' ? '38' : '44'}
                      />
                      <path
                        d="M 40 110 C 40 170, 360 170, 360 110"
                        fill="none"
                        stroke={wristbandColor}
                        strokeWidth={wristbandWidth === '1.2' ? '18' : wristbandWidth === '1.5' ? '24' : wristbandWidth === '1.7' ? '28' : wristbandWidth === '2.0' ? '34' : '40'}
                      />

                      {/* Debossed/Embossed Text on Front Ring */}
                      <text
                        x="200"
                        y={wristbandWidth === '2.5' ? "158" : wristbandWidth === '2.0' ? "154" : "150"}
                        textAnchor="middle"
                        fill={wristbandTextColor}
                        fontSize={wristbandWidth === '1.2' ? '14' : wristbandWidth === '2.5' ? '20' : '16'}
                        fontWeight="900"
                        fontFamily="sans-serif"
                        letterSpacing="2"
                        filter="url(#wristEmbossEffect)"
                      >
                        {wristbandText.toUpperCase() || 'BDGMERCH WRISTBAND'}
                      </text>
                    </svg>

                    {/* Logo Overlay on 3D Wristband if uploaded */}
                    {wristbandLogo && (
                      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/95 p-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000]">
                        <img src={wristbandLogo} alt="Logo Gelang" className="h-6 w-auto object-contain" />
                      </div>
                    )}
                  </div>

                  {/* VIEW 2: UNROLLED FLAT PRINT VIEW (FABRIC.JS INTERACTIVE CANVAS) */}
                  <WristbandCanvas
                    wristbandWidth={wristbandWidth}
                    wristbandColor={wristbandColor}
                    wristbandTextColor={wristbandTextColor}
                    wristbandText={wristbandText}
                    onWristbandTextChange={(newText) => setWristbandText(newText)}
                    wristbandStyle={wristbandStyle}
                    wristbandLogo={wristbandLogo}
                    onWristbandLogoChange={(newLogo) => setWristbandLogo(newLogo)}
                    autoRemoveBg={autoRemoveBg}
                    onAutoRemoveBgChange={(val) => setAutoRemoveBg(val)}
                  />

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-200 text-center">
                    <div className="p-2 bg-neutral-100 rounded-xl border border-black text-[10px] font-black text-black">
                      Anti Air & Tahan Sobek
                    </div>
                    <div className="p-2 bg-neutral-100 rounded-xl border border-black text-[10px] font-black text-black">
                      Warna Cerah Tak Pudar
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-2 bg-[#facc15] rounded-xl border border-black text-[10px] font-black text-black">
                      MOQ Mulai 100 Pcs
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* MOBILE FLOATING BOTTOM NAVBAR FOR QUICK STUDIO CONTROLS (HP ONLY) */}
            {/* [Product (Warna)] | [Upload Logo] | [Add Text] | [Position] */}
            {/* ========================================================================= */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-black/95 text-white border-2 border-[#facc15] rounded-2xl p-2 shadow-[0px_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="grid grid-cols-4 gap-1 text-center">
                
                {/* 1. Product (Warna) */}
                <button
                  type="button"
                  onClick={() => {
                    const colors = ['#000000', '#ffffff', '#1e293b', '#dc2626', '#3f4f34', '#facc15', '#9ca3af'];
                    const nextIdx = (colors.indexOf(shirtColor) + 1) % colors.length;
                    setShirtColor(colors[nextIdx]);
                    if (studioMainTab === 'gelang') {
                      setWristbandColor(colors[nextIdx]);
                    }
                  }}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center gap-1 active:bg-[#facc15] active:text-black transition-colors"
                >
                  <Palette className="w-4 h-4 text-[#facc15]" />
                  <span className="text-[9px] font-black uppercase">Warna</span>
                </button>

                {/* 2. Upload Logo */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center gap-1 active:bg-[#facc15] active:text-black transition-colors"
                >
                  <Upload className="w-4 h-4 text-[#facc15]" />
                  <span className="text-[9px] font-black uppercase">Upload</span>
                </button>

                {/* 3. Add Text */}
                <button
                  type="button"
                  onClick={() => {
                    const promptText = window.prompt("Masukkan tulisan/teks custom:", shirtCustomText);
                    if (promptText !== null) {
                      setShirtCustomText(promptText);
                      setWristbandText(promptText);
                    }
                  }}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center gap-1 active:bg-[#facc15] active:text-black transition-colors"
                >
                  <Type className="w-4 h-4 text-[#facc15]" />
                  <span className="text-[9px] font-black uppercase">Teks</span>
                </button>

                {/* 4. Position Snap */}
                <button
                  type="button"
                  onClick={() => {
                    if (shirtPreset === 'front-center') {
                      handleSnapPreset('left-chest');
                    } else {
                      handleSnapPreset('front-center');
                    }
                  }}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center gap-1 active:bg-[#facc15] active:text-black transition-colors"
                >
                  <Move className="w-4 h-4 text-[#facc15]" />
                  <span className="text-[9px] font-black uppercase">
                    {shirtPreset === 'left-chest' ? 'Dada Kiri' : 'Depan'}
                  </span>
                </button>

              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PAGE 4: KENAPA BDGMERCH */}
        {/* ------------------------------------------------------------- */}
        {currentPage === 'kenapa-bdgmerch' && (
          <div className="py-12 max-w-7xl mx-auto px-6 sm:px-10 animate-fadeIn">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#facc15] text-xs font-black uppercase tracking-wider mb-3">
                Keunggulan Vendor
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
                Kenapa Memilih BDGMERCH?
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base font-medium mt-2">
                10+ Tahun Menjadi Mitra Terpercaya Ratusan Perusahaan, Event Organizer, Brand Distro, dan Komunitas se-Indonesia.
              </p>
            </div>

            {/* Comparison Section (Responsive Table on Desktop & Modern Stacked Card View on Mobile) */}
            <div className="bg-white border-2 border-black rounded-3xl p-4 sm:p-8 md:p-10 shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-black">
                    Perbandingan BDGMERCH vs Vendor Biasa
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
                    Kenali standar mutu dan proteksi transaksi langsung pabrik kami dibanding makelar umum.
                  </p>
                </div>
                <div className="self-start sm:self-auto shrink-0 px-3 py-1 bg-[#facc15] border-2 border-black rounded-full text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                  Garansi Kualitas 100%
                </div>
              </div>

              {/* 1. DESKTOP & TABLET VIEW: Optimized Matrix Table */}
              <div className="hidden md:block overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[620px] table-fixed">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="py-3.5 px-4 font-black text-xs uppercase text-neutral-600 w-[30%]">
                        KRITERIA KUALITAS
                      </th>
                      <th className="py-3.5 px-4 font-black text-xs uppercase bg-[#facc15] text-black border-2 border-black rounded-t-xl text-center shadow-[2px_-2px_0px_#000] w-[38%]">
                        <div className="flex items-center justify-center gap-1.5">
                          <span>BDGMERCH</span>
                          <span className="w-2 h-2 rounded-full bg-black"></span>
                        </div>
                      </th>
                      <th className="py-3.5 px-4 font-black text-xs uppercase text-neutral-500 text-center w-[32%]">
                        VENDOR MAKELAR / RESELLER
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-xs">
                    {/* BARIS 1 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Sumber & Ekosistem Produksi
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black">
                        <span>Jaringan Mitra Manufaktur Terintegrasi</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Dikelola tim berpengalaman, rantai produksi efisien)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Dilempar ke pihak ketiga tanpa pengawasan langsung
                      </td>
                    </tr>

                    {/* BARIS 2 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Kecepatan & Kontrol Jadwal
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black">
                        <span>Monitoring Proaktif & Transparan</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Laporan progres berkala; update cepat jika ada kendala)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Sering molor tanpa kepastian & komunikasi
                      </td>
                    </tr>

                    {/* BARIS 3 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Quality Control (QC)
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black">
                        <span>Standardisasi QC Multi-Tahap</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Pemeriksaan ketat dari bahan, sablon/jahit, hingga finishing)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Langsung packing tanpa sortir barang cacat
                      </td>
                    </tr>

                    {/* BARIS 4 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Garansi & Presisi Hasil
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black">
                        <span>100% Sesuai Sampel & Setting Approval</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Garansi ganti baru jika tidak presisi)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Lepas tangan setelah barang dikirim
                      </td>
                    </tr>

                    {/* BARIS 5 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Prosedur Approval
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black">
                        <span>Sign-off Sample Acuan</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Produksi massal jalan setelah sampel disetujui)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Tidak ada acuan sampel baku (hasil rawan beda)
                      </td>
                    </tr>

                    {/* BARIS 6 */}
                    <tr>
                      <td className="py-4 px-4 font-black text-black break-words">
                        Legalitas & Transaksi B2B
                      </td>
                      <td className="py-4 px-4 bg-[#facc15]/20 border-x-2 border-black text-center font-black text-black border-b-2">
                        <span>Dokumen Transaksi Resmi Lengkap</span>
                        <span className="block text-[11px] font-bold text-neutral-700 mt-0.5">
                          (Invoice, Surat Jalan & Kuitansi Resmi)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-neutral-500 text-center font-medium break-words">
                        Hanya nota perorangan / tanpa legalitas
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 2. MOBILE VIEW (< md): Stacked Modern Comparison Cards (No horizontal scroll required) */}
              <div className="md:hidden space-y-4">
                {[
                  {
                    kriteria: 'Sumber & Ekosistem Produksi',
                    bdgmerch: 'Jaringan Mitra Manufaktur Terintegrasi',
                    bdgDetail: 'Dikelola tim berpengalaman, rantai produksi efisien',
                    vendor: 'Dilempar ke pihak ketiga tanpa pengawasan langsung'
                  },
                  {
                    kriteria: 'Kecepatan & Kontrol Jadwal',
                    bdgmerch: 'Monitoring Proaktif & Transparan',
                    bdgDetail: 'Laporan progres berkala; update cepat jika ada kendala',
                    vendor: 'Sering molor tanpa kepastian & komunikasi'
                  },
                  {
                    kriteria: 'Quality Control (QC)',
                    bdgmerch: 'Standardisasi QC Multi-Tahap',
                    bdgDetail: 'Pemeriksaan ketat dari bahan, sablon/jahit, hingga finishing',
                    vendor: 'Langsung packing tanpa sortir barang cacat'
                  },
                  {
                    kriteria: 'Garansi & Presisi Hasil',
                    bdgmerch: '100% Sesuai Sampel & Setting Approval',
                    bdgDetail: 'Garansi ganti baru jika tidak presisi',
                    vendor: 'Lepas tangan setelah barang dikirim'
                  },
                  {
                    kriteria: 'Prosedur Approval',
                    bdgmerch: 'Sign-off Sample Acuan',
                    bdgDetail: 'Produksi massal jalan setelah sampel disetujui',
                    vendor: 'Tidak ada acuan sampel baku (hasil rawan beda)'
                  },
                  {
                    kriteria: 'Legalitas & Transaksi B2B',
                    bdgmerch: 'Dokumen Transaksi Resmi Lengkap',
                    bdgDetail: 'Invoice, Surat Jalan & Kuitansi Resmi',
                    vendor: 'Hanya nota perorangan / tanpa legalitas'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-2 border-black rounded-2xl p-4 bg-neutral-50 shadow-[3px_3px_0px_#000]">
                    {/* Header Kriteria */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-200">
                      <span className="w-5 h-5 rounded-full bg-black text-[#facc15] font-black text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-black text-xs uppercase tracking-tight text-black break-words">
                        {item.kriteria}
                      </h3>
                    </div>

                    {/* Grid Komparasi Stacked */}
                    <div className="space-y-2 text-xs">
                      {/* BDGMERCH (Highlight Card) */}
                      <div className="p-3 bg-[#facc15]/30 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                        <div className="flex items-center gap-1.5 font-black text-[11px] uppercase text-black mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>BDGMERCH (Pabrik Langsung)</span>
                        </div>
                        <p className="font-black text-black text-xs leading-snug break-words">
                          {item.bdgmerch}
                        </p>
                        <p className="text-[11px] font-bold text-neutral-700 mt-1 leading-snug break-words">
                          {item.bdgDetail}
                        </p>
                      </div>

                      {/* Vendor Biasa Card */}
                      <div className="p-3 bg-white border border-neutral-300 rounded-xl">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase text-neutral-500 mb-1">
                          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
                          <span>Vendor Makelar / Reseller</span>
                        </div>
                        <p className="text-neutral-600 text-xs font-medium leading-snug break-words">
                          {item.vendor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Feature Pillars (Modern Icon-based 2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-5 sm:p-6 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#facc15] border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000]">
                    <Tag className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase text-black mb-2 leading-tight">
                    HARGA TERJANGKAU DI KELASNYA
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Akses langsung ke jaringan manufaktur terintegrasi di Bandung. Dapatkan harga tangan pertama yang sangat kompetitif tanpa mengorbankan standar kualitas.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#facc15] border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000]">
                    <Clock className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase text-black mb-2 leading-tight">
                    GARANSI TEPAT WAKTU
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Komitmen pengerjaan ketat untuk kebutuhan event, komunitas, & instansi. Jaminan pengiriman tepat sesuai deadline yang disepakati.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#facc15] border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000]">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase text-black mb-2 leading-tight">
                    FREE SAMPLE & ACC PROOFING
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Sampel fisik & foto proofing warna disediakan sebelum produksi massal berjalan untuk memastikan hasil 100% presisi.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#facc15] border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_#000]">
                    <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase text-black mb-2 leading-tight">
                    GARANSI 100% GANTI BARU
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Jaminan kualitas penuh. Jika barang mengalami cacat produksi atau tidak sesuai sampel approval, kami ganti baru 100%.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => openPenawaranModal()}
                className="bg-[#facc15] text-black font-black px-8 py-4 rounded-full border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-xs uppercase inline-flex items-center gap-2"
              >
                <span>MINTA PENAWARAN HARGA SEKARANG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PAGE 5: FAQ (TANYA JAWAB DARI SUPABASE) */}
        {/* ------------------------------------------------------------- */}
        {currentPage === 'faq' && (
          <div className="py-12 max-w-4xl mx-auto px-6 sm:px-10 animate-fadeIn">
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#facc15] text-xs font-black uppercase tracking-wider mb-3">
                Pertanyaan Umum
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
                Frequently Asked Questions
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base font-medium mt-2">
                Segala hal yang perlu Anda ketahui tentang minimum order, lama pengerjaan, dan alur pemesanan di BDGMERCH.
              </p>
            </div>

            {/* Accordion List from dynamic faqs state */}
            <div className="space-y-4 mb-12">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={faq.id || idx}
                    className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left font-black text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                    >
                      <span className="text-black uppercase">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Need more help card */}
            <div className="bg-black text-white rounded-3xl p-8 border-2 border-black text-center shadow-[6px_6px_0px_#facc15]">
              <h3 className="text-2xl font-black uppercase mb-2">Masih Ada Pertanyaan Lain?</h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium mb-6">
                Customer Service kami siap melayani dan menjawab kebutuhan spesifik Anda setiap hari (08.00 - 21.00 WIB).
              </p>
              <a
                href={getDirectWhatsAppUrl("Halo BDGMERCH, saya ada pertanyaan seputar order merchandise.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#facc15] text-black font-black px-8 py-3.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#fff] hover:translate-y-0.5 transition-all text-xs uppercase inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT WHATSAPP KE 0813-1221-1161</span>
              </a>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-black text-white border-t-2 border-black pt-16 pb-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">BDGMERCH</span>
                <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full inline-block"></span>
              </div>
              <p className="text-xs text-neutral-400 font-medium max-w-md leading-relaxed">
                Vendor resmi merchandise B2B & apparel custom terpercaya 10+ tahun di Bandung. Melayani pengadaan untuk Komunitas, Event Organizer, Universitas, dan Korporasi di seluruh Indonesia.
              </p>
              <div className="text-xs text-neutral-300 font-bold space-y-2 pt-1">
                <p className="leading-relaxed">
                  <span className="text-white font-black">📍 Workshop & Office:</span> Jl. Buana Sari VI No.11, Kujangsari, Kec. Bandung Kidul, Kota Bandung, Jawa Barat 40267
                </p>
                <p className="text-neutral-400">
                  <span className="text-neutral-300 font-black">⏰ Jam Operasional:</span> Senin – Jumat (09.00 – 17.00 WIB) | Sabtu (09.00 – 15.00 WIB)
                </p>
                <p>
                  <span className="text-neutral-300 font-black">📱 WhatsApp:</span>{' '}
                  <a 
                    href={`https://wa.me/${WA_PHONE_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#facc15] hover:underline font-black bg-[#facc15]/10 px-2 py-0.5 rounded border border-[#facc15]/30 inline-block"
                  >
                    0813-1221-1161
                  </a>
                </p>
                <p>
                  <span className="text-neutral-300 font-black">🌐 Domain:</span>{' '}
                  <span className="text-white font-black tracking-wider">WWW.BDGMERCH.COM</span>
                </p>

                {/* Google Maps Button */}
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?cid=11647141355523453505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#facc15] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#fff] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#fff] transition-all cursor-pointer group"
                  >
                    <span>📍 Lihat Lokasi di Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-black stroke-[3] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-black uppercase text-[#facc15] tracking-widest mb-4">Navigasi Halaman</h4>
              <ul className="space-y-2 text-xs font-bold text-neutral-300">
                <li><button onClick={() => navigateTo('home')} className="hover:text-[#facc15] transition-colors cursor-pointer">Beranda</button></li>
                <li><button onClick={() => navigateTo('katalog')} className="hover:text-[#facc15] transition-colors cursor-pointer">Katalog Produk</button></li>
                <li><button onClick={() => navigateTo('custom-studio')} className="hover:text-[#facc15] transition-colors cursor-pointer">Custom Studio (Live Mockup)</button></li>
                <li><button onClick={() => navigateTo('kenapa-bdgmerch')} className="hover:text-[#facc15] transition-colors cursor-pointer">Kenapa BDGMERCH</button></li>
                <li><button onClick={() => navigateTo('faq')} className="hover:text-[#facc15] transition-colors cursor-pointer">FAQ & Bantuan</button></li>
              </ul>
            </div>

            {/* Col 3: Produk Unggulan */}
            <div>
              <h4 className="text-xs font-black uppercase text-[#facc15] tracking-widest mb-4">Produk Utama</h4>
              <ul className="space-y-2 text-xs font-bold text-neutral-300">
                <li>Kaos Cotton Combed 24s/30s</li>
                <li>Gelang Karet (Rubber Wristband)</li>
                <li>Gantungan Kunci Karet 3D</li>
                <li>Hoodie & Crewneck Fleece</li>
                <li>Enamel Pin Logam Cor</li>
                <li>Tali Lanyard Printing HD</li>
              </ul>
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-bold gap-4">
            <p className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} BDGMERCH</span>
              {/* INTERACTIVE SECRET DOT */}
              <button
                onClick={handleSecretDotClick}
                type="button"
                className="w-3.5 h-3.5 rounded-full bg-[#facc15] border border-black inline-flex items-center justify-center hover:scale-150 active:scale-95 transition-all cursor-pointer shadow-[1px_1px_0px_#000] focus:outline-none"
                title="Admin System BDGMERCH"
                aria-label="Admin Access"
              >
                <span className="w-1 h-1 bg-black rounded-full pointer-events-none"></span>
              </button>
              <span>(WWW.BDGMERCH.COM). All Rights Reserved.</span>
            </p>
            <p className="flex items-center gap-2">
              <span>Bandung, Indonesia</span>
              <span>•</span>
              <span className="text-[#facc15]">Garansi Kualitas 100%</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: ADMIN LOGIN (SECRET DOT TRIGGER) */}
      {/* ========================================================================= */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border-2 border-black rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
            <button
              onClick={() => setIsAdminLoginOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full border-2 border-black bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-black" />
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 bg-[#facc15] border-2 border-black rounded-2xl flex items-center justify-center mb-3 shadow-[3px_3px_0px_#000]">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-black uppercase text-black leading-tight">
                ADMIN LOGIN BDGMERCH
              </h2>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Masukkan password autentikasi pengelola katalog produk Supabase.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Password Admin:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan password admin..."
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                  autoFocus
                />
              </div>

              {adminLoginError && (
                <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminLoginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#facc15] text-black font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>MASUK ADMIN PANEL</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADMIN DRAWER / DASHBOARD (KELOLA KATALOG PRODUK) */}
      {/* ========================================================================= */}
      {isAdminDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border-2 border-black rounded-3xl max-w-5xl w-full h-[92vh] shadow-[10px_10px_0px_#000] relative flex flex-col overflow-hidden">
            
            {/* Header Drawer */}
            <div className="p-5 sm:p-6 border-b-2 border-black bg-neutral-50 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#facc15] border-2 border-black rounded-xl flex items-center justify-center font-black">
                  {adminActiveTab === 'products' ? (
                    <Package className="w-5 h-5 text-black" />
                  ) : adminActiveTab === 'clients' ? (
                    <Building2 className="w-5 h-5 text-black" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-black" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-black leading-none">
                    PANEL ADMIN SUPABASE
                  </h2>
                  {/* TAB SWITCHER */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setAdminActiveTab('products')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                        adminActiveTab === 'products'
                          ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#facc15]'
                          : 'bg-white text-black border-black hover:bg-neutral-100'
                      }`}
                    >
                      📦 Katalog Produk ({products.length})
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('clients')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                        adminActiveTab === 'clients'
                          ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#facc15]'
                          : 'bg-white text-black border-black hover:bg-neutral-100'
                      }`}
                    >
                      🏢 Logo Klien & Mitra ({clientLogos.length})
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('faqs')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                        adminActiveTab === 'faqs'
                          ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#facc15]'
                          : 'bg-white text-black border-black hover:bg-neutral-100'
                      }`}
                    >
                      ❓ Manajemen FAQ ({faqs.length})
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('settings')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                        adminActiveTab === 'settings'
                          ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#facc15]'
                          : 'bg-white text-black border-black hover:bg-neutral-100'
                      }`}
                    >
                      ⚙️ Header & Brand
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('seo')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                        adminActiveTab === 'seo'
                          ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#facc15]'
                          : 'bg-white text-black border-black hover:bg-neutral-100'
                      }`}
                    >
                      🔍 SEO MANAGER
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {adminActiveTab === 'products' && (
                  <button
                    onClick={handleResetProductForm}
                    className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Produk</span>
                  </button>
                )}
                {adminActiveTab === 'clients' && (
                  <button
                    onClick={handleResetLogoForm}
                    className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Logo Klien</span>
                  </button>
                )}
                {adminActiveTab === 'faqs' && (
                  <button
                    onClick={handleResetFaqForm}
                    className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah FAQ Baru</span>
                  </button>
                )}
                {adminActiveTab === 'settings' && (
                  <button
                    onClick={handleResetSiteConfig}
                    className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                )}

                <button
                  onClick={handleAdminLogout}
                  className="px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-900 border-2 border-red-900 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  title="Keluar dari mode admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>

                <button
                  onClick={() => setIsAdminDrawerOpen(false)}
                  className="p-2 rounded-xl bg-black text-white hover:bg-neutral-800 border-2 border-black cursor-pointer"
                  title="Tutup Panel"
                >
                  <X className="w-4 h-4 text-[#facc15]" />
                </button>
              </div>
            </div>

            {/* Status Alert Banner */}
            {adminStatusMessage && (
              <div className={`px-6 py-3 text-xs font-black border-b-2 border-black flex items-center justify-between transition-all animate-fadeIn ${
                adminStatusMessage.type === 'success' 
                  ? 'bg-lime-300 text-black shadow-inner' 
                  : 'bg-red-400 text-black shadow-inner'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full border border-black ${adminStatusMessage.type === 'success' ? 'bg-black' : 'bg-white'}`}></span>
                  <span>{adminStatusMessage.text}</span>
                </div>
                <button 
                  onClick={() => setAdminStatusMessage(null)} 
                  className="px-2 py-0.5 bg-black text-white rounded text-[10px] uppercase font-bold hover:bg-neutral-800 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            )}

            {/* Content: TAB 1 (PRODUCTS), TAB 2 (CLIENT LOGOS), OR TAB 3 (FAQS) */}
            {adminActiveTab === 'products' ? (
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
                
                {/* LEFT: FORM TAMBAH / EDIT PRODUK */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full border border-black"></span>
                      <span>{adminEditingProduct ? `Edit Produk: ${adminEditingProduct.name}` : 'Form Tambah Produk Baru'}</span>
                    </h3>
                    {adminEditingProduct && (
                      <button
                        onClick={handleResetProductForm}
                        className="text-[10px] font-black uppercase text-neutral-500 underline"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-3.5">
                    {/* Nama Produk */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Nama Produk: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kaos Cotton Combed 24s Heavyweight"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Kategori & Kategori Label */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Kategori:
                        </label>
                        <select
                          value={productForm.category}
                          onChange={(e) => {
                            const cat = e.target.value as any;
                            const labelMap: Record<string, string> = {
                              apparel: 'Apparel & Seragam',
                              rubber: 'Rubber Merchandise',
                              accessories: 'Aksesoris & Badge',
                              bags: 'Tas & Pouch',
                              headwear: 'Topi & Headwear',
                              packaging: 'Packaging & Souvenir Set'
                            };
                            setProductForm({
                              ...productForm,
                              category: cat,
                              categoryLabel: labelMap[cat] || 'Apparel & Seragam'
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        >
                          <option value="apparel">Apparel & Seragam (Kaos, Hoodie, Polo)</option>
                          <option value="rubber">Rubber Merchandise (Gelang Karet & Keychain)</option>
                          <option value="accessories">Aksesoris & Badge (Pin Enamel, Lanyard)</option>
                          <option value="bags">Tas & Pouch (Tactical Backpack, Tote Bag, Pouch)</option>
                          <option value="headwear">Topi & Headwear (Snapback, Trucker, Bucket Hat)</option>
                          <option value="packaging">Packaging & Souvenir Set (Custom Box, Seminar Kit)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Label Kategori:
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Kaos / Apparel"
                          value={productForm.categoryLabel}
                          onChange={(e) => setProductForm({ ...productForm, categoryLabel: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* MOQ & Estimasi Produksi */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Min. Order (MOQ):
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 24 Pcs / 100 Pcs"
                          value={productForm.moq}
                          onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Estimasi Produksi:
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 5-7 Hari Kerja"
                          value={productForm.leadTime}
                          onChange={(e) => setProductForm({ ...productForm, leadTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Kisaran Harga & Badge */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Kisaran Harga:
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Rp 45.000 - Rp 75.000"
                          value={productForm.priceRange}
                          onChange={(e) => setProductForm({ ...productForm, priceRange: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Badge (Opsional):
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: BEST SELLER / PROMO"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Upload Foto / URL Gambar Supabase Storage */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Foto / Gambar Produk:
                      </label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://... atau gunakan tombol upload di samping"
                            value={productForm.image_url}
                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={isUploadingImage}
                            onClick={() => adminImageInputRef.current?.click()}
                            className="px-4 py-2 bg-[#facc15] text-black border-2 border-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-none cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploadingImage ? 'Mengunggah...' : 'Upload Foto'}</span>
                          </button>
                          <input
                            ref={adminImageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAdminImageUpload}
                            className="hidden"
                          />
                        </div>

                        {productForm.image_url && (
                          <div className="flex items-center gap-3 p-2 bg-neutral-100 border-2 border-black rounded-xl">
                            <img 
                              src={productForm.image_url} 
                              alt="Preview" 
                              className="w-12 h-12 object-cover rounded-lg border border-black bg-white"
                            />
                            <span className="text-[10px] text-neutral-600 truncate flex-1 font-mono">
                              {productForm.image_url}
                            </span>
                            <button
                              type="button"
                              onClick={() => setProductForm({ ...productForm, image_url: '' })}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Deskripsi Produk */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Deskripsi Singkat:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Jelaskan spesifikasi bahan, kelebihan, dan detail produksi..."
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Fitur / Keunggulan Produk (Dipisahkan Koma) */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Fitur / Keunggulan (Pisahkan dengan koma):
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Bahan Cotton 30s Asli, Sablon Plastisol HD, Free Label Leher"
                        value={productForm.featuresText}
                        onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={isSavingProduct}
                        className="flex-1 py-3 bg-[#facc15] text-black border-2 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingProduct ? 'Menyimpan...' : adminEditingProduct ? 'SIMPAN PERUBAHAN' : 'SIMPAN PRODUK KE SUPABASE'}</span>
                      </button>

                      {adminEditingProduct && (
                        <button
                          type="button"
                          onClick={handleResetProductForm}
                          className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 border-2 border-black rounded-xl font-black text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* RIGHT: DAFTAR PRODUK KATALOG SUPABASE */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-3 bg-[#fafafa]">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
                    <span className="text-xs font-black uppercase text-black">
                      Daftar Produk ({products.length})
                    </span>
                    <button
                      onClick={fetchSupabaseProducts}
                      className="text-[10px] font-black uppercase text-black flex items-center gap-1 bg-white px-2 py-1 border border-black rounded hover:bg-[#facc15]"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[calc(92vh-180px)] overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-start justify-between gap-3 hover:bg-yellow-50/50 transition-colors"
                      >
                        {p.image_url ? (
                          <img 
                            src={p.image_url} 
                            alt={p.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-black shrink-0 bg-neutral-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg border border-black bg-neutral-100 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-5 h-5 text-neutral-400" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black uppercase bg-black text-[#facc15] px-1.5 py-0.5 rounded">
                              {p.categoryLabel || p.category}
                            </span>
                            {p.badge && (
                              <span className="text-[9px] font-black uppercase bg-[#facc15] text-black px-1.5 py-0.5 rounded border border-black">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-black text-xs text-black truncate mt-1">
                            {p.name}
                          </h4>
                          <div className="text-[10px] text-neutral-600 font-bold flex items-center gap-2 mt-0.5">
                            <span>MOQ: {p.moq}</span>
                            <span>•</span>
                            <span className="text-black">{p.priceRange || 'Harga Konsultasi'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEditProduct(p)}
                            className="p-1.5 bg-[#facc15] text-black border border-black rounded-lg hover:bg-yellow-400 cursor-pointer"
                            title="Edit Produk"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(p.id, p.name);
                            }}
                            className="p-1.5 bg-red-100 text-red-700 border border-red-700 rounded-lg hover:bg-red-200 cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : adminActiveTab === 'clients' ? (
              /* TAB 2: KELOLA LOGO KLIEN & MITRA (SUPABASE) */
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
                
                {/* LEFT: FORM TAMBAH / EDIT LOGO KLIEN */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full border border-black"></span>
                      <span>{adminEditingLogo ? `Edit Logo: ${adminEditingLogo.client_name}` : 'Form Tambah Logo Klien'}</span>
                    </h3>
                    {adminEditingLogo && (
                      <button
                        onClick={handleResetLogoForm}
                        className="text-[10px] font-black uppercase text-neutral-500 underline"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveClientLogo} className="space-y-4">
                    {/* Nama Perusahaan / Klien */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Nama Perusahaan / Komunitas: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: PT Bank BJB / Telkomsel / Komunitas Vespa"
                        value={clientLogoForm.client_name}
                        onChange={(e) => setClientLogoForm({ ...clientLogoForm, client_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Upload File Logo ke Supabase Storage */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        File / URL Logo Klien: <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://... atau klik tombol upload di samping"
                            value={clientLogoForm.logo_url}
                            onChange={(e) => setClientLogoForm({ ...clientLogoForm, logo_url: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={isUploadingLogo}
                            onClick={() => adminLogoInputRef.current?.click()}
                            className="px-4 py-2 bg-[#facc15] text-black border-2 border-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-none cursor-pointer whitespace-nowrap"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploadingLogo ? 'Mengunggah...' : 'Upload Logo'}</span>
                          </button>
                          <input
                            ref={adminLogoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAdminLogoUpload}
                            className="hidden"
                          />
                        </div>

                        {/* Visual Preview Box */}
                        {clientLogoForm.logo_url && (
                          <div className="p-3 bg-neutral-100 border-2 border-black rounded-xl space-y-2">
                            <div className="text-[10px] font-black uppercase text-neutral-500">Pratinjau Tampilan:</div>
                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-black">
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-neutral-400 mb-1">Mode Asli</div>
                                <img 
                                  src={clientLogoForm.logo_url} 
                                  alt="Preview Full" 
                                  className="h-10 max-w-[120px] object-contain mx-auto"
                                />
                              </div>
                              <div className="w-[1px] h-10 bg-neutral-200"></div>
                              <div className="text-center">
                                <div className="text-[9px] font-bold text-neutral-400 mb-1">Mode Monokrom (Strip)</div>
                                <img 
                                  src={clientLogoForm.logo_url} 
                                  alt="Preview Grayscale" 
                                  className="h-10 max-w-[120px] object-contain grayscale contrast-125 opacity-70 mx-auto"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pengaturan Ukuran Tampilan (Scale) & Urutan */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Skala Ukuran Tampilan:
                        </label>
                        <select
                          value={clientLogoForm.size_scale}
                          onChange={(e) => setClientLogoForm({ ...clientLogoForm, size_scale: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        >
                          <option value="small">Kecil (Tinggi ~h-7 / 28px)</option>
                          <option value="medium">Sedang (Tinggi ~h-9 / 36px - Standar)</option>
                          <option value="large">Besar (Tinggi ~h-11 / 44px)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Urutan Tampil (Order):
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={clientLogoForm.display_order}
                          onChange={(e) => setClientLogoForm({ ...clientLogoForm, display_order: Number(e.target.value) || 1 })}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={isSavingLogo}
                        className="flex-1 py-3 bg-[#facc15] text-black border-2 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingLogo ? 'Menyimpan...' : adminEditingLogo ? 'SIMPAN PERUBAHAN LOGO' : 'SIMPAN LOGO KE SUPABASE'}</span>
                      </button>

                      {adminEditingLogo && (
                        <button
                          type="button"
                          onClick={handleResetLogoForm}
                          className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 border-2 border-black rounded-xl font-black text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* RIGHT: DAFTAR LOGO KLIEN TERPASANG */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-3 bg-[#fafafa]">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
                    <span className="text-xs font-black uppercase text-black">
                      Daftar Logo Klien & Mitra ({clientLogos.length})
                    </span>
                    <button
                      onClick={fetchSupabaseClientLogos}
                      className="text-[10px] font-black uppercase text-black flex items-center gap-1 bg-white px-2 py-1 border border-black rounded hover:bg-[#facc15]"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingLogos ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[calc(92vh-180px)] overflow-y-auto pr-1">
                    {clientLogos.map((client) => (
                      <div
                        key={client.id}
                        className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-center justify-between gap-3 hover:bg-yellow-50/50 transition-colors"
                      >
                        <div className="w-24 h-12 rounded-lg border border-black bg-neutral-50 flex items-center justify-center p-1.5 shrink-0">
                          {client.logo_url ? (
                            <img
                              src={client.logo_url}
                              alt={client.client_name}
                              className="max-h-9 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-xs text-black truncate">
                            {client.client_name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-black uppercase bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded border border-neutral-300">
                              Ukuran: {client.size_scale || 'medium'}
                            </span>
                            <span className="text-[9px] font-bold text-neutral-500">
                              Urutan #{client.display_order || 1}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEditLogo(client)}
                            className="p-1.5 bg-[#facc15] text-black border border-black rounded-lg hover:bg-yellow-400 cursor-pointer"
                            title="Edit Logo"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClientLogo(client.id, client.client_name);
                            }}
                            className="p-1.5 bg-red-100 text-red-700 border border-red-700 rounded-lg hover:bg-red-200 cursor-pointer"
                            title="Hapus Logo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : adminActiveTab === 'faqs' ? (
              /* TAB 3: MANAJEMEN FAQ (SUPABASE) */
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
                
                {/* LEFT: FORM TAMBAH / EDIT FAQ */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full border border-black"></span>
                      <span>{adminEditingFaq ? `Edit FAQ #${adminEditingFaq.display_order}` : 'Form Tambah Pertanyaan FAQ'}</span>
                    </h3>
                    {adminEditingFaq && (
                      <button
                        onClick={handleResetFaqForm}
                        className="text-[10px] font-black uppercase text-neutral-500 underline cursor-pointer"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveFaq} className="space-y-4">
                    {/* Pertanyaan (Question) */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Pertanyaan (Question): <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Berapa Minimum Order Quantity (MOQ) di BDGMERCH?"
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Jawaban (Answer) */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Jawaban Lengkap (Answer): <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tuliskan jawaban yang jelas dan informatif untuk calon pelanggan..."
                        value={faqForm.answer}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none resize-y"
                      />
                    </div>

                    {/* Urutan Tampil (Display Order) */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Urutan Tampil (Display Order):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={faqForm.display_order}
                        onChange={(e) => setFaqForm({ ...faqForm, display_order: Number(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={isSavingFaq}
                        className="flex-1 py-3 bg-[#facc15] text-black border-2 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingFaq ? 'Menyimpan...' : adminEditingFaq ? 'SIMPAN PERUBAHAN FAQ' : 'SIMPAN FAQ KE SUPABASE'}</span>
                      </button>

                      {adminEditingFaq && (
                        <button
                          type="button"
                          onClick={handleResetFaqForm}
                          className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 border-2 border-black rounded-xl font-black text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* RIGHT: DAFTAR FAQ TERPASANG */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-3 bg-[#fafafa]">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
                    <span className="text-xs font-black uppercase text-black">
                      Daftar Pertanyaan FAQ ({faqs.length})
                    </span>
                    <button
                      onClick={fetchSupabaseFaqs}
                      className="text-[10px] font-black uppercase text-black flex items-center gap-1 bg-white px-2 py-1 border border-black rounded hover:bg-[#facc15]"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingFaqs ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[calc(92vh-180px)] overflow-y-auto pr-1">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-3.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-start justify-between gap-3 hover:bg-yellow-50/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase bg-black text-[#facc15] px-1.5 py-0.5 rounded">
                              #{faq.display_order || 1}
                            </span>
                            <h4 className="font-black text-xs text-black leading-snug">
                              {faq.question}
                            </h4>
                          </div>
                          <p className="text-[11px] text-neutral-600 font-medium line-clamp-3 leading-relaxed mt-1">
                            {faq.answer}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 mt-1">
                          <button
                            type="button"
                            onClick={() => handleStartEditFaq(faq)}
                            className="p-1.5 bg-[#facc15] text-black border border-black rounded-lg hover:bg-yellow-400 cursor-pointer"
                            title="Edit FAQ"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFaq(faq.id, faq.question);
                            }}
                            className="p-1.5 bg-red-100 text-red-700 border border-red-700 rounded-lg hover:bg-red-200 cursor-pointer"
                            title="Hapus FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : adminActiveTab === 'settings' ? (
              /* TAB 4: PENGATURAN HEADER & BRAND (SUPABASE / LOCALSTORAGE) */
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
                
                {/* LEFT: FORM EDIT BRAND & HEADER */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                    <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full border border-black"></span>
                      <span>Konfigurasi Header & Announcement Bar</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleResetSiteConfig}
                      className="text-[10px] font-black uppercase text-neutral-500 underline cursor-pointer hover:text-black"
                    >
                      Reset Default
                    </button>
                  </div>

                  <form onSubmit={handleSaveSiteConfig} className="space-y-6">
                    {/* SECTION A: TOP ANNOUNCEMENT BAR */}
                    <div className="p-4 bg-neutral-100 rounded-2xl border-2 border-black space-y-3.5 shadow-[3px_3px_0px_#000]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                          <Megaphone className="w-4 h-4 text-black" />
                          <span>Top Announcement Bar (Banner Atas)</span>
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={configForm.announcement_enabled !== false}
                            onChange={(e) => setConfigForm({ ...configForm, announcement_enabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-black after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#facc15] border border-black"></div>
                        </label>
                      </div>

                      {configForm.announcement_enabled !== false && (
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="block text-[10px] font-black uppercase text-neutral-700 mb-1">
                              Badge / Label Promo:
                            </label>
                            <input
                              type="text"
                              placeholder="Contoh: PROMO PRODUKSI BULAN INI"
                              value={configForm.announcement_badge ?? 'PROMO PRODUKSI BULAN INI'}
                              onChange={(e) => setConfigForm({ ...configForm, announcement_badge: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase text-neutral-700 mb-1">
                              Teks Pesan Pengumuman: <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Contoh: Free Sampel Bahan & Mockup 3D untuk Order di atas 100 Pcs!"
                              value={configForm.announcement_text ?? 'Free Sampel Bahan & Mockup 3D untuk Order di atas 100 Pcs!'}
                              onChange={(e) => setConfigForm({ ...configForm, announcement_text: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[10px] font-black uppercase text-neutral-700 mb-1">
                                Teks Tombol / Link:
                              </label>
                              <input
                                type="text"
                                placeholder="Contoh: Klaim Promo"
                                value={configForm.announcement_link_text ?? 'Klaim Promo'}
                                onChange={(e) => setConfigForm({ ...configForm, announcement_link_text: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-black uppercase text-neutral-700 mb-1">
                                URL Tujuan (Opsional):
                              </label>
                              <input
                                type="text"
                                placeholder="https://... atau kosongkan untuk Modal"
                                value={configForm.announcement_link_url ?? ''}
                                onChange={(e) => setConfigForm({ ...configForm, announcement_link_url: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white text-xs font-bold focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION B: BRAND IDENTITY & LOGO */}
                    <div className="p-4 bg-white rounded-2xl border-2 border-black space-y-3.5 shadow-[3px_3px_0px_#000]">
                      <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>Identitas Brand & Logo Header</span>
                      </span>

                      {/* Brand Name */}
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Nama Brand / Judul Header: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: BDGMERCH"
                          value={configForm.brand_name}
                          onChange={(e) => setConfigForm({ ...configForm, brand_name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Tagline / Subtitle */}
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Tagline / Sub-teks Header:
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: BANDUNG MERCHANDISE VENDOR"
                          value={configForm.tagline}
                          onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Logo Image URL & Upload */}
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Logo Brand (URL atau Upload File):
                        </label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://... atau klik Upload Logo"
                              value={configForm.logo_url}
                              onChange={(e) => setConfigForm({ ...configForm, logo_url: e.target.value })}
                              className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                            />
                            <button
                              type="button"
                              disabled={isUploadingSiteLogo}
                              onClick={() => siteLogoInputRef.current?.click()}
                              className="px-4 py-2 bg-[#facc15] text-black border-2 border-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-none cursor-pointer whitespace-nowrap"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploadingSiteLogo ? 'Mengunggah...' : 'Upload Logo'}</span>
                            </button>
                            <input
                              ref={siteLogoInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleAdminSiteLogoUpload}
                              className="hidden"
                            />
                          </div>

                          {configForm.logo_url && (
                            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600 bg-neutral-100 p-2 rounded-lg border border-neutral-300">
                              <span className="truncate max-w-[280px]">Logo terpasang: {configForm.logo_url}</span>
                              <button
                                type="button"
                                onClick={() => setConfigForm({ ...configForm, logo_url: '' })}
                                className="text-red-600 hover:underline text-[10px] font-black cursor-pointer"
                              >
                                Hapus Logo
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION C: MEDIA SOSIAL & INSTAGRAM (SOCIAL PROOF) */}
                    <div className="p-4 bg-white rounded-2xl border-2 border-black space-y-3.5 shadow-[3px_3px_0px_#000]">
                      <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                        <Instagram className="w-4 h-4 text-black" />
                        <span>Media Sosial & Instagram Section</span>
                      </span>

                      {/* Instagram Handle */}
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Username Instagram (Handle):
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: @bdgmerch.id atau @bdgmerch"
                          value={configForm.instagram_handle ?? '@bdgmerch.id'}
                          onChange={(e) => setConfigForm({ ...configForm, instagram_handle: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                        <span className="text-[10px] text-neutral-500 font-semibold mt-1 block">
                          Ditampilkan pada badge tombol portfolio di section Beranda.
                        </span>
                      </div>

                      {/* Instagram Profile URL */}
                      <div>
                        <label className="block text-[11px] font-black uppercase text-black mb-1">
                          Link Profil Instagram (URL Tautan):
                        </label>
                        <input
                          type="url"
                          placeholder="https://www.instagram.com/bdgmerch.id"
                          value={configForm.instagram_url ?? 'https://www.instagram.com/bdgmerch.id'}
                          onChange={(e) => setConfigForm({ ...configForm, instagram_url: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                        />
                        <span className="text-[10px] text-neutral-500 font-semibold mt-1 block">
                          Tautan tujuan saat pengunjung mengklik tombol Instagram di Beranda.
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSavingConfig}
                        className="w-full py-3 bg-[#facc15] text-black border-2 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingConfig ? 'Menyimpan Pengaturan...' : 'SIMPAN SEMUA PENGATURAN'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT: LIVE HEADER & INSTAGRAM PREVIEW */}
                <div className="lg:col-span-6 p-6 overflow-y-auto space-y-4 bg-[#fafafa]">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
                    <span className="text-xs font-black uppercase text-black">
                      Pratinjau Live Header & Instagram Button
                    </span>
                    <span className="text-[10px] font-black uppercase bg-[#facc15] text-black px-2 py-0.5 rounded border border-black">
                      Real-Time Preview
                    </span>
                  </div>

                  <div className="p-5 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] space-y-3">
                    <div className="text-[10px] font-black uppercase text-neutral-400">Mockup Live Header:</div>
                    
                    {/* Simulated Top Announcement Bar */}
                    {configForm.announcement_enabled !== false && (
                      <div className="bg-black text-white text-[11px] font-black py-2 px-3 rounded-lg border border-black flex flex-wrap items-center justify-center gap-1.5">
                        <span className="bg-[#facc15] text-black px-2 py-0.5 rounded-full text-[9px] uppercase font-black">
                          {configForm.announcement_badge || 'PROMO PRODUKSI BULAN INI'}
                        </span>
                        <span className="truncate max-w-[240px]">
                          {configForm.announcement_text || 'Free Sampel Bahan & Mockup 3D'}
                        </span>
                        <span className="underline text-[#facc15] font-black inline-flex items-center gap-0.5 text-[10px]">
                          {configForm.announcement_link_text || 'Klaim Promo'} <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                        </span>
                      </div>
                    )}

                    {/* Simulated Header Navbar */}
                    <div className="p-3 bg-[#f8f8f8] border-2 border-black rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {configForm.logo_url ? (
                          <img
                            src={configForm.logo_url}
                            alt={configForm.brand_name || 'Brand Logo'}
                            className="h-9 max-h-9 w-auto object-contain drop-shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <img
                            src="logo.png"
                            alt="BDGMERCH"
                            className="h-9 max-h-9 w-auto object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}

                        <div className="flex flex-col">
                          <span className="text-lg font-black tracking-tight text-black leading-none flex items-center gap-1.5">
                            {configForm.brand_name || 'BDGMERCH'}
                            <span className="w-2 h-2 bg-[#facc15] border border-black rounded-full inline-block shrink-0"></span>
                          </span>
                          <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mt-0.5">
                            {configForm.tagline || 'BANDUNG MERCHANDISE VENDOR'}
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase text-neutral-600">
                        <span className="px-2 py-1 bg-black text-[#facc15] rounded-full border border-black">Beranda</span>
                        <span className="px-2 py-1">Katalog</span>
                        <span className="px-2 py-1">Studio</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Instagram Badge in Home */}
                  <div className="p-5 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] space-y-3">
                    <div className="text-[10px] font-black uppercase text-neutral-400">Mockup Live Tombol Instagram Beranda:</div>
                    <div className="p-4 bg-neutral-50 border-2 border-black rounded-xl text-center flex flex-col items-center justify-center">
                      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#facc15] text-black border-2 border-black shadow-[3px_3px_0px_#000]">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center text-white border border-black">
                          <Instagram className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-black uppercase text-black block leading-tight">
                            {configForm.instagram_handle || '@bdgmerch.id'}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-800 block truncate max-w-[200px]">
                            {configForm.instagram_url || 'https://www.instagram.com/bdgmerch.id'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settings Information Helper */}
                  <div className="p-4 bg-yellow-50/70 border-2 border-black rounded-xl space-y-2 text-xs">
                    <div className="font-black text-black flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Sinkronisasi Otomatis Supabase</span>
                    </div>
                    <p className="text-[11px] text-neutral-700 font-medium leading-relaxed">
                      Pengaturan brand, logo, dan Top Announcement Bar ini tersimpan langsung di <strong className="text-black">Supabase (tabel site_settings)</strong> dan disinkronkan ke <strong className="text-black">LocalStorage</strong> browser pengunjung.
                    </p>
                  </div>
                </div>

              </div>
            ) : adminActiveTab === 'seo' ? (
              /* TAB 5: SEO MANAGER */
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
                {/* LEFT: FORM EDIT SEO */}
                <div className="lg:col-span-8 p-6 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full border border-black"></span>
                      <span>Konfigurasi SEO Global (Meta Tags)</span>
                    </h3>
                  </div>
                  <form onSubmit={handleSaveSiteConfig} className="space-y-4">
                    {/* Meta Title */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Meta Title (Judul Halaman):
                      </label>
                      <input
                        type="text"
                        placeholder="BDGMERCH - Vendor Gelang Karet & Custom Sablon Kaos Bandung"
                        value={configForm.meta_title || ''}
                        onChange={(e) => setConfigForm({ ...configForm, meta_title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none"
                      />
                    </div>
                    {/* Meta Description */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Meta Description (Deskripsi Halaman):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Vendor pembuatan gelang karet silikon custom..."
                        value={configForm.meta_description || ''}
                        onChange={(e) => setConfigForm({ ...configForm, meta_description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none resize-none"
                      ></textarea>
                    </div>
                    {/* Meta Keywords */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-black mb-1">
                        Meta Keywords (Kata Kunci):
                      </label>
                      <textarea
                        rows={2}
                        placeholder="vendor gelang karet bandung, sablon kaos bandung..."
                        value={configForm.meta_keywords || ''}
                        onChange={(e) => setConfigForm({ ...configForm, meta_keywords: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSavingConfig}
                        className="w-full py-3 bg-[#facc15] text-black border-2 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingConfig ? 'Menyimpan Pengaturan...' : 'SIMPAN PENGATURAN SEO'}</span>
                      </button>
                    </div>
                  </form>
                </div>
                {/* RIGHT: INFO */}
                <div className="lg:col-span-4 p-6 overflow-y-auto space-y-4 bg-[#fafafa]">
                  <div className="p-4 bg-white border-2 border-black rounded-xl space-y-2 text-xs shadow-[4px_4px_0px_#000]">
                    <div className="font-black text-black flex items-center gap-1.5 border-b-2 border-black pb-2 mb-2">
                      <Search className="w-4 h-4 text-black" />
                      <span>Google Search Preview</span>
                    </div>
                    <div>
                      <div className="text-[#1a0dab] text-sm font-normal truncate">{configForm.meta_title || 'BDGMERCH - Vendor Gelang Karet & Custom Sablon Kaos Bandung'}</div>
                      <div className="text-[#006621] text-[10px] mb-1 truncate">{typeof window !== 'undefined' ? window.location.origin : 'https://bdgmerch.id'}</div>
                      <div className="text-[#545454] text-[11px] leading-snug line-clamp-2">{configForm.meta_description || 'Vendor pembuatan gelang karet silikon custom, sablon kaos, hoodie, dan enamel pin terpercaya di Bandung. Berpengalaman dengan 40+ ulasan positif.'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Bottom Info Bar for Supabase RLS policies */}
            <div className="p-3 bg-neutral-100 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 text-[11px] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-black text-neutral-800 uppercase tracking-tight">
                  Status Database: Terhubung ke Supabase ({products.length} Produk • {clientLogos.length} Klien • {faqs.length} FAQ)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-neutral-600">
                  💡 Tips RLS Policy Supabase:
                </span>
                <code className="text-[9px] bg-white px-2 py-0.5 rounded border border-neutral-300 font-mono font-bold text-black select-all">
                  ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL FORM: MINTA PENAWARAN HARGA (AUTO WHATSAPP REDIRECT) */}
      {/* ========================================================================= */}
      {isPenawaranOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-2 border-black rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsPenawaranOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full border-2 border-black bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Tutup Modal"
            >
              <X className="w-4 h-4 text-black" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#facc15] text-black text-[10px] font-black uppercase mb-2 border border-black">
                <Tag className="w-3 h-3" />
                <span>Formulir Cepat Penawaran</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-black leading-tight">
                MINTA PENAWARAN HARGA
              </h2>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Isi form berikut. Setelah menekan tombol kirim, teks akan otomatis terformat dan membuka WhatsApp kami di <strong className="text-black">0813-1221-1161</strong>.
              </p>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmitPenawaran} className="space-y-4">
              
              {/* 1. Nama Lengkap */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Nama Lengkap: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>

              {/* 2. Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Nomor WhatsApp: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>

              {/* 3. Perusahaan / Komunitas */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Perusahaan / Komunitas:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Sumber Makmur / Komunitas Rider Bandung"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>

              {/* 4. Jenis Produk & Qty in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Jenis Produk: <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                  >
                    <option value="Kaos Custom Cotton Combed 24s/30s">Kaos Cotton Combed</option>
                    <option value="Gelang Karet Custom (Rubber Wristband)">Gelang Karet (Wristband)</option>
                    <option value="Gantungan Kunci Karet Custom (Keychain 2D/3D)">Gantungan Kunci Karet</option>
                    <option value="Hoodie & Crewneck Fleece Cotton">Hoodie & Crewneck Fleece</option>
                    <option value="Polo Shirt Lacoste Pique CVC">Polo Shirt Lacoste</option>
                    <option value="Label Karet / Rubber Patch 3D">Label Karet / Rubber Patch</option>
                    <option value="Enamel Pin Logam Cor & Lapel Pin">Enamel Pin Logam</option>
                    <option value="Tali Lanyard Printing HD & ID Card">Tali Lanyard Printing</option>
                    <option value="Topi Custom Bordir (Trucker/Snapback)">Topi Custom Bordir</option>
                    <option value="Produk Kustom Lainnya">Produk Kustom Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Jumlah Pcs (Qty): <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="Contoh: 50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                  />
                </div>
              </div>

              {/* 5. Catatan Tambahan */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Catatan Tambahan / Spesifikasi:
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Sablon 3 warna di depan, target pengerjaan selesai tanggal 25, kirim ke Jakarta."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>

              {/* SUBMIT BUTTON: KIRIM PERMINTAAN PENAWARAN */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#facc15] text-black font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>KIRIM PERMINTAAN PENAWARAN (KE WA 0813-1221-1161)</span>
              </button>

            </form>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-bold text-neutral-500">
                🔒 Data Anda aman dan langsung terhubung ke Customer Support resmi BDGMERCH.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON (Pojok Kanan Bawah) */}
      <a
        href={getDirectWhatsAppUrl("Halo BDGMERCH, saya ingin konsultasi order merchandise.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#facc15] text-black border-2 border-black p-3.5 sm:px-5 sm:py-3.5 rounded-full font-black text-xs flex items-center gap-2 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all group"
        title="Chat Langsung via WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-black text-black" />
        <span className="hidden sm:inline uppercase">CHAT 0813-1221-1161</span>
      </a>
      </div>
  );
}
