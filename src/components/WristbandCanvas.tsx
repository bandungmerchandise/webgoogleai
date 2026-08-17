import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import {
  Type,
  Upload,
  RotateCcw,
  Trash2,
  Move,
  Check,
  Plus,
  AlignHorizontalDistributeCenter,
  Layers,
  Sparkles,
  Scissors
} from 'lucide-react';

interface WristbandCanvasProps {
  wristbandWidth: '1.2' | '1.5' | '1.7' | '2.0' | '2.5';
  wristbandColor: string;
  wristbandTextColor: string;
  wristbandText: string;
  onWristbandTextChange: (text: string) => void;
  wristbandStyle: 'emboss' | 'deboss';
  wristbandLogo: string | null;
  onWristbandLogoChange: (logo: string | null) => void;
  autoRemoveBg: boolean;
  onAutoRemoveBgChange: (val: boolean) => void;
}

export const FONT_OPTIONS = [
  { label: 'Arial (Clean Standard)', value: 'Arial' },
  { label: 'Roboto (Modern Bold)', value: 'Roboto' },
  { label: 'Montserrat (Geometric)', value: 'Montserrat' },
  { label: 'Impact (Solid Heavy)', value: 'Impact' },
  { label: 'Pacifico (Retro Script)', value: 'Pacifico' }
];

export const WristbandCanvas: React.FC<WristbandCanvasProps> = ({
  wristbandWidth,
  wristbandColor,
  wristbandTextColor,
  wristbandText,
  onWristbandTextChange,
  wristbandStyle,
  wristbandLogo,
  onWristbandLogoChange,
  autoRemoveBg,
  onAutoRemoveBgChange
}) => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFont, setSelectedFont] = useState<string>('Montserrat');
  const [activeObjectType, setActiveObjectType] = useState<'text' | 'image' | null>(null);
  const [hasSelection, setHasSelection] = useState<boolean>(false);
  const [isProcessingBg, setIsProcessingBg] = useState<boolean>(false);
  const [snapGuideActive, setSnapGuideActive] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });

  // Compute Height for 19cm strip based on width
  const getCanvasHeight = () => {
    switch (wristbandWidth) {
      case '1.2': return 50;
      case '1.5': return 62;
      case '1.7': return 72;
      case '2.0': return 84;
      case '2.5': return 100;
      default: return 62;
    }
  };

  const canvasHeight = getCanvasHeight();
  const canvasWidth = 680; // Fixed high-res width representing 19 cm circumference

  // Helper to remove white background from uploaded image
  const removeBackground = (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Detect white / off-white pixels
          if (r > 220 && g > 220 && b > 220) {
            data[i + 3] = 0; // Transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(imageSrc);
      img.src = imageSrc;
    });
  };

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: wristbandColor,
      selection: true,
      preserveObjectStacking: true
    });

    fabricCanvasRef.current = canvas;

    // Selection Listeners
    const updateSelectionState = () => {
      const active = canvas.getActiveObject();
      if (!active) {
        setActiveObjectType(null);
        setHasSelection(false);
      } else {
        setHasSelection(true);
        if (active instanceof fabric.Textbox || active instanceof fabric.IText || active.type === 'textbox' || active.type === 'i-text' || active.type === 'text') {
          setActiveObjectType('text');
          const font = (active as any).fontFamily;
          if (font) setSelectedFont(font);
          const txt = (active as any).text;
          if (txt && txt !== wristbandText) {
            onWristbandTextChange(txt);
          }
        } else if (active instanceof fabric.FabricImage || active.type === 'image') {
          setActiveObjectType('image');
        }
      }
    };

    canvas.on('selection:created', updateSelectionState);
    canvas.on('selection:updated', updateSelectionState);
    canvas.on('selection:cleared', () => {
      setActiveObjectType(null);
      setHasSelection(false);
      setSnapGuideActive({ x: false, y: false });
    });

    // Snapping to horizontal/vertical center and boundary clamping
    canvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const snapThreshold = 10;

      let isSnappedX = false;
      let isSnappedY = false;

      // Snap X Center
      if (Math.abs(obj.left - centerX) < snapThreshold) {
        obj.set({ left: centerX });
        isSnappedX = true;
      }

      // Snap Y Center
      if (Math.abs(obj.top - centerY) < snapThreshold) {
        obj.set({ top: centerY });
        isSnappedY = true;
      }

      setSnapGuideActive({ x: isSnappedX, y: isSnappedY });

      // Boundary Clamping (keep inside the 19cm strip)
      const bound = obj.getBoundingRect();
      if (bound.left < -bound.width / 2) obj.left = -bound.width / 2 + 10;
      if (bound.left + bound.width > canvas.width + bound.width / 2) obj.left = canvas.width - bound.width / 2 - 10;
    });

    canvas.on('object:modified', () => {
      setSnapGuideActive({ x: false, y: false });
      const active = canvas.getActiveObject();
      if (active && (active instanceof fabric.Textbox || active.type === 'textbox' || active.type === 'i-text')) {
        onWristbandTextChange((active as any).text || '');
      }
    });

    // Add Initial Text Object
    const textObj = new fabric.Textbox(wristbandText || 'BDGMERCH 2026', {
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: 'center',
      originY: 'center',
      fontFamily: selectedFont,
      fontSize: wristbandWidth === '1.2' ? 14 : wristbandWidth === '2.5' ? 22 : 18,
      fill: wristbandTextColor,
      fontWeight: 'bold',
      textAlign: 'center',
      cornerColor: '#facc15',
      cornerStrokeColor: '#000000',
      borderColor: '#000000',
      transparentCorners: false,
      cornerSize: 8,
      shadow: wristbandStyle === 'emboss' ? new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 2, offsetX: 1, offsetY: 2 }) : undefined
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Update Canvas Dimensions when wristbandWidth changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.setDimensions({
      width: canvasWidth,
      height: canvasHeight
    });
    canvas.backgroundColor = wristbandColor;

    // Reposition objects to stay vertically centered if needed
    canvas.getObjects().forEach((obj) => {
      if (obj.top > canvasHeight) {
        obj.set({ top: canvasHeight / 2 });
      }
    });

    canvas.renderAll();
  }, [canvasHeight, wristbandColor]);

  // Update Text Color & Style across active text objects
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.backgroundColor = wristbandColor;

    canvas.getObjects().forEach((obj) => {
      if (obj instanceof fabric.Textbox || obj instanceof fabric.IText || obj.type === 'textbox' || obj.type === 'i-text') {
        obj.set({
          fill: wristbandTextColor,
          shadow: wristbandStyle === 'emboss'
            ? new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 2, offsetX: 1, offsetY: 2 })
            : undefined
        });
      }
    });

    canvas.renderAll();
  }, [wristbandColor, wristbandTextColor, wristbandStyle]);

  // Update Text Content when input changes outside
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let textFound = false;
    canvas.getObjects().forEach((obj) => {
      if (obj instanceof fabric.Textbox || obj instanceof fabric.IText || obj.type === 'textbox' || obj.type === 'i-text') {
        if ((obj as any).text !== wristbandText) {
          (obj as any).set({ text: wristbandText || 'BDGMERCH' });
          textFound = true;
        }
      }
    });

    if (textFound) {
      canvas.renderAll();
    }
  }, [wristbandText]);

  // Handle Font Change
  const handleFontChange = (newFont: string) => {
    setSelectedFont(newFont);
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const active = canvas.getActiveObject();
    if (active && (active instanceof fabric.Textbox || active instanceof fabric.IText || active.type === 'textbox' || active.type === 'i-text')) {
      (active as any).set({ fontFamily: newFont });
      canvas.renderAll();
    } else {
      // Apply to all text objects
      canvas.getObjects().forEach((obj) => {
        if (obj instanceof fabric.Textbox || obj instanceof fabric.IText || obj.type === 'textbox' || obj.type === 'i-text') {
          (obj as any).set({ fontFamily: newFont });
        }
      });
      canvas.renderAll();
    }
  };

  // Add New Text Object to Canvas
  const handleAddText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const newText = new fabric.Textbox('TEKS BARU', {
      left: canvasWidth / 2 + 20,
      top: canvasHeight / 2,
      originX: 'center',
      originY: 'center',
      fontFamily: selectedFont,
      fontSize: wristbandWidth === '1.2' ? 13 : wristbandWidth === '2.5' ? 20 : 16,
      fill: wristbandTextColor,
      fontWeight: 'bold',
      cornerColor: '#facc15',
      cornerStrokeColor: '#000000',
      borderColor: '#000000',
      transparentCorners: false,
      cornerSize: 8,
      shadow: wristbandStyle === 'emboss' ? new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 2, offsetX: 1, offsetY: 2 }) : undefined
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
  };

  // Upload Logo & Insert to Canvas
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      let src = ev.target?.result as string;
      if (!src) return;

      if (autoRemoveBg) {
        setIsProcessingBg(true);
        src = await removeBackground(src);
        setIsProcessingBg(false);
      }

      onWristbandLogoChange(src);

      const imgEl = new Image();
      imgEl.crossOrigin = 'anonymous';
      imgEl.onload = () => {
        // Calculate appropriate scale for wristband height
        const targetHeight = Math.max(24, canvasHeight * 0.65);
        const scale = targetHeight / imgEl.height;

        const fabricImg = new fabric.FabricImage(imgEl, {
          left: canvasWidth / 2 - 90,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
          cornerColor: '#10b981', // Emerald for images
          cornerStrokeColor: '#000000',
          borderColor: '#10b981',
          transparentCorners: false,
          cornerSize: 8
        });

        canvas.add(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.renderAll();
      };
      imgEl.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Delete Currently Selected Object
  const handleDeleteSelected = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const active = canvas.getActiveObject();
    if (!active) return;

    if (active instanceof fabric.FabricImage || active.type === 'image') {
      onWristbandLogoChange(null);
    }

    canvas.remove(active);
    canvas.discardActiveObject();
    canvas.renderAll();
    setHasSelection(false);
    setActiveObjectType(null);
  };

  // Reset Objects Position to Center
  const handleResetPosition = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects();
    if (objects.length === 0) return;

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    if (objects.length === 1) {
      objects[0].set({
        left: centerX,
        top: centerY,
        angle: 0,
        originX: 'center',
        originY: 'center'
      });
    } else {
      // Distribute evenly
      const spacing = 140;
      const startX = centerX - ((objects.length - 1) * spacing) / 2;
      objects.forEach((obj, idx) => {
        obj.set({
          left: startX + idx * spacing,
          top: centerY,
          angle: 0,
          originX: 'center',
          originY: 'center'
        });
      });
    }

    canvas.renderAll();
  };

  return (
    <div className="space-y-4">
      
      {/* TOOLBAR CONTROLS (FONT SELECTOR, UPLOAD, DELETE, RESET) */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] space-y-3">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#facc15] border border-black rounded-full"></span>
            <span className="text-xs font-black uppercase text-black">
              Pengaturan Canvas Flat (Interactive)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto BG Removal Checkbox */}
            <label className="flex items-center gap-1.5 text-[11px] font-black text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg border border-black cursor-pointer hover:bg-neutral-200">
              <input
                type="checkbox"
                checked={autoRemoveBg}
                onChange={(e) => onAutoRemoveBgChange(e.target.checked)}
                className="rounded accent-black w-3.5 h-3.5"
              />
              <Scissors className="w-3 h-3 text-black" />
              <span>Auto Hapus BG Logo</span>
            </label>
          </div>
        </div>

        {/* 2-Column Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-neutral-200">
          
          {/* 1. Dropdown Pilih Font */}
          <div>
            <label className="block text-[11px] font-black uppercase text-black mb-1 flex items-center gap-1">
              <Type className="w-3.5 h-3.5" />
              <span>Pilih Font Tulisan:</span>
            </label>
            <select
              value={selectedFont}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-black bg-neutral-50 text-xs font-black focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Upload Logo / Icon */}
          <div>
            <label className="block text-[11px] font-black uppercase text-black mb-1 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Logo / Ikon:</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-xl border-2 border-dashed border-black bg-neutral-50 hover:bg-[#facc15]/20 text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isProcessingBg ? 'Memproses BG...' : 'Upload Logo'}</span>
            </button>
          </div>

          {/* 3. Tambah Teks Baru */}
          <div>
            <label className="block text-[11px] font-black uppercase text-black mb-1 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Teks:</span>
            </label>
            <button
              type="button"
              onClick={handleAddText}
              className="w-full py-2 px-3 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 text-xs font-black uppercase flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Teks Gelang</span>
            </button>
          </div>

          {/* 4. Action Buttons (Reset & Delete Selected) */}
          <div>
            <label className="block text-[11px] font-black uppercase text-black mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Aksi Objek:</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetPosition}
                className="flex-1 py-2 px-2.5 rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-xs font-black uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] cursor-pointer"
                title="Ratakan & Posisikan ke Tengah"
              >
                <AlignHorizontalDistributeCenter className="w-3.5 h-3.5" />
                <span>Center</span>
              </button>

              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={!hasSelection}
                className={`px-3 py-2 rounded-xl border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  hasSelection
                    ? 'bg-red-100 hover:bg-red-200 text-red-700 shadow-[2px_2px_0px_#000]'
                    : 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed'
                }`}
                title="Hapus elemen yang dipilih"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hapus</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* FABRIC.JS INTERACTIVE CANVAS CONTAINER (UNROLLED FLAT VIEW) */}
      <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-[6px_6px_0px_#000] space-y-3">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5" />
              <span>Bentangan Gelang 19 cm (Interactive Drag & Drop Canvas):</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeObjectType && (
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border border-black ${
                activeObjectType === 'text' ? 'bg-[#facc15] text-black' : 'bg-emerald-300 text-black'
              }`}>
                {activeObjectType === 'text' ? '✏️ Teks Terpilih (Font: ' + selectedFont + ')' : '🖼️ Logo Terpilih'}
              </span>
            )}
            <span className="text-[10px] font-black uppercase bg-black text-[#facc15] px-2 py-0.5 rounded">
              Skala Cetak 1:1
            </span>
          </div>
        </div>

        {/* Outer Scrollable Wrapper for Mobile & Desktop responsiveness */}
        <div className="relative w-full overflow-x-auto py-3 select-none flex justify-center bg-neutral-100 rounded-2xl border-2 border-dashed border-neutral-400 p-3">
          
          {/* Snapping Center Guide Line Overlays */}
          {snapGuideActive.x && (
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-red-500 z-30 pointer-events-none opacity-80" />
          )}
          {snapGuideActive.y && (
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 z-30 pointer-events-none opacity-80" />
          )}

          {/* RULER GRADUATION MARKS 1 to 19 CM */}
          <div className="relative inline-block border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_#000]">
            
            {/* Top Ruler Numbers */}
            <div className="absolute top-0 left-0 right-0 h-3.5 bg-black/10 flex justify-between px-1 pointer-events-none z-20 border-b border-black/20">
              {Array.from({ length: 19 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-black/30 flex items-center justify-center">
                  <span className="text-[7px] font-black text-black/70">{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Bottom Ruler Numbers */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/10 flex justify-between px-1 pointer-events-none z-20 border-t border-black/20">
              {Array.from({ length: 19 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-black/30 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-black/50">{i + 1}cm</span>
                </div>
              ))}
            </div>

            {/* The Actual HTML Canvas Element */}
            <canvas ref={canvasElRef} className="block cursor-grab active:cursor-grabbing" />
          </div>

        </div>

        {/* Guidance and Tips Footer */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-neutral-600 pt-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Klik teks/logo untuk geser (drag), putar (rotate), atau perbesar (scale) handle titik sudut.</span>
          </div>
          <button
            type="button"
            onClick={handleResetPosition}
            className="text-[10px] font-black uppercase text-black underline hover:text-neutral-600 cursor-pointer"
          >
            Reset Posisi ke Tengah
          </button>
        </div>

      </div>

    </div>
  );
};
