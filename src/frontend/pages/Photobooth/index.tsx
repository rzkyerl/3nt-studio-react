import { Photobooth as PhotoboothSection } from './sections/Photobooth';
import { FadeIn } from '../../components/ui/FadeIn';

const Photobooth = () => {
  return (
    <div>
      <FadeIn><PhotoboothSection /></FadeIn>
    </div>
  );
};

export default Photobooth;
