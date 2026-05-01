import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Check, ArrowRight, Camera, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { useLanguage } from '../../../lib/LanguageContext';

// Assets
import fifa3 from '../../../assets/Photo/fifa/3.webp';
import logo3nt from '../../../assets/Photo/logo-black-1.webp';
import streaming from '../../../assets/Photo/services-assets/streaming-equipement.webp';
import teleprompter from '../../../assets/Photo/services-assets/teleprompter.webp';
import eventProduction from '../../../assets/Photo/mldspot/6.webp';
import drone from '../../../assets/Photo/services-assets/drone.webp';
import photobooth from '../../../assets/Photo/services-assets/photobooth.webp';

// ─── Shared Pricing Data (fallback when Sanity has no data) ───
import {
  photoboothStartingPrice,
  photoboothPackageGroups,
  photoboothClassicAddOns,
  photoboothClassicIncludes,
  multicamStartingPrice,
  multicamPackageGroups,
  droneStartingPrice,
  dronePackageGroups,
  documentationStartingPrice,
  documentationPackageGroups,
  broadcastStartingPrice,
  broadcastPackageGroups,
  teleprompterStartingPrice,
  teleprompterPackageGroups,
  teleprompterIncludes,
  type PackageGroup,
} from './pricingData';

// ─── Sanity hook ──────────────────────────────────────────────
import { usePricingServices, type PricingService } from '../../../hooks/usePricingServices';

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
  const { t } = useLanguage();

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
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl md:text-8xl font-heading font-bold leading-[0.9] tracking-tighter">
                3NT Studio <br />
                <span className="italic font-light text-medium-gray">Production Services</span>
              </h1>
              <img src={logo3nt} className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0 lg:hidden" alt="3NT Studio Logo" />
            </div>
            <p className="text-xl md:text-2xl text-medium-gray font-light max-w-xl leading-relaxed">
              {t('pricing_hero_subtitle')}
            </p>
          </div>
          
          <p className="text-medium-gray text-lg max-w-lg">
            {t('pricing_hero_desc')}
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => navigate('/quotation')}
              className="bg-primary-black text-pure-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
            >
              {t('pricing_request_quotation')}
            </button>
            <button
              onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary-black text-primary-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-black hover:text-pure-white transition-all"
            >
              {t('pricing_view_services')}
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

const TrustedSection = () => {
  const { t } = useLanguage();
  return (
    <div className="border-y border-border-gray bg-light-gray/30 py-10 lg:py-12">
      <div className="container-custom flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-medium-gray whitespace-nowrap">{t('pricing_trusted_for')}</span>
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
};

const EcosystemSection = ({ sanityServices }: { sanityServices: PricingService[] }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fallback static categories (used when Sanity has no data yet)
  const staticCategories = [
    { name: t('svc_event_title'), description: t('svc_event_desc'), imgSrc: eventProduction, slug: 'multicam' },
    { name: t('svc_photobooth_title'), description: t('svc_photobooth_desc'), imgSrc: photobooth, slug: 'photobooth' },
    { name: t('svc_documentation_title'), description: t('svc_documentation_desc'), imgSrc: fifa3, slug: 'documentation' },
    { name: t('svc_streaming_title'), description: t('svc_streaming_desc'), imgSrc: streaming, slug: 'streaming' },
    { name: t('svc_aerial_title'), description: t('svc_aerial_desc'), imgSrc: drone, slug: 'drone' },
    { name: t('svc_tools_title'), description: t('svc_tools_desc'), imgSrc: teleprompter, slug: 'teleprompter' },
  ];

  // Use Sanity data if available, otherwise fallback
  const displayCategories = sanityServices.length > 0
    ? sanityServices.map((s) => ({
        name: s.name,
        description: s.description || '',
        imgSrc: s.imageUrl || '',
        slug: s.slug,
      }))
    : staticCategories;

  return (
    <SectionWrapper id="ecosystem">
      <div className="text-center mb-24 space-y-4">
        <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">{t('pricing_our_services')}</span>
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter italic">Production <span className="not-italic">Ecosystem</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayCategories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-pure-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-[box-shadow,transform] duration-500 flex flex-col cursor-pointer border border-border-gray/50 will-change-transform"
            onClick={() => navigate(`/services/${cat.slug}`)}
          >
            <div className="aspect-[4/3] overflow-hidden lg:grayscale group-hover:grayscale-0 transition-[filter] duration-700">
              <img
                src={cat.imgSrc}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={cat.name}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight">{cat.name}</h3>
              <p className="text-medium-gray leading-relaxed text-sm">{cat.description}</p>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest pt-4 group-hover:text-primary-black transition-colors">
                {t('pricing_view_pricing')} <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
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
  const { t } = useLanguage();

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
            <span className="text-xs uppercase tracking-widest text-medium-gray block mb-1">{t('pricing_starting_from')}</span>
            <span className="text-2xl font-bold italic">{startingPrice}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
              {isOpen ? t('pricing_close_details') : t('pricing_view_details')}
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
  const { t } = useLanguage();

  return (
    <SectionWrapper dark id="custom">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-heading font-bold italic tracking-tighter">
            {t('pricing_custom_title').split(' ')[0]} <span className="not-italic">{t('pricing_custom_title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-pure-white/60 text-xl font-light">{t('pricing_custom_by')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {['Concert', 'Festival', 'Corporate', 'Government', 'Hybrid'].map(tag => (
            <span key={tag} className="px-8 py-3 rounded-full border border-pure-white/20 text-sm font-bold uppercase tracking-widest hover:bg-pure-white hover:text-primary-black transition-all cursor-default">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg leading-relaxed text-pure-white/80">
          {t('pricing_custom_desc')}
        </p>

        <button
          onClick={() => window.open(consultationWhatsAppLink, '_blank', 'noopener,noreferrer')}
          className="bg-pure-white text-primary-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {t('pricing_start_consultation')}
        </button>
      </div>
    </SectionWrapper>
  );
};

const WhySection = () => {
  const { t } = useLanguage();
  const reasons = [
    { titleKey: 'pricing_reason1_title', descKey: 'pricing_reason1_desc', icon: <Zap size={24} /> },
    { titleKey: 'pricing_reason2_title', descKey: 'pricing_reason2_desc', icon: <Camera size={24} /> },
    { titleKey: 'pricing_reason3_title', descKey: 'pricing_reason3_desc', icon: <Zap size={24} /> },
    { titleKey: 'pricing_reason4_title', descKey: 'pricing_reason4_desc', icon: <MapPin size={24} /> },
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
            <div key={r.titleKey} className="space-y-4">
              <div className="text-primary-black">{r.icon}</div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{t(r.titleKey)}</h3>
              <p className="text-medium-gray leading-relaxed">{t(r.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <SectionWrapper className="bg-light-gray">
      <div className="text-center space-y-12 py-12">
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter italic">{t('pricing_cta_title')}</h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate('/contact')}
            className="border border-primary-black text-primary-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-black hover:text-pure-white transition-all"
          >
            {t('pricing_send_inquiry')}
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

// ─── Accordion: one Sanity service ───────────────────────────

const SanityAccordion = ({ service }: { service: PricingService }) => (
  <ExpandableCard
    id={service.slug}
    title={service.name}
    startingPrice={service.startingPrice || ''}
    description={service.description || ''}
  >
    <div className="space-y-20">
      {service.packageGroups.map((group, gi) => (
        <div key={group.title}>
          {gi > 0 && <div className="h-px bg-border-gray w-full mb-20" />}
          <PriceGrid title={group.title} items={group.items} />
        </div>
      ))}

      {service.features.length > 0 && (
        <FeatureList title="Includes" items={service.features.flatMap((f) => f.items)} />
      )}

      {service.addOns.length > 0 && (
        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-medium-gray border-l-2 border-primary-black pl-4">Add Ons</h4>
          {service.addOns.map((addon) => (
            <div key={addon.label} className="bg-light-gray p-8 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">{addon.label}</span>
              <span className="text-xl font-bold italic">{addon.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </ExpandableCard>
);

// ─── Static accordions fallback (pricingData.ts) ──────────────

const StaticAccordions = () => {
  const { t } = useLanguage();
  return (
    <>
      <ExpandableCard id="photobooth" title={t('svc_photobooth_title')} startingPrice={photoboothStartingPrice} description="Premium instant photo systems with high-quality printing, fast rendering, and interactive features.">
        <div className="space-y-20">
          <div className="space-y-12">
            {photoboothPackageGroups.map((group: PackageGroup, gi: number) => (
              <div key={group.title}>
                {gi > 0 && <div className="h-px bg-border-gray w-full mb-12" />}
                <PriceGrid title={group.title} items={group.items} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <FeatureList title="Includes" items={photoboothClassicIncludes.flatMap((g) => g.items)} />
            <div className="space-y-8">
              <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-medium-gray border-l-2 border-primary-black pl-4">Add Ons</h4>
              {photoboothClassicAddOns.map((addon) => (
                <div key={addon.label} className="bg-light-gray p-8 rounded-2xl flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">{addon.label}</span>
                  <span className="text-xl font-bold italic">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExpandableCard>

      <ExpandableCard id="multicam" title="Multicam Production" startingPrice={multicamStartingPrice} description="Broadcast-grade multicamera systems for concerts, corporate events, and live streaming.">
        <div className="space-y-20">
          {multicamPackageGroups.map((group: PackageGroup) => <PriceGrid key={group.title} title={group.title} items={group.items} />)}
          <FeatureList title="Technical System" items={["Blackmagic Atem Switcher", "Intercom System", "4K Recording", "Director Station", "Audio Mixer Integration", "Tally System"]} />
        </div>
      </ExpandableCard>

      <ExpandableCard id="aerial" title={t('svc_aerial_title')} startingPrice={droneStartingPrice} description="Professional drone services for cinematic aerial coverage and event perspectives.">
        <div className="space-y-12">
          {dronePackageGroups.map((group: PackageGroup) => <PriceGrid key={group.title} title={group.title} items={group.items} />)}
        </div>
      </ExpandableCard>

      <ExpandableCard id="documentation" title={t('svc_documentation_title')} startingPrice={documentationStartingPrice} description="Full-scale event documentation through premium photography and videography.">
        <div className="space-y-20">
          {documentationPackageGroups.map((group: PackageGroup) => <PriceGrid key={group.title} title={group.title} items={group.items} />)}
        </div>
      </ExpandableCard>

      <ExpandableCard id="streaming" title="Broadcast & Streaming" startingPrice={broadcastStartingPrice} description="Reliable live streaming and broadcast systems for global reach.">
        <div className="space-y-12">
          {broadcastPackageGroups.map((group: PackageGroup) => <PriceGrid key={group.title} title={group.title} items={group.items} />)}
        </div>
      </ExpandableCard>

      <ExpandableCard id="teleprompter" title="Teleprompter" startingPrice={teleprompterStartingPrice} description="Script-reading support for keynote sessions, studio recordings, and corporate presentations.">
        <div className="space-y-20">
          {teleprompterPackageGroups.map((group: PackageGroup) => <PriceGrid key={group.title} title={group.title} items={group.items} />)}
          <FeatureList title="Includes" items={teleprompterIncludes} />
        </div>
      </ExpandableCard>
    </>
  );
};

// ─── Main Pricing Page ────────────────────────────────────────

export const Pricing = () => {
  const { data: sanityServices, loading } = usePricingServices();
  const hasSanity = !loading && sanityServices.length > 0;

  return (
    <div className="bg-pure-white">
      <HeroSection />
      <TrustedSection />
      <EcosystemSection sanityServices={sanityServices} />

      {/* DETAILED SERVICES ACCORDIONS */}
      <SectionWrapper id="services-detail" className="pt-0">
        <div className="max-w-6xl mx-auto">
          {hasSanity
            ? sanityServices.map((s) => <SanityAccordion key={s._id} service={s} />)
            : <StaticAccordions />
          }
        </div>
      </SectionWrapper>

      <CustomProductionSection />
      <WhySection />
      <CTASection />
    </div>
  );
};

