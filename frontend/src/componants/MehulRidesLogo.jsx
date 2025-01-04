import React from 'react';

const MehulRidesLogo = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1200 400" 
    className={className}
  >
    {/* Background */}
    <rect width="1200" height="400" fill="white" fillOpacity="0.1"/>
    
    {/* Car Body */}
    <path 
      d="M300 200 C300 200, 375 200, 450 200 L750 200 C825 200, 870 200, 900 245 L900 275 C900 310, 870 325, 825 325 L375 325 C330 325, 300 310, 300 275 Z" 
      fill="#2c3e50"
    />
    
    {/* Car Roof */}
    <path 
      d="M450 200 L525 125 L675 125 L750 200 Z"
      fill="#34495e"
    />
    
    {/* Windows */}
    <path 
      d="M480 192 L540 135 L660 135 L720 192 Z"
      fill="#ecf0f1"
    />
    
    {/* Wheels */}
    <circle cx="420" cy="325" r="60" fill="#7f8c8d"/>
    <circle cx="420" cy="325" r="37" fill="#bdc3c7"/>
    <circle cx="780" cy="325" r="60" fill="#7f8c8d"/>
    <circle cx="780" cy="325" r="37" fill="#bdc3c7"/>
    
    {/* Headlight */}
    <ellipse cx="300" cy="230" rx="15" ry="22" fill="#f1c40f"/>
    
    {/* Text */}
    <text 
      x="600" 
      y="80" 
      fontFamily="Arial Black, sans-serif" 
      fontSize="72" 
      textAnchor="middle" 
      fill="#2c3e50"
      fontWeight="bold"
    >
      MEHUL RIDES
    </text>
  </svg>
);

export default MehulRidesLogo;