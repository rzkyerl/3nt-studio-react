import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Import New Portfolio Photos
// MLDSPOT
import mld1 from '../../assets/Photo/mldspot/1.png';
import mld2 from '../../assets/Photo/mldspot/2.png';
import mld3 from '../../assets/Photo/mldspot/3.png';
import mld4 from '../../assets/Photo/mldspot/4.png';
import mld5 from '../../assets/Photo/mldspot/5.png';
import mld6 from '../../assets/Photo/mldspot/6.png';

// BPH MIGAS
import bph1 from '../../assets/Photo/bph-migas/1.png';
import bph2 from '../../assets/Photo/bph-migas/2.png';
import bph3 from '../../assets/Photo/bph-migas/3.png';
import bph4 from '../../assets/Photo/bph-migas/4.png';
import bph5 from '../../assets/Photo/bph-migas/5.png';
import bph6 from '../../assets/Photo/bph-migas/6.png';

// FIFA
import fifa1 from '../../assets/Photo/fifa/1.png';
import fifa2 from '../../assets/Photo/fifa/2.png';
import fifa3 from '../../assets/Photo/fifa/3.png';
import fifa4 from '../../assets/Photo/fifa/4.png';
import fifa5 from '../../assets/Photo/fifa/5.png';
import fifa6 from '../../assets/Photo/fifa/6.png';

// GOLF
import golf1 from '../../assets/Photo/golf-freindly-tournament/1.png';
import golf2 from '../../assets/Photo/golf-freindly-tournament/2.png';
import golf3 from '../../assets/Photo/golf-freindly-tournament/3.png';
import golf4 from '../../assets/Photo/golf-freindly-tournament/4.png';
import golf5 from '../../assets/Photo/golf-freindly-tournament/5.png';
import golf6 from '../../assets/Photo/golf-freindly-tournament/6.png';

// ASDP
import asdp1 from '../../assets/Photo/asdp/1.png';
import asdp2 from '../../assets/Photo/asdp/2.png';
import asdp3 from '../../assets/Photo/asdp/3.png';
import asdp4 from '../../assets/Photo/asdp/4.png';
import asdp5 from '../../assets/Photo/asdp/5.png';
import asdp6 from '../../assets/Photo/asdp/6.png';

interface PortfolioItem {
  id: number;
  image?: string;
  video?: string;
  className: string;
}

interface ProjectGroup {
  title: string;
  items: PortfolioItem[];
}

const portfolioGroups: ProjectGroup[] = [
  {
    title: "MLDSPOT SBJT",
    items: [
      { id: 1, image: mld1, className: "md:col-span-2 md:row-span-2" },
      { id: 2, image: mld2, className: "md:col-span-1 md:row-span-1" },
      { id: 3, image: mld3, className: "md:col-span-1 md:row-span-1" },
      { id: 4, image: mld4, className: "md:col-span-1 md:row-span-1" },
      { id: 5, image: mld5, className: "md:col-span-1 md:row-span-1" },
      { id: 6, image: mld6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "BPH MIGAS",
    items: [
      { id: 7, image: bph1, className: "md:col-span-1 md:row-span-2" },
      { id: 8, image: bph2, className: "md:col-span-1 md:row-span-1" },
      { id: 9, image: bph3, className: "md:col-span-1 md:row-span-1" },
      { id: 10, image: bph4, className: "md:col-span-1 md:row-span-1" },
      { id: 11, image: bph5, className: "md:col-span-1 md:row-span-1" },
      { id: 12, image: bph6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "FIFA Office Grand Opening",
    items: [
      { id: 13, image: fifa1, className: "md:col-span-2 md:row-span-1" },
      { id: 14, image: fifa2, className: "md:col-span-1 md:row-span-1" },
      { id: 15, image: fifa3, className: "md:col-span-1 md:row-span-1" },
      { id: 16, image: fifa4, className: "md:col-span-1 md:row-span-1" },
      { id: 17, image: fifa5, className: "md:col-span-1 md:row-span-1" },
      { id: 18, image: fifa6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "Golf Friendly Tournament",
    items: [
      { id: 19, image: golf1, className: "md:col-span-1 md:row-span-2" },
      { id: 20, image: golf2, className: "md:col-span-2 md:row-span-1" },
      { id: 21, image: golf3, className: "md:col-span-1 md:row-span-1" },
      { id: 22, image: golf4, className: "md:col-span-1 md:row-span-1" },
      { id: 23, image: golf5, className: "md:col-span-1 md:row-span-1" },
      { id: 24, image: golf6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "ASDP",
    items: [
      { id: 25, image: asdp1, className: "md:col-span-1 md:row-span-1" },
      { id: 26, image: asdp2, className: "md:col-span-1 md:row-span-1" },
      { id: 27, image: asdp3, className: "md:col-span-1 md:row-span-1" },
      { id: 28, image: asdp4, className: "md:col-span-1 md:row-span-1" },
      { id: 29, image: asdp5, className: "md:col-span-1 md:row-span-1" },
      { id: 30, image: asdp6, className: "md:col-span-1 md:row-span-1" },
    ]
  }
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Our Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight italic font-light">
            Timeless <span className="not-italic font-bold">Moments</span>
          </h2>
        </div>

        <div className="space-y-32">
          {portfolioGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-12">
              {/* Sub-title */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tighter">
                  {group.title}
                </h3>
                <div className="h-[1px] flex-grow bg-primary-black/10" />
              </motion.div>

              {/* Portfolio Grid for this project */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {group.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "relative group cursor-pointer overflow-hidden",
                      item.className
                    )}
                  >
                    {item.video ? (
                      <video 
                        src={item.video} 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={item.image} 
                        alt={group.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      />
                    )}
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <h3 className="text-xl font-heading text-pure-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        {group.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a href="#" className="inline-flex items-center gap-6 group">
            <span className="text-sm uppercase tracking-[0.3em] font-bold">View Full Gallery</span>
            <div className="w-12 h-[1px] bg-primary-black transition-all duration-300 group-hover:w-20" />
          </a>
        </div>
      </div>
    </section>
  );
};
