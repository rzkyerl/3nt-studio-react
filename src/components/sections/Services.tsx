import { motion } from 'framer-motion';

const services = [
  {
    title: "Streaming System Production",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800",
    description: "High-quality live streaming setup for events, webinars, and virtual broadcasts."
  },
  {
    title: "Multicam System Production",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    description: "Professional multicam recording and production for dynamic visual storytelling."
  },
  {
    title: "Documentation, Short film, Video Music, Video Corporate, and Digital AD video Production",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    description: "Full-scale video production services from creative concept to final post-production."
  },
  {
    title: "Photography Production",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    description: "Professional photography for commercial, editorial, and personal documentation."
  }
];

export const Services = () => {
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
            Production House <span className="not-italic font-bold">Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-pure-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover lg:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow bg-black text-white">
                <h3 className="text-lg font-heading font-bold mb-4 line-clamp-2 uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
