import React from 'react';
import { type Profile } from '../types';
import Icon from './Icon';

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: `Connect with ${profile.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
      }
    } catch (e) {}
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative group">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6"
        />
        <div className="absolute -bottom-1 -right-1 bg-accent text-background p-2 rounded-full border-2 border-background shadow-lg">
          <Icon name="share" className="w-4 h-4" />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-center space-x-2">
            <h1 className="text-xl font-black font-heading uppercase tracking-tighter">{profile.name}</h1>
            <button
                onClick={handleShare}
                className="text-accent/60 hover:text-accent transition-colors"
                aria-label="Share"
            >
                <Icon name="share" className="w-4 h-4" />
            </button>
        </div>
        <p className="text-content/60 font-mono text-xs uppercase tracking-widest mt-1">{profile.tagline}</p>
        {profile.badge && (
          <span className="mt-3 inline-block bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-tighter px-4 py-1.5 rounded-full">
            {profile.badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;