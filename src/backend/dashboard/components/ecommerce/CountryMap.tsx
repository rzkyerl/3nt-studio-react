import React from "react";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

// Simple SVG world map placeholder that doesn't rely on webpack-bundled libraries
const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  const fillColor = mapColor || "#D0D5DD";

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple world map silhouette - continents as simplified shapes */}
        {/* North America */}
        <path
          d="M 80 80 L 180 70 L 220 100 L 200 160 L 170 200 L 140 220 L 100 200 L 70 160 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* South America */}
        <path
          d="M 160 240 L 200 230 L 220 280 L 200 360 L 170 380 L 140 350 L 130 300 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* Europe */}
        <path
          d="M 350 60 L 430 55 L 440 100 L 410 130 L 370 120 L 340 100 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* Africa */}
        <path
          d="M 360 140 L 430 130 L 450 180 L 440 280 L 410 320 L 370 310 L 340 260 L 340 180 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* Asia */}
        <path
          d="M 450 50 L 680 45 L 700 100 L 680 160 L 640 180 L 560 170 L 500 150 L 460 120 L 440 90 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* South/Southeast Asia */}
        <path
          d="M 560 180 L 640 175 L 660 220 L 640 260 L 600 260 L 570 240 L 550 210 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />
        {/* Australia */}
        <path
          d="M 620 270 L 720 260 L 740 320 L 700 360 L 640 360 L 610 320 Z"
          fill={fillColor}
          stroke="white"
          strokeWidth="1"
          className="hover:fill-[#465fff] cursor-pointer transition-colors"
        />

        {/* Marker dots for countries */}
        <circle cx="150" cy="150" r="5" fill="#465FFF" stroke="white" strokeWidth="2" />
        <circle cx="540" cy="120" r="5" fill="#465FFF" stroke="white" strokeWidth="2" />
        <circle cx="390" cy="90" r="5" fill="#465FFF" stroke="white" strokeWidth="2" />
        <circle cx="665" cy="300" r="5" fill="#465FFF" stroke="white" strokeWidth="2" />

        {/* Ocean background */}
      </svg>
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-600">
        World Map
      </div>
    </div>
  );
};

export default CountryMap;
