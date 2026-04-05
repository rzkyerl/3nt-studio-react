import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const team = [
  {
    name: "Alex Rivera",
    role: "Lead Photographer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Elena Vance",
    role: "Portrait Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Marcus Thorne",
    role: "Studio Assistant",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const About = () => {
  return (
    <section id="about" className="section-padding bg-pure-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden group shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200" 
              alt="Studio Interior" 
              className="w-full h-full object-cover lg:grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
          </motion.div>

          {/* Right: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">About Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
                A Production House <br />
                <span className="italic font-light">Based in Jakarta, Indonesia</span>
              </h2>
            </div>
            
            <p className="text-medium-gray text-lg leading-relaxed max-w-xl">
              <strong>3NT Production</strong> is a Production House based in Jakarta, Indonesia that has been established since 2020. We are responsible for fundraising the production or may accomplish your needs through a parent company, partner, or private investor.
            </p>
            
            <p className="text-medium-gray text-lg leading-relaxed max-w-xl">
              We believe we can give the best experience and result for our clients, that is why we are here to help you. We are specialize in any production services such as multimedias. And we are fulfilled with a youthful spirits and creativity.
            </p>

            <div className="pt-4">
              <Link to="/location" className="inline-flex items-center gap-4 group">
                <span className="text-sm uppercase tracking-widest font-bold">Learn More</span>
                <div className="w-10 h-[1px] bg-primary-black transition-all duration-300 group-hover:w-16" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="pt-20 border-t border-border-gray">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Meet the Artists</span>
            <h2 className="text-4xl font-heading">The Creative Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-48 h-48 rounded-full overflow-hidden lg:grayscale hover:grayscale-0 transition-all duration-500 shadow-xl border-4 border-white">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-medium-gray">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
