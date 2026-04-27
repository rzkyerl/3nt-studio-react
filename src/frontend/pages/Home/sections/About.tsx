import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import * as adminService from '../../../services/adminService';

import StaffProductOwner from '../../../assets/Photo/Staff Production/Bayu Tri Novianto.webp';
import StaffArtDirection from '../../../assets/Photo/Staff Production/Amr Fauzan Art Director.webp';
import StaffAssistant from '../../../assets/Photo/Staff Production/Giyan Eko Putranto.webp';

const defaultTeam = [
  { id: '1', name: "Bayu Tri Novianto", role: "Owner 3NT Studio", imageUrl: StaffProductOwner },
  { id: '2', name: "Amr Fauzan", role: "Art Direction", imageUrl: StaffArtDirection },
  { id: '3', name: "Giyan Eko Putranto", role: "Lead Photographer", imageUrl: StaffAssistant }
];

export const About = ({ data }: { data: any }) => {
  const [aboutData, setAboutData] = useState({
    aboutTitle: 'A Production House Based in Jakarta, Indonesia',
    aboutText1: '3NT Production is a Production House based in Jakarta, Indonesia that has been established since 2020. We are responsible for fundraising the production or may accomplish your needs through a parent company, partner, or private investor.',
    aboutText2: 'We believe we can give the best experience and result for our clients, that is why we are here to help you. We are specialize in any production services such as multimedias. And we are fulfilled with a youthful spirits and creativity.',
    aboutImageUrl: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200'
  });
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setAboutData(prev => ({
        ...prev,
        aboutTitle: data.aboutTitle || prev.aboutTitle,
        aboutText1: data.aboutText1 || prev.aboutText1,
        aboutText2: data.aboutText2 || prev.aboutText2,
        aboutImageUrl: data.aboutImageUrl || prev.aboutImageUrl,
      }));
    }

    const fetchTeamData = async () => {
      const data = await adminService.fetchCollection('team');
      if (data && data.length > 0) {
        setTeam(data);
      } else {
        setTeam(defaultTeam);
      }
    };
    fetchTeamData();
  }, [data]);

  const components = {
    block: {
      normal: ({ children }: any) => <>{children}</>,
    },
  };

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
              src={aboutData.aboutImageUrl} 
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
                {Array.isArray(aboutData.aboutTitle) ? (
                  <PortableText value={aboutData.aboutTitle} components={components} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: aboutData.aboutTitle.replace('\n', '<br />') }} />
                )}
              </h2>
            </div>
            
            <div className="text-medium-gray text-lg leading-relaxed max-w-xl prose prose-slate">
              {Array.isArray(aboutData.aboutText1) ? (
                <PortableText value={aboutData.aboutText1} />
              ) : (
                <p>{aboutData.aboutText1}</p>
              )}
            </div>
            
            <div className="text-medium-gray text-lg leading-relaxed max-w-xl prose prose-slate">
              {Array.isArray(aboutData.aboutText2) ? (
                <PortableText value={aboutData.aboutText2} />
              ) : (
                <p>{aboutData.aboutText2}</p>
              )}
            </div>

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
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center space-y-6 group"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden lg:grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-heading font-bold uppercase tracking-tight">{member.name}</h4>
                  <p className="text-xs text-medium-gray uppercase tracking-[0.3em] font-bold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}