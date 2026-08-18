import React from 'react';
import { 
  Shirt, 
  Award, 
  Tag, 
  Sparkles, 
  Check, 
  ArrowUpRight,
  Flame,
  ShieldCheck
} from 'lucide-react';

export interface FloatingCardItem {
  id: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  badgeTopLeft: string;
  badgeTopRight?: string;
  icon?: 'shirt' | 'award' | 'tag' | 'sparkles' | 'flame' | 'shield';
  title: string;
  subtitle: string;
  infoMiddle?: string;
  footerLeft: string;
  footerRight?: string;
  rotationClass: string;
  positionClass: string;
  animationClass: string;
  bgVariant?: 'dark' | 'yellow' | 'gradient' | 'light';
  linkTarget?: string; // route ID or URL
  onClick?: () => void;
}

// =========================================================================
// DATA KE-4 KARTU HERO SECTION (SANGAT MUDAH DIUBAH / DI-EDIT)
// =========================================================================
export const DEFAULT_FLOATING_CARDS: FloatingCardItem[] = [
  {
    id: 'card-apparel',
    position: 'top-left',
    badgeTopLeft: 'COTTON 30s',
    badgeTopRight: 'MOQ 24',
    icon: 'shirt',
    title: 'Custom Apparel',
    subtitle: 'Sablon Plastisol HD',
    infoMiddle: 'Jahitan Rantai Standar Distro',
    footerLeft: 'APPAREL BANDUNG',
    footerRight: '✓ 5-7 Hari',
    rotationClass: 'rotate-[-4deg]',
    positionClass: 'top-4 left-0 xl:left-4 2xl:left-8 w-44 xl:w-52',
    animationClass: 'animate-float-1',
    bgVariant: 'dark',
    linkTarget: 'katalog'
  },
  {
    id: 'card-wristband',
    position: 'top-right',
    badgeTopLeft: 'PABRIKASI LANGSUNG',
    badgeTopRight: 'LIVE',
    icon: 'sparkles',
    title: 'RUBBER WRISTBAND',
    subtitle: 'Gelang Karet Timbul PVC',
    infoMiddle: 'MOQ: 100 Pcs • Emboss / Deboss',
    footerLeft: 'Spesialis Karet Bandung',
    footerRight: 'Pabrik Langsung',
    rotationClass: 'rotate-[4deg]',
    positionClass: 'top-6 right-0 xl:right-4 2xl:right-8 w-48 xl:w-56',
    animationClass: 'animate-float-2',
    bgVariant: 'dark',
    linkTarget: 'custom-studio'
  },
  {
    id: 'card-enamel-pin',
    position: 'bottom-left',
    badgeTopLeft: 'COR LOGAM HD',
    badgeTopRight: 'PREMIUM',
    icon: 'award',
    title: 'PIN ENAMEL LOGAM',
    subtitle: 'Hard & Soft Enamel Cor',
    infoMiddle: 'Pewarnaan Kuat Anti Luntur',
    footerLeft: 'VIP & EVENT BADGE',
    footerRight: '✓ Presisi',
    rotationClass: 'rotate-[-3deg]',
    positionClass: 'bottom-6 left-6 2xl:left-12 w-44 xl:w-48',
    animationClass: 'animate-float-3',
    bgVariant: 'gradient',
    linkTarget: 'katalog'
  },
  {
    id: 'card-keychain',
    position: 'bottom-right',
    badgeTopLeft: 'CUSTOM DIE-CUT',
    badgeTopRight: '3D KARET',
    icon: 'tag',
    title: 'KEYCHAIN KARET 3D',
    subtitle: 'Ring Putar Anti Karat',
    infoMiddle: 'Tebal & Elastis Awet Bertahun-tahun',
    footerLeft: 'SOUVENIR KOMUNITAS',
    footerRight: '✓ Best Price',
    rotationClass: 'rotate-[5deg]',
    positionClass: 'bottom-6 right-6 2xl:right-12 w-44 xl:w-48',
    animationClass: 'animate-float-4',
    bgVariant: 'yellow',
    linkTarget: 'katalog'
  }
];

interface HeroFloatingCardsProps {
  cards?: FloatingCardItem[];
  onCardClick?: (card: FloatingCardItem) => void;
}

export const HeroFloatingCards: React.FC<HeroFloatingCardsProps> = ({
  cards = DEFAULT_FLOATING_CARDS,
  onCardClick
}) => {
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shirt':
        return <Shirt className="w-12 xl:w-14 h-12 xl:h-14 mx-auto text-[#facc15] mb-1.5" />;
      case 'award':
        return <Award className="w-9 xl:w-10 h-9 xl:h-10 mx-auto text-[#facc15] mb-1.5" />;
      case 'tag':
        return <Tag className="w-5 h-5 text-black" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#facc15]" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-[#facc15]" />;
      case 'sparkles':
      default:
        return null;
    }
  };

  return (
    <>
      {cards.map((card) => {
        const handleClick = () => {
          if (card.onClick) {
            card.onClick();
          } else if (onCardClick) {
            onCardClick(card);
          }
        };

        return (
          <div
            key={card.id}
            id={`floating-card-${card.id}`}
            onClick={handleClick}
            className={`hidden lg:block absolute bg-white border-2 border-black p-2.5 rounded-2xl shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] z-10 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none ${card.positionClass} ${card.rotationClass} ${card.animationClass}`}
          >
            {/* INNER CARD BODY BERDASARKAN VARIASI WARNA NEO-BRUTALISM */}
            {card.bgVariant === 'dark' && (
              <div className="bg-black text-white rounded-xl mb-2.5 p-3 border-2 border-black flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-black mb-2">
                  <span className="bg-[#facc15] text-black px-2 py-0.5 rounded font-black tracking-tight uppercase">
                    {card.badgeTopLeft}
                  </span>
                  {card.badgeTopRight && (
                    <span className="text-neutral-300 font-bold text-[9px] flex items-center gap-1">
                      {card.badgeTopRight === 'LIVE' && (
                        <span className="w-2 h-2 rounded-full bg-[#facc15] animate-ping inline-block" />
                      )}
                      {card.badgeTopRight}
                    </span>
                  )}
                </div>

                <div className="text-center py-1">
                  {renderIcon(card.icon)}
                  <div className="font-black text-xs xl:text-sm uppercase tracking-tight text-white">
                    {card.title}
                  </div>
                  <div className="text-[10px] text-[#facc15] font-bold mt-0.5">
                    {card.subtitle}
                  </div>
                </div>

                {card.infoMiddle && (
                  <div className="text-[9px] bg-neutral-900 border border-neutral-800 p-1.5 rounded text-center font-bold text-neutral-300 mt-2">
                    {card.infoMiddle}
                  </div>
                )}
              </div>
            )}

            {card.bgVariant === 'gradient' && (
              <div className="bg-gradient-to-br from-neutral-900 to-black text-white rounded-xl mb-2 border-2 border-black p-3 flex flex-col items-center justify-center text-center">
                <div className="w-full flex items-center justify-between text-[9px] font-black mb-1">
                  <span className="bg-[#facc15] text-black px-1.5 py-0.5 rounded uppercase">
                    {card.badgeTopLeft}
                  </span>
                  {card.badgeTopRight && (
                    <span className="text-[#facc15] font-black">
                      {card.badgeTopRight}
                    </span>
                  )}
                </div>
                {renderIcon(card.icon)}
                <div className="text-xs font-black uppercase tracking-wider text-white">
                  {card.title}
                </div>
                <div className="text-[10px] text-[#facc15] font-bold mt-0.5">
                  {card.subtitle}
                </div>
                {card.infoMiddle && (
                  <div className="text-[9px] text-neutral-400 font-medium mt-1">
                    {card.infoMiddle}
                  </div>
                )}
              </div>
            )}

            {card.bgVariant === 'yellow' && (
              <div className="bg-yellow-50 rounded-xl mb-2 p-3 border-2 border-black flex flex-col justify-between text-black">
                <div className="flex items-center justify-between mb-2">
                  {renderIcon(card.icon)}
                  <span className="text-[9px] font-black bg-black text-[#facc15] px-1.5 py-0.5 rounded uppercase">
                    {card.badgeTopLeft}
                  </span>
                </div>
                <div className="font-black text-xs text-black uppercase">
                  {card.title}
                </div>
                <div className="text-[10px] font-bold text-neutral-700 mt-0.5">
                  {card.subtitle}
                </div>
                {card.infoMiddle && (
                  <div className="text-[9px] text-neutral-600 font-medium mt-1.5">
                    {card.infoMiddle}
                  </div>
                )}
              </div>
            )}

            {/* CARD FOOTER INFO */}
            <div className="flex items-center justify-between px-1 pt-0.5">
              <span className="text-[10px] xl:text-[11px] font-black text-black uppercase truncate max-w-[120px]">
                {card.footerLeft}
              </span>
              {card.footerRight ? (
                <span className="text-[9px] xl:text-[10px] font-black text-black bg-[#facc15] px-1.5 py-0.5 rounded border border-black/30 flex items-center gap-0.5">
                  {card.footerRight}
                </span>
              ) : (
                <div className="w-4 h-4 bg-[#facc15] border border-black rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
