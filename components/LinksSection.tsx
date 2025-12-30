import React, { useState } from 'react';
import { type Link, type Theme } from '../types';
import Icon from './Icon';
import QRCodeModal from './QRCodeModal';

interface LinksSectionProps {
  links: Link[];
  theme: Theme;
  title?: string;
  defaultOpen?: boolean;
}

// Global declaration for html2canvas
declare global {
  interface Window {
    html2canvas: any;
  }
}

export const downloadBrochartJPEG = async () => {
  const element = document.getElementById('brochart-section');
  if (!element) return;
  try {
    const canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0A0A0A',
      logging: false,
    });
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.download = 'BLKDMND_BROCHART_TACTICAL.jpg';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export JPEG:', error);
  }
};

const LinkItem: React.FC<{ link: Link; theme: Theme; onClick: (link: Link) => void; }> = ({ link, theme, onClick }) => {
  const buttonShapeClass = theme.button_shape === 'rounded' ? 'rounded-xl' :
                           theme.button_shape === 'pill' ? 'rounded-full' : 'rounded-none';

  const baseClasses = `w-full flex items-center justify-center p-4 text-center font-black uppercase tracking-widest text-sm transition-all duration-300 ${buttonShapeClass}`;
  
  const styleClasses = {
    solid: 'metallic-button text-background',
    outline: 'outline-metallic',
  };
  
  const disabledClasses = 'opacity-30 cursor-not-allowed bg-zinc-900 border-zinc-800 pointer-events-none';

  const content = (
    <div className="flex items-center justify-center w-full relative">
      <div className="absolute left-0">
        <Icon name={link.icon} className="w-5 h-5" />
      </div>
      <span className="mx-auto text-xs sm:text-sm">{link.label}</span>
      {link.style === 'solid' && (
        <div className="absolute right-0 opacity-20">
          <Icon name="share" className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  if (!link.enabled) {
    return (
      <div className={`${baseClasses} ${disabledClasses} border-2`}>
        {content}
      </div>
    );
  }
  
  if (link.action === 'show_qr' || link.action === 'download_brochart') {
    return (
      <button
        onClick={() => onClick(link)}
        className={`${baseClasses} ${styleClasses[link.style]}`}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${styleClasses[link.style]}`}
    >
      {content}
    </a>
  );
};

const LinksSection: React.FC<LinksSectionProps> = ({ links, theme, title, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const handleLinkClick = (link: Link) => {
    if (link.action === 'show_qr' && link.qr_content) {
      setQrCodeData(link.qr_content);
      setIsModalOpen(true);
    } else if (link.action === 'download_brochart') {
      downloadBrochartJPEG();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        {title && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full group flex items-center justify-between mb-4 px-2 focus:outline-none"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-1 h-4 bg-accent rounded-full transition-all duration-300 ${isOpen ? 'h-6' : 'opacity-40'}`}></div>
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase font-mono transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-accent/60'}`}>
                {title}
              </span>
            </div>
            <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-180 opacity-100' : 'opacity-40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        )}
        
        <div className={`transition-all duration-500 origin-top overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-white border border-white/5 dark:border-white/5 light:border-accent/10 rounded-[2rem] p-5 sm:p-6 mb-6 shadow-inner relative group transition-colors duration-500">
            {/* Subtle corner accents */}
            <div className="absolute top-4 left-4 w-1 h-1 bg-accent/20 rounded-full group-hover:bg-accent/40 transition-colors"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-accent/20 rounded-full group-hover:bg-accent/40 transition-colors"></div>
            
            <div className="grid grid-cols-1 gap-3 sm:gap-4 relative z-10">
              {links.map((link, index) => (
                <LinkItem key={index} link={link} theme={theme} onClick={handleLinkClick} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <QRCodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={qrCodeData} />
    </>
  );
};

export default LinksSection;