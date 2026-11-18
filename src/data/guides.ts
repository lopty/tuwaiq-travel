import type { PackageFaq } from './packages';

export interface GuideArticle {
  slug: string;
  url: string;
  category: string;
  readTime: string;
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedPackageSlugs: string[];
  relatedDestinationSlugs: string[];
  relatedServiceSlugs: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  faqs: PackageFaq[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'visa-requirements-uae-residents-georgia-azerbaijan-armenia-uzbekistan',
    url: '/guides/visa-requirements-uae-residents-georgia-azerbaijan-armenia-uzbekistan/',
    category: 'Visas & Entry',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Visa Guide: Georgia, Baku, Armenia, Uzbekistan | Tuwaiq',
    seoDescription: 'Practical visa checklist for UAE residents flying from Dubai to Georgia, Azerbaijan, Armenia, and Uzbekistan. Always check current entry rules.',
    h1: 'Visa Requirements for UAE Residents: Georgia, Azerbaijan, Armenia & Uzbekistan',
    summary: 'Entry rules for Caucasus and Central Asia trips differ sharply by passport and UAE residency validity.',
    sections: [
      {
        heading: 'Georgia: Residency Validity Matters',
        paragraphs: [
          'Georgia allows visa-free entry for holders of valid UAE residence permits of many nationalities, provided your Emirates ID and residence visa remain valid at entry and return. Keep printed copies of return tickets, hotel bookings, and travel insurance handy at Tbilisi or Batumi immigration.',
        ],
      },
      {
        heading: 'Azerbaijan & Armenia: ASAN eVisa vs Passport Nationality',
        paragraphs: [
          'Azerbaijan uses its official ASAN eVisa portal for most UAE residents, generally processed within three working days, while certain GCC citizens receive visa on arrival. Armenia splits nationalities across visa-free access, eVisa, and visa on arrival depending on passport and UAE residency.',
        ],
      },
      {
        heading: 'Uzbekistan: Check Before Ticketing',
        paragraphs: [
          'UAE citizens enter Uzbekistan visa-free, and many additional passport holders enjoy visa-free stays or fast eVisa processing. Because bilateral agreements update frequently, check current requirements with Tuwaiq\'s visa desk before issuing non-refundable tickets.',
        ],
      },
    ],
    relatedPackageSlugs: ['georgia-tbilisi-batumi-4-nights', 'azerbaijan-baku-4-nights', 'armenia-yerevan-4-nights', 'uzbekistan-tashkent-4-nights'],
    relatedDestinationSlugs: ['georgia-azerbaijan'],
    relatedServiceSlugs: ['visa-services'],
    image: '/images/services/visa-services.webp',
    imageWidth: 1440,
    imageHeight: 1280,
    imageAlt: 'Stamped international passport ready for Caucasus and Central Asia travel',
    faqs: [
      { question: 'How much passport validity do I need for Caucasus and Central Asia trips?', answer: 'Most destinations require at least six months passport validity beyond your return date, plus valid UAE residency if relying on resident exemptions.' },
      { question: 'Does Tuwaiq Travel handle Azerbaijan ASAN eVisas?', answer: 'Yes, our visa team supports guided ASAN eVisa applications alongside Baku holiday bookings. Check current requirements first.' },
      { question: 'Should I carry printed hotel and flight confirmations?', answer: 'Yes, immigration officers in Tbilisi, Baku, Yerevan, and Tashkent frequently ask to see printed return tickets and hotel vouchers.' },
      { question: 'Are UAE residence permit renewals affected if less than 3 months remain?', answer: 'Some countries require three to six months remaining on your UAE residence permit as well as your passport, so verify both dates early.' },
      { question: 'Can Tuwaiq confirm my exact eligibility before I pay?', answer: 'Message your passport nationality and UAE visa expiry on WhatsApp (+971 55 915 8517) before confirming seats.' },
    ],
  },
  {
    slug: 'best-time-to-visit-our-16-destinations',
    url: '/guides/best-time-to-visit-our-16-destinations/',
    category: 'Seasonal Planning',
    readTime: '6 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Best Time to Visit 16 Destinations From Dubai | Tuwaiq',
    seoDescription: 'Month-by-month travel calendar from Dubai covering UAE, GCC, Maldives, Thailand, Japan, Europe, Georgia, Türkiye, Seychelles, and Bali.',
    h1: 'Best Time to Visit Our 16 Core Destinations From Dubai',
    summary: 'Align your Dubai departure month across our 16 core destinations to avoid monsoon rains and peak crowds.',
    sections: [
      {
        heading: 'Winter Sun (November to March)',
        paragraphs: [
          'Cool Gulf breezes make November to March prime for UAE desert camps, Saudi Arabia (AlUla, Riyadh), Egypt, Maldives, Thailand (Phuket), Taiwan, and the Caribbean.',
        ],
      },
      {
        heading: 'Spring Blossoms & Shoulder Value (March to May)',
        paragraphs: [
          'Japan\'s cherry blossoms (March to May), Türkiye\'s mild Istanbul and Cappadocia weather (April to June), China (April to May), and Seychelles calm seas (April to May) shine during spring.',
        ],
      },
      {
        heading: 'Summer Escapes (June to September) & Festive Periods',
        paragraphs: [
          'Escape UAE summer heat in green Caucasus valleys (Georgia and Azerbaijan May to October), Europe and the Swiss Alps (April to October), Bali (April to October), Zanzibar (June to October), or misty Salalah in Oman (July to September).',
        ],
      },
    ],
    relatedPackageSlugs: ['georgia-tbilisi-batumi-4-nights', 'thailand-phuket-bangkok-6-nights', 'turkiye-istanbul-4-nights'],
    relatedDestinationSlugs: ['uae', 'maldives', 'japan', 'europe', 'indonesia-bali'],
    relatedServiceSlugs: ['holiday-packages'],
    image: '/images/destinations/europe.webp',
    imageWidth: 1043,
    imageHeight: 1280,
    imageAlt: 'Alpine mountain peaks and emerald lake in peak travel season',
    faqs: [
      { question: 'Where should UAE residents escape during July and August?', answer: 'Europe, Switzerland, Georgia, Azerbaijan, Bali, Zanzibar, Malaysia, and Salalah (Oman) offer cool breezes or dry sunny weather in summer.' },
      { question: 'When is the Maldives at its driest?', answer: 'November through April provides the clearest skies and calmest lagoon visibility.' },
      { question: 'What months work best for Türkiye and Japan?', answer: 'Spring (April to May) and autumn (September to November) deliver pleasant temperatures and foliage or blossoms.' },
      { question: 'Which destination works year-round from Dubai?', answer: 'Kuala Lumpur in Malaysia works smoothly year-round, while Thailand shifts between Phuket (Nov to Apr) and Koh Samui (Jun to Sep).' },
      { question: 'When do festive deals sell out fastest?', answer: 'UAE National Day (December), Christmas markets, New Year, and Eid holidays should be booked 4 to 8 weeks ahead.' },
    ],
  },
  {
    slug: 'umrah-preparation-checklist-from-dubai',
    url: '/guides/umrah-preparation-checklist-from-dubai/',
    category: 'Spiritual Travel',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Umrah Preparation Checklist From Dubai | Tuwaiq Travel',
    seoDescription: 'Practical packing, documentation, flight, and Makkah hotel preparation checklist for travellers departing the UAE for Umrah.',
    h1: 'Umrah Preparation Checklist for Travellers Departing Dubai',
    summary: 'Prepare passports, Nusuk permits, Ihram garments, and Makkah hotel transfers ahead of flying from Dubai.',
    sections: [
      {
        heading: 'Passports, Visas & Digital Permits',
        paragraphs: [
          'Ensure your passport has at least six months validity and confirm whether your nationality uses GCC resident eVisa rules, visa on arrival, or a dedicated Umrah visa. Install and verify the official Nusuk app before travelling; always check current requirements.',
        ],
      },
      {
        heading: 'Direct Flights, Transfers & Ihram Planning',
        paragraphs: [
          'Carry Ihram garments in your cabin bag if flying directly toward Jeddah so you are prepared at the Miqat announcement. Confirm airport-to-Makkah transfer timings clearly in advance, especially during peak Ramadan or weekend hours.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['gulf-arabia'],
    relatedServiceSlugs: ['flights', 'hotel-bookings', 'visa-services'],
    image: '/images/destinations/gulf-arabia.webp',
    imageWidth: 878,
    imageHeight: 1078,
    imageAlt: 'Warm Arabian desert stone arch representing Saudi travel heritage',
    faqs: [
      { question: 'How far in advance should I check Saudi entry and Nusuk rules?', answer: 'Verify current passport and UAE residency rules at least three to four weeks before departure.' },
      { question: 'Should I pack Ihram in checked luggage or cabin baggage?', answer: 'Keep your Ihram set in carry-on luggage so it is easily accessible before crossing the Miqat in flight.' },
      { question: 'What footwear works best around Masjid al-Haram?', answer: 'Lightweight, cushioned sandals for men (leaving ankles uncovered in Ihram) and supportive walking shoes inside a small drawstring shoe bag.' },
      { question: 'Are direct flights from Dubai or Sharjah better for short 3-night trips?', answer: 'Yes, direct flights maximize prayer time in Makkah without exhausting airport layovers.' },
      { question: 'Does Tuwaiq arrange family and group hotel bookings in Saudi Arabia?', answer: 'Yes, reach our team on WhatsApp (+971 55 915 8517) for flight and Makkah hotel enquiries.' },
    ],
  },
  {
    slug: 'maldives-honeymoon-planning-from-dubai',
    url: '/guides/maldives-honeymoon-planning-from-dubai/',
    category: 'Honeymoon & Luxury',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Maldives Honeymoon Planning From Dubai | Tuwaiq Travel',
    seoDescription: 'How to pick the right Maldives atoll, seaplane vs speedboat transfer, villa type, and meal plan when flying from Dubai.',
    h1: 'Maldives Honeymoon Planning From Dubai',
    summary: 'Choose between Maldives resorts cleanly by picking trip length, speedboat vs seaplane transfer, and meal plan.',
    sections: [
      {
        heading: 'Speedboat vs Seaplane Transfers',
        paragraphs: [
          'If staying 3 or 4 nights, choose a North or South Male Atoll resort reachable by 15 to 45 minute speedboat, since speedboats run day and night and match evening Dubai flights. For 5 to 7 nights, scenic daytime seaplanes open up outer atolls with dramatic coral reefs.',
        ],
      },
      {
        heading: 'Meal Plans & Overwater Privacy',
        paragraphs: [
          'Because islands have no outside restaurants, upgrading to half-board, full-board, or all-inclusive before departure protects your budget far better than paying resort menu prices on checkout. Split-stay bookings (two nights beach villa plus three nights overwater pool villa) give couples the best of both worlds.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['maldives', 'seychelles', 'indonesia-bali'],
    relatedServiceSlugs: ['hotel-bookings', 'vip-concierge'],
    image: '/images/destinations/maldives.webp',
    imageWidth: 880,
    imageHeight: 1080,
    imageAlt: 'Overwater Maldives honeymoon villas along wooden lagoon jetty',
    faqs: [
      { question: 'How many nights is ideal for a Maldives honeymoon from Dubai?', answer: 'Four to six nights lets you unwind completely after a short 4-hour direct flight from DXB.' },
      { question: 'Do seaplanes fly after sunset in the Maldives?', answer: 'No, seaplanes operate strictly during daylight hours. Late evening arrivals from Dubai require either a speedboat resort or an overnight near Male.' },
      { question: 'What marriage certificate window qualifies for honeymoon amenities?', answer: 'Most resorts require a marriage certificate dated within 6 to 12 months of check-in.' },
      { question: 'Which meal plan makes the most sense for couples?', answer: 'Half-board or all-inclusive generally offers strong savings compared with room-and-breakfast plus a la carte dining.' },
      { question: 'Are Halal food options available on private island resorts?', answer: 'Yes, most 4-star and 5-star Maldives resorts serve Halal meats and extensive seafood across buffets and specialty restaurants.' },
    ],
  },
  {
    slug: 'budget-versus-luxury-turkiye-from-dubai',
    url: '/guides/budget-versus-luxury-turkiye-from-dubai/',
    category: 'Destination Guides',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Budget vs Luxury Türkiye Trips From Dubai | Tuwaiq',
    seoDescription: 'Compare value 4N/5D Istanbul city breaks from AED 2,099 with luxury Bosphorus suites, Cappadocia cave villas, and coastal resorts.',
    h1: 'Budget vs Luxury Türkiye From Dubai: Where to Spend & Where to Save',
    summary: 'Compare value AED 2,099 Istanbul short breaks against luxury Bosphorus palaces and Cappadocia cave suites.',
    sections: [
      {
        heading: 'Smart Value: 4N/5D Istanbul Base',
        paragraphs: [
          'Booking a well-located 4-star boutique hotel in Sultanahmet or Karakoy puts mosques, trams, and ferry piers within walking distance, keeping daily sightseeing costs low while flights, breakfast, and airport transfers stay bundled From AED 2,099 per person.',
        ],
      },
      {
        heading: 'Luxury Upgrades Worth Paying For',
        paragraphs: [
          'When stretching your budget, invest in a Bosphorus-view terrace room in Besiktas or Ortakoy, private airport Mercedes vans, sunrise hot-air balloon baskets with smaller passenger counts in Cappadocia, or all-inclusive villas along the Bodrum and Antalya coast.',
        ],
      },
    ],
    relatedPackageSlugs: ['turkiye-istanbul-4-nights'],
    relatedDestinationSlugs: ['turkiye'],
    relatedServiceSlugs: ['holiday-packages', 'hotel-bookings'],
    image: '/images/destinations/turkiye.webp',
    imageWidth: 1043,
    imageHeight: 1281,
    imageAlt: 'Hot air balloons floating at dawn over Cappadocia rock formations in Türkiye',
    faqs: [
      { question: 'What is the starting cost of a value Istanbul package from Dubai?', answer: 'Our 4N/5D Istanbul package starts From AED 2,099 per person, based on two sharing.' },
      { question: 'Which Istanbul neighbourhoods suit luxury stays vs sightseeing?', answer: 'Sultanahmet excels for historic walking access; Nisantasi, Besiktas, and Bosphorus waterfront hotels suit luxury dining and shopping.' },
      { question: 'Is Istanbul public transport easy for budget travellers?', answer: 'Yes, an Istanbulkart gives fast tram, metro, and Bosphorus ferry access across both continents.' },
      { question: 'When should Cappadocia balloons be booked?', answer: 'Reserve sunrise flights early for April to June and September to November, allowing at least two mornings in case weather postpones launch.' },
      { question: 'Can Tuwaiq quote multi-tier options in one WhatsApp chat?', answer: 'Yes, ask us to compare 4-star value and 5-star Bosphorus options side by side.' },
    ],
  },
  {
    slug: 'first-time-in-thailand-phuket-bangkok-guide',
    url: '/guides/first-time-in-thailand-phuket-bangkok-guide/',
    category: 'Destination Guides',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'First Time in Thailand: Phuket & Bangkok Guide | Tuwaiq',
    seoDescription: 'First-timer tips from Dubai covering Phuket vs Krabi beaches, Bangkok districts, Halal dining, and 6N/7D packages from AED 2,699.',
    h1: 'First Time in Thailand: How to Split Phuket & Bangkok',
    summary: 'Split Phuket islands and Bangkok city shopping smoothly in one coordinated seven-day itinerary from Dubai.',
    sections: [
      {
        heading: 'Start in Phuket, Finish Shopping in Bangkok',
        paragraphs: [
          'Flying into Phuket first lets you shake off overnight flight fatigue beside the ocean before taking island speedboats to Phi Phi or Phang Nga Bay. Finishing with 2 or 3 nights in Bangkok keeps heavy shopping bags light until your final flight home.',
        ],
      },
      {
        heading: 'Where to Stay & Halal Dining Tips',
        paragraphs: [
          'In Phuket, Kamala and Bang Tao suit quiet family stays while Patong offers lively evening markets and abundant Halal dining. In Bangkok, Siam and Pratunam put major malls and Halal eateries steps from the Skytrain.',
        ],
      },
    ],
    relatedPackageSlugs: ['thailand-phuket-bangkok-6-nights'],
    relatedDestinationSlugs: ['thailand'],
    relatedServiceSlugs: ['holiday-packages', 'global-tours'],
    image: '/images/destinations/thailand.webp',
    imageWidth: 1043,
    imageHeight: 1280,
    imageAlt: 'Longtail boats and limestone cliffs in Thailand bay',
    faqs: [
      { question: 'Should I visit Bangkok first or Phuket first?', answer: 'Starting in Phuket for beach rest and finishing in Bangkok for shopping keeps baggage handling effortless.' },
      { question: 'How much is Tuwaiq\'s 6N/7D Phuket and Bangkok package?', answer: 'It starts From AED 2,699 per person, based on two sharing.' },
      { question: 'How long is the domestic flight between Phuket and Bangkok?', answer: 'Around 1 hour and 25 minutes with frequent daily departures.' },
      { question: 'Can families easily find Halal food in Phuket and Bangkok?', answer: 'Yes, both cities offer wide Halal restaurant choices, especially around Bang Tao, Patong, Kamala, and central Bangkok.' },
      { question: 'What is the driest time for Phuket?', answer: 'November to April brings bright dry beach weather and calm Andaman seas.' },
    ],
  },
  {
    slug: 'how-to-choose-a-travel-agency-in-dubai',
    url: '/guides/how-to-choose-a-travel-agency-in-dubai/',
    category: 'Dubai Travel Advice',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'How to Choose a Travel Agency in Dubai | Tuwaiq Travel',
    seoDescription: 'Checklist for verifying a Dubai travel agency: physical Business Bay office, transparent pricing, real human WhatsApp support, and group backing.',
    h1: 'How to Choose a Trusted Travel Agency in Dubai',
    summary: 'Practical checks to verify a Dubai travel agency before booking flights, holiday packages, or visas.',
    sections: [
      {
        heading: 'Verify Physical Address, Landline & Corporate Backing',
        paragraphs: [
          'Look for a real UAE office address you can visit, a working Dubai landline (+971 4), corporate email domain, and verifiable lineage. Tuwaiq Travel & Tourism LLC operates from Fifty One Tower, Office 301 in Business Bay since 2014 as part of Al Basel Group (established 2007).',
        ],
      },
      {
        heading: 'Insist on Transparent Inclusions & Real Support',
        paragraphs: [
          'Always check whether a quoted price specifies two sharing occupancy, flight baggage rules, hotel room category, breakfast basis, and airport transfers, and confirm who answers the phone if a flight schedule changes mid-trip.',
        ],
      },
    ],
    relatedPackageSlugs: ['georgia-tbilisi-batumi-4-nights', 'azerbaijan-baku-4-nights'],
    relatedDestinationSlugs: ['uae', 'georgia-azerbaijan'],
    relatedServiceSlugs: ['holiday-packages', 'flights', 'vip-concierge'],
    image: '/images/hero/burj-al-arab-aerial.webp',
    imageWidth: 1800,
    imageHeight: 1008,
    imageAlt: 'Dubai coastline and Burj Al Arab aerial view',
    faqs: [
      { question: 'Where is Tuwaiq Travel located in Dubai?', answer: 'At Fifty One Tower, Office 301, Marasi Drive, Business Bay, Dubai, UAE.' },
      { question: 'How long has Tuwaiq Travel been operating?', answer: 'Tuwaiq Travel & Tourism LLC was founded in 2014 by Basel Al Kasem within Al Basel Group (est. 2007).' },
      { question: 'What questions should I ask before paying for a package?', answer: 'Verify room sharing basis, flight baggage allowance, airport transfer type, meal plan, and visa rules for your passport.' },
      { question: 'Why book via a consultant rather than an overseas app?', answer: 'When flights reschedule or visa checklists need checking, a local Dubai consultant resolves changes directly instead of automated chatbots.' },
      { question: 'Can I speak directly with Tuwaiq by phone as well as WhatsApp?', answer: 'Yes, call our Business Bay office at +971 4 276 1133 or WhatsApp +971 55 915 8517.' },
    ],
  },
  {
    slug: 'uae-national-day-getaways-2026-planning-guide',
    url: '/guides/uae-national-day-getaways-2026-planning-guide/',
    category: 'Seasonal Offers',
    readTime: '4 min read',
    publishedDate: '2026-11-12',
    seoTitle: 'UAE National Day 2026 Getaways Guide | Tuwaiq Travel',
    seoDescription: 'Compare 2 December 2026 UAE National Day guided packages from Dubai to Georgia, Azerbaijan, Armenia, and Uzbekistan starting AED 3,449.',
    h1: 'UAE National Day 2026 Getaways: Comparing Our Four Guided Departures',
    summary: 'Compare our four 2 December 2026 UAE National Day guided getaways across Uzbekistan, Georgia, Azerbaijan, and Armenia.',
    sections: [
      {
        heading: 'Comparing the Four Routes',
        paragraphs: [
          'Uzbekistan (AED 3,449) pairs Tashkent city touring with snowy Amirsoy Mountain and Charvak Lake plus a free day. Georgia (AED 3,849) covers Tbilisi, Mtskheta, Ananuri, Gudauri, and Kazbegi.',
          'Azerbaijan (AED 3,849) visits Baku, Gabala mountains, Absheron, Ateshgah, and Flame Towers, while Armenia (AED 3,849) spans Tsaghkadzor, Lake Sevan, Dilijan, Yerevan, Garni, and Geghard.',
        ],
      },
    ],
    relatedPackageSlugs: [
      'national-day-uzbekistan-4-nights',
      'national-day-georgia-4-nights',
      'national-day-azerbaijan-4-nights',
      'national-day-armenia-4-nights',
    ],
    relatedDestinationSlugs: ['georgia-azerbaijan'],
    relatedServiceSlugs: ['holiday-packages'],
    image: '/images/destinations/uzbekistan.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Uzbekistan Registan mosaic square for National Day 2026 travel',
    faqs: [
      { question: 'What date do all four UAE National Day 2026 packages depart?', answer: 'All four seasonal departures fly out on 2 December 2026 for 4 nights and 5 days.' },
      { question: 'Which National Day getaway has the lowest starting rate?', answer: 'Uzbekistan starts From AED 3,449 per person on two sharing; Georgia, Azerbaijan, and Armenia are From AED 3,849.' },
      { question: 'Why are National Day rates higher than off-peak weeks?', answer: 'They reflect peak long-weekend flight demand plus full guided sightseeing excursions already bundled into the package.' },
      { question: 'How fast should seats be booked before 2 December?', answer: 'Seats are limited and eVisas for destinations like Azerbaijan need submission ahead of travel, so reserve as early as possible.' },
      { question: 'How do I reserve on WhatsApp?', answer: 'Message +971 55 915 8517 stating your chosen country and number of travellers.' },
    ],
  },
  {
    slug: 'caucasus-comparison-georgia-vs-azerbaijan-vs-armenia',
    url: '/guides/caucasus-comparison-georgia-vs-azerbaijan-vs-armenia/',
    category: 'Destination Comparison',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Georgia vs Azerbaijan vs Armenia From Dubai | Tuwaiq',
    seoDescription: 'Compare Tbilisi, Baku, and Yerevan on flight time, scenery, food, visas, and package price from Dubai (AED 1,499 to AED 1,699).',
    h1: 'Georgia vs Azerbaijan vs Armenia: Which Caucasus Break Fits Best?',
    summary: 'All three Caucasus neighbours sit under four hours from Dubai, yet each brings a distinct personality, visa rule, and travel rhythm.',
    sections: [
      {
        heading: 'Pick Georgia for Mountain Drama & Coast',
        paragraphs: [
          'Georgia (From AED 1,699) leads for lush dramatic gorges around Kazbegi and Gudauri combined with lively Tbilisi cafes and Batumi\'s Black Sea boardwalk.',
        ],
      },
      {
        heading: 'Pick Baku for Cosmopolitan Boulevards & Gabala',
        paragraphs: [
          'Azerbaijan (From AED 1,599) suits families seeking sleek Caspian waterfront promenades, abundant Halal dining, UNESCO Old City walls, and cable-car mountains in Gabala.',
        ],
      },
      {
        heading: 'Pick Armenia for Value & Ancient Heritage',
        paragraphs: [
          'Armenia (From AED 1,499) offers our sharpest package value, pink stone plazas facing Mount Ararat, and alpine Lake Sevan within easy driving distance of Yerevan.',
        ],
      },
    ],
    relatedPackageSlugs: ['armenia-yerevan-4-nights', 'azerbaijan-baku-4-nights', 'georgia-tbilisi-batumi-4-nights'],
    relatedDestinationSlugs: ['georgia-azerbaijan'],
    relatedServiceSlugs: ['holiday-packages'],
    image: '/images/destinations/georgia-azerbaijan.webp',
    imageWidth: 1043,
    imageHeight: 1280,
    imageAlt: 'Caucasus hillside skyline and traditional architecture',
    faqs: [
      { question: 'Which Caucasus package is most affordable from Dubai?', answer: 'Armenia (Yerevan) starts From AED 1,499, followed by Baku From AED 1,599 and Georgia From AED 1,699 per person on two sharing.' },
      { question: 'Which is best for young families and Halal dining?', answer: 'Baku, Azerbaijan makes family dining and stroller-friendly promenade walks particularly effortless.' },
      { question: 'Which offers the tallest snow-capped mountain passes?', answer: 'Georgia\'s Military Highway to Kazbegi and Armenia\'s Mount Ararat vistas stand out for high mountain scenery.' },
      { question: 'Can two countries be combined on one 7-night holiday?', answer: 'Yes, overnight rail links Tbilisi and Baku smoothly without needing an extra flight.' },
      { question: 'Do all three require the same visa?', answer: 'No. Georgia, Azerbaijan, and Armenia operate separate residency and eVisa policies; check current requirements for your passport.' },
    ],
  },
  {
    slug: 'central-asia-guide-uzbekistan-vs-kyrgyzstan',
    url: '/guides/central-asia-guide-uzbekistan-vs-kyrgyzstan/',
    category: 'Destination Comparison',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Uzbekistan vs Kyrgyzstan From Dubai | Tuwaiq Travel',
    seoDescription: 'Compare Silk Road cities in Uzbekistan (AED 1,999+) against Tian Shan alpine valleys in Kyrgyzstan (AED 1,799+) for UAE travellers.',
    h1: 'Uzbekistan vs Kyrgyzstan: Silk Road Heritage or Alpine Gorges?',
    summary: 'Compare Uzbekistan Silk Road architecture and fast rail links against Kyrgyzstan Tian Shan alpine valleys.',
    sections: [
      {
        heading: 'Uzbekistan: Cities, Markets & Bullet Trains',
        paragraphs: [
          'Choose Tashkent (From AED 1,999) for Silk Road mosques, tiled metro stations, Chorsu Bazaar, and high-speed rail excursions to Samarkand alongside winter mountain days at Amirsoy.',
        ],
      },
      {
        heading: 'Kyrgyzstan: Raw Tian Shan Nature',
        paragraphs: [
          'Choose Bishkek (From AED 1,799) if your priority is alpine rivers, pine forests in Ala Archa National Park, horse riding in Chunkurchak, and cooler summer temperatures.',
        ],
      },
    ],
    relatedPackageSlugs: ['uzbekistan-tashkent-4-nights', 'kyrgyzstan-bishkek-4-nights', 'national-day-uzbekistan-4-nights'],
    relatedDestinationSlugs: ['china'],
    relatedServiceSlugs: ['holiday-packages'],
    image: '/images/destinations/kyrgyzstan.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Snowy Tian Shan mountain peaks and pine valley river in Kyrgyzstan',
    faqs: [
      { question: 'Which destination has more historic architecture?', answer: 'Uzbekistan stands out for Silk Road madrasas, blue-tiled mausoleums, and bazaars across Tashkent and Samarkand.' },
      { question: 'Which is better for mountain scenery near the airport?', answer: 'Kyrgyzstan places Ala Archa National Park roughly 40 minutes from Bishkek, though Uzbekistan also offers Amirsoy Mountain 90 minutes from Tashkent.' },
      { question: 'How do prices compare from Dubai?', answer: '4N/5D Bishkek starts From AED 1,799 and 4N/5D Tashkent starts From AED 1,999 per person on two sharing.' },
      { question: 'Are both destinations Halal-friendly?', answer: 'Yes, both countries offer widespread Halal meat, soups, breads, and rice dishes.' },
      { question: 'Can flights connect Tashkent and Bishkek together?', answer: 'Yes, short regional flights connect both capitals for travellers planning a week-long Central Asia loop.' },
    ],
  },
  {
    slug: 'family-friendly-malaysia-halal-travel-guide',
    url: '/guides/family-friendly-malaysia-halal-travel-guide/',
    category: 'Family Guides',
    readTime: '5 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Family & Halal Travel Guide to Malaysia | Tuwaiq Travel',
    seoDescription: 'Why UAE families love Malaysia: Halal dining, Sunway Lagoon, Genting Highlands, Langkawi beaches, and 5N/6D Kuala Lumpur stays from AED 2,599.',
    h1: 'Family-Friendly & Halal Travel Guide to Malaysia From Dubai',
    summary: 'Why UAE families choose Malaysia: certified Halal dining, prayer rooms, theme parks, and island escapes.',
    sections: [
      {
        heading: 'Top Kuala Lumpur Family Highlights',
        paragraphs: [
          'Base in KLCC or Bukit Bintang for walkable malls, Aquaria KLCC, KL Bird Park, and Petronas Twin Towers fountain shows. Add full-day excursions to Sunway Lagoon theme and water parks or cool Genting Highlands cable cars.',
        ],
      },
      {
        heading: 'Extending to Langkawi or Penang',
        paragraphs: [
          'A 55-minute domestic flight reaches Langkawi\'s SkyCab cable car and family beachfront resorts, making a 7 to 9 night Kuala Lumpur plus Langkawi split ideal during school breaks.',
        ],
      },
    ],
    relatedPackageSlugs: ['malaysia-kuala-lumpur-5-nights'],
    relatedDestinationSlugs: ['malaysia'],
    relatedServiceSlugs: ['holiday-packages', 'hotel-bookings'],
    image: '/images/destinations/malaysia.webp',
    imageWidth: 1043,
    imageHeight: 1280,
    imageAlt: 'Kuala Lumpur Petronas Towers lit against evening sky',
    faqs: [
      { question: 'How much does a 5-night Kuala Lumpur package cost?', answer: 'Our 5N/6D package starts From AED 2,599 per person, based on two sharing.' },
      { question: 'Is Halal food certified across major malls and hotels?', answer: 'Yes, JAKIM-certified Halal restaurants and prayer facilities are ubiquitous in Malaysia.' },
      { question: 'What is the coolest place near Kuala Lumpur to escape humidity?', answer: 'Genting Highlands sits high in the rainforest hills roughly one hour from central KL.' },
      { question: 'When should we avoid Langkawi\'s rainy season?', answer: 'November to April is driest in Langkawi, whereas Kuala Lumpur remains visitable year-round.' },
      { question: 'Can Tuwaiq arrange family vans and private day tours in KL?', answer: 'Yes, we organize airport pick-ups, full-day private vans, and theme-park tickets.' },
    ],
  },
  {
    slug: 'dubai-desert-safari-morning-vs-evening-vs-overnight',
    url: '/guides/dubai-desert-safari-morning-vs-evening-vs-overnight/',
    category: 'Dubai Experiences',
    readTime: '4 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Dubai Desert Safari: Morning vs Evening vs Overnight',
    seoDescription: 'Choose the right Dubai desert safari format: brisk morning dune drives, classic evening BBQ camp safaris, or quiet overnight desert stays.',
    h1: 'Dubai Desert Safari: Morning vs Evening vs Overnight',
    summary: 'Compare morning, evening BBQ, and overnight Dubai desert safaris for families, couples, and layovers.',
    sections: [
      {
        heading: 'Morning vs Evening Safaris',
        paragraphs: [
          'Morning safaris focus purely on crisp desert sunlight, dune bashing, camel rides, and sandboarding, wrapping up by noon so you keep your evening free for dinner or Marina cruising. Evening safaris remain the classic choice for sunset photography, henna, live entertainment, and BBQ dinner.',
        ],
      },
      {
        heading: 'Overnight & Private 4x4 Comfort',
        paragraphs: [
          'Overnight stays continue after the evening crowd leaves, ending with a quiet desert sunrise and camp breakfast. For elders or toddlers, booking a private 4x4 gives complete control over dune speed.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['uae'],
    relatedServiceSlugs: ['desert-safari', 'city-tours'],
    image: '/images/services/desert-safari.webp',
    imageWidth: 1440,
    imageHeight: 1280,
    imageAlt: '4x4 safari vehicle climbing golden sand ridge in Dubai desert',
    faqs: [
      { question: 'Which safari is best on a short Dubai stopover?', answer: 'A morning safari lets layover guests experience the dunes and return to the hotel or airport by lunchtime.' },
      { question: 'Does a morning safari include BBQ dinner?', answer: 'No, BBQ dinner and live evening shows belong to the afternoon-to-evening safari format.' },
      { question: 'Are private 4x4 cars safer for young children?', answer: 'Private cars let your driver keep dune driving gentle or drive straight to camp for sunset and camels.' },
      { question: 'Can we add quad biking to any safari?', answer: 'Yes, optional quad bike or buggy sessions can be arranged at the desert entrance.' },
      { question: 'How do I reserve via Tuwaiq Travel?', answer: 'Message +971 55 915 8517 on WhatsApp with your hotel and preferred slot.' },
    ],
  },
  {
    slug: 'dhow-cruise-dubai-marina-vs-dubai-creek',
    url: '/guides/dhow-cruise-dubai-marina-vs-dubai-creek/',
    category: 'Dubai Experiences',
    readTime: '4 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Dhow Cruise Dubai Marina vs Dubai Creek | Tuwaiq Travel',
    seoDescription: 'Compare Dubai Marina and Dubai Creek dhow dinner cruises on scenery, boarding locations, dining atmosphere, and traffic ease.',
    h1: 'Dhow Cruise Dubai Marina vs Dubai Creek: Which Should You Book?',
    summary: 'Both routes sail aboard traditional wooden dhows with buffet dinner, yet the skyline outside your table could not be more different.',
    sections: [
      {
        heading: 'Dubai Marina: Illuminated Towers & JBR',
        paragraphs: [
          'Choose Dubai Marina if staying around Palm Jumeirah, JBR, or Al Barsha and wanting glowing skyscraper reflections, Ain Dubai views across the water, and modern waterfront buzz.',
        ],
      },
      {
        heading: 'Dubai Creek: Heritage & Classic Hospitality',
        paragraphs: [
          'Choose Dubai Creek if staying near Deira, Bur Dubai, or Downtown and preferring historic wind towers, abra crossings, gentle waters, and budget-friendly family pricing.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['uae'],
    relatedServiceSlugs: ['cruises-dhow-dinners', 'yacht-charters'],
    image: '/images/services/dhow-cruise.webp',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Illuminated traditional wooden dhow cruising past skyline reflections on Dubai Creek',
    faqs: [
      { question: 'How long do Marina and Creek dhow cruises last?', answer: 'Both typically sail for approximately two hours in the evening.' },
      { question: 'Which cruise has calmer water?', answer: 'Both Marina canals and the sheltered Creek are very calm, making seasickness rare.' },
      { question: 'Should we sit on the lower deck or upper deck?', answer: 'Upper open-air decks shine from October to April; air-conditioned glass lower decks stay cool during humid summer nights.' },
      { question: 'Are hotel transfers included if requested?', answer: 'Yes, Tuwaiq can arrange cruise-only e-tickets or full door-to-door transfers.' },
      { question: 'Can groups reserve a private dhow deck?', answer: 'Yes, corporate teams and large family celebrations can book private deck sections or full vessels.' },
    ],
  },
  {
    slug: 'private-yacht-charter-dubai-planning-guide',
    url: '/guides/private-yacht-charter-dubai-planning-guide/',
    category: 'Luxury & Marine',
    readTime: '4 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Private Yacht Charter Dubai Planning Guide | Tuwaiq',
    seoDescription: 'Plan your Dubai Marina yacht charter cleanly: choosing yacht length, sunset vs morning slots, Coast Guard ID rules, and catering add-ons.',
    h1: 'Planning a Private Yacht Charter in Dubai Marina',
    summary: 'Plan a Dubai Marina yacht charter by aligning passenger count, cruising hours, catering, and Coast Guard ID rules.',
    sections: [
      {
        heading: 'Matching Charter Hours to Landmarks',
        paragraphs: [
          'Two hours lets you cruise Dubai Marina, Bluewaters Island, and the outer Palm crescent. Three to four hours adds time to round Atlantis The Palm, anchor for swimming, and take sunset photographs beside Burj Al Arab.',
        ],
      },
      {
        heading: 'Coast Guard ID & Booking Tips',
        paragraphs: [
          'Every adult and child boarding a private vessel in Dubai must carry original Emirates ID or passport identification. Soft drinks, ice, crew, and safety gear come standard; BBQ catering, birthday setups, and jet-skis can be added in advance.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['uae'],
    relatedServiceSlugs: ['yacht-charters', 'vip-concierge'],
    image: '/images/services/yacht-charters.webp',
    imageWidth: 1440,
    imageHeight: 1280,
    imageAlt: 'Luxury white private yacht berthed in Dubai Marina at sunset',
    faqs: [
      { question: 'How far ahead should sunset slots be booked?', answer: 'Friday to Sunday sunset slots (4 PM to 7 PM) from November to March should be reserved at least a week in advance.' },
      { question: 'Are children counted toward Coast Guard passenger capacity?', answer: 'Yes, UAE maritime rules count every individual aboard regardless of age.' },
      { question: 'Can we bring birthday cakes or outside food?', answer: 'Yes, guests may bring cakes or light platters, or ask Tuwaiq to arrange onboard BBQ catering.' },
      { question: 'Are life jackets provided for kids?', answer: 'Yes, Coast Guard approved life jackets are carried aboard all chartered vessels.' },
      { question: 'Can Tuwaiq arrange chauffeur transfers to the marina berth?', answer: 'Yes, door-to-door sedans or VIP vans drop your party directly beside the marina gate.' },
    ],
  },
  {
    slug: 'uae-visit-visa-and-evisa-checklist',
    url: '/guides/uae-visit-visa-and-evisa-checklist/',
    category: 'Visas & Entry',
    readTime: '4 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'UAE Visit Visa & Outbound eVisa Checklist | Tuwaiq',
    seoDescription: 'Clean document checklist for incoming UAE visit visas and outbound eVisa applications handled through Tuwaiq Travel in Dubai.',
    h1: 'UAE Visit Visa & Outbound eVisa Document Checklist',
    summary: 'Keep this clean document checklist handy before submitting UAE visit visa or outbound eVisa files.',
    sections: [
      {
        heading: 'Core Documents to Prepare',
        paragraphs: [
          'Prepare a sharp colour scan of your passport bio page showing at least six months remaining validity, a recent white-background photograph, valid Emirates ID / UAE residence page for outbound resident applications, and tentative flight and hotel dates.',
        ],
      },
    ],
    relatedPackageSlugs: ['azerbaijan-baku-4-nights', 'uzbekistan-tashkent-4-nights'],
    relatedDestinationSlugs: ['uae', 'georgia-azerbaijan'],
    relatedServiceSlugs: ['visa-services'],
    image: '/images/services/visa-services.webp',
    imageWidth: 1440,
    imageHeight: 1280,
    imageAlt: 'Open travel passport with immigration stamps',
    faqs: [
      { question: 'What passport validity is recommended for visa applications?', answer: 'Ensure at least six months validity remaining from your planned return date.' },
      { question: 'Can phone-camera photos of passports cause delays?', answer: 'Glare, cropped corners, or shadows can trigger rejections; flat high-resolution colour scans work best.' },
      { question: 'Does Tuwaiq check hotel and flight timing consistency?', answer: 'Yes, we align arrival/departure dates across your tickets, hotel bookings, and visa forms.' },
      { question: 'Do visa rules change without long notice?', answer: 'Yes, immigration policies evolve regularly, so always check current requirements before booking.' },
      { question: 'How do I send documents securely for review?', answer: 'Start an enquiry on WhatsApp (+971 55 915 8517) or email info@tuwaiq.ae.' },
    ],
  },
  {
    slug: 'dubai-stopover-and-airport-transfer-guide',
    url: '/guides/dubai-stopover-and-airport-transfer-guide/',
    category: 'Dubai Stopovers',
    readTime: '4 min read',
    publishedDate: '2026-11-10',
    seoTitle: 'Dubai Stopover & DXB Airport Transfer Guide | Tuwaiq',
    seoDescription: 'Turn a 24 to 72 hour Dubai layover at DXB, DWC, or AUH into a smooth city stay with flight-tracked transfers and attraction tickets.',
    h1: 'Dubai Stopover & Airport Transfer Guide (DXB, DWC & AUH)',
    summary: 'Turn a 24 to 72 hour Dubai layover at DXB, DWC, or AUH into an effortless city stay with tracked pick-ups.',
    sections: [
      {
        heading: 'Pre-Booked Flight-Tracked Pick-Ups',
        paragraphs: [
          'Through Najd Rent a Car, our Al Basel Group sister company, Tuwaiq arranges sedans, family SUVs, and vans across DXB, DWC, and AUH with flight tracking so your driver waits even if your inbound flight shifts.',
        ],
      },
      {
        heading: 'Fitting Highlights Into 48 Hours',
        paragraphs: [
          'Pair a morning Old Dubai and Creek abra walk with timed Burj Khalifa or Museum of the Future entry in the afternoon, then dedicate your second evening to a Dubai desert safari or Marina dhow dinner cruise.',
        ],
      },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ['uae'],
    relatedServiceSlugs: ['airport-transfers', 'tourist-car-rental', 'city-tours', 'attraction-tickets'],
    image: '/images/services/airport-transfers.webp',
    imageWidth: 1440,
    imageHeight: 1280,
    imageAlt: 'Executive vehicle interior ready for DXB airport pick-up in Dubai',
    faqs: [
      { question: 'Which UAE airports can Tuwaiq arrange transfers from?', answer: 'Dubai International (DXB), Al Maktoum International (DWC), and Zayed International Abu Dhabi (AUH).' },
      { question: 'Can I book a half-day Dubai tour straight from DXB during a layover?', answer: 'Yes, private vehicles hold luggage securely while your guide covers key Dubai sights.' },
      { question: 'Do you book hotels near DXB or Downtown for short stopovers?', answer: 'Yes, we match location to your arrival terminal and sightseeing priorities.' },
      { question: 'Who handles the transfer fleet?', answer: 'Transfers and tourist car rentals operate alongside our sister group company Najd Rent a Car (najdrentacar.com).' },
      { question: 'Can stopover guests book timed Burj Khalifa or Museum of the Future slots ahead?', answer: 'Yes, pre-booking prevents sold-out time slots during brief layovers.' },
    ],
  },
];
