import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import heroVideoDefault from '../../assets/Video/cinematic-bg.mp4';
import { Link } from 'react-router-dom';

export const Hero = ({ data }: { data: any }) => {
  const displayData = {
    heroTitle: data?.heroTitle || 'Capture Your Best Moments',
    heroSubtitle: data?.heroSubtitle || 'Professional Photography Studio',
    heroVideoUrl: data?.heroVideoUrl || '',
    heroImageUrl: data?.heroImageUrl || ''
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      {displayData.heroVideoUrl ? (
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          autoPlay
          muted
          loop
          playsInline
          key={displayData.heroVideoUrl}
        >
          <source src={displayData.heroVideoUrl} type="video/mp4" />
        </video>
      ) : displayData.heroImageUrl ? (
        <img 
          src={displayData.heroImageUrl} 
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          alt="Hero Background"
        />
      ) : (
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideoDefault} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-pure-white text-5xl md:text-7xl lg:text-8xl font-heading mb-6 tracking-tight leading-tight"
          dangerouslySetInnerHTML={{ __html: displayData.heroTitle.replace('\n', '<br />') }}
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-pure-white/80 text-lg md:text-xl font-body mb-10 tracking-widest uppercase"
        >
          {displayData.heroSubtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link to="/booking">
            <Button variant="primary" size="lg" className="bg-pure-white text-primary-black hover:bg-transparent hover:text-pure-white hover:border-pure-white border-pure-white">
              Book Now
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="outline" size="lg" className="border-pure-white text-pure-white hover:bg-pure-white hover:text-primary-black">
              View Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-pure-white flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Scroll</span>
        <ChevronDown size={20} strokeWidth={1} />
      </motion.div>
    </section>
  );
};
