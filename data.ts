import { type Config } from './types';

export const config: Config = {
  "version": "1.1",
  "meta": {
    "title": "BLKDMND | DISTRICT",
    "description": "Black Diamond District Tactical Interface. AI, Film, Outdoor Athletics.",
    "theme": {
      "accent": "#EC9D34",
      "background": "#0A0A0A",
      "text": "#FFFFFF",
      "button_shape": "rounded",
      "elevated_cards": true
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    }
  },
  "profile": {
    "name": "BLKDMND",
    "tagline": "AI • FILM • ATHLETICS",
    "avatar_url": "https://i.imgur.com/BjsancZ.png",
    "badge": "PROTOCOL V.1.0"
  },
  "hero": {
    "show": true,
    "headline": "THE DISTRICT",
    "subheadline": "INTERFACING AI ARCHITECTURE WITH OUTDOOR CINEMATICS",
    "primary_cta": {
      "label": "BBC REEL: FRISSON",
      "url": "https://www.youtube.com/watch?v=TF06nUzToNk",
      "style": "primary"
    }
  },
  "brochart": {
    "show": true,
    "title": "THE BROCHART",
    "version": "V.1.0 // TACTICAL SUPPORT",
    "brief": "In the absence of object permanence, alliances fade. We wait until the breaking point to signal for support. By then, the distance is too great.",
    "protocol": "This is a tactical display of your Tier-1 support system. Place this interface in your daily line of sight.",
    "operatives": [
      { "codename": "OP-01", "comm_channel": "SIGINT / PHONE" },
      { "codename": "OP-02", "comm_channel": "SIGINT / IG" },
      { "codename": "OP-03", "comm_channel": "SIGINT / PHONE" },
      { "codename": "OP-04", "comm_channel": "SIGINT / IG" },
      { "codename": "OP-05", "comm_channel": "SIGINT / PHONE" },
      { "codename": "OP-06", "comm_channel": "SIGINT / IG" },
      { "codename": "OP-07", "comm_channel": "SIGINT / PHONE" }
    ]
  },
  "links": [
    {
      "label": "Spatial: Virtual Art Gallery",
      "url": "https://www.spatial.io/s/BLKDMND-DISTRICT-625ee581a050f300013e07ed?share=362007681256004885",
      "icon": "globe",
      "style": "solid",
      "enabled": true,
      "category": "EXPERIENCE"
    },
    {
      "label": "IMDB Database",
      "url": "https://www.imdb.com/name/nm15135596/",
      "icon": "film",
      "style": "outline",
      "enabled": true,
      "category": "EXPERIENCE"
    },
    {
      "label": "AI Essentials Ebook",
      "url": "https://blkadvntr.gumroad.com/l/kqsgm",
      "icon": "book",
      "style": "solid",
      "enabled": true,
      "category": "DOWNLOADS"
    },
    {
      "label": "The Brochart (Tactical JPEG)",
      "url": "#",
      "icon": "download",
      "style": "solid",
      "enabled": true,
      "action": "download_brochart",
      "category": "DOWNLOADS"
    },
    {
      "label": "TikTok Archive",
      "url": "https://www.tiktok.com/@blkdmnd",
      "icon": "tiktok",
      "style": "outline",
      "enabled": true,
      "category": "NETWORK"
    },
    {
      "label": "Secure Email Comms",
      "url": "#",
      "icon": "mail",
      "style": "outline",
      "enabled": true,
      "action": "show_qr",
      "qr_content": "mailto:g.dukes1@gmail.com",
      "category": "INQUIRIES"
    }
  ],
  "socials": [
    { "platform": "youtube", "url": "https://youtube.com/@blkdmnd", "enabled": true },
    { "platform": "instagram", "url": "https://instagram.com/blkdmnd", "enabled": true }
  ],
  "footer": {
    "text": "BLKDMND DISTRICT // ALL RIGHTS RESERVED",
    "show_brandmark": false,
    "brandmark_url": ""
  },
  "analytics": {
    "tiktok_pixel_id": "",
    "google_analytics_id": ""
  }
};