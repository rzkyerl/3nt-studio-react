import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, Sparkles, Palette, Calendar, Share2 } from 'lucide-react';
import logoBlack from '../../assets/Photo/logo-black.png';
import logoWhite from '../../assets/Photo/logo-white.png';

// Import Frames
import frame1 from '../../assets/Photo/Photobox Strip/1.png';
import frame2 from '../../assets/Photo/Photobox Strip/2.png';
import frame3 from '../../assets/Photo/Photobox Strip/3.png';
import frame4 from '../../assets/Photo/Photobox Strip/4.png';
import frame5 from '../../assets/Photo/Photobox Strip/5.png';
import frame6 from '../../assets/Photo/Photobox Strip/6.png';
import frame7 from '../../assets/Photo/Photobox Strip/7.png';
import frame8 from '../../assets/Photo/Photobox Strip/8.png';
import frame9 from '../../assets/Photo/Photobox Strip/9.png';
import frame10 from '../../assets/Photo/Photobox Strip/10.png';
import frame11 from '../../assets/Photo/Photobox Strip/11.png';
import frame12 from '../../assets/Photo/Photobox Strip/12.png';
import frame13 from '../../assets/Photo/Photobox Strip/13.png';

const STRIP_FRAMES = [
  { id: 'frame1', src: frame1 },
  { id: 'frame2', src: frame2 },
  { id: 'frame3', src: frame3 },
  { id: 'frame4', src: frame4 },
  { id: 'frame5', src: frame5 },
  { id: 'frame6', src: frame6 },
  { id: 'frame7', src: frame7 },
  { id: 'frame8', src: frame8 },
  { id: 'frame9', src: frame9 },
  { id: 'frame10', src: frame10 },
  { id: 'frame11', src: frame11 },
  { id: 'frame12', src: frame12 },
  { id: 'frame13', src: frame13 },
];

type State = 'START' | 'SETUP' | 'CAMERA' | 'RESULT';
type LayoutType = '1x3' | '1x4' | '2x2';

interface CapturedPhoto {
  id: number;
  url: string;
}

interface Sticker {
  id: string;
  emoji: string;
}

const STICKERS: Sticker[] = [
  { id: 'heart', emoji: '❤️' },
  { id: 'sparkles', emoji: '✨' },
  { id: 'star', emoji: '⭐' },
  { id: 'camera', emoji: '📸' },
  { id: 'smile', emoji: '😊' },
  { id: 'cool', emoji: '😎' },
  { id: 'cat', emoji: '🐱' },
  { id: 'bear', emoji: '🧸' },
];

const FRAME_COLORS = [
  { name: 'Pure White', value: '#FFFFFF' },
  { name: 'Deep Black', value: '#0A0A0A' },
  { name: 'Soft Pink', value: '#FFE5EC' },
  { name: 'Sky Blue', value: '#E0F2FE' },
  { name: 'Sage Green', value: '#F0FDF4' },
  { name: 'Cream', value: '#FFFBEB' },
];

export const Photobooth = () => {
  const [state, setState] = useState<State>('START');
  const [layout, setLayout] = useState<LayoutType>('1x4');
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [currentCaptureIndex, setCurrentCaptureIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Customization States
  const [frameColor, setFrameColor] = useState('#FFFFFF');
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [showDate, setShowDate] = useState(true);
  const [appliedStickers, setAppliedStickers] = useState<{ id: string, emoji: string, x: number, y: number }[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPhotoCount = (l: LayoutType) => {
    if (l === '1x3') return 3;
    if (l === '1x4') return 4;
    if (l === '2x2') return 4;
    return 4;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          aspectRatio: 3/4,
          width: { ideal: 1080 },
          height: { ideal: 1440 }
        } 
      });
      streamRef.current = stream;
      setError(null);
      setState('CAMERA');
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureSinglePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = 600;
      canvas.height = 800;
      
      const context = canvas.getContext('2d');
      if (context) {
        const sourceWidth = video.videoWidth;
        const sourceHeight = video.videoHeight;
        const targetRatio = 3/4;
        
        let drawWidth = sourceWidth;
        let drawHeight = sourceHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (sourceWidth / sourceHeight > targetRatio) {
          drawWidth = sourceHeight * targetRatio;
          offsetX = (sourceWidth - drawWidth) / 2;
        } else {
          drawHeight = sourceWidth / targetRatio;
          offsetY = (sourceHeight - drawHeight) / 2;
        }

        // Mirror the image horizontally to match the live preview
        context.save();
        context.scale(-1, 1);
        context.drawImage(video, offsetX, offsetY, drawWidth, drawHeight, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

        return canvas.toDataURL('image/png');
      }
    }
    return null;
  }, []);

  const startAutoCaptureFlow = useCallback(async () => {
    const photoCount = getPhotoCount(layout);
    const newPhotos: CapturedPhoto[] = [];
    setPhotos([]);
    
    for (let i = 0; i < photoCount; i++) {
      setCurrentCaptureIndex(i + 1);
      
      // Countdown
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      
      setCountdown(null);
      const photoUrl = captureSinglePhoto();
      if (photoUrl) {
        newPhotos.push({ id: i, url: photoUrl });
        setPhotos([...newPhotos]);
      }
      
      await new Promise(r => setTimeout(r, 500));
    }
    
    stopCamera();
    setState('RESULT');
  }, [layout, captureSinglePhoto]);

  useEffect(() => {
    let timer: any;
    
    // Function to attach stream to video element
    const attachStream = async () => {
      if (state === 'CAMERA' && streamRef.current) {
        // Wait a bit for the DOM to settle and ref to be attached
        if (!videoRef.current) {
          timer = setTimeout(attachStream, 100);
          return;
        }

        try {
          videoRef.current.srcObject = streamRef.current;
          await videoRef.current.play();
          console.log("Camera stream attached and playing");
          
          // Start auto capture flow
          timer = setTimeout(() => {
            startAutoCaptureFlow();
          }, 1500);
        } catch (err) {
          console.error("Error playing video:", err);
          setError("Failed to start video preview. Please try again.");
        }
      }
    };

    attachStream();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, startAutoCaptureFlow]);

  const generateStrip = useCallback(async () => {
    if (photos.length === 0) return null;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const photoWidth = 400;
    const photoHeight = 533; 
    const padding = 40;
    const headerHeight = 80;
    const footerHeight = 120;

    if (layout === '2x2') {
      canvas.width = (photoWidth * 2) + (padding * 3);
      canvas.height = (photoHeight * 2) + (padding * 3) + headerHeight + footerHeight;
    } else {
      const count = getPhotoCount(layout);
      canvas.width = photoWidth + (padding * 2);
      canvas.height = (photoHeight * count) + (padding * (count + 1)) + headerHeight + footerHeight;
    }

    // Helper to load image
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    // Background
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Custom Frame if selected (behind photos)
    if (selectedFrame) {
      try {
        const frameImg = await loadImage(selectedFrame);
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      } catch (err) {
        console.error("Error loading frame image:", err);
      }
    }

    // Header Logo Image
    const isDark = ['#0A0A0A', '#666666'].includes(frameColor);
    try {
      const logoImg = await loadImage(isDark ? logoWhite : logoBlack);
      const logoWidth = 120;
      const logoHeight = 40;
      ctx.drawImage(logoImg, (canvas.width - logoWidth) / 2, padding, logoWidth, logoHeight);
    } catch (err) {
      console.error("Error loading logo:", err);
    }

    // Draw Photos
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      try {
        const img = await loadImage(photo.url);
        
        let x = padding;
        let y = padding + headerHeight + (index * (photoHeight + padding));

        if (layout === '2x2') {
          x = padding + (index % 2) * (photoWidth + padding);
          y = padding + headerHeight + Math.floor(index / 2) * (photoHeight + padding);
        }

        ctx.drawImage(img, x, y, photoWidth, photoHeight);
      } catch (err) {
        console.error("Error loading captured photo:", err);
      }
    }

    // Stickers
    appliedStickers.forEach(s => {
      ctx.font = '40px Arial';
      ctx.fillText(s.emoji, s.x, s.y);
    });

    // Footer
    if (showDate) {
      const isDark = ['#0A0A0A', '#666666'].includes(frameColor);
      ctx.fillStyle = isDark ? '#CCCCCC' : '#666666';
      ctx.font = '16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 40);
    }

    return canvas.toDataURL('image/png');
  }, [photos, frameColor, selectedFrame, showDate, layout, appliedStickers]);

  const downloadStrip = async () => {
    const dataUrl = await generateStrip();
    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `3nt-photobooth-${Date.now()}.png`;
      link.click();
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent("Check out my 3NT Studio Photobooth strip! 📸");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const addSticker = (emoji: string) => {
    setAppliedStickers([...appliedStickers, { 
      id: Math.random().toString(), 
      emoji, 
      x: Math.random() * 400 + 50, 
      y: Math.random() * 800 + 100 
    }]);
  };

  return (
    <section id="photobooth" className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 pt-32">
      <div className="container-custom w-full max-w-6xl">
        
        <AnimatePresence mode="wait">
          {/* STATE 1: START SCREEN */}
          {state === 'START' && (
            <motion.div 
              key="start-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center text-center space-y-12"
            >
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-heading font-bold tracking-tighter"
                >
                  Online <span className="italic font-light">Photobooth</span>
                </motion.h1>
                <p className="text-medium-gray text-xl uppercase tracking-[0.3em]">Capture fun moments instantly</p>
              </div>

              <div className="flex gap-8 py-12 overflow-hidden opacity-30 grayscale pointer-events-none hidden md:flex">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-32 h-96 bg-white/5 border border-white/10 rounded-sm flex flex-col gap-2 p-2 transform rotate-3 even:-rotate-3 translate-y-4">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="flex-grow bg-white/5" />
                    ))}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setState('SETUP')}
                className="group relative px-12 py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-500 hover:text-white"
              >
                <span className="relative z-10">Start Session</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          )}

          {/* STATE 2: SETUP SCREEN */}
          {state === 'SETUP' && (
            <motion.div 
              key="setup-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center space-y-16"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-heading font-bold uppercase tracking-tighter">Choose Your Layout</h2>
                <p className="text-medium-gray uppercase tracking-widest text-xs">Select the style of your photo strip</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {(['1x3', '1x4', '2x2'] as LayoutType[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    className={cn(
                      "group p-8 border-2 transition-all duration-500 flex flex-col items-center gap-6",
                      layout === l ? "border-white bg-white/5 scale-105 shadow-2xl" : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <div className={cn(
                      "grid gap-1 bg-white/10 p-2 rounded-sm transition-transform duration-500 group-hover:scale-110",
                      l === '2x2' ? 'grid-cols-2' : 'grid-cols-1'
                    )}>
                      {Array.from({ length: getPhotoCount(l) }).map((_, i) => (
                        <div key={i} className="w-12 h-16 bg-white/20" />
                      ))}
                    </div>
                    <span className="text-sm uppercase tracking-widest font-bold">{l.replace('x', ' x ')} Strip</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={startCamera}
                  className="px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-medium-gray transition-colors"
                >
                  Start Camera
                </button>
                <button onClick={() => setState('START')} className="text-medium-gray text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Back
                </button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STATE 3: CAMERA MODE */}
          {state === 'CAMERA' && (
            <motion.div 
              key="camera-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-6"
            >
              <div className="relative w-full max-w-2xl aspect-[3/4] bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover mirror"
                />
                
                {/* Countdown Overlay */}
                <AnimatePresence>
                  {countdown !== null && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]"
                    >
                      <span className="text-[12rem] font-heading font-bold">{countdown}</span>
                      <span className="text-2xl uppercase tracking-[0.5em] font-light -mt-8">Get Ready</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress Indicator */}
                <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4">
                  <div className="px-6 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-xs uppercase tracking-[0.2em]">
                    Photo {currentCaptureIndex} of {getPhotoCount(layout)}
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: getPhotoCount(layout) }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          photos[i] ? "bg-white scale-125" : "bg-white/20"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { stopCamera(); setState('START'); }}
                className="mt-12 text-white/50 hover:text-white uppercase tracking-widest text-xs transition-colors"
              >
                Cancel Session
              </button>
            </motion.div>
          )}

          {/* STATE 4: RESULT / EDIT MODE */}
          {state === 'RESULT' && (
            <motion.div 
              key="result-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full"
            >
              {/* Photo Strip Preview */}
              <div className="flex justify-center order-2 lg:order-1 sticky top-32">
                <div 
                  className="relative p-6 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] transition-colors duration-500 overflow-hidden"
                  style={{ backgroundColor: frameColor }}
                >
                  {/* Custom Frame Background */}
                  {selectedFrame && (
                    <img 
                      src={selectedFrame} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
                    />
                  )}

                  <div className="flex flex-col gap-4 relative z-10">
                    {/* Header Logo */}
                    <div className="flex justify-center mb-2">
                      <img 
                        src={(['#0A0A0A', '#666666'].includes(frameColor)) ? logoWhite : logoBlack} 
                        alt="3NT STUDIO" 
                        className="h-8 w-auto"
                      />
                    </div>

                    {/* Photos Layout */}
                    <div className={cn(
                      "grid gap-4",
                      layout === '2x2' ? 'grid-cols-2' : 'grid-cols-1'
                    )}>
                      {photos.map(photo => (
                        <div key={photo.id} className="w-[200px] md:w-[280px] aspect-[3/4] bg-black/10 overflow-hidden relative">
                          <img src={photo.url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    {showDate && (
                      <div className={cn(
                        "text-center text-[10px] uppercase tracking-[0.3em] mt-4 opacity-50",
                        ['#0A0A0A', '#666666'].includes(frameColor) ? 'text-white' : 'text-black'
                      )}>
                        {new Date().toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Editing Sidebar */}
              <div className="space-y-12 order-1 lg:order-2">
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading font-bold uppercase tracking-tighter">Customize</h2>
                  <p className="text-medium-gray uppercase tracking-widest text-xs">Create your aesthetic Korea-style strip</p>
                </div>

                <div className="space-y-10">
                  {/* Custom Frames */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                      <Sparkles size={16} /> Frame Design
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        onClick={() => setSelectedFrame(null)}
                        className={cn(
                          "aspect-[3/4] border-2 flex items-center justify-center text-[8px] uppercase font-bold text-center p-1 transition-all",
                          selectedFrame === null ? "border-white bg-white/20" : "border-white/10 hover:border-white/30"
                        )}
                      >
                        No Frame
                      </button>
                      {STRIP_FRAMES.map((frame, idx) => (
                        <button 
                          key={frame.id}
                          onClick={() => setSelectedFrame(frame.src)}
                          className={cn(
                            "aspect-[3/4] border-2 overflow-hidden transition-all",
                            selectedFrame === frame.src ? "border-white scale-105" : "border-white/10 hover:border-white/30"
                          )}
                        >
                          <img src={frame.src} alt={`Frame ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frame Color */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                      <Palette size={16} /> Frame Color
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {FRAME_COLORS.map(color => (
                        <button 
                          key={color.value}
                          onClick={() => setFrameColor(color.value)}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all duration-300",
                            frameColor === color.value ? "border-white scale-110" : "border-transparent"
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Date Toggle */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                      <Calendar size={16} /> Date Stamp
                    </label>
                    <button 
                      onClick={() => setShowDate(!showDate)}
                      className={cn(
                        "px-6 py-3 border transition-all duration-300 text-[10px] uppercase tracking-widest font-bold",
                        showDate ? "bg-white text-black" : "border-white/20 text-white hover:border-white"
                      )}
                    >
                      {showDate ? 'Visible' : 'Hidden'}
                    </button>
                  </div>

                  {/* Stickers */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                      <Sparkles size={16} /> Add Stickers
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                      {STICKERS.map(sticker => (
                        <button 
                          key={sticker.id}
                          onClick={() => addSticker(sticker.emoji)}
                          className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-2xl transition-all hover:scale-110"
                        >
                          {sticker.emoji}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-medium-gray italic">*Stickers will be added randomly to the strip</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
                  <button 
                    onClick={downloadStrip}
                    className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-medium-gray transition-colors flex items-center justify-center gap-3"
                  >
                    <Download size={16} /> Download PNG Strip
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={shareToWhatsApp}
                      className="py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-green-500/10 hover:border-green-500/50 transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 size={14} /> WhatsApp
                    </button>
                    <button 
                      onClick={() => { setState('SETUP'); setPhotos([]); setAppliedStickers([]); }}
                      className="py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} /> Retake
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');