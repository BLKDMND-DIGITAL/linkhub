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
    }, 3500); 
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 dark:border-white/10 shadow-2xl group bg-background transition-colors duration-500">
      {/* Dynamic Background Image - Futuristic Control Panel Aesthetic */}
      <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
          alt="District Tactical Interface" 
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110 brightness-[0.4] dark:brightness-[0.4] group-hover:brightness-[0.6] light:brightness-[0.8] light:group-hover:brightness-[1]"
        />
        {/* Subtle glowing overlay to simulate screen light */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-accent/5 opacity-50 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] dark:block hidden"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.2)_100%)] dark:hidden block"></div>
        
        {/* Animated Overlay Elements */}
        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]"></div>
          <div className="text-[10px] font-mono text-accent uppercase tracking-widest drop-shadow-md font-bold">System Online</div>
        </div>

        {/* Tactical UI Decoration */}
        <div className="absolute top-4 left-4 z-20 opacity-40 hidden sm:block">
          <div className="text-[8px] font-mono text-white dark:text-white/50 light:text-black uppercase font-bold">Lat: 34.0522° N</div>
          <div className="text-[8px] font-mono text-white dark:text-white/50 light:text-black uppercase font-bold">Lon: 118.2437° W</div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-10 text-center z-10">
        <div className="relative h-12 md:h-20 w-full mb-2 overflow-hidden">
            {slides.map((slide, idx) => (
                <h2 
                    key={idx}
                    className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase transition-all duration-1000 transform ${
                        idx === slideIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    } drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)]`}
                >
                    {slide}
                </h2>
            ))}
        </div>
        
        <p className="text-accent font-mono text-xs md:text-sm mb-8 max-w-lg opacity-100 uppercase tracking-[0.2em] animate__animated animate__fadeIn drop-shadow-lg font-bold">
          {hero.subheadline}
        </p>
        
        <a
          href={hero.primary_cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="metallic-button w-full sm:w-auto px-10 py-4 font-black uppercase tracking-widest text-white dark:text-background text-sm rounded-full animate__animated animate__fadeInUp flex items-center justify-center space-x-3 group mb-4"
        >
          <div className="w-6 h-6 bg-white dark:bg-background rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-accent fill-current translate-x-[1px]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
             </svg>
          </div>
          <span>{hero.primary_cta.label}</span>
        </a>
      </div>

      {/* Decorative Frame */}
      <div className="absolute top-0 left-0 w-full h-full border-[10px] border-white/5 dark:border-white/5 pointer-events-none rounded-3xl"></div>
    </div>
  );
};

export default HeroSection;