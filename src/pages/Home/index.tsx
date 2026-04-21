import { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';
import { Hero } from '../../components/sections/Hero';
import { About } from '../../components/sections/About';
import { Services } from '../../components/sections/Services';
import { Clients } from '../../components/sections/Clients';
import { Testimonials } from '../../components/sections/Testimonials';
import { FadeIn } from '../../components/ui/FadeIn';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await adminService.getDocument('content', 'home');
        if (data) {
          setHomeData(data);
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-pure-white">
      <Hero data={homeData} />
      <FadeIn><About data={homeData} /></FadeIn>
      <FadeIn><Services /></FadeIn>
      <FadeIn><Clients /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
    </div>
  );
};

export default Home;
