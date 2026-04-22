import { motion } from 'framer-motion';
import teleprompterImage from '../../../../assets/Photo/services-assets/teleprompter.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const teleprompterPackages = [
  { label: 'Teleprompter 6 Jam', price: '1.500.000' },
  { label: 'Teleprompter 1 Hari', price: '2.500.000' },
];

const includeItems = ['Laptop', 'Prompter Kit', 'HDMI Cable', 'Operator'];

const TeleprompterServicePage = () => {
  return (
    <div className="bg-pure-white text-primary-black">
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
                TELEPROMPTER
              </h1>
              <p className="text-lg md:text-2xl text-medium-gray font-light max-w-2xl leading-relaxed">
                Script-reading support for keynote sessions, studio recordings, and corporate presentations.
              </p>
            </div>

            <div className="border-l-2 border-primary-black pl-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-medium-gray mb-2">Starting Price</p>
              <p className="text-3xl md:text-4xl font-bold italic">Starting from 1.500.000</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="aspect-[4/5] border border-border-gray overflow-hidden"
          >
            <img src={teleprompterImage} alt="Teleprompter setup" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-border-gray">
        <div className="container-custom space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">TELEPROMPTER</h2>
          <p className="text-sm md:text-base text-medium-gray uppercase tracking-[0.15em]">
            Rental package by operation duration
          </p>
          <div className="border-y border-border-gray">
            {teleprompterPackages.map((item, index) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="flex items-center justify-between py-5 md:py-6 border-b border-border-gray last:border-b-0"
              >
                <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">{item.label}</p>
                <p className="text-sm md:text-base font-semibold">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">Include</h2>
          <p className="text-sm md:text-base text-medium-gray uppercase tracking-[0.15em]">
            Included operational tools and crew
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {includeItems.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="px-5 py-4 border border-border-gray text-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">
            Ready to Book Teleprompter Services?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary-black text-pure-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform">
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

export default TeleprompterServicePage;
