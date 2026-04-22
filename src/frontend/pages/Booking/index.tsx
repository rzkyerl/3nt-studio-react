import { BookingSection } from './sections/Booking';
import { FadeIn } from '../../components/ui/FadeIn';

const Booking = () => {
  return (
    <div className="pt-20">
      <FadeIn>
        <BookingSection />
      </FadeIn>
    </div>
  );
};

export default Booking;