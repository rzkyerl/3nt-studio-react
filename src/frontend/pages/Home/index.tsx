import { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Clients } from './sections/Clients';
import { Testimonials } from './sections/Testimonials';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless of data fetch status
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchHomeData = async () => {
      try {
        const data = await adminService.getDocument('content', 'home');
        if (data) {
          setHomeData(data);
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };
    fetchHomeData();

    return () => clearTimeout(timeout);
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
      <About data={homeData} />
      <Services />
      <Clients />
      <Testimonials />
    </div>
  );
};

export default Home;
