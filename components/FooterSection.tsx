
import React from 'react';
import { type Footer } from '../types';

interface FooterSectionProps {
  footer: Footer;
}

const FooterSection: React.FC<FooterSectionProps> = ({ footer }) => {
  return (
    <footer className="mt-8 text-center text-sm text-content/60">
      <div className="flex items-center justify-center space-x-2">
        {footer.show_brandmark && (
          <img src={footer.brandmark_url} alt="Brandmark" className="w-5 h-5 rounded-full" />
        )}
        <p>{footer.text}</p>
      </div>
    </footer>
  );
};

export default FooterSection;
