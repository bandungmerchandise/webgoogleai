import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductItem, FaqItem } from '../types';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  brandName?: string;
  logoUrl?: string;
  telephone?: string;
  email?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  ratingValue?: string;
  reviewCount?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  streetAddress?: string;
  latitude?: number;
  longitude?: number;
  products?: ProductItem[];
  faqs?: FaqItem[];
  pageType?: 'website' | 'article' | 'product';
  currentRoute?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "BDGMERCH - Vendor Konveksi & Pabrik Custom Merchandise Bandung Terpercaya",
  description = "Pabrik & Vendor Merchandise B2B resmi di Bandung. Spesialis Gelang Karet (Wristband), Sablon Kaos Combed, Hoodie, Polo, Pin Enamel Logam, Lanyard, Goodie Bag & Souvenir Kit. Garansi 100% Ganti Baru & Pengerjaan On-Time.",
  keywords = "Vendor Konveksi Bandung, Pabrik Merchandise Custom, Vendor Gelang Karet Bandung, Sablon Kaos Bandung, Konveksi Kaos Bandung, Wristband Karet Custom, Pouch & Totebag Promosi, Pin Enamel Bandung, Lanyard Custom Bandung, Cetak Merchandise B2B, Seminar Kit Bandung, Vendor Merchandise Event",
  ogImage = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&auto=format&fit=crop&q=80",
  canonicalUrl = "https://bdgmerch.com",
  brandName = "BDGMERCH",
  logoUrl = "https://bdgmerch.com/logo.png",
  telephone = "+6281312211161",
  email = "halo@bdgmerch.com",
  instagramUrl = "https://www.instagram.com/bdgmerch",
  instagramHandle = "@bdgmerch",
  ratingValue = "4.8",
  reviewCount = "48",
  city = "Bandung",
  province = "Jawa Barat",
  postalCode = "40115",
  streetAddress = "Jl. Sukaluyu No. 18, Cibeunying Kaler",
  latitude = -6.9175,
  longitude = 107.6191,
  products = [],
  faqs = [],
  pageType = "website",
  currentRoute = ""
}) => {
  // Ensure absolute canonical URL
  const baseDomain = "https://bdgmerch.com";
  const cleanRoute = currentRoute ? (currentRoute.startsWith('#') ? currentRoute : `/#${currentRoute}`) : '';
  const finalCanonical = `${baseDomain}${cleanRoute}`;
  const cleanWaDigits = telephone.replace(/[^0-9]/g, '') || "6281312211161";

  // Organization Schema
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${baseDomain}/#organization`,
    "name": brandName,
    "url": baseDomain,
    "logo": {
      "@type": "ImageObject",
      "url": logoUrl || ogImage,
      "width": "512",
      "height": "512"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": telephone,
        "contactType": "customer service",
        "areaServed": "ID",
        "availableLanguage": ["Indonesian", "English"],
        "contactOption": "TollFree"
      }
    ],
    "sameAs": [
      instagramUrl,
      "https://www.tiktok.com/@bdgmerch",
      `https://wa.me/${cleanWaDigits}`
    ]
  };

  // LocalBusiness & Manufacturer Schema
  const localBusinessSchema = {
    "@type": ["LocalBusiness", "Manufacturer", "ProfessionalService"],
    "@id": `${baseDomain}/#localbusiness`,
    "name": `${brandName} - Pabrik & Vendor Merchandise Bandung`,
    "alternateName": "Bandung Merchandise & Custom Apparel Vendor",
    "image": [
      ogImage,
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=80"
    ],
    "url": baseDomain,
    "telephone": telephone,
    "email": email,
    "priceRange": "Rp 3.500 - Rp 150.000 ($$)",
    "currenciesAccepted": "IDR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, QRIS",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": streetAddress,
      "addressLocality": city,
      "addressRegion": province,
      "postalCode": postalCode,
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": "5.0",
      "worstRating": "1.0",
      "ratingCount": reviewCount,
      "reviewCount": reviewCount
    },
    "sameAs": [
      instagramUrl,
      "https://www.tiktok.com/@bdgmerch",
      `https://wa.me/${cleanWaDigits}`
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Katalog Merchandise Custom B2B BDGMERCH",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Rubber Merchandise & Gelang Karet",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Gelang Karet Wristband Silikon",
                "description": "Gelang karet custom logo timbul, deboss tinta, glow in the dark, dan kancing sambung untuk tiket konser/event."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gantungan Kunci Karet 3D / Rubber Keychain",
                "description": "Gantungan kunci karet PVC lentur micro-injection presisi dengan ring anti-karat."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Apparel & Konveksi Seragam",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sablon Kaos Cotton Combed 24s/30s & Heavyweight",
                "description": "Kaos custom sablon plastisol / DTF high definition dengan jahitan rantai standar distro."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hoodie & Jaket Komunitas Fleece Tebal",
                "description": "Hoodie jumper / zipper custom bordir komputer tajam dan rib elastis tidak mudah melar."
              }
            }
          ]
        }
      ]
    }
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseDomain}/#website`,
    "url": baseDomain,
    "name": brandName,
    "description": "Vendor Merchandise & Custom Apparel Terpercaya di Bandung",
    "publisher": {
      "@id": `${baseDomain}/#organization`
    },
    "inLanguage": "id-ID",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseDomain}/#katalog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Dynamic FAQPage Schema for Google Rich Snippets
  const faqSchema = faqs && faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": `${baseDomain}/#faqpage`,
    "mainEntity": faqs.slice(0, 10).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Dynamic Product Schema list (top products)
  const productSchemas = products && products.length > 0 ? products.slice(0, 8).map((p) => ({
    "@type": "Product",
    "name": p.name,
    "description": p.description || `${p.name} berkualitas tinggi untuk merchandise B2B dari BDGMERCH.`,
    "category": p.categoryLabel || p.category,
    "image": p.image || ogImage,
    "brand": {
      "@type": "Brand",
      "name": brandName
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "IDR",
      "lowPrice": "15000",
      "highPrice": "125000",
      "offerCount": "100",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": `${baseDomain}/#organization`
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    }
  })) : [];

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${finalCanonical}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": baseDomain
      },
      ...(currentRoute && currentRoute !== 'home' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": currentRoute.toUpperCase().replace('-', ' '),
        "item": finalCanonical
      }] : [])
    ]
  };

  // Aggregate Root JSON-LD Graph
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
      ...productSchemas
    ]
  };

  return (
    <Helmet>
      {/* HTML / Head Baseline */}
      <html lang="id" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={brandName} />
      <meta name="publisher" content={brandName} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${brandName}. All Rights Reserved.`} />
      
      {/* Indexing & Robot Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <link rel="canonical" href={finalCanonical} />

      {/* Local SEO & Geo Tags */}
      <meta name="geo.region" content="ID-JB" />
      <meta name="geo.placename" content="Bandung, Jawa Barat, Indonesia" />
      <meta name="geo.position" content={`${latitude};${longitude}`} />
      <meta name="ICBM" content={`${latitude}, ${longitude}`} />

      {/* Open Graph / Facebook / WhatsApp / Telegram Previews */}
      <meta property="og:type" content={pageType} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${brandName} - Vendor Konveksi & Merchandise Custom Bandung`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={instagramHandle} />
      <meta name="twitter:creator" content={instagramHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Mobile Browser UX & PWA Color */}
      <meta name="theme-color" content="#facc15" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="format-detection" content="telephone=no, address=no, email=no" />

      {/* JSON-LD Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataGraph)}
      </script>
    </Helmet>
  );
};
