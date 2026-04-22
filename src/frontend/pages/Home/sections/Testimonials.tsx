import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import * as adminService from '../../../services/adminService';

const defaultTestimonials = [
  {
    id: '1',
    name: "Sarah Jenkins",
    role: "Bride",
    quote: "3NT Studio captured our wedding so beautifully. Their minimalist approach made every photo look like a piece of high-end art. We couldn't be happier.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: '2',
    name: "David Miller",
    role: "Creative Director",
    quote: "As a brand manager, I'm very picky about aesthetics. 3NT Studio's clean, monochrome style was perfect for our product launch. Highly recommended.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: '3',
    name: "Emily Watson",
    role: "Graduating Student",
    quote: "The portrait session was relaxed and professional. They really know how to make you feel comfortable and capture your true self in every frame.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      const data = await adminService.fetchCollection('testimonials');
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(defaultTestimonials);
      }
    };
    fetchTestimonialsData();
  }, []);

  return (
    <section className="section-padding bg-light-gray overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Kind Words</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic font-light">
            Client <span className="not-italic font-bold">Experiences</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-pure-white p-10 lg:p-14 relative group shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-primary-black/5 w-16 h-16 transition-all duration-500 group-hover:text-primary-black/10 group-hover:scale-110" />
              
              <div className="relative z-10">
                <div className="text-medium-gray text-lg leading-relaxed italic mb-10 group-hover:text-primary-black transition-colors prose-slate">
                  {Array.isArray(testimonial.quote) ? (
                    <PortableText value={testimonial.quote} />
                  ) : (
                    <p>"{testimonial.quote}"</p>
                  )}
                </div>
                
                <div className="flex items-center gap-6 pt-6 border-t border-border-gray">
                  <div className="w-16 h-16 rounded-full overflow-hidden grayscale border-2 border-white shadow-md">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold uppercase tracking-widest">{testimonial.name}</h4>
                    <p className="text-xs text-medium-gray uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
