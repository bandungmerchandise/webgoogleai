import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// ============================================================================
// HELPER FUNCTIONS FOR PHONE NUMBER FORMATTING
// ============================================================================

/**
 * Cleans phone string to international WhatsApp format digits (e.g., '6281312211161')
 * Handles formats like '0813-1221-1161', '+62 813 1221 1161', '6281312211161', '081312211161', etc.
 */
export const cleanWhatsAppNumber = (input?: string): string => {
  const fallback = '6281312211161';
  if (!input) return fallback;

  // Remove spaces, dashes, dots, parentheses, and any non-digit characters
  let digits = input.trim().replace(/[^0-9+]/g, '');
  if (digits.startsWith('+')) {
    digits = digits.substring(1);
  }

  // If begins with '08', change to '628'
  if (digits.startsWith('0')) {
    digits = '62' + digits.substring(1);
  }
  // If begins with '8' (e.g. 81312211161), prepend '62'
  else if (digits.startsWith('8')) {
    digits = '62' + digits;
  }

  return digits || fallback;
};

/**
 * Formats clean international phone number into readable local Indonesian format: '0813-1221-1161'
 */
export const formatDisplayWhatsApp = (input?: string): string => {
  const cleaned = cleanWhatsAppNumber(input);
  let local = cleaned;
  if (local.startsWith('62')) {
    local = '0' + local.substring(2);
  }

  if (local.length >= 10) {
    // Group: 4 digits - 4 digits - remaining (e.g., 0813-1221-1161)
    return `${local.slice(0, 4)}-${local.slice(4, 8)}-${local.slice(8)}`;
  }
  return local;
};

// ============================================================================
// CONTEXT INTERFACE DEFINITIONS
// ============================================================================

export interface WhatsAppContextType {
  /** Clean international WhatsApp number (e.g. "6281312211161") */
  whatsappNumber: string;
  /** Pretty formatted local string (e.g. "0813-1221-1161") */
  displayWhatsAppNumber: string;
  /** Raw unformatted value stored in state/DB */
  rawWhatsAppNumber: string;
  /** Loading status */
  isLoading: boolean;
  /** Function to generate standard wa.me URL with custom prefilled message */
  getWhatsAppUrl: (customText?: string) => string;
  /** Function to update number and sync to Supabase & localStorage */
  updateWhatsAppNumber: (newNumber: string) => Promise<{ success: boolean; error?: string }>;
}

const DEFAULT_WA_NUMBER = '6281312211161';
const STORAGE_KEY = 'bdgmerch_whatsapp_number_v1';

const WhatsAppContext = createContext<WhatsAppContextType>({
  whatsappNumber: DEFAULT_WA_NUMBER,
  displayWhatsAppNumber: formatDisplayWhatsApp(DEFAULT_WA_NUMBER),
  rawWhatsAppNumber: DEFAULT_WA_NUMBER,
  isLoading: false,
  getWhatsAppUrl: (customText?: string) =>
    `https://wa.me/${DEFAULT_WA_NUMBER}?text=${encodeURIComponent(customText || 'Halo BDGMERCH, saya ingin konsultasi produksi merchandise custom.')}`,
  updateWhatsAppNumber: async () => ({ success: true }),
});

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export interface WhatsAppProviderProps {
  children: ReactNode;
  initialNumber?: string;
}

export const WhatsAppProvider: React.FC<WhatsAppProviderProps> = ({ children, initialNumber }) => {
  const [rawWhatsAppNumber, setRawWhatsAppNumber] = useState<string>(() => {
    if (initialNumber) return initialNumber;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;

        const siteConfigSaved = localStorage.getItem('bdgmerch_site_config_v1');
        if (siteConfigSaved) {
          const parsed = JSON.parse(siteConfigSaved);
          if (parsed.whatsapp_number) return parsed.whatsapp_number;
        }
      } catch (e) {
        console.warn('Error reading initial WhatsApp number from localStorage:', e);
      }
    }
    return DEFAULT_WA_NUMBER;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Derived properties
  const whatsappNumber = cleanWhatsAppNumber(rawWhatsAppNumber);
  const displayWhatsAppNumber = formatDisplayWhatsApp(rawWhatsAppNumber);

  // Fetch WhatsApp number from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    const fetchWhatsAppNumber = async () => {
      try {
        setIsLoading(true);

        // 1. Try 'site_settings' table
        const { data: siteSettingsData, error: siteSettingsError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (!siteSettingsError && siteSettingsData) {
          const found =
            siteSettingsData.whatsapp_number ||
            siteSettingsData.whatsappNumber ||
            siteSettingsData.wa_number ||
            siteSettingsData.phone;

          if (found && isMounted) {
            setRawWhatsAppNumber(found);
            localStorage.setItem(STORAGE_KEY, found);
            return;
          }
        }

        // 2. Fallback: try 'settings' table if site_settings didn't yield whatsapp_number
        const { data: settingsData, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'whatsapp_number')
          .maybeSingle();

        if (!settingsError && settingsData?.value && isMounted) {
          setRawWhatsAppNumber(settingsData.value);
          localStorage.setItem(STORAGE_KEY, settingsData.value);
          return;
        }
      } catch (err: any) {
        console.warn('Note on fetching WhatsApp number from Supabase:', err?.message || err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWhatsAppNumber();

    return () => {
      isMounted = false;
    };
  }, []);

  // Generator for wa.me links
  const getWhatsAppUrl = (customText?: string): string => {
    const text = customText || 'Halo BDGMERCH, saya ingin konsultasi produksi merchandise custom.';
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Update & persist number to Supabase and LocalStorage
  const updateWhatsAppNumber = async (newNumber: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleaned = cleanWhatsAppNumber(newNumber);
      const raw = newNumber.trim();

      // Optimistic update
      setRawWhatsAppNumber(raw);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, raw);

        // Also sync inside bdgmerch_site_config_v1 if present
        try {
          const savedSiteConfig = localStorage.getItem('bdgmerch_site_config_v1');
          if (savedSiteConfig) {
            const parsed = JSON.parse(savedSiteConfig);
            parsed.whatsapp_number = raw;
            localStorage.setItem('bdgmerch_site_config_v1', JSON.stringify(parsed));
          }
        } catch (e) {
          // ignore json error
        }
      }

      // Upsert to Supabase 'site_settings'
      const { error: upsertError } = await supabase.from('site_settings').upsert([
        {
          id: 1,
          whatsapp_number: raw,
          updated_at: new Date().toISOString(),
        },
      ]);

      if (upsertError) {
        console.warn('Upsert to site_settings note:', upsertError.message);
        // Try fallback settings table
        await supabase.from('settings').upsert([
          {
            key: 'whatsapp_number',
            value: raw,
            updated_at: new Date().toISOString(),
          },
        ]);
      }

      return { success: true };
    } catch (err: any) {
      console.error('Failed to update WhatsApp number to Supabase:', err);
      return { success: false, error: err.message || 'Gagal menyimpan nomor WhatsApp' };
    }
  };

  return (
    <WhatsAppContext.Provider
      value={{
        whatsappNumber,
        displayWhatsAppNumber,
        rawWhatsAppNumber,
        isLoading,
        getWhatsAppUrl,
        updateWhatsAppNumber,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
};
