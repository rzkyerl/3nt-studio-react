import { useState } from 'react';
import { motion } from 'framer-motion';
import multicamImage from '../../../../assets/Photo/mldspot/6.webp';
import {
  multicamStartingPrice,
  multicamFX6,
  multicamFX6Equipment,
  multicamZ190,
  multicamZ190Equipment,
  multicamNX5R,
  multicamNX5REquipment,
  type PriceItem,
} from '../pricingData';
import { BookingModal, type BookingPackageOption } from '../../../../components/BookingModal';

const MULTICAM_PACKAGES: BookingPackageOption[] = [
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_1cam', label: '1 Camera', price: 'Rp 5.000.000' },
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_2cam', label: '2 Camera', price: 'Rp 10.000.000' },
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_3cam', label: '3 Camera', price: 'Rp 15.000.000' },
  { group: 'Multicam — Sony Z190', value: 'multicam_z190_1cam', label: '1 Camera', price: 'Rp 3.500.000' },
  { group: 'Multicam — Sony Z190', value: 'multicam_z190_2cam', label: '2 Camera', price: 'Rp 6.500.000' },
  { group: 'Multicam — Sony NX5R', value: 'multicam_nx5r_1cam', label: '1 Camera', price: 'Rp 3.500.000' },
  { group: 'Multicam — Sony NX5R', value: 'multicam_nx5r_2cam', label: '2 Camera', price: 'Rp 6.500.000' },
  { group: 'Custom Production', value: 'custom', label: 'Custom / Konsultasi', price: 'Hubungi Kami' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PriceCardGrid = ({ items }: { items: PriceItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-border-gray">
    {items.map((item, index) => (
      <motion.div
        key={item.label}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        className="px-6 py-5 border-r border-b border-border-gray last:border-r-0 xl:[&:nth-child(4n)]:border-r-0"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-medium-gray">{item.label}</p>
        <p className="mt-2 text-xl font-bold italic">{item.price}</p>
      </motion.div>
    ))}
  </div>
);

const EquipmentList = ({ items }: { items: string[] }) => (
  <div className="space-y-4">
    <p className="text-xs uppercase tracking-[0.3em] text-medium-gray">Equipment</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item} className="px-4 py-3 border border-border-gray text-sm">
          {item}
        </div>
      ))}
    </div>
  </div>
);

const MulticamServicePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-pure-white text-primary-black">
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packages={MULTICAM_PACKAGES}
        serviceTitle="Event Production"
      />
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-24 border-b border-border-gray">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[0.95] tracking-tighter">
                Event Production
              </h1>
              <p className="text-lg md:text-2xl text-medium-gray font-light max-w-2xl leading-relaxed">
                Professional multicam setup for concerts, corporate events, worship, and live broadcasts.
              </p>
            </div>

            <div className="border-l-2 border-primary-black pl-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-medium-gray mb-2">Starting Price</p>
              <p className="text-3xl md:text-4xl font-bold italic">Starting from {multicamStartingPrice}</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="aspect-[4/5] border border-border-gray overflow-hidden"
          >
            <img src={multicamImage} alt="Multicamera Production Setup" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-border-gray">
        <div className="container-custom space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">MULTICAMERA SYSTEM - FX6 4K</h2>
          <PriceCardGrid items={multicamFX6} />
          <EquipmentList items={multicamFX6Equipment} />
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-border-gray">
        <div className="container-custom space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">MULTICAMERA - SONY PXW Z190</h2>
          <PriceCardGrid items={multicamZ190} />
          <EquipmentList items={multicamZ190Equipment} />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">MULTICAMERA - SONY NX5R</h2>
          <PriceCardGrid items={multicamNX5R} />
          <EquipmentList items={multicamNX5REquipment} />
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">
            Ready to Book Multicamera Production?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-primary-black text-pure-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform">
              Book Now
            </button>
            <button className="border border-primary-black text-primary-black px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-black hover:text-pure-white transition-all">
              Contact WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary-black text-pure-white">
        <div className="container-custom flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="space-y-5">
            <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[0.95] tracking-tighter">
              Need Custom Setup?
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Wedding', 'Corporate', 'Concert', 'Brand Activation'].map((item) => (
                <span key={item} className="px-4 py-2 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-white/80">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <button className="bg-pure-white text-primary-black px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform">
            Request Custom Setup
          </button>
        </div>
      </section>
    </div>
  );
};

export default MulticamServicePage;
