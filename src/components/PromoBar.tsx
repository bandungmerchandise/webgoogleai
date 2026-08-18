import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SiteConfig } from '../types';

export interface PromoBarProps {
  siteConfig?: SiteConfig;
  onClaimPromo?: (promoText: string) => void;
}

const STORAGE_PROMO_KEY = 'bdgmerch_promo_bar_v1';
const DEFAULT_PROMO_TEXT = 'Free Sampel Bahan & Mockup 3D untuk Order di atas 100 Pcs!';
const DEFAULT_PROMO_BADGE = 'PROMO PRODUKSI BULAN INI';
const DEFAULT_PROMO_LINK_TEXT = 'Klaim Promo';

export const PromoBar: React.FC<PromoBarProps> = ({ siteConfig, onClaimPromo }) => {
  // State for promo banner details
  const [promoText, setPromoText] = useState<string>(() => {
    if (siteConfig?.announcement_text) return siteConfig.announcement_text;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_PROMO_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.promo_text) return parsed.promo_text;
        }
        const siteConfigSaved = localStorage.getItem('bdgmerch_site_config_v1');
        if (siteConfigSaved) {
          const parsed = JSON.parse(siteConfigSaved);
          if (parsed.announcement_text) return parsed.announcement_text;
        }
      } catch (e) {
        console.warn('Error reading promo text from storage:', e);
      }
    }
    return DEFAULT_PROMO_TEXT;
  });

  const [promoBadge, setPromoBadge] = useState<string>(() => {
    return siteConfig?.announcement_badge || DEFAULT_PROMO_BADGE;
  });

  const [promoLinkText, setPromoLinkText] = useState<string>(() => {
    return siteConfig?.announcement_link_text || DEFAULT_PROMO_LINK_TEXT;
  });

  const [promoLinkUrl, setPromoLinkUrl] = useState<string>(() => {
    return siteConfig?.announcement_link_url || '';
  });

  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    return siteConfig?.announcement_enabled !== false;
  });

  // Keep in sync with parent props when siteConfig changes
  useEffect(() => {
    if (siteConfig) {
      if (siteConfig.announcement_text) setPromoText(siteConfig.announcement_text);
      if (siteConfig.announcement_badge) setPromoBadge(siteConfig.announcement_badge);
      if (siteConfig.announcement_link_text) setPromoLinkText(siteConfig.announcement_link_text);
      if (siteConfig.announcement_link_url !== undefined) setPromoLinkUrl(siteConfig.announcement_link_url);
      if (siteConfig.announcement_enabled !== undefined) setIsEnabled(siteConfig.announcement_enabled);
    }
  }, [
    siteConfig?.announcement_text,
    siteConfig?.announcement_badge,
    siteConfig?.announcement_link_text,
    siteConfig?.announcement_link_url,
    siteConfig?.announcement_enabled,
  ]);

  // Robust Fetch Promo from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    const fetchPromoData = async () => {
      try {
        // 1. Try 'site_settings' table
        const { data: siteData, error: siteError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (!siteError && siteData && isMounted) {
          const text =
            siteData.announcement_text ||
            siteData.promo_text ||
            siteData.announcementText ||
            siteData.promoText;

          if (text) {
            setPromoText(text);
          }

          if (siteData.announcement_badge || siteData.promo_badge) {
            setPromoBadge(siteData.announcement_badge || siteData.promo_badge);
          }

          if (siteData.announcement_link_text || siteData.promo_link_text) {
            setPromoLinkText(siteData.announcement_link_text || siteData.promo_link_text);
          }

          if (siteData.announcement_link_url !== undefined) {
            setPromoLinkUrl(siteData.announcement_link_url || '');
          }

          if (siteData.announcement_enabled !== undefined) {
            setIsEnabled(siteData.announcement_enabled);
          }

          // Cache in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              STORAGE_PROMO_KEY,
              JSON.stringify({
                promo_text: text || promoText,
                promo_badge: siteData.announcement_badge || promoBadge,
                promo_link_text: siteData.announcement_link_text || promoLinkText,
                promo_link_url: siteData.announcement_link_url || promoLinkUrl,
                enabled: siteData.announcement_enabled !== false,
              })
            );
          }
          return;
        }

        // 2. Fallback: try 'settings' table with key 'promo_text' or 'announcement_text'
        const { data: settingsData, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .in('key', ['promo_text', 'announcement_text', 'promo_badge', 'announcement_badge', 'announcement_enabled']);

        if (!settingsError && settingsData && settingsData.length > 0 && isMounted) {
          settingsData.forEach((row: any) => {
            if ((row.key === 'promo_text' || row.key === 'announcement_text') && row.value) {
              setPromoText(row.value);
            }
            if ((row.key === 'promo_badge' || row.key === 'announcement_badge') && row.value) {
              setPromoBadge(row.value);
            }
            if (row.key === 'announcement_enabled' && row.value !== undefined) {
              setIsEnabled(row.value === 'true' || row.value === true);
            }
          });
        }
      } catch (err: any) {
        console.warn('Note on fetching promo text from Supabase:', err?.message || err);
      }
    };

    fetchPromoData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  const handleClaimClick = () => {
    if (onClaimPromo) {
      onClaimPromo(promoText);
    }
  };

  return (
    <div
      id="top-promo-banner"
      className="relative z-30 bg-black text-white text-xs md:text-sm font-black py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2 border-b-2 border-black"
    >
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#facc15] text-black font-black text-[10px] uppercase tracking-wider">
        {promoBadge}
      </span>
      <span>{promoText}</span>

      {promoLinkUrl && promoLinkUrl.startsWith('http') ? (
        <a
          href={promoLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#facc15] transition-colors ml-1 font-black inline-flex items-center gap-0.5 cursor-pointer"
        >
          {promoLinkText} <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClaimClick}
          className="underline hover:text-[#facc15] transition-colors ml-1 font-black inline-flex items-center gap-0.5 cursor-pointer"
        >
          {promoLinkText} <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      )}
    </div>
  );
};
