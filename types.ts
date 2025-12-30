export type IconName = 'tiktok' | 'globe' | 'shopping_bag' | 'calendar' | 'mail' | 'youtube' | 'instagram' | 'x' | 'film' | 'book' | 'share' | 'download';
export type SocialPlatform = 'youtube' | 'instagram' | 'x';

export interface Theme {
  accent: string;
  background: string;
  text: string;
  button_shape: 'rounded' | 'pill' | 'square';
  elevated_cards: boolean;
}

export interface Link {
  label: string;
  url: string;
  icon: IconName;
  style: 'solid' | 'outline';
  enabled: boolean;
  category?: string;
  action?: 'show_qr' | 'download_brochart';
  qr_content?: string;
}

export interface Social {
  platform: SocialPlatform;
  url: string;
  enabled: boolean;
}

export interface Profile {
  name: string;
  tagline: string;
  avatar_url: string;
  badge?: string;
}

export interface Hero {
    show: boolean;
    headline: string;
    subheadline: string;
    primary_cta: {
        label: string;
        url: string;
        style: 'primary';
    }
}

export interface Operative {
  codename: string;
  comm_channel: string;
  image_url?: string;
}

export interface BrochartConfig {
  show: boolean;
  title: string;
  version: string;
  brief: string;
  protocol: string;
  operatives: Operative[];
}

export interface Footer {
    text: string;
    show_brandmark: boolean;
    brandmark_url: string;
}

export interface Config {
  version: string;
  meta: {
    title: string;
    description: string;
    theme: Theme;
    fonts: {
      heading: string;
      body: string;
    };
  };
  profile: Profile;
  hero: Hero;
  brochart: BrochartConfig;
  links: Link[];
  socials: Social[];
  footer: Footer;
  analytics: {
    tiktok_pixel_id: string;
    google_analytics_id: string;
  }
}