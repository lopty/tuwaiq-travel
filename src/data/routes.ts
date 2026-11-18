import { FEATURE_FLAGS } from './siteConfig';
import { GENERAL_PACKAGES, NATIONAL_DAY_OFFERS, UMRAH_PACKAGES, type TravelPackage } from './packages';
import { DESTINATIONS, type DestinationItem } from './destinations';
import { SERVICES, type ServiceItem } from './services';
import { BUYER_QUERY_PAGES, type BuyerQueryPage } from './buyerPages';
import { GUIDES, type GuideArticle } from './guides';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPackageSchema,
  buildServiceSchema,
  buildTravelAgencySchema,
  type PageMeta,
} from '../lib/seo';

export function getActivePackages(): TravelPackage[] {
  const base = [...GENERAL_PACKAGES, ...NATIONAL_DAY_OFFERS];
  if (FEATURE_FLAGS.enableUmrahPages) {
    return [...base, ...UMRAH_PACKAGES];
  }
  return base;
}

export function getActiveBuyerPages(): BuyerQueryPage[] {
  return BUYER_QUERY_PAGES.filter((p) => !p.requiresUmrahFlag || FEATURE_FLAGS.enableUmrahPages);
}

export type ResolvedRoute =
  | { kind: 'home'; meta: PageMeta }
  | { kind: 'packages-index'; meta: PageMeta }
  | { kind: 'offers-index'; meta: PageMeta }
  | { kind: 'destinations-index'; meta: PageMeta }
  | { kind: 'services-index'; meta: PageMeta }
  | { kind: 'guides-index'; meta: PageMeta }
  | { kind: 'trust'; slug: TrustSlug; meta: PageMeta }
  | { kind: 'package-detail'; pkg: TravelPackage; meta: PageMeta }
  | { kind: 'destination-detail'; destination: DestinationItem; meta: PageMeta }
  | { kind: 'service-detail'; service: ServiceItem; meta: PageMeta }
  | { kind: 'buyer-query'; page: BuyerQueryPage; meta: PageMeta }
  | { kind: 'guide-detail'; guide: GuideArticle; meta: PageMeta }
  | { kind: 'not-found'; meta: PageMeta };

export type TrustSlug =
  | 'about'
  | 'founder'
  | 'leadership'
  | 'al-basel-group'
  | 'partnerships'
  | 'press'
  | 'licence'
  | 'how-booking-works'
  | 'contact'
  | 'ai-visibility'
  | 'photo-credits';

export const TRUST_PAGES: Record<
  TrustSlug,
  {
    url: string;
    title: string;
    description: string;
    h1: string;
    image: string;
    imageAlt: string;
    breadcrumbLabel: string;
  }
> = {
  about: {
    url: '/about/',
    title: 'About Tuwaiq Travel & Tourism LLC | Dubai Agency',
    description: 'Founded in 2014 in Dubai within Al Basel Group (est. 2007), Tuwaiq Travel curates holidays, flights, visas, and VIP concierge across 70+ countries.',
    h1: 'About Tuwaiq Travel & Tourism LLC',
    image: '/images/hero/luxury-hotel-lobby.webp',
    imageAlt: 'Luxury hospitality reception hall representing Tuwaiq Travel heritage',
    breadcrumbLabel: 'About',
  },
  founder: {
    url: '/founder/',
    title: 'Our Founder: Basel Al Kasem | Tuwaiq Travel Dubai',
    description: 'Meet Basel Al Kasem, former Business Development Manager at Burj Al Arab and founder of Tuwaiq Travel & Tourism LLC and Al Basel Group.',
    h1: 'Our Founder: Basel Al Kasem',
    image: '/images/hero/burj-al-arab-aerial.webp',
    imageAlt: 'Aerial view of Burj Al Arab and Jumeirah coastline in Dubai',
    breadcrumbLabel: 'Our Founder',
  },
  leadership: {
    url: '/leadership/',
    title: 'Leadership Team | Tuwaiq Travel & Tourism Dubai',
    description: 'Meet the experienced leadership team behind Tuwaiq Travel & Tourism LLC in Business Bay, Dubai, covering VIP, finance, and corporate travel.',
    h1: 'Leadership Team at Tuwaiq Travel',
    image: '/images/hero/dubai-skyline-twilight.webp',
    imageAlt: 'Dubai Business Bay skyline at twilight',
    breadcrumbLabel: 'Leadership Team',
  },
  'al-basel-group': {
    url: '/al-basel-group/',
    title: 'Al Basel Group & Sister Companies | Tuwaiq Travel',
    description: 'Tuwaiq Travel is a member of Al Basel Group (est. 2007) alongside Najd Rent a Car, Al Basel Consultancy, Al Basel Real Estate, Amani, and Zallaqa.',
    h1: 'Al Basel Group & Sister Companies',
    image: '/images/hero/palm-jumeirah-aerial.webp',
    imageAlt: 'Illuminated Dubai road network and Downtown skyline at night',
    breadcrumbLabel: 'Al Basel Group',
  },
  partnerships: {
    url: '/partnerships/',
    title: 'Partnerships & Recognition | Tuwaiq Travel Dubai',
    description: 'Four Seasons Washington DC, Mandarin Oriental and Corinthia London relationships, a 2015 royal collaboration, and group recognition at Al Basel Consultancy.',
    h1: 'Partnerships & Recognition',
    image: '/images/services/hotel-bookings.webp',
    imageAlt: 'Coastal five-star resort infinity pool and ocean horizon',
    breadcrumbLabel: 'Partnerships',
  },
  press: {
    url: '/press/',
    title: 'Press & Media Archive | Tuwaiq Travel & Al Basel Group',
    description: 'Read press coverage for Tuwaiq Travel & Tourism LLC and Al Basel Group including Arabian Travel News 2014 and regional hospitality features.',
    h1: 'Press & Media Archive',
    image: '/images/hero/burj-al-arab-aerial.webp',
    imageAlt: 'Dubai hospitality skyline featured in regional travel press',
    breadcrumbLabel: 'Press',
  },
  licence: {
    url: '/licence/',
    title: 'Licence & Company Verification | Tuwaiq Travel Dubai',
    description: 'Tuwaiq Travel & Tourism Co. L.L.C holds Dubai trade licence 713611 from the Department of Economy and Tourism. Verify the licence, office, phone and email details.',
    h1: 'Licence & Verification Details',
    image: '/images/hero/dubai-skyline-twilight.webp',
    imageAlt: 'Business Bay Dubai commercial district at dusk',
    breadcrumbLabel: 'Licence & Verification',
  },
  'how-booking-works': {
    url: '/how-booking-works/',
    title: 'How Booking Works in 4 Steps | Tuwaiq Travel Dubai',
    description: 'See how Tuwaiq Travel plans and books your holiday in four direct steps from WhatsApp enquiry to confirmed itinerary and on-trip support.',
    h1: 'How Booking Works at Tuwaiq Travel',
    image: '/images/services/flights.webp',
    imageAlt: 'Commercial aircraft wing gliding above soft sunlit clouds',
    breadcrumbLabel: 'How Booking Works',
  },
  contact: {
    url: '/contact/',
    title: 'Contact Tuwaiq Travel Dubai | WhatsApp & Business Bay',
    description: 'Contact Tuwaiq Travel & Tourism LLC at Fifty One Tower, Office 301, Business Bay, Dubai on WhatsApp +971 55 915 8517 or +971 4 276 1133.',
    h1: 'Contact Tuwaiq Travel Dubai',
    image: '/images/hero/palm-jumeirah-aerial.webp',
    imageAlt: 'Business Bay and Sheikh Zayed Road illuminated in Dubai',
    breadcrumbLabel: 'Contact',
  },
  'ai-visibility': {
    url: '/how-we-build-trust-in-ai-search/',
    title: 'How We Build Trust in AI Search | Tuwaiq Travel',
    description: 'How Tuwaiq Travel structures its website so Google and AI assistants can find, check and recommend our packages, with the tools and experts behind the work.',
    h1: 'How We Build Trust in AI Search',
    image: '/images/hero/dubai-skyline-twilight.webp',
    imageAlt: 'Dubai skyline at twilight',
    breadcrumbLabel: 'AI Search & Trust',
  },
  'photo-credits': {
    url: '/photo-credits/',
    title: 'Photo Credits | Tuwaiq Travel & Tourism',
    description: 'Sources and licences for the photographs on the Tuwaiq Travel website, including openly licensed images from Wikimedia Commons.',
    h1: 'Photo Credits',
    image: '/images/hero/dubai-skyline-twilight.webp',
    imageAlt: 'Dubai skyline at twilight',
    breadcrumbLabel: 'Photo Credits',
  },
};

export function normalizePathname(raw: string): string {
  const clean = raw.split('?')[0].split('#')[0] || '/';
  if (clean === '/') return '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function resolveRoute(rawPath: string): ResolvedRoute {
  const path = normalizePathname(rawPath);

  if (path === '/') {
    return {
      kind: 'home',
      meta: {
        path: '/',
        title: 'Tuwaiq Travel & Tourism Dubai | Holiday Packages',
        description: 'Discover holiday packages from Dubai starting AED 1,499, flights, hotels, visas, desert safaris, and VIP concierge by Tuwaiq Travel.',
        image: '/images/hero/dubai-skyline-twilight.webp',
        imageAlt: 'Dubai skyline at sunset with Burj Khalifa overlooking Business Bay',
        breadcrumbs: [{ name: 'Home', url: '/' }],
        schemas: [buildTravelAgencySchema()],
      },
    };
  }

  if (path === '/packages/') {
    return {
      kind: 'packages-index',
      meta: {
        path: '/packages/',
        title: 'Holiday Packages From Dubai | Tuwaiq Travel LLC',
        description: 'Browse priced holiday packages from Dubai including Georgia, Baku, Armenia, Uzbekistan, Kyrgyzstan, Istanbul, Thailand, Malaysia, and National Day 2026.',
        image: '/images/services/holiday-packages.webp',
        imageAlt: 'Tropical beach holiday coastline',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Packages', url: '/packages/' },
        ],
        schemas: [
          buildTravelAgencySchema(),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Packages', url: '/packages/' },
          ]),
        ],
      },
    };
  }

  if (path === '/offers/') {
    return {
      kind: 'offers-index',
      meta: {
        path: '/offers/',
        title: 'UAE National Day 2026 Holiday Offers | Tuwaiq Travel',
        description: 'Depart 2 December 2026 on guided 4N/5D UAE National Day getaways to Georgia, Azerbaijan, Armenia, and Uzbekistan starting AED 3,449 per person.',
        image: '/images/destinations/uzbekistan.webp',
        imageAlt: 'Central Asian turquoise architecture for UAE National Day 2026 offers',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Packages', url: '/packages/' },
          { name: 'Seasonal Offers', url: '/offers/' },
        ],
        schemas: [
          buildTravelAgencySchema(),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Packages', url: '/packages/' },
            { name: 'Seasonal Offers', url: '/offers/' },
          ]),
        ],
      },
    };
  }

  if (path === '/destinations/') {
    return {
      kind: 'destinations-index',
      meta: {
        path: '/destinations/',
        title: '16 Global Destinations From Dubai | Tuwaiq Travel',
        description: 'Explore our 16 featured travel regions from Dubai across GCC, Europe, Caucasus, Indian Ocean, Southeast Asia, East Asia, Africa, and Caribbean.',
        image: '/images/destinations/maldives.webp',
        imageAlt: 'Overwater island villas in the Maldives',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Destinations', url: '/destinations/' },
        ],
        schemas: [
          buildTravelAgencySchema(),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Destinations', url: '/destinations/' },
          ]),
        ],
      },
    };
  }

  if (path === '/services/') {
    return {
      kind: 'services-index',
      meta: {
        path: '/services/',
        title: '15 Travel & VIP Services in Dubai | Tuwaiq Travel',
        description: 'Flights, luxury hotels, holiday packages, eVisas, UAE visit visas, desert safaris, yacht charters, car rental, and VIP concierge in Dubai.',
        image: '/images/services/vip-concierge.webp',
        imageAlt: 'Private aircraft on airport apron representing Tuwaiq VIP travel services',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
        ],
        schemas: [
          buildTravelAgencySchema(),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
          ]),
        ],
      },
    };
  }

  if (path === '/guides/') {
    return {
      kind: 'guides-index',
      meta: {
        path: '/guides/',
        title: 'Dubai Travel Guides & Visa Advice | Tuwaiq Travel',
        description: 'Practical guides from our Dubai travel consultants covering UAE resident visas, seasonal travel timing, Maldives honeymoons, safaris, and yachts.',
        image: '/images/services/global-tours.webp',
        imageAlt: 'Travellers overlooking panoramic mountain and city skyline',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides/' },
        ],
        schemas: [
          buildTravelAgencySchema(),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Guides', url: '/guides/' },
          ]),
        ],
      },
    };
  }

  for (const [slug, info] of Object.entries(TRUST_PAGES) as [TrustSlug, typeof TRUST_PAGES[TrustSlug]][]) {
    if (path === info.url) {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        ...(slug === 'about' ? [] : [{ name: 'About', url: '/about/' }]),
        { name: info.breadcrumbLabel, url: info.url },
      ];
      return {
        kind: 'trust',
        slug,
        meta: {
          path: info.url,
          title: info.title,
          description: info.description,
          image: info.image,
          imageAlt: info.imageAlt,
          breadcrumbs,
          schemas: [buildTravelAgencySchema(), buildBreadcrumbSchema(breadcrumbs)],
        },
      };
    }
  }

  const pkg = getActivePackages().find((p) => p.url === path);
  if (pkg) {
    const parentBreadcrumb =
      pkg.category === 'national-day'
        ? { name: 'Seasonal Offers', url: '/offers/' }
        : { name: 'Packages', url: '/packages/' };
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      parentBreadcrumb,
      { name: pkg.shortTitle, url: pkg.url },
    ];
    return {
      kind: 'package-detail',
      pkg,
      meta: {
        path: pkg.url,
        title: pkg.seoTitle,
        description: pkg.seoDescription,
        image: pkg.image,
        imageAlt: pkg.imageAlt,
        breadcrumbs,
        schemas: [
          buildTravelAgencySchema(),
          buildPackageSchema(pkg),
          buildFaqSchema(pkg.faqs),
          buildBreadcrumbSchema(breadcrumbs),
        ],
      },
    };
  }

  const destination = DESTINATIONS.find((d) => d.url === path);
  if (destination) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Destinations', url: '/destinations/' },
      { name: destination.name, url: destination.url },
    ];
    return {
      kind: 'destination-detail',
      destination,
      meta: {
        path: destination.url,
        title: destination.seoTitle,
        description: destination.seoDescription,
        image: destination.image,
        imageAlt: destination.imageAlt,
        breadcrumbs,
        schemas: [
          buildTravelAgencySchema(),
          buildFaqSchema(destination.faqs),
          buildBreadcrumbSchema(breadcrumbs),
        ],
      },
    };
  }

  const service = SERVICES.find((s) => s.url === path);
  if (service) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services/' },
      { name: service.name, url: service.url },
    ];
    return {
      kind: 'service-detail',
      service,
      meta: {
        path: service.url,
        title: service.seoTitle,
        description: service.seoDescription,
        image: service.image,
        imageAlt: service.imageAlt,
        breadcrumbs,
        schemas: [
          buildTravelAgencySchema(),
          buildServiceSchema(service),
          buildFaqSchema(service.faqs),
          buildBreadcrumbSchema(breadcrumbs),
        ],
      },
    };
  }

  const buyerPage = getActiveBuyerPages().find((b) => b.url === path);
  if (buyerPage) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Packages', url: '/packages/' },
      { name: buyerPage.h1, url: buyerPage.url },
    ];
    return {
      kind: 'buyer-query',
      page: buyerPage,
      meta: {
        path: buyerPage.url,
        title: buyerPage.seoTitle,
        description: buyerPage.seoDescription,
        image: buyerPage.image,
        imageAlt: buyerPage.imageAlt,
        breadcrumbs,
        schemas: [
          buildTravelAgencySchema(),
          buildFaqSchema(buyerPage.faqs),
          buildBreadcrumbSchema(breadcrumbs),
        ],
      },
    };
  }

  const guide = GUIDES.find((g) => g.url === path);
  if (guide) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides/' },
      { name: guide.h1, url: guide.url },
    ];
    return {
      kind: 'guide-detail',
      guide,
      meta: {
        path: guide.url,
        title: guide.seoTitle,
        description: guide.seoDescription,
        image: guide.image,
        imageAlt: guide.imageAlt,
        ogType: 'article',
        breadcrumbs,
        schemas: [
          buildTravelAgencySchema(),
          buildArticleSchema(guide),
          buildFaqSchema(guide.faqs),
          buildBreadcrumbSchema(breadcrumbs),
        ],
      },
    };
  }

  return {
    kind: 'not-found',
    meta: {
      path,
      title: 'Page Not Found | Tuwaiq Travel & Tourism Dubai',
      description: 'Browse Tuwaiq Travel & Tourism Dubai holiday packages, destinations, services, and travel guides.',
      image: '/images/hero/dubai-skyline-twilight.webp',
      imageAlt: 'Dubai skyline at sunset',
      breadcrumbs: [{ name: 'Home', url: '/' }],
      schemas: [buildTravelAgencySchema()],
    },
  };
}

export function getAllStaticRoutes(): string[] {
  const routes = [
    '/',
    '/packages/',
    '/offers/',
    '/destinations/',
    '/services/',
    '/guides/',
    ...Object.values(TRUST_PAGES).map((t) => t.url),
    ...getActivePackages().map((p) => p.url),
    ...DESTINATIONS.map((d) => d.url),
    ...SERVICES.map((s) => s.url),
    ...getActiveBuyerPages().map((b) => b.url),
    ...GUIDES.map((g) => g.url),
  ];
  return Array.from(new Set(routes));
}
