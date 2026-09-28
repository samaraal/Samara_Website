/* Samara AI on samaraassistedliving.com (v2.6.0, 28-09-2026).
   Public settings only. The key is Supabase's PUBLISHABLE key (safe to be public; same one the site already uses).
   The AI never sees patient or ERP data. */
window.SAMARA_SITE_CONFIG = Object.freeze({
  supabaseUrl: 'https://askalabwtlrnoodinayq.supabase.co',
  supabaseKey: 'sb_publishable_MPf0spA1IsJWWR5-ltVAyA_Z_gctBr-',
  whatsapp: '917395961616',
  aiEndpoint: ''
});
/* Where this site's own photos, video and pages are. */
window.SAMARA_AI_SITE = {
  mark: './assets/samara-mark.png',
  rooms: [
    ['./assets/gallery/samara-resident-room-109c.jpg', 'Resident room at Samara'],
    ['./assets/gallery/samara-resident-rooms-101-102.jpg', 'Resident rooms 101 & 102'],
    ['./assets/gallery/samara-shared-resident-room.jpg', 'Shared (twin / triple) resident room']
  ],
  gallery: [
    ['./assets/gallery/samara-reception-lounge.jpg', 'Reception lounge'],
    ['./assets/gallery/samara-front-desk-team.jpg', 'Our front-desk team'],
    ['./assets/gallery/samara-welcome-lounge.jpg', 'Welcome lounge'],
    ['./assets/gallery/samara-corridor-brass-lamps.jpg', 'Corridor'],
    ['./assets/gallery/samara-reading-corner.jpg', 'Reading corner'],
    ['./assets/gallery/samara-signboard-mogappair.jpg', 'Samara Assisted Living, Mogappair West']
  ],
  video: 'https://samarahealth.in/assets/video/samara-opening.mp4',
  poster: 'https://samarahealth.in/assets/photos/video-poster.jpg',
  enquiryUrl: './enquiry.html',
  phone: '919976735577',
  whatsapp: '917395961616',
  source: 'samaraassistedliving.com',
  directors: ['./assets/about/dr-krishnan-chellammal-profile.jpg', './assets/about/dr-maneesha-boominathan.jpg'],
  pages: { about: './about.html', services: './services.html', admission: './enquiry.html', pricing: './packages.html', faq: './faq.html' },
  qr: './assets/location-qr.jpeg'
};
