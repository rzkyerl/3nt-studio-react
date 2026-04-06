import { motion } from 'framer-motion';
import sonyKit from '../../assets/Photo/Pricing/sony-kit-camera.jpg';
import frame1 from '../../assets/Photo/Photobox Strip/1.png';
import frame2 from '../../assets/Photo/Photobox Strip/2.png';
import frame3 from '../../assets/Photo/Photobox Strip/3.png';
import multicamImg from '../../assets/Photo/Production/multicam-production.png';

// Import Portfolio Images for visuals
import mld1 from '../../assets/Photo/mldspot/1.png';
import bph1 from '../../assets/Photo/bph-migas/1.png';
import asdp1 from '../../assets/Photo/asdp/1.png';

const services = [
  "CLASSIC PHOTOBOOTH",
  "PHOTOBOOTH KELILING",
  "MATRIX 180",
  "360 VIDEO BOOTH",
  "PHOTO & VIDEO DOCUMENTATION",
  "MULTICAMERA SYSTEM (FX6 / PXW / NX5R)",
  "BROADCAST SYSTEM",
  "DRONE SYSTEM WITH OPERATOR",
  "TELEPROMPTER WITH OPERATOR",
];

const SectionDivider = () => (
  <div className="w-full h-[1px] bg-primary-black/10 my-24 lg:my-32" />
);

const PriceRow = ({ label, price }: { label: string; price: string }) => (
  <div className="flex justify-between items-baseline py-3 border-b border-primary-black/5 last:border-0 group">
    <span className="text-sm font-medium text-medium-gray group-hover:text-primary-black transition-colors uppercase tracking-widest">{label}</span>
    <span className="text-lg font-heading italic text-primary-black">{price}</span>
  </div>
);

const PackageDetail = ({ title, items, description }: { title: string; items: { label: string; price: string }[]; description?: string }) => (
  <div className="space-y-6">
    <div className="space-y-1">
      <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary-black/40">{title}</h4>
      {description && <p className="text-sm text-medium-gray italic">{description}</p>}
    </div>
    <div className="space-y-1">
      {items.map((item, i) => (
        <PriceRow key={i} label={item.label} price={item.price} />
      ))}
    </div>
  </div>
);

export const Pricing = () => {
  return (
    <div className="bg-pure-white py-32 lg:py-48 selection:bg-primary-black selection:text-pure-white">
      {/* HERO / OVERVIEW */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-[0.5em] text-medium-gray font-bold">Services & Investment</span>
              <h2 className="text-6xl md:text-8xl font-heading leading-none italic font-light">
                Our <span className="not-italic font-bold">Offerings</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
            >
              {services.map((service, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-black/20 group-hover:bg-primary-black transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-widest text-medium-gray group-hover:text-primary-black transition-colors">
                    {service}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <img src={sonyKit} className="w-full h-full object-cover" alt="Studio Gear" />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* CLASSIC PHOTOBOOTH */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-heading font-bold italic">Classic Photobooth</h3>
              <p className="text-lg text-medium-gray leading-relaxed max-w-md">
                An instant photo corner for your events. High-quality prints in 4R or photostrip format, complete with animated GIF output.
              </p>
            </div>

            <div className="space-y-16">
              <PackageDetail 
                title="Limited Package" 
                items={[
                  { label: "100 Prints", price: "3.3 jt" },
                  { label: "200 Prints", price: "3.8 jt" },
                  { label: "300 Prints", price: "4.3 jt" },
                  { label: "500 Prints", price: "5.3 jt" },
                  { label: "1000 Prints", price: "8.8 jt" },
                ]}
              />
              <PackageDetail 
                title="Unlimited Package" 
                items={[
                  { label: "2 Hours", price: "3.5 jt" },
                  { label: "4 Hours", price: "5.5 jt" },
                  { label: "8 Hours", price: "7.5 jt" },
                ]}
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="grid grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="aspect-[3/4] bg-light-gray overflow-hidden">
                <img src={frame1} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Sample" />
              </motion.div>
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="aspect-square bg-light-gray overflow-hidden">
                  <img src={frame2} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Sample" />
                </motion.div>
                <div className="p-8 border border-primary-black/10 space-y-6">
                  <h5 className="text-[10px] uppercase tracking-widest font-black text-primary-black">Included in all sessions</h5>
                  <ul className="text-[10px] uppercase tracking-widest space-y-2 text-medium-gray leading-loose">
                    <li>Professional Director of Photography</li>
                    <li>High-end Canon Camera System</li>
                    <li>Studio Lighting (Godox SL200)</li>
                    <li>24" Touchscreen Preview</li>
                    <li>Digital Gallery & GIF Exports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* MULTICAMERA SYSTEMS */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="aspect-video bg-light-gray overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img src={multicamImg} className="w-full h-full object-cover" alt="Multicam" />
            </motion.div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold">Production Gear</h5>
                <p className="text-[10px] text-medium-gray leading-relaxed uppercase tracking-widest">
                  Sony FX6 Cinema 4K / PXW Z190 / NX5R Full HD. Blackmagic ATEM Television Studio. Clearcom Wireless Systems.
                </p>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold">Output</h5>
                <p className="text-[10px] text-medium-gray leading-relaxed uppercase tracking-widest">
                  Live Broadcast. Multi-angle Recording. Professional Color Grading. Instant Social Edits.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12 order-1 lg:order-2 lg:pl-12">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-heading font-bold italic">Multicamera System</h3>
              <p className="text-lg text-medium-gray leading-relaxed max-w-md">
                Professional multi-camera solutions for live events, broadcasts, and high-end commercial productions.
              </p>
            </div>

            <div className="space-y-12">
              <PackageDetail 
                title="Cinema Grade (FX6 4K)" 
                items={[
                  { label: "1 Camera System", price: "5.0 jt" },
                  { label: "2 Camera System", price: "10.0 jt" },
                  { label: "4 Camera System", price: "20.0 jt" },
                ]}
              />
              <PackageDetail 
                title="Broadcast Grade (PXW Z190)" 
                items={[
                  { label: "1 Camera System", price: "3.5 jt" },
                  { label: "4 Camera System", price: "12.0 jt" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SPECIALIZED SERVICES GRID */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {/* Matrix 180 */}
          <div className="space-y-8">
            <div className="aspect-square bg-light-gray overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src={bph1} className="w-full h-full object-cover" alt="Matrix 180" />
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-heading font-bold italic">Matrix 180</h4>
              <p className="text-sm text-medium-gray leading-relaxed italic">Bullet-time effects created with a synchronized multi-camera array.</p>
              <div className="space-y-1">
                <PriceRow label="8 Camera Array" price="8.5 jt" />
                <PriceRow label="16 Camera Array" price="14.0 jt" />
              </div>
            </div>
          </div>

          {/* 360 Video */}
          <div className="space-y-8">
            <div className="aspect-square bg-light-gray overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src={asdp1} className="w-full h-full object-cover" alt="360 Booth" />
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-heading font-bold italic">360 Video Booth</h4>
              <p className="text-sm text-medium-gray leading-relaxed italic">High-speed rotation video with instant 20-second rendering for social sharing.</p>
              <div className="space-y-1">
                <PriceRow label="3 Hour Session" price="5.5 jt" />
                <PriceRow label="6 Hour Session" price="7.5 jt" />
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-8">
            <div className="aspect-square bg-light-gray overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src={mld1} className="w-full h-full object-cover" alt="Documentation" />
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-heading font-bold italic">Documentation</h4>
              <p className="text-sm text-medium-gray leading-relaxed italic">Event coverage with professional photography and cinematic videography.</p>
              <div className="space-y-1">
                <PriceRow label="Photo (1 Cam)" price="2.5 jt" />
                <PriceRow label="Video (1 Cam)" price="4.5 jt" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FINAL CALL TO ACTION */}
      <section className="container-custom text-center py-24 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-12"
        >
          <h2 className="text-5xl md:text-7xl font-heading italic font-light leading-tight">
            Ready to capture <br />
            <span className="not-italic font-bold">your vision?</span>
          </h2>
          <p className="text-lg text-medium-gray leading-relaxed max-w-xl mx-auto">
            We specialize in tailoring our technical expertise to meet your specific creative needs. Contact us for custom quotes and detailed consultations.
          </p>
          <div className="pt-8">
            <button className="px-12 py-5 bg-primary-black text-pure-white rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-medium-gray transition-colors duration-500">
              Inquire Now
            </button>
          </div>
          <p className="text-[10px] text-medium-gray uppercase tracking-[0.4em] pt-12">
            a Production House Based in Jakarta, Indonesia
          </p>
        </motion.div>
      </section>
    </div>
  );
};
