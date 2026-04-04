import React from 'react';
import { Photobooth as PhotoboothSection } from '../../components/sections/Photobooth';
import { FadeIn } from '../../components/ui/FadeIn';

const Photobooth = () => {
  return (
    <div>
      <FadeIn><PhotoboothSection /></FadeIn>
    </div>
  );
};

export default Photobooth;
