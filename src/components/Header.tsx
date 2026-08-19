import React from 'react';
import { Sparkles, Menu, ArrowRight, Box } from 'lucide-react';
import { SiteConfig, PageId } from '../types';

export interface HeaderProps {
  siteConfig: SiteConfig;
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  openPenawaranModal: (prefilledCat?: string, prefilledQty?: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  siteConfig,
  currentPage,
  navigateTo,
  openPenawaranModal,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f8f8f8]/95 backdrop-blur-md border-b-2 border-black transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* ========================================================================= */}
        {/* BRAND LOGO CONTAINER (Flex row items-center gap-3, no overlap) */}
        {/* ========================================================================= */}
        <div className="flex items-center min-w-0 shrink">
          <button 
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left focus:outline-none select-none max-w-full"
            aria-label="Kembali ke Beranda BDGMERCH"
          >
            {/* Logo Image / Icon Box Container */}
            <div className="shrink-0 flex items-center justify-center">
              {siteConfig.logo_url ? (
                <img 
                  src={siteConfig.logo_url} 
                  alt={siteConfig.brand_name || 'BDGMERCH Logo'} 
                  className="h-10 sm:h-11 max-h-11 w-auto max-w-[140px] object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).parentElement?.querySelector('.logo-fallback-badge');
                    if (fallback) {
                      (fallback as HTMLElement).classList.remove('hidden');
                      (fallback as HTMLElement).classList.add('flex');
                    }
                  }}
                />
              ) : null}

              {/* Neo-Brutalism Styled Icon Badge Fallback when no custom image or load error */}
              <div 
                className={`logo-fallback-badge ${siteConfig.logo_url ? 'hidden' : 'flex'} w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#facc15] border-2 border-black items-center justify-center shadow-[2px_2px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all`}
              >
                <Box className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
              </div>
            </div>

            {/* Brand Title & Tagline Container */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-black leading-none flex items-center gap-1 sm:gap-1.5 truncate">
                <span>{siteConfig.brand_name || 'BDGMERCH'}</span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#facc15] border border-black rounded-full inline-block shrink-0" />
              </span>
              <span className="text-[8px] sm:text-[9px] font-black text-neutral-600 uppercase tracking-widest mt-0.5 truncate max-w-[160px] sm:max-w-none">
                {siteConfig.tagline || 'BANDUNG MERCHANDISE VENDOR'}
              </span>
            </div>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP NAVIGATION LINKS (Pills with Neo-Brutalism styling) */}
        {/* ========================================================================= */}
        <nav className="hidden lg:flex items-center gap-1 font-black text-xs uppercase tracking-wider shrink-0">
          <button 
            type="button"
            onClick={() => navigateTo('home')} 
            className={`px-3.5 xl:px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'bg-black text-[#facc15] border-black shadow-[2px_2px_0px_#000]'
                : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
            }`}
          >
            Beranda
          </button>

          <button 
            type="button"
            onClick={() => navigateTo('katalog')} 
            className={`px-3.5 xl:px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
              currentPage === 'katalog'
                ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
            }`}
          >
            Katalog Produk
          </button>

          <button 
            type="button"
            onClick={() => navigateTo('custom-studio')} 
            className={`px-3.5 xl:px-4 py-2 rounded-full border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'custom-studio'
                ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Studio</span>
          </button>

          <button 
            type="button"
            onClick={() => navigateTo('kenapa-bdgmerch')} 
            className={`px-3.5 xl:px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
              currentPage === 'kenapa-bdgmerch'
                ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
            }`}
          >
            Kenapa BDGMERCH
          </button>

          <button 
            type="button"
            onClick={() => navigateTo('faq')} 
            className={`px-3.5 xl:px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
              currentPage === 'faq'
                ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]'
                : 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-200/70 hover:text-black'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* ========================================================================= */}
        {/* ACTION CTA & MOBILE MENU BUTTONS (Never overlapping logo) */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openPenawaranModal()}
            className="bg-[#facc15] text-black px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-black flex items-center gap-1.5 sm:gap-2 group border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
          >
            <span>MINTA PENAWARAN</span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-black text-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 shrink-0">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#facc15] stroke-[3]" />
            </span>
          </button>

          {/* Mobile Hamburger Toggle (Visible on screens < lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border-2 border-black bg-white hover:bg-yellow-100 shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu Navigasi'}
          >
            <Menu className="w-5 h-5 text-black stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE DROPDOWN ACCORDION MENU */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-black px-4 sm:px-6 py-5 space-y-2 font-black shadow-xl animate-fadeIn">
          <button 
            type="button"
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left py-2.5 px-3.5 rounded-xl border-2 transition-colors ${
              currentPage === 'home' ? 'bg-black text-white border-black shadow-[2px_2px_0px_#000]' : 'bg-transparent border-transparent text-black hover:bg-neutral-100'
            }`}
          >
            Beranda
          </button>

          <button 
            type="button"
            onClick={() => { navigateTo('katalog'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left py-2.5 px-3.5 rounded-xl border-2 transition-colors ${
              currentPage === 'katalog' ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]' : 'bg-transparent border-transparent text-black hover:bg-neutral-100'
            }`}
          >
            Katalog Produk
          </button>

          <button 
            type="button"
            onClick={() => { navigateTo('custom-studio'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left py-2.5 px-3.5 rounded-xl border-2 transition-colors ${
              currentPage === 'custom-studio' ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]' : 'bg-transparent border-transparent text-black hover:bg-neutral-100'
            }`}
          >
            Custom Studio (Live Mockup 3D)
          </button>

          <button 
            type="button"
            onClick={() => { navigateTo('kenapa-bdgmerch'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left py-2.5 px-3.5 rounded-xl border-2 transition-colors ${
              currentPage === 'kenapa-bdgmerch' ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]' : 'bg-transparent border-transparent text-black hover:bg-neutral-100'
            }`}
          >
            Kenapa BDGMERCH
          </button>

          <button 
            type="button"
            onClick={() => { navigateTo('faq'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left py-2.5 px-3.5 rounded-xl border-2 transition-colors ${
              currentPage === 'faq' ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#000]' : 'bg-transparent border-transparent text-black hover:bg-neutral-100'
            }`}
          >
            FAQ (Tanya Jawab)
          </button>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); openPenawaranModal(); }}
              className="w-full bg-[#facc15] text-black py-3 rounded-xl border-2 border-black font-black text-center shadow-[3px_3px_0px_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2"
            >
              <span>MINTA PENAWARAN HARGA</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
