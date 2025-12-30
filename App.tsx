import React, { useEffect, useState, useMemo, useRef } from 'react';
import { config } from './data';
import ProfileSection from './components/ProfileSection';
import HeroSection from './components/HeroSection';
import LinksSection from './components/LinksSection';
import SocialsSection from './components/SocialsSection';
import FooterSection from './components/FooterSection';
import BrochartSection from './components/BrochartSection';
import Icon from './components/Icon';
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
      opacity: 0.1 + Math.random() * 0.2
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

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (config.music?.autoplay && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
            console.log("Autoplay blocked");
        });
    }
  }, []);

  if (!config.music?.enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 mb-safe">
      {isPlaying && (
        <div className="bg-accent text-white dark:text-background text-[8px] font-black px-2 py-1 rounded-sm whitespace-nowrap uppercase tracking-widest animate__animated animate__fadeInRight shadow-lg">
          NOW PLAYING: DISTRICT AUDIO
        </div>
      )}
      <audio ref={audioRef} src={config.music.url} loop />
      <button
        onClick={togglePlay}
        className={`metallic-button p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${isPlaying ? 'animate-pulse scale-110' : ''}`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Icon name={isPlaying ? 'pause' : 'music'} className="w-5 h-5 text-white dark:text-background" />
      </button>
    </div>
  );
};

const ThemeToggle: React.FC<{ theme: 'dark' | 'light', toggle: () => void }> = ({ theme, toggle }) => {
    return (
        <div className="fixed bottom-6 left-6 z-50 mb-safe">
            <button
                onClick={toggle}
                className="metallic-button p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center hover:rotate-12"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5 text-white dark:text-background" />
            </button>
        </div>
    );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.title = config.meta.title;
    // Sync with HTML class for tailwind darkMode: 'class'
    if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Group links by category
  const groupedLinks = useMemo(() => config.links.reduce((acc: { [key: string]: Link[] }, link) => {
    const category = link.category || 'OTHER';
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {}), [config.links]);

  const categoryOrder = ['EXPERIENCE', 'DOWNLOADS', 'NETWORK', 'INQUIRIES', 'OTHER'];
  const categoriesToRender = useMemo(() => {
    const cats = categoryOrder.filter(cat => groupedLinks[cat] && groupedLinks[cat].length > 0);
    Object.keys(groupedLinks).forEach(cat => {
        if (!categoryOrder.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [groupedLinks]);

  return (
    <div className="bg-background text-content min-h-screen font-body relative overflow-x-hidden flex flex-col transition-colors duration-500">
      <FloatingBackground />
      <MusicPlayer />
      <ThemeToggle theme={theme} toggle={toggleTheme} />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-5 pt-8 pb-12 sm:pt-16 sm:pb-24 flex flex-col items-center space-y-10 sm:space-y-14">
        {/* Full width "Mini Site" Hero */}
        <div className="w-full animate__animated animate__fadeInDown">
          <HeroSection hero={config.hero} theme={config.meta.theme} />
        </div>

        {/* Profile Details (Subtle below hero) */}
        <ProfileSection profile={config.profile} />
        
        {/* Render Links by Section */}
        <div className="w-full flex flex-col space-y-2">
          {categoriesToRender.map((category, idx) => (
            <div key={category} className={`animate__animated animate__fadeInUp`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <LinksSection 
                title={category}
                links={groupedLinks[category]} 
                theme={config.meta.theme} 
                defaultOpen={category === 'EXPERIENCE'}
              />
            </div>
          ))}
        </div>

        <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
          <SocialsSection socials={config.socials} />
        </div>
        
        <FooterSection footer={config.footer} />
        
        <div className="h-10 sm:h-0 w-full"></div>
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