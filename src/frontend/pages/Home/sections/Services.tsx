import { motion } from 'framer-motion';
import { useState } from 'react';

import fifa3 from '../../../assets/Photo/fifa/3.png';
import streaming from '../../../assets/Photo/services-assets/streaming-equipement.jpg';
import teleprompter from '../../../assets/Photo/services-assets/teleprompter.jpg';
import eventProduction from '../../../assets/Photo/mldspot/6.png';
import drone from '../../../assets/Photo/services-assets/drone.jpg';
import photobooth from '../../../assets/Photo/services-assets/photobooth.jpg';

const services = [
  {
    id: '1',
    title: 'Event Production',
    imageUrl: eventProduction,
    description: 'End-to-end production solutions for your biggest moments.',
    href: '/services/multicam',
  },
  {
    id: '2',
    title: 'Photobooth Experience',
    imageUrl: photobooth,
    description: 'High-end photo booth systems for engaging events.',
    href: '/services/photobooth',
  },
  {
    id: '3',
    title: 'Documentation',
    imageUrl: fifa3,
    description: 'Professional photography and videography documentation.',
    href: '/services/documentation',
  },
  {
    id: '4',
    title: 'Streaming & Broadcast',
    imageUrl: streaming,
    description: 'High-quality live streaming for any platform.',
    href: '/services/streaming',
  },
  {
    id: '5',
    title: 'Aerial Production',
    imageUrl: drone,
    description: 'Cinematic drone shots for perspective and coverage.',
    href: '/services/drone',
  },
  {
    id: '6',
    title: 'Additional Tools',
    imageUrl: teleprompter,
    description: 'Specialized equipment and production support.',
    href: '/services/teleprompter',
  },
];

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section id="services" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold"
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading italic font-light"
          >
            3NT Studio <span className="not-italic font-bold">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-medium-gray max-w-2xl mx-auto leading-relaxed"
          >
            We provide complete production support for events, brands, and live experiences.
          </motion.p>
        </div>

        <div className="lg:hidden border-y border-border-gray">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="py-5 border-b border-border-gray last:border-b-0"
            >
              <div className="grid grid-cols-[84px_1fr] gap-4 items-start">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold tracking-[0.25em] text-medium-gray">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-heading font-bold uppercase tracking-tight leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-medium-gray leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:grid grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="border-y border-border-gray">
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={service.id}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="w-full text-left py-6 md:py-7 border-b border-border-gray last:border-b-0 group"
                >
                  <div className="flex items-start gap-5 md:gap-8">
                    <span className="text-xs md:text-sm font-bold tracking-[0.35em] text-medium-gray pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-2">
                      <h3 className={`text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight transition-all ${isActive ? 'italic text-primary-black' : 'text-primary-black/75 group-hover:text-primary-black'}`}>
                        {service.title}
                      </h3>
                      <p className={`leading-relaxed transition-colors ${isActive ? 'text-primary-black/80' : 'text-medium-gray'}`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-28"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border-gray bg-pure-white">
              <img
                src={activeService.imageUrl}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-medium-gray font-bold">Service Preview</p>
              <p className="text-sm font-semibold">{activeService.title}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
