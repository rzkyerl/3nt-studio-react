import { Hero } from '../../components/sections/Hero';
import { About } from '../../components/sections/About';
import { Testimonials } from '../../components/sections/Testimonials';
import { FadeIn } from '../../components/ui/FadeIn';

const Home = () => {
  return (
    <>
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
    </>
  );
};

export default Home;
