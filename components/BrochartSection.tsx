import React from 'react';
import { type BrochartConfig } from '../types';
import { downloadBrochartJPEG } from './LinksSection';

interface BrochartSectionProps {
  config: BrochartConfig;
  isHidden?: boolean;
}

const BrochartSection: React.FC<BrochartSectionProps> = ({ config, isHidden = false }) => {
  if (!config.show) return null;

  return (
    <div id="brochart-section" className="w-full bg-[#121212] border-2 border-[#333] p-4 md:p-6 rounded-sm shadow-2xl relative overflow-hidden font-mono text-[10px] uppercase tracking-wider">
      {/* Background Texture Subtle Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-accent/30 pb-4 mb-4 relative z-10">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-accent mb-1">{config.title}</h2>
          <p className="text-accent/60 text-xs">{config.version}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="text-accent">STATUS: <span className="text-green-500">ACTIVE</span></p>
          <p className="text-accent">GRID: <span className="text-green-500">ONLINE</span></p>
          <p className="text-accent">PROTOCOL: VISUAL</p>
        </div>
      </div>

      {/* Brief Section */}
      <div className="mb-6 space-y-2 relative z-10">
        <p className="text-accent/90 leading-tight">
          <span className="text-accent font-bold">OPERATIONAL BRIEF:</span> {config.brief}
        </p>
        <p className="text-accent/90 leading-tight">
          <span className="text-accent font-bold">PROTOCOL:</span> {config.protocol}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {config.operatives.map((op, idx) => (
          <div key={idx} className="group flex flex-col space-y-2">
            {/* Photo Card Frame */}
            <div className="aspect-square relative border-2 border-[#444] bg-[#0a0a0a] overflow-hidden group-hover:border-accent transition-colors duration-300">
               {/* Decorative corners */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent"></div>
               
               {/* Glow effect */}
               <div className="absolute top-0 inset-x-0 h-[1px] bg-accent/30 shadow-[0_0_10px_rgba(236,157,52,0.5)]"></div>

               {op.image_url ? (
                 <img src={op.image_url} alt={op.codename} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 text-white/20 font-bold border-2 border-dashed border-white/5 m-[2px]">
                   PASTE<br/>PHOTO<br/>HERE
                 </div>
               )}
            </div>
            {/* Info Fields */}
            <div className="space-y-1">
              <div className="border-b border-accent/20 pb-1">
                <span className="text-accent/50 block text-[8px] mb-[2px]">OPERATIVE NAME / CODENAME</span>
                <span className="text-accent font-bold truncate">{op.codename}</span>
              </div>
              <div>
                <span className="text-accent/50 block text-[8px] mb-[2px]">COMM CHANNEL (PHONE/IG)</span>
                <span className="text-accent truncate">{op.comm_channel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Line & Action */}
      <div className="mt-8 border-t border-accent/30 pt-4 flex flex-col md:flex-row justify-between items-center relative z-10 space-y-4 md:space-y-0">
        <div className="text-[9px] text-accent/60 italic">
          <p>// MAINTAIN VISUAL CONTACT // REFRESH PROTOCOL WEEKLY // END TRANSMISSION</p>
          <p className="font-bold mt-1">BY <span className="text-accent">BLKDMND</span></p>
        </div>
        
        {!isHidden && (
          <button 
            onClick={() => downloadBrochartJPEG()}
            className="print:hidden flex items-center space-x-2 bg-accent text-background px-4 py-2 font-bold text-[11px] hover:bg-accent/80 transition-colors shadow-[0_0_15px_rgba(236,157,52,0.3)] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>DOWNLOAD INTERFACE (JPEG)</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BrochartSection;