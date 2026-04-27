import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Check, ArrowRight, Camera, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';

// Assets
import fifa3 from '../../../assets/Photo/fifa/3.webp';
import logo3nt from '../../../assets/Photo/logo-black-1.webp';
import streaming from '../../../assets/Photo/services-assets/streaming-equipement.webp';
import teleprompter from '../../../assets/Photo/services-assets/teleprompter.webp';
import eventProduction from '../../../assets/Photo/mldspot/6.webp';
import drone from '../../../assets/Photo/services-assets/drone.webp';
import photobooth from '../../../assets/Photo/services-assets/photobooth.webp';

// --- Sub-Components ---

const SectionWrapper = ({ children, className, id, dark = false }: any) => (
  <section id={id} className={cn("py-24 lg:py-32 overflow-hidden", dark ? "bg-primary-black text-pure-white" : "bg-pure-white text-primary-black", className)}>
    <div className="container-custom">
      {children}
    </div>
  </section>
);

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper className="pt-40 lg:pt-48 min-h-[80vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-6xl md:text-8xl font-heading font-bold leading-[0.9] tracking-tighter">
                3NT Studio <br />
                <span className="italic font-light text-medium-gray">Production Services</span>
              </h1>
              <img src={logo3nt} className="w-24 h-24 object-contain shrink-0 lg:hidden mt-1" alt="3NT Studio Logo" />
            </div>
            <p className="text-xl md:text-2xl text-medium-gray font-light max-w-xl leading-relaxed">
              Production for Wedding, Corporate, Concert & Live Streaming
            </p>
          </div>
          
          <p className="text-medium-gray text-lg max-w-lg">
            Flexible production solutions for events of all sizes — from intimate weddings to large-scale productions.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => navigate('/quotation')}
              className="bg-primary-black text-pure-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
            >
              Request Quotation
            </button>
            <button
              onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary-black text-primary-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-black hover:text-pure-white transition-all"
            >
              View Services
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        className="relative aspect-[4/3] hidden lg:flex items-center justify-center"
        >
          <img src={logo3nt} className="w-full h-full object-contain" alt="Production" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

const TrustedSection = () => (
  <div className="border-y border-border-gray bg-light-gray/30 py-10 lg:py-12">
    <div className="container-custom flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
      <div className="flex items-center gap-6">
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-medium-gray whitespace-nowrap">Trusted For</span>
        <div className="hidden lg:block w-px h-8 bg-border-gray" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 lg:gap-x-16">
        {['Wedding Events', 'Corporate Events', 'Concert Production', 'Government Events', 'Brand Activation'].map((tag) => (
          <span key={tag} className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-primary-black/30 hover:text-primary-black transition-all duration-300 cursor-default">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const EcosystemSection = () => {
  const navigate = useNavigate();
  const categories = [
    { title: "Event Production", desc: "End-to-end production solutions for your biggest moments.", img: eventProduction, href: '/services/multicam' },
    { title: "Photobooth Experience", desc: "High-end photo booth systems for engaging events.", img: photobooth, href: '/services/photobooth' },
    { title: "Documentation", desc: "Professional photography and videography documentation.", img: fifa3, href: '/services/documentation' },
    { title: "Streaming & Broadcast", desc: "High-quality live streaming for any platform.", img: streaming, href: '/services/streaming' },
    { title: "Aerial Production", desc: "Cinematic drone shots for perspective and coverage.", img: drone, href: '/services/drone' },
    { title: "Additional Tools", desc: "Specialized equipment and production support.", img: teleprompter, href: '/services/teleprompter' },
  ];

  return (
    <SectionWrapper id="ecosystem">
      <div className="text-center mb-24 space-y-4">
        <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Our Services</span>
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter italic">Production <span className="not-italic">Ecosystem</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-pure-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer border border-border-gray/50"
            onClick={() => {
              if (cat.href) {
                navigate(cat.href);
                return;
              }
              if (!cat.href) return;
              const el = document.getElementById(cat.href);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="aspect-[4/3] overflow-hidden lg:grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src={cat.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.title} />
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight">{cat.title}</h3>
              <p className="text-medium-gray leading-relaxed text-sm">{cat.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest pt-4 group-hover:text-primary-black transition-colors">
                View Pricing <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

const ExpandableCard = ({ title, startingPrice, description, children, id }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id={id} className="border-b border-border-gray last:border-0 py-12">
      <div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-2">
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight group-hover:italic transition-all">{title}</h3>
          <p className="text-medium-gray max-w-md">{description}</p>
        </div>
        
        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right hidden md:block">
            <span className="text-xs uppercase tracking-widest text-medium-gray block mb-1">Starting from</span>
            <span className="text-2xl font-bold italic">{startingPrice}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
              {isOpen ? 'Close Details' : 'View Details'}
            </span>
            <div className={cn(
              "w-14 h-14 rounded-full border border-primary-black flex items-center justify-center transition-all duration-500",
              isOpen ? "bg-primary-black text-pure-white rotate-180" : "group-hover:bg-primary-black group-hover:text-pure-white"
            )}>
              <ChevronDown size={24} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-16 pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PriceGrid = ({ items, title }: any) => (
  <div className="space-y-8">
    <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-medium-gray border-l-2 border-primary-black pl-4">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item: any, i: number) => (
        <div key={i} className="bg-light-gray p-8 rounded-2xl flex flex-col justify-between gap-4 group hover:bg-primary-black hover:text-pure-white transition-all duration-300">
          <span className="text-sm font-bold uppercase tracking-widest opacity-60">{item.label}</span>
          <span className="text-2xl font-bold italic">{item.price}</span>
        </div>
      ))}
    </div>
  </div>
);

const FeatureList = ({ items, title }: any) => (
  <div className="space-y-8">
    <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-medium-gray border-l-2 border-primary-black pl-4">{title}</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-12">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
          <Check size={16} className="text-medium-gray" />
          <span>{item}</span>
        </div>  
      ))}
    </div>
  </div>
);

const CustomProductionSection = () => {
  const consultationWhatsAppLink = "https://wa.me/628xxxx?text=Hi%203NT%20Studio%2C%0ASaya%20ingin%20konsultasi%20untuk%20event%20saya%0A%0AEvent%20Type%3A%0ATanggal%3A%0ALokasi%3A";

  return (
    <SectionWrapper dark id="custom">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-heading font-bold italic tracking-tighter">
            Custom <span className="not-italic">Production</span>
          </h2>
          <p className="text-pure-white/60 text-xl font-light">By 3NT Studio</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {['Concert', 'Festival', 'Corporate', 'Government', 'Hybrid'].map(tag => (
            <span key={tag} className="px-8 py-3 rounded-full border border-pure-white/20 text-sm font-bold uppercase tracking-widest hover:bg-pure-white hover:text-primary-black transition-all cursor-default">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg leading-relaxed text-pure-white/80">
          For large scale events requiring specialized production crews, custom live visual assets, and 
          advanced technical systems. We provide tailored solutions to match your specific event needs.
        </p>

        <button
          onClick={() => window.open(consultationWhatsAppLink, '_blank', 'noopener,noreferrer')}
          className="bg-pure-white text-primary-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Start Consultation
        </button>
      </div>
    </SectionWrapper>
  );
};

const WhySection = () => {
  const reasons = [
    { title: "Professional Crew", desc: "Experienced production team specialized in high-end events.", icon: <Zap size={24} /> },
    { title: "Broadcast Grade", desc: "Industry standard equipment for the best visual output.", icon: <Camera size={24} /> },
    { title: "Fast Setup", desc: "Efficient technical deployment and system management.", icon: <Zap size={24} /> },
    { title: "Nationwide Coverage", desc: "Available for projects across Indonesia.", icon: <MapPin size={24} /> },
  ];

  return (
    <SectionWrapper id="why">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-4xl font-heading font-bold italic tracking-tighter leading-none">Why <br /><span className="not-italic">3NT Studio</span></h2>
          <div className="w-12 h-1 bg-primary-black" />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {reasons.map(r => (
            <div key={r.title} className="space-y-4">
              <div className="text-primary-black">{r.icon}</div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{r.title}</h3>
              <p className="text-medium-gray leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper className="bg-light-gray">
      <div className="text-center space-y-12 py-12">
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter italic">Ready to Work with <br /><span className="not-italic">3NT Studio?</span></h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate('/contact')}
            className="border border-primary-black text-primary-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-black hover:text-pure-white transition-all"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const Pricing = () => {
  return (
    <div className="bg-pure-white">
      <HeroSection />
      <TrustedSection />
      <EcosystemSection />

      {/* DETAILED SERVICES ACCORDIONS */}
      <SectionWrapper id="services-detail" className="pt-0">
        <div className="max-w-6xl mx-auto">
          {/* Photobooth */}
          <ExpandableCard 
            id="photobooth"
            title="Photobooth Experience"
            startingPrice="3.3 jt"
            description="Premium instant photo systems with high-quality printing, fast rendering, and interactive features."
          >
            <div className="space-y-20">
              <div className="space-y-12">
                <PriceGrid 
                  title="Unlimited Package"
                  items={[
                    { label: "2 Hours", price: "3.5 jt" },
                    { label: "3 Hours", price: "4.5 jt" },
                    { label: "4 Hours", price: "5.5 jt" },
                  ]}
                />
                <div className="h-px bg-border-gray w-full" />
                <PriceGrid 
                  title="Limited Package"
                  items={[
                    { label: "100 Prints", price: "3.3 jt" },
                    { label: "200 Prints", price: "3.8 jt" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <FeatureList 
                  title="Includes"
                  items={["Director Photography", "Crew Runner", "Lighting Setup", "Camera Unit"]}
                />
                <div className="space-y-8">
                  <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-medium-gray border-l-2 border-primary-black pl-4">Add Ons</h4>
                  <div className="bg-light-gray p-8 rounded-2xl flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-widest opacity-60">Greenscreen Setup</span>
                    <span className="text-xl font-bold italic">2.5 jt</span>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableCard>

          {/* Multicam */}
          <ExpandableCard 
            id="multicam"
            title="Multicam Production"
            startingPrice="5 jt"
            description="Broadcast-grade multicamera systems for concerts, corporate events, and live streaming."
          >
            <div className="space-y-20">
              <PriceGrid 
                title="FX6 Cinema 4K"
                items={[
                  { label: "1 Cam", price: "5 jt" },
                  { label: "2 Cam", price: "10 jt" },
                  { label: "3 Cam", price: "15 jt" },
                ]}
              />
              <PriceGrid 
                title="Sony Z190"
                items={[
                  { label: "1 Cam", price: "3.5 jt" },
                  { label: "2 Cam", price: "6.5 jt" },
                ]}
              />
              <PriceGrid 
                title="Sony NX5R"
                items={[
                  { label: "1 Cam", price: "3.5 jt" },
                  { label: "2 Cam", price: "6.5 jt" },
                ]}
              />
              <FeatureList 
                title="Technical System"
                items={["Blackmagic Atem Switcher", "Intercom System", "4K Recording", "Director Station", "Audio Mixer Integration", "Tally System"]}
              />
            </div>
          </ExpandableCard>

          {/* Drone */}
          <ExpandableCard 
            id="aerial"
            title="Aerial Production"
            startingPrice="2.5 jt"
            description="Professional drone services for cinematic aerial coverage and event perspectives."
          >
            <PriceGrid 
              title="Drone Packages"
              items={[
                { label: "Drone Basic", price: "2.5 jt" },
                { label: "Drone Gold", price: "4.5 jt" },
                { label: "Drone Platinum", price: "7.5 jt" },
                { label: "Drone FPV", price: "5.5 jt" },
              ]}
            />
          </ExpandableCard>

          {/* Documentation */}
          <ExpandableCard 
            id="documentation"
            title="Documentation"
            startingPrice="2.5 jt"
            description="Full-scale event documentation through premium photography and videography."
          >
            <div className="space-y-20">
              <PriceGrid 
                title="Photo Documentation"
                items={[
                  { label: "1 Photographer", price: "2.5 jt" },
                  { label: "2 Photographer", price: "4.5 jt" },
                ]}
              />
              <PriceGrid 
                title="Video Documentation"
                items={[
                  { label: "1 Videographer", price: "4.5 jt" },
                  { label: "2 Videographer", price: "6.5 jt" },
                ]}
              />
            </div>
          </ExpandableCard>

          {/* Broadcast */}
          <ExpandableCard 
            id="streaming"
            title="Broadcast & Streaming"
            startingPrice="2.5 jt"
            description="Reliable live streaming and broadcast systems for global reach."
          >
            <PriceGrid 
              title="Streaming Systems"
              items={[
                { label: "VMIX + VJ", price: "2.5 jt" },
                { label: "Resolume + VJ", price: "3.5 jt" },
                { label: "Hybrid System", price: "8.5 jt" },
                { label: "Social Media Stream", price: "5.5 jt" },
              ]}
            />
          </ExpandableCard>
        </div>
      </SectionWrapper>

      <CustomProductionSection />
      <WhySection />
      <CTASection />
    </div>
  );
};
