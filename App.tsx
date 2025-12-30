import React, { useEffect, useState, useMemo } from 'react';
import { config } from './data';
import ProfileSection from './components/ProfileSection';
import HeroSection from './components/HeroSection';
import LinksSection from './components/LinksSection';
import SocialsSection from './components/SocialsSection';
import FooterSection from './components/FooterSection';
import BrochartSection from './components/BrochartSection';
import { type Link } from './types';

const FloatingBackground: React.FC = () => {
  const elements = useMemo(() => {
    const icons = ['♫', '♪', '{}', '=>', '🎞️', '📽️', 'Aa', '∫', '∑', 'e=mc²', 'void()', '0101', 'λ'];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      text: icons[Math.floor(Math.random() * icons.length)],
      left: `${Math.random() * 100}%`,
      top: `${100 + Math.random() * 100}%`,
      size: `${12 + Math.random() * 32}px`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 15}s`,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-grid-glow"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      {elements.map((el) => (
        <div
          key={el.id}
          className="floating-element animate-float"
          style={{
            left: el.left,
            top: el.top,
            fontSize: el.size,
            animationDelay: el.delay,
            animationDuration: el.duration,
            opacity: el.opacity,
          }}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    document.title = config.meta.title;
    const root = document.documentElement;
    root.style.setProperty('--color-accent', config.meta.theme.accent);
    root.style.setProperty('--color-background', config.meta.theme.background);
    root.style.setProperty('--color-text', config.meta.theme.text);
  }, []);

  // Group links by category
  const groupedLinks = config.links.reduce((acc: { [key: string]: Link[] }, link) => {
    const category = link.category || 'OTHER';
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {});

  const categoryOrder = ['EXPERIENCE', 'DOWNLOADS', 'NETWORK', 'INQUIRIES', 'OTHER'];
  const categoriesToRender = categoryOrder.filter(cat => groupedLinks[cat] && groupedLinks[cat].length > 0);
  
  Object.keys(groupedLinks).forEach(cat => {
    if (!categoryOrder.includes(cat)) categoriesToRender.push(cat);
  });

  return (
    <div className="bg-background text-content min-h-screen font-body relative overflow-x-hidden">
      <FloatingBackground />

      <main className="relative z-10 mx-auto max-w-2xl px-4 py-8 sm:py-16 flex flex-col items-center space-y-16">
        {/* Full width "Mini Site" Hero */}
        <div className="w-full animate__animated animate__fadeInDown">
          <HeroSection hero={config.hero} theme={config.meta.theme} />
        </div>

        {/* Profile Details (Subtle below hero) */}
        <ProfileSection profile={config.profile} />
        
        {/* Render Links by Section */}
        <div className="w-full flex flex-col space-y-8">
          {categoriesToRender.map((category, idx) => (
            <div key={category} className={`animate__animated animate__fadeInUp`} style={{ animationDelay: `${idx * 0.15}s` }}>
              <LinksSection 
                title={category}
                links={groupedLinks[category]} 
                theme={config.meta.theme} 
                defaultOpen={category === 'EXPERIENCE'}
              />
            </div>
          ))}
        </div>

        <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
          <SocialsSection socials={config.socials} />
        </div>
        
        <FooterSection footer={config.footer} />
      </main>

      <div 
        aria-hidden="true"
        style={{ 
          position: 'absolute', 
          top: '-9999px', 
          left: '-9999px', 
          width: '800px', 
          pointerEvents: 'none' 
        }}
      >
        {config.brochart.show && <BrochartSection config={config.brochart} isHidden={true} />}
      </div>
    </div>
  );
};

export default App;