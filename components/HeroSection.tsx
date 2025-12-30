import React, { useState, useEffect } from 'react';
import { type Hero, type Theme } from '../types';

interface HeroSectionProps {
  hero: Hero;
  theme: Theme;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero, theme }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = ["WELCOME TO", hero.headline];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3500); // 3.5 seconds per slide for a steady, smooth pace
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl group">
      {/* Dynamic Background Image */}
      <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2070" 
          alt="District Hero" 
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        
        {/* Animated Overlay Elements */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Live System Active</div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-10 text-center">
        <div className="relative h-12 md:h-20 w-full mb-2 overflow-hidden">
            {slides.map((slide, idx) => (
                <h2 
                    key={idx}
                    className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase transition-all duration-1000 transform ${
                        idx === slideIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    } drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]`}
                >
                    {slide}
                </h2>
            ))}
        </div>
        
        <p className="text-accent font-mono text-xs md:text-sm mb-8 max-w-lg opacity-80 uppercase tracking-[0.2em] animate__animated animate__fadeIn">
          {hero.subheadline}
        </p>
        
        <a
          href={hero.primary_cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="metallic-button w-full sm:w-auto px-10 py-4 font-black uppercase tracking-widest text-background text-sm rounded-full animate__animated animate__fadeInUp"
        >
          {hero.primary_cta.label}
        </a>
      </div>

      {/* Decorative Frame */}
      <div className="absolute top-0 left-0 w-full h-full border-[10px] border-white/5 pointer-events-none rounded-3xl"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/20 blur-sm animate-[scan_4s_linear_infinite] pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;

// Add scanning line animation to the global styles context if needed, 
// though tailwind keyframes in index.html already provide some.
// Let's add the custom 'scan' keyframe to index.html for completeness.
