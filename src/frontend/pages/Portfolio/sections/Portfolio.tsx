import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useState, useEffect } from 'react';
import * as adminService from '../../../services/adminService';

// Import New Portfolio Photos (Keep as static fallback if needed)
import mld1 from '../../../assets/Photo/mldspot/1.png';
import mld2 from '../../../assets/Photo/mldspot/2.png';
import mld3 from '../../../assets/Photo/mldspot/3.png';
import mld4 from '../../../assets/Photo/mldspot/4.png';
import mld5 from '../../../assets/Photo/mldspot/5.png';
import mld6 from '../../../assets/Photo/mldspot/6.png';

// BPH MIGAS
import bph1 from '../../../assets/Photo/bph-migas/1.png';
import bph2 from '../../../assets/Photo/bph-migas/2.png';
import bph3 from '../../../assets/Photo/bph-migas/3.png';
import bph4 from '../../../assets/Photo/bph-migas/4.png';
import bph5 from '../../../assets/Photo/bph-migas/5.png';
import bph6 from '../../../assets/Photo/bph-migas/6.png';

// FIFA
import fifa1 from '../../../assets/Photo/fifa/1.png';
import fifa2 from '../../../assets/Photo/fifa/2.png';
import fifa3 from '../../../assets/Photo/fifa/3.png';
import fifa4 from '../../../assets/Photo/fifa/4.png';
import fifa5 from '../../../assets/Photo/fifa/5.png';
import fifa6 from '../../../assets/Photo/fifa/6.png';

// GOLF
import golf1 from '../../../assets/Photo/golf-freindly-tournament/1.png';
import golf2 from '../../../assets/Photo/golf-freindly-tournament/2.png';
import golf3 from '../../../assets/Photo/golf-freindly-tournament/3.png';
import golf4 from '../../../assets/Photo/golf-freindly-tournament/4.png';
import golf5 from '../../../assets/Photo/golf-freindly-tournament/5.png';
import golf6 from '../../../assets/Photo/golf-freindly-tournament/6.png';

// ASDP
import asdp1 from '../../../assets/Photo/asdp/1.png';
import asdp2 from '../../../assets/Photo/asdp/2.png';
import asdp3 from '../../../assets/Photo/asdp/3.png';
import asdp4 from '../../../assets/Photo/asdp/4.png';
import asdp5 from '../../../assets/Photo/asdp/5.png';
import asdp6 from '../../../assets/Photo/asdp/6.png';

interface PortfolioItem {
  id: string | number;
  image?: string;
  url?: string; // from firebase
  video?: string;
  className: string;
}

interface ProjectGroup {
  title: string;
  items: PortfolioItem[];
}

const staticPortfolioGroups: ProjectGroup[] = [
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
    title: "ASDP Indonesia Ferry",
    items: [
      { id: 25, image: asdp1, className: "md:col-span-2 md:row-span-2" },
      { id: 26, image: asdp2, className: "md:col-span-1 md:row-span-1" },
      { id: 27, image: asdp3, className: "md:col-span-1 md:row-span-1" },
      { id: 28, image: asdp4, className: "md:col-span-1 md:row-span-1" },
      { id: 29, image: asdp5, className: "md:col-span-1 md:row-span-1" },
      { id: 30, image: asdp6, className: "md:col-span-1 md:row-span-1" },
    ]
  }
];

export const Portfolio = () => {
  const [dynamicGroups, setDynamicGroups] = useState<ProjectGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await adminService.fetchCollection('portfolio', 'createdAt');
        
        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }

        const imagesByGroup: { [key: string]: PortfolioItem[] } = {};
        
        data.forEach((item: any) => {
          const category = item.category || 'Other';
          
          if (!imagesByGroup[category]) {
            imagesByGroup[category] = [];
          }
          
          imagesByGroup[category].push({
            id: item.id,
            url: item.url,
            className: "md:col-span-1 md:row-span-1" 
          } as PortfolioItem);
        });

        const groups = Object.keys(imagesByGroup).map(title => ({
          title,
          items: imagesByGroup[title]
        }));

        setDynamicGroups(groups);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const displayGroups = dynamicGroups.length > 0 ? dynamicGroups : staticPortfolioGroups;

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-white flex items-center justify-center">
        <div className="animate-pulse font-heading font-bold uppercase tracking-widest text-medium-gray">
          Loading Portfolio...
        </div>
      </div>
    );
  }

  return (
    <section id="portfolio" className="bg-pure-white py-32 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl md:text-9xl font-heading font-bold uppercase tracking-tighter leading-none text-primary-black">
              Featured<br />Work
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="self-end mt-8 max-w-md text-right"
          >
            <p className="text-medium-gray uppercase tracking-widest text-xs font-bold leading-relaxed">
              Capturing moments across Indonesia. From premium weddings to corporate events and creative production.
            </p>
          </motion.div>
        </div>

        <div className="space-y-40">
          {displayGroups.map((group, groupIndex) => (
            <div key={group.title} className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <span className="text-xs font-bold tracking-[0.5em] text-medium-gray">0{groupIndex + 1}</span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter">{group.title}</h3>
                <div className="h-[1px] flex-grow bg-border-gray/50" />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={cn(
                      "group relative bg-light-gray overflow-hidden cursor-pointer",
                      item.className
                    )}
                  >
                    <img
                      src={item.url || item.image}
                      alt={`${group.title} ${index + 1}`}
                      className="w-full h-full object-cover lg:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
