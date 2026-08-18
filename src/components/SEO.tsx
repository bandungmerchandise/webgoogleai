import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  brandName?: string;
  telephone?: string;
  ratingValue?: string;
  reviewCount?: string;
  city?: string;
  province?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "BDGMERCH - Vendor Gelang Karet & Custom Sablon Kaos Bandung",
  description = "Vendor pembuatan gelang karet silikon custom, sablon kaos, hoodie, dan enamel pin terpercaya di Bandung. Berpengalaman dengan 40+ ulasan positif.",
  keywords = "vendor gelang karet bandung, sablon kaos bandung, wristband karet custom, konveksi kaos bandung, merchandise bandung, vendor custom merchandise, gantungan kunci karet, pin enamel bandung",
  ogImage = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&auto=format&fit=crop&q=80",
  canonicalUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bdgmerch.id',
  brandName = "BDGMERCH",
  telephone = "081312211161",
  ratingValue = "4.8",
  reviewCount = "42",
  city = "Bandung",
  province = "Jawa Barat"
}) => {
  // Schema.org LocalBusiness & AggregateRating
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalUrl}/#localbusiness`,
    "name": brandName,
    "image": ogImage,
    "telephone": telephone,
    "priceRange": "$$",
    "url": canonicalUrl,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": province,
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.9175,
      "longitude": 107.6191
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/bdgmerch",
      "https://wa.me/628131221161"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": "5.0",
      "worstRating": "1.0",
      "reviewCount": reviewCount
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pembuatan Gelang Karet Wristband Custom"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sablon Kaos & Konveksi Merchandise Bandung"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={brandName} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="ID-JB" />
      <meta name="geo.placename" content="Bandung" />
      <meta name="geo.position" content="-6.9175;107.6191" />
      <meta name="ICBM" content="-6.9175, 107.6191" />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn / Telegram) */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};
