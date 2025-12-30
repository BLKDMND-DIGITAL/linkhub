import React, { useEffect } from 'react';

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({ isOpen, onClose, videoUrl }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getEmbedInfo = (url: string) => {
    try {
      let videoId = null;
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1].split(/[?#]/)[0];
      }

      if (videoId && videoId.length === 11) {
        // We remove 'origin' and 'enablejsapi' as they often cause 'missing.referrer' errors 
        // in development environments or sandboxes.
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`,
          id: videoId
        };
      }
    } catch (e) {
      console.error("Error parsing video URL", e);
    }
    return null;
  };

  const videoInfo = getEmbedInfo(videoUrl);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-8 animate__animated animate__fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex space-x-2">
        {videoInfo && (
          <a 
            href={`https://www.youtube.com/watch?v=${videoInfo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-accent transition-colors p-3 bg-black/50 rounded-full backdrop-blur-sm border border-white/10"
            aria-label="Open in YouTube"
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-accent transition-colors p-3 bg-black/50 rounded-full backdrop-blur-sm border border-white/10"
          aria-label="Close video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div 
        className="relative w-full max-w-5xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(236,157,52,0.2)] border border-white/5 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {videoInfo ? (
          <iframe
            src={videoInfo.embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="District Cinematic Protocol"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-accent font-mono uppercase tracking-widest bg-zinc-950 p-6 text-center">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <span>Establishing Secure Connection...</span>
            <p className="text-[10px] opacity-40 mt-2">If protocol fails, check source link validity.</p>
          </div>
        )}
      </div>
      
      {/* Fallback label for restricted environments */}
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
        <p className="text-white/20 text-[8px] uppercase tracking-widest font-mono">
          Proprietary Media Protocol // Source: BBC Reel
        </p>
      </div>
      
      {/* Decorative Cinematic Bars (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-b from-black to-transparent pointer-events-none opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-60"></div>
    </div>
  );
};

export default VideoLightbox;