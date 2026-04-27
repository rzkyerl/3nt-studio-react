import { motion } from 'framer-motion';
import photoboothImage from '../../../../assets/Photo/services-assets/photobooth.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const classicUnlimitedPackages = [
  { label: '2 Hours', price: 'Rp 3.500.000' },
  { label: '3 Hours', price: 'Rp 4.500.000' },
  { label: '4 Hours', price: 'Rp 5.500.000' },
  { label: '6 Hours', price: 'Rp 6.500.000' },
  { label: '8 Hours', price: 'Rp 7.500.000' },
  { label: '10 Hours', price: 'Rp 8.500.000' },
];

const classicLimitedPackages = [
  { label: '100 Prints', price: 'Rp 3.300.000' },
  { label: '200 Prints', price: 'Rp 3.800.000' },
  { label: '300 Prints', price: 'Rp 4.300.000' },
  { label: '400 Prints', price: 'Rp 4.800.000' },
  { label: '500 Prints', price: 'Rp 5.300.000' },
  { label: '600 Prints', price: 'Rp 5.800.000' },
  { label: '700 Prints', price: 'Rp 6.300.000' },
  { label: '1000 Prints', price: 'Rp 8.800.000' },
];

const classicIncludes = [
  {
    title: 'Man Power',
    items: ['1 Director Photography', '1 Crew Runner'],
  },
  {
    title: 'Equipment',
    items: ['Monitor 24 inch Touchscreen', 'Props Photobooth', 'Lighting Godox SL200'],
  },
  {
    title: 'Device',
    items: ['Canon Camera', 'Laptop', 'Sharing Station'],
  },
  {
    title: 'Output',
    items: ['Animated GIF', 'Photo Print', 'Overlay Template', 'Frame Photo Standard'],
  },
];

const photoboothKelilingPackages = [
  { label: '2 Hours', price: '6 Juta' },
  { label: '3 Hours', price: '6.5 Juta' },
  { label: '4 Hours', price: '7 Juta' },
  { label: '6 Hours', price: '8 Juta' },
  { label: '8 Hours', price: '9 Juta' },
  { label: '10 Hours', price: '10 Juta' },
];

const photoboothKelilingIncludes = [
  {
    title: 'Man Power',
    items: ['1 Proffesional Photographer', '2 Crew Runner'],
  },
  {
    title: 'Device',
    items: ['Laptop Legion', 'Sharing Station'],
  },
  {
    title: 'Equipment',
    items: ['Sony A7 Mark IV', 'Wireless Router', 'Flash External'],
  },
  {
    title: 'Output',
    items: ['Photo Print Hires', 'Overlay / Template', 'Frame Photo Standart'],
  },
];

const videobooth360Packages = [
  { label: '2 Hours', price: '4.5 jt' },
  { label: '3 Hours', price: '5.5 jt' },
  { label: '4 Hours', price: '6.5 jt' },
  { label: '6 Hours', price: '7.5 jt' },
  { label: '8 Hours', price: '8.5 jt' },
  { label: '10 Hours', price: '9.5 jt' },
];

const videobooth360AddOns = [
  { label: 'Greenscreen Setup', price: '2.5 jt' },
  { label: 'Greenscreen Content Template', price: '1 jt' },
  { label: 'Greenscreen Content Custom by KV', price: 'Custom' },
];

const videobooth360Includes = [
  {
    title: 'Man Power',
    items: ['1 Director Photography', '1 Crew Runner', '1 Crew Sharing Station'],
  },
  {
    title: 'Equipment',
    items: ['TV 43 Preview', 'Props Photobooth', 'Lighting Godox SL200 / TL120', 'Spin Diameter 90cm / 100cm / 120cm'],
  },
  {
    title: 'Device',
    items: ['GoPro Camera', 'Laptop Legion RTX 3060', 'Sharing Station'],
  },
];

const matrix180Packages = [
  { label: '8 Cameras', price: '8.5 jt' },
  { label: '10 Cameras', price: '10.5 jt' },
  { label: '12 Cameras', price: '12 jt' },
  { label: '16 Cameras', price: '14 jt' },
];

const matrix180Includes = [
  {
    title: 'Man Power',
    items: ['1 Director Photography', '2 Crew Runner'],
  },
  {
    title: 'Equipment',
    items: ['Tripod Camera', 'Lighting Godox SL200', 'TV Preview 43 inch'],
  },
  {
    title: 'Device',
    items: ['Canon Camera', 'Laptop Legion RTX 3060', 'Sharing Station'],
  },
  {
    title: 'Output',
    items: ['Video Matrix / Boomerang', 'Overlay / Template'],
  },
];

const PriceGrid = ({ items, columns = 'lg:grid-cols-6' }: { items: { label: string; price: string }[]; columns?: string }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 ${columns} border border-border-gray`}>
    {items.map((item, index) => (
      <motion.div
        key={item.label}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="p-5 md:p-6 border-r border-b border-border-gray last:border-r-0 hover:-translate-y-1 hover:bg-light-gray/60 transition-all"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-medium-gray">{item.label}</p>
        <p className="text-sm md:text-base font-semibold mt-2">{item.price}</p>
      </motion.div>
    ))}
  </div>
);

const IncludeGrid = ({ groups }: { groups: { title: string; items: string[] }[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
    {groups.map((group, index) => (
      <motion.div
        key={group.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="space-y-4 p-6 border border-border-gray bg-pure-white hover:-translate-y-1 transition-transform"
      >
        <h3 className="text-sm uppercase tracking-[0.2em] font-bold">{group.title}</h3>
        <ul className="space-y-2">
          {group.items.map((item) => (
            <li key={item} className="text-sm text-medium-gray leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const PhotoboothServicePage = () => {
  return (
    <div className="bg-pure-white text-primary-black">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7 }}
        className="pt-36 pb-16 lg:pt-44 lg:pb-24"
      >
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[0.95] tracking-tighter">
                Photobooth Experiences
              </h1>
              <p className="text-lg md:text-2xl text-medium-gray font-light max-w-2xl leading-relaxed">
                Production-ready concepts for events: Classic Photobooth, Photobooth Keliling, 360 Videobooth, and Matrix 180 Photobooth.
              </p>
            </div>

            <div className="space-y-3 text-sm md:text-base text-medium-gray max-w-2xl leading-relaxed">
              <p><span className="font-semibold text-primary-black">Classic Photobooth:</span> Instant photo experience with high-quality print and GIF animation.</p>
              <p><span className="font-semibold text-primary-black">Photobooth Keliling:</span> Photographer goes around, the results can be printed on the photo counter.</p>
              <p><span className="font-semibold text-primary-black">360 Videobooth:</span> High quality video with fast rendering in only 20 seconds.</p>
              <p><span className="font-semibold text-primary-black">Matrix 180 Photobooth:</span> Multi-camera array that creates a unique bullet-time effect.</p>
            </div>

            <div className="border-l-2 border-primary-black pl-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-medium-gray mb-2">Starting Price</p>
              <p className="text-3xl md:text-4xl font-bold italic">Starting from Rp 3.300.000</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-primary-black text-pure-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform">
                Book Now
              </button>
              <button className="border border-primary-black text-primary-black px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-black hover:text-pure-white transition-all">
                Request Quotation
              </button>
            </div>
          </div>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="aspect-[4/5] border border-border-gray overflow-hidden"
          >
            <img src={photoboothImage} alt="Classic Photobooth Setup" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">CLASSIC PHOTOBOOTH</h2>
            <p className="text-lg text-medium-gray">Instant photo experience with high-quality print and GIF animation.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing - Unlimited Package</h3>
            <PriceGrid items={classicUnlimitedPackages} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing - Limited Print Package</h3>
            <div className="border-y border-border-gray">
              {classicLimitedPackages.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="flex items-center justify-between py-5 md:py-6 border-b border-border-gray last:border-b-0"
                >
                  <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">{item.label}</p>
                  <p className="text-sm md:text-base font-semibold">{item.price}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Add On</h3>
            <div className="border-y border-border-gray">
              <div className="flex items-center justify-between py-5">
                <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">Greenscreen Setup</p>
                <p className="text-sm md:text-base font-semibold">Rp 2.500.000</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={classicIncludes} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">PHOTOBOOTH KELILING</h2>
            <p className="text-lg text-medium-gray">Photographer Will Go Around to Capture Your Moments</p>
            <p className="text-base text-medium-gray">The Result can be Printed on The Photo Counter</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">PHOTOBOOTH KELILING</h3>
            <PriceGrid items={photoboothKelilingPackages} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={photoboothKelilingIncludes} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">360 VIDEOBOOTH</h2>
            <p className="text-lg text-medium-gray">High Quality Video</p>
            <p className="text-base text-medium-gray">Fast Rendering Only 20 Second</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing</h3>
            <PriceGrid items={videobooth360Packages} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Add On</h3>
            <div className="border-y border-border-gray">
              {videobooth360AddOns.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-5 border-b border-border-gray last:border-b-0">
                  <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">{item.label}</p>
                  <p className="text-sm md:text-base font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={videobooth360Includes} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">MATRIX 180 PHOTOBOOTH</h2>
            <p className="text-lg text-medium-gray">Multi-Camera Array Which Creates</p>
            <p className="text-base text-medium-gray">A Unique Bullet-Time Effect</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing</h3>
            <PriceGrid items={matrix180Packages} columns="lg:grid-cols-4" />
            <p className="text-sm uppercase tracking-[0.2em] text-medium-gray">Max Operation: 10 Hours</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Add On</h3>
            <div className="border-y border-border-gray">
              <div className="flex items-center justify-between py-5">
                <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">Unlimited Photo 4R Print</p>
                <p className="text-sm md:text-base font-semibold">3.5 jt</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={matrix180Includes} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">
            Ready to Book Photobooth Services?
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

export default PhotoboothServicePage;
