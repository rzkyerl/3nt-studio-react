import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as adminService from '../../../services/adminService';
import { useLanguage } from '../../../lib/LanguageContext';

// Import local logos
import logoKemenhub from '../../../assets/Photo/logo-client/logo-kementrian-perhubungan-ri.webp';
import logoBappenas from '../../../assets/Photo/logo-client/logo-kementerian-ppn-bappenas.webp';
import logoKemendikbud from '../../../assets/Photo/logo-client/logo-kementerian-pendidikan.svg';
import logoPLN from '../../../assets/Photo/logo-client/logo-pln.webp';
import logoASDP from '../../../assets/Photo/logo-client/logo-asdp.webp';
import logoTugu from '../../../assets/Photo/logo-client/logo-tugu.svg';
import logoPegadaian from '../../../assets/Photo/logo-client/logo-pegadaian.webp';
import logoMitratel from '../../../assets/Photo/logo-client/logo-mitratel.webp';
import logoFIFA from '../../../assets/Photo/logo-client/logo-fifa.svg';
import logoProst from '../../../assets/Photo/logo-client/logo-proostbeer.webp';
import logoJasaMarga from '../../../assets/Photo/logo-client/logo-jasamarga.svg';
import logoBNPB from '../../../assets/Photo/logo-client/logo-bnpb.webp';
import logoPSSI from '../../../assets/Photo/logo-client/logo-pssi.webp';
import logoMLDSpot from '../../../assets/Photo/logo-client/logo-mldspot.svg';
import logoSingaraja from '../../../assets/Photo/logo-client/logo-singaraja.webp';

const defaultClients = [
  { name: "Kementerian Perhubungan", logoUrl: logoKemenhub },
  { name: "Kementerian PPN/Bappenas", logoUrl: logoBappenas },
  { name: "Kementerian Pendidikan dan Kebudayaan", logoUrl: logoKemendikbud },
  { name: "PLN", logoUrl: logoPLN },
  { name: "ASDP", logoUrl: logoASDP },
  { name: "Tugu Insurance", logoUrl: logoTugu },
  { name: "Pegadaian", logoUrl: logoPegadaian },
  { name: "Mitratel", logoUrl: logoMitratel },
  { name: "FIFA", logoUrl: logoFIFA },
  { name: "Prost Beer", logoUrl: logoProst },
  { name: "Jasa Marga", logoUrl: logoJasaMarga },
  { name: "BNPB", logoUrl: logoBNPB },
  { name: "PSSI", logoUrl: logoPSSI },
  { name: "MLDSPOT", logoUrl: logoMLDSpot },
  { name: "Singaraja", logoUrl: logoSingaraja }
];

export const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchClientsData = async () => {
      const data = await adminService.fetchCollection('clients');
      if (data && data.length > 0) {
        setClients(data);
      } else {
        setClients(defaultClients);
      }
    };
    fetchClientsData();
  }, []);

  return (
    <section className="section-padding bg-pure-white border-t border-border-gray/30">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold"
          >
            {t('clients_label')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading italic font-light"
          >
            {t('clients_heading_italic')} <span className="not-italic font-bold">{t('clients_heading_bold')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-16 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.id || client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex justify-center group h-28 items-center"
            >
              <img 
                src={client.logoUrl} 
                alt={client.name} 
                className="h-16 md:h-20 w-auto max-w-[140px] md:max-w-[180px] object-contain lg:grayscale opacity-100 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
