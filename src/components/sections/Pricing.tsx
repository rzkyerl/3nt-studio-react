import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

import { Link } from 'react-router-dom';

const packages = [
  {
    name: "Classic Session",
    price: "$450",
    description: "Ideal for portraits and small families.",
    features: [
      "2 Hours Session",
      "20 Edited Digital Photos",
      "1 Location",
      "Online Gallery",
      "Print Release"
    ],
    highlight: false
  },
  {
    name: "Premium Wedding",
    price: "$1,200",
    description: "Capture every detail of your big day.",
    features: [
      "8 Hours Coverage",
      "150+ Edited Photos",
      "2 Photographers",
      "Handmade Photo Album",
      "Engagement Session"
    ],
    highlight: true
  },
  {
    name: "Commercial Studio",
    price: "$850",
    description: "Professional product or brand imagery.",
    features: [
      "4 Hours Studio Time",
      "Professional Lighting",
      "50 Retouched Photos",
      "Commercial Rights",
      "Fast Turnaround"
    ],
    highlight: false
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-pure-white">
      <div className="container-custom">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Investment</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic font-light">
            Simple <span className="not-italic font-bold">Pricing</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.name}
              className={cn(
                "p-10 lg:p-14 border border-border-gray transition-all duration-500 hover:border-primary-black group",
                pkg.highlight ? "shadow-2xl md:-translate-y-8 z-10 border-primary-black" : "bg-transparent"
              )}
            >
              <div className="mb-10 text-center">
                <h3 className="text-xl uppercase tracking-widest font-bold mb-4">{pkg.name}</h3>
                <div className="text-4xl lg:text-5xl font-heading mb-4">{pkg.price}</div>
                <p className="text-sm text-medium-gray italic">{pkg.description}</p>
              </div>

              <ul className="space-y-6 mb-12">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-medium-gray group-hover:text-primary-black transition-colors">
                    <Check size={16} className="text-primary-black shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <Link to="/location">
                  <Button 
                    variant={pkg.highlight ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    Choose Package
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
