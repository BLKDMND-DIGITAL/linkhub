
import React from 'react';
import { type Social } from '../types';
import Icon from './Icon';

interface SocialsSectionProps {
  socials: Social[];
}

const SocialsSection: React.FC<SocialsSectionProps> = ({ socials }) => {
  const enabledSocials = socials.filter(social => social.enabled && social.url);

  if (enabledSocials.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      {enabledSocials.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.platform}
          className="text-content/70 hover:text-accent transition-colors duration-200"
        >
          <Icon name={social.platform} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
};

export default SocialsSection;
