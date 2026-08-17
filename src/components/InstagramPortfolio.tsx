import React from 'react';
import {
  Instagram,
  ArrowRight,
  ExternalLink,
  Camera,
  Sparkles
} from 'lucide-react';
import { PortfolioItem } from '../types';

interface InstagramPortfolioProps {
  items?: PortfolioItem[];
  instagramHandle?: string;
  instagramUrl?: string;
}

export const InstagramPortfolio: React.FC<InstagramPortfolioProps> = ({
  instagramHandle = '@bdgmerch.id',
  instagramUrl = 'https://www.instagram.com/bdgmerch.id',
}) => {
  return (
    <section id="instagram-portfolio-section" className="my-12 max-w-7xl mx-auto px-6 sm:px-10 relative">
      <div className="bg-white border-2 border-black rounded-3xl p-8 sm:p-14 shadow-[8px_8px_0px_#000] text-center flex flex-col items-center justify-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#facc15] text-xs font-black uppercase tracking-wider mb-4 border border-black shadow-[3px_3px_0px_#facc15]">
          <Camera className="w-3.5 h-3.5 text-[#facc15]" />
          <span>📸 DOKUMENTASI REAL WORKSHOP BANDUNG</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black uppercase leading-tight max-w-4xl mb-6">
          Hasil Produksi Real & Portfolio Klien.
        </h2>

        {/* Instagram Profile Action Badge directly below title */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-instagram-portfolio-cta"
            className="inline-flex items-center gap-3.5 px-7 py-4 rounded-2xl bg-[#facc15] text-black border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center text-white shadow-[2px_2px_0px_#000] border border-black group-hover:scale-105 transition-transform">
              <Instagram className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black uppercase text-black tracking-tight">
                  {instagramHandle}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 block">
                Lihat Semua Portfolio & Update Produksi Real di Instagram
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
