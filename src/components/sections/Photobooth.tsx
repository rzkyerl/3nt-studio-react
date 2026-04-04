import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, Play, RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const Photobooth = () => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraStarted(false);
    }
  };

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        // Apply monochrome filter to the canvas context
        context.filter = 'grayscale(100%) brightness(1.1) contrast(1.1)';
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  }, []);

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `lumina-photobooth-${Date.now()}.png`;
      link.click();
    }
  };

  const resetPhotobooth = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <section id="photobooth" className="section-padding bg-primary-black text-pure-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Interactive Experience</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic font-light">
            Digital <span className="not-italic font-bold">Photobooth</span>
          </h2>
          <p className="text-medium-gray text-lg max-w-2xl mx-auto leading-relaxed mt-6">
            Experience our signature monochrome aesthetic instantly. Start your camera, strike a pose, and capture a professional-grade portrait.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          {/* Main Display Box */}
          <div className="relative aspect-video bg-pure-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm group-hover:border-white/20 transition-all duration-500">
            
            <AnimatePresence mode="wait">
              {!isCameraStarted && !capturedImage && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-center p-8"
                >
                  <div className="w-24 h-24 rounded-full bg-pure-white/10 flex items-center justify-center group-hover:bg-pure-white/20 transition-all duration-500">
                    <Camera size={40} className="text-pure-white" strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-bold uppercase tracking-tighter">Ready to Begin?</h3>
                    <p className="text-medium-gray text-sm uppercase tracking-widest">Enable your camera for the full experience.</p>
                  </div>
                  <Button variant="outline" size="lg" className="border-pure-white text-pure-white hover:bg-pure-white hover:text-primary-black" onClick={startCamera}>
                    <Play size={18} className="mr-3 inline-block" /> Start Camera
                  </Button>
                  {error && <p className="text-red-400 text-xs uppercase tracking-widest mt-4 font-bold">{error}</p>}
                </motion.div>
              )}

              {isCameraStarted && (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black"
                >
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover grayscale brightness-110 contrast-110"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 flex flex-col justify-between p-10 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="px-4 py-2 bg-primary-black/50 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border border-white/10">
                        Live Preview
                      </div>
                      <button onClick={stopCamera} className="pointer-events-auto w-10 h-10 rounded-full bg-primary-black/50 backdrop-blur-md flex items-center justify-center hover:bg-red-500/80 transition-all duration-300">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-center pointer-events-auto">
                      <button 
                        onClick={capturePhoto}
                        className="w-20 h-20 rounded-full bg-pure-white/10 border-4 border-pure-white flex items-center justify-center hover:scale-110 transition-all duration-300 group/capture active:scale-95"
                      >
                        <div className="w-14 h-14 rounded-full bg-pure-white group-hover/capture:bg-medium-gray transition-colors" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {capturedImage && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-black"
                >
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Result Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-primary-black/40 flex flex-col justify-between p-10">
                    <div className="flex justify-between items-start">
                      <div className="px-4 py-2 bg-primary-black/50 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border border-white/10 flex items-center gap-2">
                        <ImageIcon size={14} /> Captured Moment
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <Button variant="outline" size="md" className="border-pure-white text-pure-white hover:bg-pure-white hover:text-primary-black w-full sm:w-auto" onClick={resetPhotobooth}>
                        <RefreshCw size={18} className="mr-3 inline-block" /> Retake
                      </Button>
                      <Button variant="primary" size="md" className="bg-pure-white text-primary-black hover:bg-transparent hover:text-pure-white border-pure-white w-full sm:w-auto" onClick={downloadPhoto}>
                        <Download size={18} className="mr-3 inline-block" /> Download PNG
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hidden Canvas for Processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-white/5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
