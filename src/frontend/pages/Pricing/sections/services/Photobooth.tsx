import { motion } from 'framer-motion';
import photoboothImage from '../../../../assets/Photo/services-assets/photobooth.webp';
import {
  photoboothStartingPrice,
  photoboothClassicUnlimited,
  photoboothClassicLimited,
  photoboothClassicAddOns,
  photoboothClassicIncludes,
  photoboothKeliling,
  photoboothKelilingIncludes,
  photobooth360,
  photobooth360AddOns,
  photobooth360Includes,
  photoboothMatrix180,
  photoboothMatrix180AddOns,
  photoboothMatrix180Includes,
  type PriceItem,
  type IncludeGroup,
  type AddOnItem,
} from '../pricingData';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PriceGrid = ({ items, columns = 'lg:grid-cols-6' }: { items: PriceItem[]; columns?: string }) => (
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

const IncludeGrid = ({ groups }: { groups: IncludeGroup[] }) => (
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

const AddOnList = ({ items }: { items: AddOnItem[] }) => (
  <div className="border-y border-border-gray">
    {items.map((item) => (
      <div key={item.label} className="flex items-center justify-between py-5 border-b border-border-gray last:border-b-0">
        <p className="text-sm md:text-base uppercase tracking-[0.15em] text-medium-gray">{item.label}</p>
        <p className="text-sm md:text-base font-semibold">{item.price}</p>
      </div>
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
              <p className="text-3xl md:text-4xl font-bold italic">Starting from {photoboothStartingPrice}</p>
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

      {/* CLASSIC PHOTOBOOTH */}
      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">CLASSIC PHOTOBOOTH</h2>
            <p className="text-lg text-medium-gray">Instant photo experience with high-quality print and GIF animation.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing - Unlimited Package</h3>
            <PriceGrid items={photoboothClassicUnlimited} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing - Limited Print Package</h3>
            <div className="border-y border-border-gray">
              {photoboothClassicLimited.map((item, index) => (
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
            <AddOnList items={photoboothClassicAddOns} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={photoboothClassicIncludes} />
          </div>
        </div>
      </section>

      {/* PHOTOBOOTH KELILING */}
      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">PHOTOBOOTH KELILING</h2>
            <p className="text-lg text-medium-gray">Photographer Will Go Around to Capture Your Moments</p>
            <p className="text-base text-medium-gray">The Result can be Printed on The Photo Counter</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">PHOTOBOOTH KELILING</h3>
            <PriceGrid items={photoboothKeliling} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={photoboothKelilingIncludes} />
          </div>
        </div>
      </section>

      {/* 360 VIDEOBOOTH */}
      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">360 VIDEOBOOTH</h2>
            <p className="text-lg text-medium-gray">High Quality Video</p>
            <p className="text-base text-medium-gray">Fast Rendering Only 20 Second</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing</h3>
            <PriceGrid items={photobooth360} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Add On</h3>
            <AddOnList items={photobooth360AddOns} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={photobooth360Includes} />
          </div>
        </div>
      </section>

      {/* MATRIX 180 */}
      <section className="py-16 lg:py-24 border-t border-border-gray">
        <div className="container-custom space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter">MATRIX 180 PHOTOBOOTH</h2>
            <p className="text-lg text-medium-gray">Multi-Camera Array Which Creates</p>
            <p className="text-base text-medium-gray">A Unique Bullet-Time Effect</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Pricing</h3>
            <PriceGrid items={photoboothMatrix180} columns="lg:grid-cols-4" />
            <p className="text-sm uppercase tracking-[0.2em] text-medium-gray">Max Operation: 10 Hours</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Add On</h3>
            <AddOnList items={photoboothMatrix180AddOns} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Include</h3>
            <IncludeGrid groups={photoboothMatrix180Includes} />
          </div>
        </div>
      </section>

      {/* CTA */}
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
