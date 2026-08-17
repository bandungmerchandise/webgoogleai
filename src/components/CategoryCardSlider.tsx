import React, { useState, useRef } from 'react';
import {
  Shirt,
  Layers,
  Award,
  ShoppingBag,
  CircleDot,
  Package,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { CategoryConfig, ProductItem } from '../types';

interface CategoryCardSliderProps {
  category: CategoryConfig;
  index: number;
  products: ProductItem[];
  onViewCategory: (categoryId: string) => void;
  onOpenPenawaran: (categoryName: string) => void;
}

export const CategoryCardSlider: React.FC<CategoryCardSliderProps> = ({
  category,
  index,
  products,
  onViewCategory,
  onOpenPenawaran
}) => {
  // Collect images for this category (from category config + matching products)
  const categoryProducts = products.filter(
    (p) => p.category === category.id || (p.categoryLabel && p.categoryLabel.toLowerCase().includes(category.id))
  );

  const productImages = categoryProducts
    .map((p) => p.image_url)
    .filter((url): url is string => Boolean(url && url.trim() !== ''));

  const allImages = Array.from(
    new Set([...(category.images || []), ...productImages])
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = allImages.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 40) {
      // Swiped left -> next
      if (totalSlides > 1) {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }
    } else if (diff < -40) {
      // Swiped right -> prev
      if (totalSlides > 1) {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
      }
    }
    touchStartXRef.current = null;
  };

  const count = categoryProducts.length;

  return (
    <div
      id={`cat-card-${category.id}`}
      className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000] hover:shadow-[9px_9px_0px_#000] hover:-translate-y-1.5 transition-all flex flex-col justify-between group relative"
    >
      <div>
        {/* ========================================================= */}
        {/* 1. CAROUSEL / SLIDER BANNER AT TOP OF CARD */}
        {/* ========================================================= */}
        <div
          className="relative w-full aspect-[16/10] bg-neutral-900 rounded-xl border-2 border-black overflow-hidden mb-5 select-none shadow-[2px_2px_0px_#000]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {totalSlides > 0 && !imgError[currentSlide] ? (
            <img
              src={allImages[currentSlide]}
              alt={`${category.name} - Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
              onError={() => setImgError((prev) => ({ ...prev, [currentSlide]: true }))}
              loading="lazy"
            />
          ) : (
            /* OFFICIAL BDGMERCH FALLBACK PLACEHOLDER */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-black text-white p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#facc15] text-black flex items-center justify-center mb-2 border-2 border-black shadow-[2px_2px_0px_#fff]">
                {category.iconName === 'Shirt' && <Shirt className="w-6 h-6 stroke-[2.5]" />}
                {category.iconName === 'Layers' && <Layers className="w-6 h-6 stroke-[2.5]" />}
                {category.iconName === 'Award' && <Award className="w-6 h-6 stroke-[2.5]" />}
                {category.iconName === 'ShoppingBag' && <ShoppingBag className="w-6 h-6 stroke-[2.5]" />}
                {category.iconName === 'CircleDot' && <CircleDot className="w-6 h-6 stroke-[2.5]" />}
                {category.iconName === 'Package' && <Package className="w-6 h-6 stroke-[2.5]" />}
              </div>
              <span className="text-xs font-black uppercase text-[#facc15] tracking-wider">
                {category.name}
              </span>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">
                BDGMERCH WORKSHOP BANDUNG
              </span>
            </div>
          )}

          {/* Top Gradient Overlay for Badge Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top Left: Category Tag Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-black uppercase tracking-wider bg-black/90 text-[#facc15] px-2.5 py-1 rounded-md border border-black shadow-[2px_2px_0px_#000] backdrop-blur-xs flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#facc15]" />
              <span>{category.tag}</span>
            </span>
          </div>

          {/* Top Right: Counter Badge (if multiple slides) */}
          {totalSlides > 1 && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="text-[10px] font-black bg-white/95 text-black px-2 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000]">
                {currentSlide + 1} / {totalSlides}
              </span>
            </div>
          )}

          {/* Left Arrow Button */}
          {totalSlides > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {/* Right Arrow Button */}
          {totalSlides > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {/* Bottom Dots Indicator */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-auto">
              {allImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrentSlide(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all rounded-full border border-black cursor-pointer ${
                    currentSlide === dotIdx
                      ? 'bg-[#facc15] w-5 h-2 shadow-[1px_1px_0px_#000]'
                      : 'bg-white/80 hover:bg-white w-2 h-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 2. CARD BODY & METADATA */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] shrink-0 ${
              index % 2 === 0 ? 'bg-[#facc15] text-black' : 'bg-black text-[#facc15]'
            }`}
          >
            {category.iconName === 'Shirt' && <Shirt className="w-5 h-5 stroke-[2.5]" />}
            {category.iconName === 'Layers' && <Layers className="w-5 h-5 stroke-[2.5]" />}
            {category.iconName === 'Award' && <Award className="w-5 h-5 stroke-[2.5]" />}
            {category.iconName === 'ShoppingBag' && <ShoppingBag className="w-5 h-5 stroke-[2.5]" />}
            {category.iconName === 'CircleDot' && <CircleDot className="w-5 h-5 stroke-[2.5]" />}
            {category.iconName === 'Package' && <Package className="w-5 h-5 stroke-[2.5]" />}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight leading-tight">
              {category.shortTitle}
            </h3>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              {category.name}
            </span>
          </div>
        </div>

        <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-wide mb-3 flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] border border-black inline-block"></span>
          <span className="truncate">{category.popularItems}</span>
        </p>

        {/* Description */}
        <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
          {category.description}
        </p>

        {/* Feature Specs */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-black/20 mb-5">
          <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider block mb-2">
            Spesifikasi Unggulan:
          </span>
          <ul className="space-y-1.5 text-xs font-bold text-neutral-800">
            {category.specs.map((spec, sIdx) => (
              <li key={sIdx} className="flex items-start gap-2 leading-snug">
                <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0 mt-0.5" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. CARD BOTTOM: MOQ & ACTION BUTTONS */}
      {/* ========================================================= */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-[11px] font-black text-black pb-3 mb-3 border-b border-neutral-200">
          <span className="flex items-center gap-1">
            <span className="text-neutral-500 font-bold">MOQ:</span> {category.sampleMoq}
          </span>
          <span className="text-neutral-600 font-bold">
            {count > 0 ? `${count} Item Siap Custom` : 'Pabrikasi Langsung'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            id={`btn-view-${category.id}`}
            onClick={() => onViewCategory(category.id)}
            className="py-2.5 px-3 rounded-xl bg-black text-white font-black text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors shadow-[2px_2px_0px_#facc15] border border-black cursor-pointer"
          >
            <span>Lihat Produk</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#facc15]" />
          </button>

          <button
            type="button"
            id={`btn-penawaran-${category.id}`}
            onClick={() => onOpenPenawaran(`${category.name} (${category.shortTitle})`)}
            className="py-2.5 px-3 rounded-xl bg-[#facc15] text-black font-black text-xs uppercase flex items-center justify-center gap-1 hover:bg-[#fde047] transition-colors border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <span>Penawaran</span>
            <Sparkles className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
