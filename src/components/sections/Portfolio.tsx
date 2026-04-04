import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import graduationImg from '../../assets/Photo/graduation-1.jpg';

const categories = ['All', 'Wedding', 'Prewedding', 'Family', 'Graduation', 'Product'];

const portfolioItems = [
  {
    id: 1,
    title: "Eternal Union",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    title: "Golden Hour Glow",
    category: "Prewedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "Minimalist Product",
    category: "Product",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    title: "Generational Love",
    category: "Family",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    id: 5,
    title: "Graduation Bliss",
    category: "Graduation",
    image: graduationImg,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 6,
    title: "Urban Chic",
    category: "Product",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-1"
  }
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Our Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight italic font-light">
              Timeless <span className="not-italic font-bold">Moments</span>
            </h2>
          </div>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-2',
                  activeCategory === cat ? 'text-primary-black' : 'text-medium-gray hover:text-primary-black'
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-black" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "relative group cursor-pointer overflow-hidden",
                  item.className
                )}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-xs uppercase tracking-[0.3em] text-pure-white/70 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-heading text-pure-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
