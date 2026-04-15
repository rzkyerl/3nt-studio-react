import { motion } from 'framer-motion';
import sonyKit from '../../assets/Photo/Pricing/sony-kit-camera.jpg';
import frame1 from '../../assets/Photo/Photobox Strip/1.png';
import frame2 from '../../assets/Photo/Photobox Strip/2.png';
import frame3 from '../../assets/Photo/Photobox Strip/3.png';
import frame5 from '../../assets/Photo/Photobox Strip/5.png';
import frame6 from '../../assets/Photo/Photobox Strip/6.png';
import multicamImg from '../../assets/Photo/Production/multicam-production.png';

// Import Portfolio Images for visuals
import mld1 from '../../assets/Photo/mldspot/1.png';
import mld2 from '../../assets/Photo/mldspot/2.png';
import mld3 from '../../assets/Photo/mldspot/3.png';
import bph1 from '../../assets/Photo/bph-migas/1.png';
import bph2 from '../../assets/Photo/bph-migas/2.png';
import fifa1 from '../../assets/Photo/fifa/1.png';
import fifa2 from '../../assets/Photo/fifa/2.png';
import asdp1 from '../../assets/Photo/asdp/1.png';

const services = [
  { name: "CLASSIC PHOTOBOOTH", active: false },
  { name: "PHOTOBOOTH KELILING", active: true },
  { name: "MATRIX 180", active: false },
  { name: "360 VIDEO BOOTH", active: true },
  { name: "PHOTO & VIDEO DOCUMENTATION", active: false },
  { name: "MULTICAMERA SYSTEM CINEMA CAMERA FX K", active: true },
  { name: "MULTICAMERA SYSTEM SONY PXW Z", active: false },
  { name: "MULTICAMERA SYSTEM SONY NXR FULL HD", active: false },
  { name: "BROADCAST SYSTEM", active: true },
  { name: "DRONE SYSTEM WITH OPERATOR", active: false },
  { name: "TELEPROMPTER WITH OPERATOR", active: true },
];

const Checkerboard = ({ className, color = 'bg-studio-blue' }: { className?: string; color?: string }) => (
  <div className={`grid grid-cols-4 grid-rows-2 w-16 h-8 ${className}`}>
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? color : 'bg-transparent'}`}
      />
    ))}
  </div>
);

const SectionHeader = ({ title, subtitle, bgText }: { title: string; subtitle?: string; bgText: string }) => (
  <div className="relative mb-16">
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none -translate-y-1/2">
      <h1 className="text-[15vw] font-black leading-none whitespace-nowrap italic uppercase">
        {bgText}
      </h1>
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-black text-studio-blue italic tracking-tighter uppercase leading-none">
          {title}
        </h2>
        {subtitle && (
          <p className="text-studio-blue/70 font-bold max-w-xl leading-tight">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 grid-rows-4 w-12 h-24">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`${(Math.floor(i / 2) + i % 2) % 2 === 0 ? 'bg-studio-blue' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PackageCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border-2 border-studio-blue/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-studio-blue/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:scale-110" />
    {children}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-[-16px]">
      <div className="grid grid-cols-6 grid-rows-2 w-36 h-8">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`${(Math.floor(i / 6) + i % 6) % 2 === 0 ? 'bg-studio-blue' : 'bg-transparent'}`}
          />
        ))}
      </div>
    </div>
  </div>
);

const PackageTitle = ({ title }: { title: string }) => (
  <h3 className="text-xl font-black text-studio-blue border-b-4 border-studio-blue inline-block mb-6 uppercase tracking-tight">
    {title}
  </h3>
);

const PriceRow = ({ label, price }: { label: string; price: string }) => (
  <div className="flex justify-between text-sm font-bold text-blue-900/80 mb-2">
    <span>{label}</span>
    <span className="text-studio-blue">{price}</span>
  </div>
);

export const Pricing = () => {
  return (
    <div className="space-y-48 py-24 bg-white">
      {/* OUR SERVICES OVERVIEW */}
      <section id="services" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
          <h1 className="text-[20vw] font-black leading-none whitespace-nowrap translate-y-[-20%] italic">
            OUR SERVICES OUR SERVICES
          </h1>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex justify-between items-start mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-studio-blue italic tracking-tighter">
              OUR SERVICES
            </h2>
            <Checkerboard className="mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-0 max-w-md">
              <div className="bg-white border-2 border-studio-blue rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,85,255,0.1)]">
                <div className="p-4 border-b-2 border-studio-blue bg-white">
                  <span className="text-studio-blue font-bold uppercase tracking-widest text-sm">Package :</span>
                </div>
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-5 border-b-2 border-studio-blue last:border-b-0 flex items-center justify-between transition-colors group cursor-pointer ${
                      service.active ? 'bg-studio-blue text-white' : 'bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <span className="font-bold text-lg tracking-tight uppercase">{service.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                src={sonyKit} 
                className="w-full h-full drop-shadow-2xl"
              />
              <div className="absolute bottom-[-40px] left-[10%] z-20">
                <div className="grid grid-cols-2 grid-rows-6 w-12 h-36">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`${(Math.floor(i / 2) + i % 2) % 2 === 0 ? 'bg-studio-blue' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 bg-studio-blue text-white p-6 rounded-tl-3xl shadow-lg flex items-center gap-2">
                <span className="font-black italic text-2xl">3NT</span>
                <span className="text-xs uppercase font-bold tracking-tighter">Studio</span>
              </div>
            </div>
          </div>
          <div className="mt-24 text-right">
            <p className="text-sm font-bold text-blue-900/60">
              a Production House Based in <span className="text-studio-blue font-black">Jakarta, Indonesia</span>
            </p>
          </div>
        </div>
      </section>

      {/* CLASSIC PHOTOBOOTH */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Classic Photobooth" 
            subtitle="An Instant Photo Corner. The Result are Photoprint 4R / Photostrip and Gif Animated"
            bgText="Classic"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <PackageCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <PackageTitle title="LIMITED PACKAGE" />
                  <div className="space-y-1">
                    <PriceRow label="100 Photo Prints" price="3.3 jt" />
                    <PriceRow label="200 Photo Prints" price="3.8 jt" />
                    <PriceRow label="300 Photo Prints" price="4.3 jt" />
                    <PriceRow label="400 Photo Prints" price="4.8 jt" />
                    <PriceRow label="500 Photo Prints" price="5.3 jt" />
                    <PriceRow label="600 Photo Prints" price="5.8 jt" />
                    <PriceRow label="700 Photo Prints" price="6.3 jt" />
                    <PriceRow label="1000 Photo Prints" price="8.8 jt" />
                  </div>
                </div>
                <div>
                  <PackageTitle title="UNLIMITED PACKAGE" />
                  <div className="space-y-1">
                    <PriceRow label="2 Hours" price="3.5 jt" />
                    <PriceRow label="3 Hours" price="4.5 jt" />
                    <PriceRow label="4 Hours" price="5.5 jt" />
                    <PriceRow label="6 Hours" price="6.5 jt" />
                    <PriceRow label="8 Hours" price="7.5 jt" />
                    <PriceRow label="10 Hours" price="8.5 jt" />
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t-2 border-border-gray grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <PackageTitle title="ADD ON" />
                  <PriceRow label="Greenscreen" price="2.5 jt" />
                </div>
                <div>
                  <PackageTitle title="INCLUDE" />
                  <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-tighter text-blue-900/60">
                    <div className="space-y-1">
                      <p className="text-studio-blue">MAN POWER</p>
                      <p>1 Director Photography</p>
                      <p>1 Crew Runner</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-studio-blue">DEVICE</p>
                      <p>Canon Camera</p>
                      <p>Laptop / Sharing Station</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-studio-blue">EQUIPMENT</p>
                      <p>Monitor 24 inch</p>
                      <p>Props Photobooth</p>
                      <p>Lighting Godox SL200</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-studio-blue">OUTPUT</p>
                      <p>Animated GIF</p>
                      <p>Photo Print</p>
                      <p>Overlay / Frame</p>
                    </div>
                  </div>  
                </div>
              </div>
            </PackageCard>
            <div className="flex flex-col gap-6 items-end">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src={frame1} className="w-full h-full object-cover" alt="Visual" />
              </motion.div>
              <div className="flex gap-4">
                {[frame2, frame3].map((img, i) => (
                  <motion.img key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} src={img} className="w-24 h-24 rounded-2xl object-cover shadow-xl border-4 border-white" />
                ))}
                <div className="w-24 h-24 rounded-2xl bg-studio-blue flex items-center justify-center text-white font-black italic shadow-xl border-4 border-white">3NT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOBOOTH KELILING */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Photobooth Keliling" 
            subtitle="Photographer Will Go Around to Capture Your Moments & The Result can be Printed on The Photo Counter"
            bgText="Keliling"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <PackageCard>
              <PackageTitle title="PHOTOBOOTH KELILING" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-12 text-sm font-bold text-blue-900/80">
                <PriceRow label="2 Hours" price="6 jt" />
                <PriceRow label="3 Hours" price="6.5 jt" />
                <PriceRow label="4 Hours" price="7 jt" />
                <PriceRow label="6 Hours" price="8 jt" />
                <PriceRow label="8 Hours" price="9 jt" />
                <PriceRow label="10 Hours" price="10 jt" />
              </div>
              <div className="grid grid-cols-2 gap-12 pt-12 border-t-2 border-border-gray">
                <div>
                  <p className="text-xs font-black text-studio-blue mb-4 uppercase">Include</p>
                  <div className="space-y-4 text-[9px] font-black uppercase tracking-tighter text-blue-900/60">
                    <div className="space-y-1">
                      <p className="text-studio-blue">MAN POWER</p>
                      <p>1 Proffessional Photographer</p>
                      <p>2 Crew Runner</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-studio-blue">EQUIPMENT</p>
                      <p>Sony A7 Mark IV</p>
                      <p>Wireless Router</p>
                      <p>Flash External</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <div className="space-y-4 text-[9px] font-black uppercase tracking-tighter text-blue-900/60">
                    <div className="space-y-1">
                      <p className="text-studio-blue">DEVICE</p>
                      <p>Laptop Legion RTX 3060</p>
                      <p>Sharing Station</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-studio-blue">OUTPUT</p>
                      <p>Photo Print Hires</p>
                      <p>Overlay / Template</p>
                      <p>Frame Photo Standart</p>
                    </div>
                  </div>
                </div>
              </div>
            </PackageCard>
            <div className="relative h-full flex flex-col gap-6">
              <div className="flex gap-4 h-1/2">
                <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} src={mld1} className="w-1/2 h-full object-cover rounded-3xl" />
                <div className="flex flex-col gap-4 w-1/2">
                  <motion.img initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} src={mld2} className="h-1/2 w-full object-cover rounded-3xl" />
                  <motion.img initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} src={mld3} className="h-1/2 w-full object-cover rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATRIX 180 */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Matrix 180" 
            subtitle="Multi-Camera Array Which Creates A Unique Bullet-Time Effect"
            bgText="Matrix"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <PackageCard>
              <PackageTitle title="MATRIX 180 PHOTOBOOTH" />
              <div className="grid grid-cols-2 gap-x-12 mb-12 text-sm font-bold text-blue-900/80">
                <PriceRow label="8 Cams" price="8.5 jt" />
                <PriceRow label="10 Cams" price="10.5 jt" />
                <PriceRow label="12 Cams" price="12 jt" />
                <PriceRow label="16 Cams" price="14 jt" />
              </div>
              <div className="mb-12">
                <PackageTitle title="ADD ON" />
                <PriceRow label="Unlimited Photo 4R Print" price="3.5 jt" />
              </div>
              <div className="pt-12 border-t-2 border-border-gray grid grid-cols-2 gap-12 text-[9px] font-black uppercase tracking-tighter text-blue-900/60">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-studio-blue">MAN POWER</p>
                    <p>1 Director Photography</p>
                    <p>2 Crew Runner</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-studio-blue">EQUIPMENT</p>
                    <p>Tripod Camera</p>
                    <p>Lighting Godox SL200</p>
                    <p>TV Preview 43 inch</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-studio-blue">DEVICE</p>
                    <p>Canon Camera</p>
                    <p>Laptop Legion RTX 3060</p>
                    <p>Sharing Station</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-studio-blue">OUTPUT</p>
                    <p>Video Matrix / Boomerang</p>
                    <p>Overlay / Template</p>
                  </div>
                </div>
              </div>
            </PackageCard>
            <div className="flex flex-col gap-6">
              <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} src={bph1} className="w-full aspect-video object-cover rounded-3xl" />
              <div className="grid grid-cols-3 gap-4">
                {[bph2, fifa1, fifa2].map((img, i) => (
                  <motion.img key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} src={img} className="aspect-square object-cover rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 360 VIDEOBOOTH */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="360 Videobooth" 
            subtitle="High Quality Video. Fast Rendering Only 20 Second"
            bgText="360 Booth"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <PackageCard>
              <PackageTitle title="360 VIDEOBOOTH" />
              <div className="grid grid-cols-2 gap-x-12 mb-12 text-sm font-bold text-blue-900/80">
                <PriceRow label="2 Hours" price="4.5 jt" />
                <PriceRow label="3 Hours" price="5.5 jt" />
                <PriceRow label="4 Hours" price="6.5 jt" />
                <PriceRow label="6 Hours" price="7.5 jt" />
                <PriceRow label="8 Hours" price="8.5 jt" />
                <PriceRow label="10 Hours" price="9.5 jt" />
              </div>
              <div className="mb-12">
                <PackageTitle title="ADD ON" />
                <div className="space-y-1">
                  <PriceRow label="Greenscreen Setup" price="2.5 jt" />
                  <PriceRow label="Greenscreen Content Template" price="1 jt" />
                  <p className="text-[10px] text-blue-900/60 font-black uppercase">Greenscreen Content Custom by KV</p>
                </div>
              </div>
              <div className="pt-12 border-t-2 border-border-gray grid grid-cols-2 gap-12 text-[9px] font-black uppercase tracking-tighter text-blue-900/60">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-studio-blue">MAN POWER</p>
                    <p>1 Director Photography</p>
                    <p>1 Crew Runner</p>
                    <p>1 Crew Sharing Station</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-studio-blue">EQUIPMENT</p>
                    <p>TV 43 Preview</p>
                    <p>Props Photobooth</p>
                    <p>Lighting Godox SL200 / TL120</p>
                    <p>Spin Diameter 90cm / 100cm / 120cm</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-studio-blue">DEVICE</p>
                    <p>GoPro Camera</p>
                    <p>Laptop Legion RTX 3060</p>
                    <p>Sharing Station</p>
                  </div>
                </div>
              </div>
            </PackageCard>
            <div className="flex flex-col gap-6">
              <motion.img initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} src={asdp1} className="w-full aspect-[3/4] object-cover rounded-3xl shadow-2xl" />
              <div className="flex gap-4 overflow-x-auto pb-4">
                {[frame5, frame6].map((img, i) => (
                  <motion.img key={i} src={img} className="h-32 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO & VIDEO DOCUMENTATION */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader 
            title="Photo & Video Documentation" 
            bgText="Documentation"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <PackageCard>
              <div className="space-y-12">
                <div>
                  <PackageTitle title="PHOTO" />
                  <PriceRow label="1 Photographer" price="2.5 jt" />
                  <PriceRow label="2 Photographer" price="4.5 jt" />
                  <p className="text-[10px] text-blue-900/60 font-black uppercase mt-2">Output : Data Via Google Drive</p>
                </div>
                <div>
                  <PackageTitle title="VIDEO" />
                  <PriceRow label="1 Videographer" price="4.5 jt" />
                  <PriceRow label="2 Videographer" price="6.5 jt" />
                  <p className="text-[10px] text-blue-900/60 font-black uppercase mt-2">Output : Data Via Google Drive</p>
                </div>
                <div className="pt-8 border-t-2 border-border-gray">
                  <PackageTitle title="GEAR" />
                  <div className="text-[10px] font-black uppercase tracking-tighter text-blue-900/60 space-y-1">
                    <p>Sony A7 Mark IV</p>
                    <p>Lensa Camera</p>
                    <p>Flash / Lighting External</p>
                  </div>
                </div>
              </div>
            </PackageCard>
            <div className="grid grid-cols-2 gap-6">
              <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} src={mld1} className="w-full aspect-square object-cover rounded-3xl" />
              <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} src={bph1} className="w-full aspect-square object-cover rounded-3xl" />
              <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} src={fifa1} className="w-full aspect-square object-cover rounded-3xl" />
              <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} src={asdp1} className="w-full aspect-square object-cover rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* MULTICAMERA SYSTEMS */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader title="Multicamera System" bgText="Multicam" />
          
          <div className="space-y-32">
            {/* FX6 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <PackageCard>
                <PackageTitle title="CINEMA CAMERA FX6 4K" />
                <div className="space-y-1 mb-12">
                  <PriceRow label="1 Cam" price="5 jt" />
                  <PriceRow label="2 Cams" price="10 jt" />
                  <PriceRow label="3 Cams" price="15 jt" />
                  <PriceRow label="4 Cams" price="20 jt" />
                </div>
                <div className="pt-8 border-t-2 border-border-gray">
                  <p className="text-[10px] font-black text-studio-blue uppercase mb-4">Equipment List</p>
                  <div className="grid grid-cols-2 gap-2 text-[8px] font-black uppercase tracking-tighter text-blue-900/60">
                    <p>Sony FX 6 Cinema 4k</p>
                    <p>Blackmagic Design ATEM</p>
                    <p>Television Studio Pro 4K</p>
                    <p>Blackmagic Recorder</p>
                    <p>Mixer Audio Control</p>
                    <p>Tripod Camera</p>
                    <p>Clearcom Wireless</p>
                    <p>Set Cabeling System</p>
                  </div>
                </div>
              </PackageCard>
              <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} src={multicamImg} className="w-full rounded-3xl shadow-2xl" />
            </div>

            {/* PXW Z190 & NX5R */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <PackageCard>
                <PackageTitle title="SONY PXW Z190" />
                <div className="space-y-1 mb-12">
                  <PriceRow label="1 Cam" price="3.5 jt" />
                  <PriceRow label="2 Cams" price="6.5 jt" />
                  <PriceRow label="3 Cams" price="10 jt" />
                  <PriceRow label="4 Cams" price="12 jt" />
                </div>
                <div className="pt-8 border-t-2 border-border-gray text-[8px] font-black uppercase tracking-tighter text-blue-900/60 grid grid-cols-2 gap-2">
                  <p>Camera Sony PXW Z190</p>
                  <p>Blackmagic ATEM Studio</p>
                  <p>Blackmagic Hyperdeck 4K</p>
                  <p>Mixer Audio Control</p>
                  <p>Tripod Camera</p>
                  <p>Clearcom Wireless</p>
                  <p>Set Cabeling System</p>
                </div>
              </PackageCard>
              <PackageCard>
                <PackageTitle title="SONY NX5R FULL HD" />
                <div className="space-y-1 mb-12">
                  <PriceRow label="1 Cam" price="3.5 jt" />
                  <PriceRow label="2 Cams" price="6.5 jt" />
                  <PriceRow label="3 Cams" price="10 jt" />
                  <PriceRow label="4 Cams" price="12 jt" />
                </div>
                <div className="pt-8 border-t-2 border-border-gray text-[8px] font-black uppercase tracking-tighter text-blue-900/60 grid grid-cols-2 gap-2">
                  <p>Camera Sony NX5R FULL HD</p>
                  <p>Data Video Switcher</p>
                  <p>Blackmagic Recorder</p>
                  <p>Mixer Audio Control</p>
                  <p>Tripod Camera</p>
                  <p>Clearcom Wireless</p>
                  <p>Set Cabeling System</p>
                </div>
              </PackageCard>
            </div>
          </div>
        </div>
      </section>

      {/* BROADCAST SYSTEM */}
      <section className="relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeader title="Broadcast System" bgText="Broadcast" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <PackageCard>
              <PackageTitle title="BROADCAST SYSTEM" />
              <div className="space-y-4">
                <PriceRow label="VMIX + VJ" price="2.5 jt" />
                <PriceRow label="Laptop Resolume + VJ" price="3.5 jt" />
                <PriceRow label="PC Resolume + VJ" price="5.5 jt" />
                <PriceRow label="Hybrid System" price="8.5 jt" />
                <PriceRow label="Streaming Social Media" price="5.5 jt" />
              </div>
            </PackageCard>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-studio-blue/20 group-hover:bg-transparent transition-all duration-700 z-10 rounded-3xl" />
              <img
                src={mld1}
                className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
                alt="Broadcast"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      <section className="container-custom pb-24">
        <div className="flex flex-col items-center text-center space-y-8 border-t-2 border-border-gray pt-24">
          <div className="space-y-2">
            <h4 className="text-xl font-black italic uppercase tracking-tighter">Ready to Production?</h4>
            <p className="text-blue-900/60 font-bold max-w-lg">
              Contact us for custom requests, long-term projects, or detailed technical specifications.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-studio-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer">
              Contact Admin
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Checkerboard color="bg-studio-blue/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-900/40">3NT Studio Production House</span>
            <Checkerboard color="bg-studio-blue/10" />
          </div>
        </div>
      </section>
    </div>
  );
};
