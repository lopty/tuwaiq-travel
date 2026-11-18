export const FEATURE_FLAGS = {
  enableUmrahPages: false,
  enableUnconfirmedStats: false,
  enableClientLogoWall: true,
  enablePresidentialLetters: false,
  nationalDayDeparted: false,
} as const;

export const SITE_URL = 'https://tuwaiq.ae';

export const COMPANY = {
  legalName: 'Tuwaiq Travel & Tourism LLC',
  shortName: 'Tuwaiq Travel',
  tagline: 'Dubai Travel Agency & Holiday Consultants',
  foundedYear: 2014,
  parentGroup: {
    name: 'Al Basel Group',
    establishedYear: 2007,
    url: '/al-basel-group/',
  },
  sisterCompanies: [
    {
      name: 'Najd Rent a Car',
      role: 'Tourist car rental, chauffeur limousines, and UAE airport transfers',
      externalUrl: 'https://najdrentacar.com',
    },
    {
      name: 'Al Basel Consultancy',
      role: 'Hospitality advisory and strategic partnerships',
      externalUrl: null,
    },
    {
      name: 'Al Basel Real Estate Brokers',
      role: 'Property brokerage across the UAE',
      externalUrl: null,
    },
    {
      name: 'Amani Investments',
      role: 'Group investment arm',
      externalUrl: null,
    },
    {
      name: 'Zallaqa Talent Acquisition',
      role: 'Executive and hospitality recruitment',
      externalUrl: null,
    },
  ],
  address: {
    building: 'Fifty One Tower, Office 301',
    street: 'Marasi Drive, Business Bay',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    full: 'Fifty One Tower, Office 301, Marasi Drive, Business Bay, Dubai, UAE',
  },
  contact: {
    whatsappDisplay: '+971 55 915 8517',
    whatsappDigits: '971559158517',
    officeDisplay: '+971 4 276 1133',
    officeTel: '+97142761133',
    bookingsEmail: 'Holidays@tuwaiq.ae',
    generalEmail: 'info@tuwaiq.ae',
  },
  social: {
    instagram: 'https://www.instagram.com/tuwaiqtravelhq/',
    instagramHandle: '@tuwaiqtravelhq',
    facebook: 'https://www.facebook.com/profile.php?id=61575210390069',
  },
  verification: {
    licenceNumber: '713611',
    issuingAuthority: 'Department of Economy and Tourism, Dubai',
    licensedName: 'Tuwaiq Travel & Tourism Co. L.L.C',
    legalForm: 'Limited Liability Company, Single Owner',
    licensedActivity: 'In Bound Tour Operator',
    licenceIssued: '7 July 2014',
    licenceExpiry: '6 July 2027',
    chamberNumber: '237412',
    registerNumber: '1359266',
    openingHours: 'Pending confirmation',
  },
  logos: {
    colour: '/images/logos/tuwaiq-logo-colour.webp',
    square: '/images/logos/tuwaiq-logo-512.png',
    width: 581,
    height: 151,
  },
} as const;

export function whatsAppUrl(subject?: string): string {
  const text = subject
    ? `Hello Tuwaiq Travel, I would like to enquire about: ${subject}`
    : 'Hello Tuwaiq Travel, I would like to plan a trip from Dubai.';
  return `https://wa.me/${COMPANY.contact.whatsappDigits}?text=${encodeURIComponent(text)}`;
}

export interface LeaderProfile {
  name: string;
  role: string;
  roleNote: string;
  bio: string;
  highlights: string[];
}

export const LEADERSHIP: LeaderProfile[] = [
  {
    name: 'Basel Al Kasem',
    role: 'Founder',
    roleNote: 'Founder & Managing Director, Al Basel Group (final title pending confirmation)',
    bio: 'Founded Tuwaiq Travel & Tourism LLC in 2014 as part of Al Basel Group, established in 2007. Formerly Business Development Manager at Burj Al Arab in Dubai.',
    highlights: [
      'Former Business Development Manager at Burj Al Arab',
      'B.Sc. Economics, University of Central Florida',
      'Master degree, University of New England (Australia) and Harvard business courses',
      'Recipient of non-profit community awards including recognition with the Dubai Handicap Club',
    ],
  },
  {
    name: 'Omar Al Kasem',
    role: 'VIP Travel & Client Relations',
    roleNote: 'General Manager & Head of VIP (final title pending confirmation)',
    bio: 'Over 15 years of experience managing GCC high-net-worth families, distinguished guests and VIP travel arrangements from Dubai.',
    highlights: [
      '15+ years serving GCC high-net-worth and VIP clients',
      'Born in the UAE in 1986',
      'Degree in Business Administration and Logistics, Maritime University in Cairo',
    ],
  },
  {
    name: 'Asad Javed, ACCA',
    role: 'Head of Accounts',
    roleNote: '15+ years of senior finance leadership',
    bio: 'Leads financial governance, supplier settlements, and corporate travel account controls across Tuwaiq Travel & Tourism LLC.',
    highlights: [
      'ACCA qualified finance leader',
      '15+ years in senior hospitality and travel finance',
    ],
  },
  {
    name: 'Ahmed Mohsen',
    role: 'Business Development & Sales Contact',
    roleNote: 'Business Development Manager (final title pending confirmation)',
    bio: 'Primary contact for corporate travel accounts, agency partnerships, group bookings, and holiday enquiries via +971 55 915 8517.',
    highlights: [
      'Leads commercial partnerships and corporate travel solutions',
      'Direct WhatsApp and mobile desk for tailored proposals',
    ],
  },
];

export const BOOKING_STEPS = [
  {
    step: 1,
    title: 'Tell us your plan',
    description: 'Message us on WhatsApp, call or email with your dates, budget and who is travelling.',
  },
  {
    step: 2,
    title: 'Get a tailored proposal',
    description: 'We send clear options for flights, hotels and transfers that match your style and budget.',
  },
  {
    step: 3,
    title: 'Confirm and relax',
    description: 'Approve the plan and receive tickets, hotel vouchers and visa documents in one itinerary.',
  },
  {
    step: 4,
    title: 'Travel with support',
    description: 'Our team stays on call on WhatsApp throughout your trip.',
  },
];

export const TRAVEL_STYLES = [
  {
    slug: 'business-travellers',
    title: 'Executive & Corporate',
    summary: 'Fast ticketing and changes, corporate accounts, and hotels near business hubs.',
    bullets: ['Corporate travel accounts', 'Fast ticketing and schedule changes', 'Hotels near business hubs'],
    href: '/corporate-travel-group-trips/',
  },
  {
    slug: 'families',
    title: 'Families',
    summary: 'Kid-friendly resorts, theme-park combos and visas for the whole family.',
    bullets: ['Kid-friendly family resorts', 'Theme-park multi-day combos', 'Visas handled for the whole family'],
    href: '/family-holidays-from-dubai/',
  },
  {
    slug: 'couples-honeymoon',
    title: 'Couples & Honeymoons',
    summary: 'Maldives, Seychelles and Bali, private villas and yachts, and special touches arranged for you.',
    bullets: ['Maldives, Seychelles, and Bali retreats', 'Private pool villas and yacht charters', 'Special occasion touches arranged'],
    href: '/maldives-honeymoon-package/',
  },
  {
    slug: 'groups-corporate',
    title: 'Delegations & Groups',
    summary: 'Incentive trips, delegations, events, group rates and coaches.',
    bullets: ['Incentive trips and delegations', 'Corporate events and hospitality', 'Coaches and group room blocks'],
    href: '/corporate-travel-group-trips/',
  },
];

export const PARTNERSHIPS = [
  {
    name: 'Mandarin Oriental Hotel Group',
    entity: 'Tuwaiq Travel / Al Basel Group',
    summary: 'Partnership promoting Mandarin Oriental\'s portfolio of 44 luxury hotels to clients across the Middle East and GCC.',
  },
  {
    name: 'Corinthia Hotel London',
    entity: 'Tuwaiq Travel / Al Basel Group',
    summary: 'VIP partnership supporting GCC business and leisure travellers in London, alongside regional marketing and event advisory.',
  },
  {
    name: 'HRH Prince Mansour bin Nasser bin Abdul Aziz Al Saud (2015)',
    entity: 'Tuwaiq Travel / Al Basel Group',
    summary: '2015 collaboration documented in the Tuwaiq corporate archive.',
  },
  {
    name: 'Atlantis The Palm Award (Group Recognition)',
    entity: 'Al Basel Consultancy (Group Company)',
    summary: 'Awarded "Highest Seller of Bridge Suite" to Al Basel Consultancy, our group consultancy company, reflecting over AED 75M in Bridge Suite sales across four years.',
  },
];

export const UNCONFIRMED_STATS_HOLDER = [
  { label: 'Projects completed', value: '23K+' },
  { label: 'Clients served', value: '5K+' },
  { label: 'Travel consultants', value: '115+' },
  { label: 'Awards won', value: '20' },
];

export interface HotelShowcaseItem {
  slug: string;
  brandGroup: string;
  locationLabel: string;
  suiteCategory: string;
  roomSummary: string;
  heritageNote: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  whatsappSubject: string;
}

export const HOTEL_SHOWCASE: HotelShowcaseItem[] = [
  {
    slug: 'burj-al-arab-jumeirah',
    brandGroup: 'Burj Al Arab & Jumeirah',
    locationLabel: 'Jumeirah Coastline, Dubai',
    suiteCategory: 'Panoramic Duplex & Ocean Suites',
    roomSummary: 'Gulf-facing luxury suites, private butler floors, and beachfront family villas.',
    heritageNote: 'Founder Basel Al Kasem previously served as Business Development Manager at Burj Al Arab.',
    image: '/images/hotels/burj-al-arab-night.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Burj Al Arab lit at night beyond palm trees and a pool, Dubai',
    whatsappSubject: 'Jumeirah & Luxury Dubai Suite Booking',
  },
  {
    slug: 'atlantis-palm-jumeirah',
    brandGroup: 'Atlantis The Palm',
    locationLabel: 'Palm Jumeirah, Dubai',
    suiteCategory: 'Bridge-Style Suites & Ocean Terraces',
    roomSummary: 'Terrace family suites, lagoon-view rooms, and Aquaventure access stays.',
    heritageNote: 'Group company Al Basel Consultancy won Highest Seller of Bridge Suite (AED 75M+ over four years).',
    image: '/images/hotels/atlantis-the-palm.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Atlantis The Palm resort at the tip of Palm Jumeirah, Dubai',
    whatsappSubject: 'Atlantis The Palm & Palm Resort Booking',
  },
  {
    slug: 'corinthia-four-seasons-london',
    brandGroup: 'Corinthia & Four Seasons',
    locationLabel: 'London, Europe & Washington DC',
    suiteCategory: 'Heritage Penthouses & Connecting Suites',
    roomSummary: 'Whitehall suites, European city-centre rooms, and multi-bedroom diplomatic stays.',
    heritageNote: 'Supported by VIP partnership with Corinthia Hotel London and Four Seasons group bookings.',
    image: '/images/hotels/corinthia-london.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Entrance of Corinthia Hotel London at dusk',
    whatsappSubject: 'Corinthia London & Four Seasons Stay',
  },
  {
    slug: 'mandarin-oriental-raffles-address',
    brandGroup: 'Mandarin Oriental & partners',
    locationLabel: 'Dubai Downtown, DIFC & Global Cities',
    suiteCategory: 'Skyline Corner Suites & Serviced Apartments',
    roomSummary: 'Five-star city hotels, Executive Club rooms, and serviced long-stay residences.',
    heritageNote: 'Hospitality network covering 44 Mandarin Oriental hotels plus Raffles, One&Only, Address, and Hyatt.',
    image: '/images/hotels/mandarin-oriental-singapore.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Mandarin Oriental Singapore beside Marina Bay and the city skyline',
    whatsappSubject: 'Mandarin Oriental, Raffles, One&Only or Address Hotel Quote',
  },
  {
    slug: 'indian-ocean-resort-villas',
    brandGroup: 'Maldives, Seychelles & Coastal Resorts',
    locationLabel: 'Indian Ocean, Thailand & Bali',
    suiteCategory: 'Overwater Villas & Cliffside Pool Resorts',
    roomSummary: 'Honeymoon pool villas, all-inclusive family pavilions, and speedboat-linked resorts.',
    heritageNote: 'Tailored room tiers paired directly with flights, seaplane or speedboat transfers, and meal plans.',
    image: '/images/services/hotel-bookings.webp',
    imageWidth: 1441,
    imageHeight: 1281,
    imageAlt: 'Coastal five-star resort infinity swimming pool overlooking tropical ocean bay',
    whatsappSubject: 'Luxury Beach Resort & Villa Booking',
  },
  {
    slug: 'vip-lobby-concierge-check-in',
    brandGroup: 'Corporate Blocks & VIP Hotel Desk',
    locationLabel: 'Business Bay, Dubai & Global Hubs',
    suiteCategory: 'Delegation Allotments & Extended Stays',
    roomSummary: 'Confirmed interconnecting family rooms, late checkouts, and corporate event room blocks.',
    heritageNote: 'Every hotel reservation includes direct Dubai consultant support from arrival to departure.',
    image: '/images/hero/luxury-hotel-lobby.webp',
    imageWidth: 781,
    imageHeight: 1280,
    imageAlt: 'Grand marble five-star hotel reception lobby with crystal chandelier lighting',
    whatsappSubject: 'Corporate Hotel Block or VIP Room Request',
  },
];

export const SEASONAL_PLANNER = [
  {
    season: 'Nov to Mar',
    title: 'Winter Sun & Desert',
    destinations: ['UAE Desert Camps & Staycations', 'Maldives & Seychelles', 'Thailand & Malaysia', 'Caribbean Islands'],
    href: '/destinations/maldives/',
  },
  {
    season: 'Mar to May',
    title: 'Spring Blossoms',
    destinations: ['Japan Cherry Blossoms', 'Istanbul & Cappadocia', 'China & Taiwan', 'European City Breaks'],
    href: '/destinations/japan/',
  },
  {
    season: 'Jun to Sep',
    title: 'Cool Summer Escapes',
    destinations: ['Switzerland & Alpine Europe', 'Georgia & Azerbaijan', 'Salalah Khareef Season', 'Zanzibar & Bali'],
    href: '/destinations/georgia-azerbaijan/',
  },
  {
    season: 'Festive & Dec',
    title: 'UAE National Day & Holidays',
    destinations: ['2 Dec 2026 Guided Caucasus Tours', 'Uzbekistan National Day Tour', 'Christmas Markets', 'New Year Escapes'],
    href: '/offers/',
  },
];
