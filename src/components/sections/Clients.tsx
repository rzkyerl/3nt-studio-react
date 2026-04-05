import { motion } from 'framer-motion';

// Import local logos
import logoKemenhub from '../../assets/Photo/logo-client/logo-kementrian-perhubungan-ri.png';
import logoBappenas from '../../assets/Photo/logo-client/logo-kementerian-ppn-bappenas.png';
import logoKemendikbud from '../../assets/Photo/logo-client/logo-kementerian-pendidikan.svg';
import logoPLN from '../../assets/Photo/logo-client/logo-pln.png';
import logoASDP from '../../assets/Photo/logo-client/logo-asdp.png';
import logoTugu from '../../assets/Photo/logo-client/logo-tugu.svg';
import logoPegadaian from '../../assets/Photo/logo-client/logo-pegadaian.png';
import logoMitratel from '../../assets/Photo/logo-client/logo-mitratel.png';
import logoFIFA from '../../assets/Photo/logo-client/logo-fifa.svg';
import logoProst from '../../assets/Photo/logo-client/logo-proostbeer.png';
import logoJasaMarga from '../../assets/Photo/logo-client/logo-jasamarga.svg';
import logoBNPB from '../../assets/Photo/logo-client/logo-bnpb.png';
import logoPSSI from '../../assets/Photo/logo-client/logo-pssi.png';
import logoMLDSpot from '../../assets/Photo/logo-client/logo-mldspot.svg';
import logoSingaraja from '../../assets/Photo/logo-client/logo-singaraja.png';

const clients = [
  { name: "Kementerian Perhubungan", logo: logoKemenhub },
  { name: "Kementerian PPN/Bappenas", logo: logoBappenas },
  { name: "Kementerian Pendidikan dan Kebudayaan", logo: logoKemendikbud },
  { name: "PLN", logo: logoPLN },
  { name: "ASDP", logo: logoASDP },
  { name: "Tugu Insurance", logo: logoTugu },
  { name: "Pegadaian", logo: logoPegadaian },
  { name: "Mitratel", logo: logoMitratel },
  { name: "FIFA", logo: logoFIFA },
  { name: "Prost Beer", logo: logoProst },
  { name: "Jasa Marga", logo: logoJasaMarga },
  { name: "BNPB", logo: logoBNPB },
  { name: "PSSI", logo: logoPSSI },
  { name: "MLDSPOT", logo: logoMLDSpot },
  { name: "Singaraja", logo: logoSingaraja }
];

export const Clients = () => {
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
            Trusted By
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading italic font-light"
          >
            Our <span className="not-italic font-bold">Clients</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-16 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex justify-center group h-28 items-center"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-20 md:h-24 w-auto max-w-[140px] md:max-w-[180px] object-contain grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
