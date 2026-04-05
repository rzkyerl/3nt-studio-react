import { Hero } from '../../components/sections/Hero';
import { About } from '../../components/sections/About';
import { Services } from '../../components/sections/Services';
import { Clients } from '../../components/sections/Clients';
import { Testimonials } from '../../components/sections/Testimonials';
import { FadeIn } from '../../components/ui/FadeIn';

const Home = () => {
  return (
    <>
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><Services /></FadeIn>
      <FadeIn><Clients /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
    </>
  );
};

export default Home;
