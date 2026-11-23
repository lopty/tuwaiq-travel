import { useEffect, useState } from 'react';
import {
  Anchor,
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  Compass,
  ExternalLink,
  FileCheck2,
  Globe,
  MapPin,
  Phone,
  Plane,
  Search,
  Ship,
  Sun,
} from 'lucide-react';
import { Layout } from './Layout';
import { DestinationCard, GuideCard, PackageCard } from './Cards';
import { CountryFlag, type FlagCode } from './CountryFlag';
import { WhatsAppEnquiryBuilder } from './WhatsAppEnquiryBuilder';
import { LogoMarquee } from './LogoMarquee';
import {
  BOOKING_STEPS,
  COMPANY,
  FEATURE_FLAGS,
  HOTEL_SHOWCASE,
  LEADERSHIP,
  SEASONAL_PLANNER,
  TRAVEL_STYLES,
} from '../data/siteConfig';
import { FOUR_SEASONS_LETTER, GROUP_TEAM_PHOTO, LEADER_PHOTOS, PRESS_ITEMS } from '../data/trustMedia';
import { GENERAL_PACKAGES, NATIONAL_DAY_OFFERS } from '../data/packages';
import { DESTINATIONS } from '../data/destinations';
import { SERVICES } from '../data/services';
import { GUIDES } from '../data/guides';
import { getActiveBuyerPages } from '../data/routes';

const REGIONS = ['All', 'GCC', 'Asia', 'Europe', 'Africa', 'Indian Ocean', 'Americas'] as const;

const FEATURED_EXPERIENCE_SLUGS = [
  'desert-safari',
  'yacht-charters',
  'cruises-dhow-dinners',
  'attraction-tickets',
  'theme-water-parks',
  'visa-services',
  'airport-transfers',
  'vip-concierge',
];

const SEASON_IMAGES = [
  { src: '/images/destinations/maldives.webp', width: 880, height: 1080, alt: 'Overwater villas in the Maldives' },
  { src: '/images/destinations/japan.webp', width: 1043, height: 1280, alt: 'Mount Fuji in Japan' },
  { src: '/images/destinations/georgia-azerbaijan.webp', width: 1043, height: 1280, alt: 'Green valleys and old town in Tbilisi, Georgia' },
  { src: '/images/destinations/uzbekistan.webp', width: 1600, height: 949, alt: 'Registan Square in Samarkand, Uzbekistan' },
];

export function HomeView() {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<(typeof REGIONS)[number]>('All');

  const normalizedQuery = query.trim().toLowerCase();

  const matchesFilter = (region: string, searchable: string): boolean => {
    const regionMatch = activeRegion === 'All' || region === activeRegion;
    const textMatch = !normalizedQuery || searchable.includes(normalizedQuery);
    return regionMatch && textMatch;
  };

  const categoryIcons = [
    { label: 'Packages', href: '/packages/', icon: Briefcase },
    { label: 'Flights', href: '/services/flights/', icon: Plane },
    { label: 'Hotels', href: '/services/hotel-bookings/', icon: Building2 },
    { label: 'Car Rental', href: '/dubai-car-rental-najd/', icon: Car },
    { label: 'Visas', href: '/services/visa-services/', icon: FileCheck2 },
    { label: 'Tours', href: '/services/global-tours/', icon: Globe },
    ...(FEATURE_FLAGS.enableUmrahPages
      ? [{ label: 'Umrah', href: '/umrah-package-from-dubai/', icon: Compass }]
      : [{ label: 'Safaris', href: '/services/desert-safari/', icon: Sun }]),
    { label: 'Cruises', href: '/services/cruises-dhow-dinners/', icon: Ship },
    { label: 'Yachts', href: '/services/yacht-charters/', icon: Anchor },
  ];

  const visibleDestinationsCount = DESTINATIONS.filter((d) =>
    matchesFilter(
      d.filterRegion,
      `${d.name} ${d.regionLabel} ${d.filterRegion} ${d.idealFor} ${d.highlights.join(' ')}`.toLowerCase()
    )
  ).length;

  const visiblePackagesCount = [...GENERAL_PACKAGES, ...NATIONAL_DAY_OFFERS].filter((p) =>
    matchesFilter(
      p.region,
      `${p.name} ${p.destinationName} ${p.cities} ${p.region} ${p.idealFor}`.toLowerCase()
    )
  ).length;

  const activeBuyers = getActiveBuyerPages();
  const featuredServices = SERVICES.filter((s) => FEATURED_EXPERIENCE_SLUGS.includes(s.slug));
  const homeHotelShowcase = HOTEL_SHOWCASE.slice(0, 4);
  const heroSpotlights: {
    id: string;
    label: string;
    countryCode: FlagCode;
    title: string;
    subtitle: string;
    price: string;
    href: string;
    image: string;
    alt: string;
  }[] = [
    {
      id: 'uae',
      label: 'UAE',
      countryCode: 'AE',
      title: 'United Arab Emirates',
      subtitle: 'Dubai & Abu Dhabi · Inbound Stays',
      price: 'Inbound & Car Hire',
      href: '/inbound-uae-holidays/',
      image: '/images/destinations/uae.webp',
      alt: 'Dubai Marina waterfront skyline representing inbound UAE stays and concierge',
    },
    {
      id: 'short-break',
      label: 'Short Break',
      countryCode: 'AM',
      title: 'Armenia',
      subtitle: 'Yerevan · 4N / 5D',
      price: 'From AED 1,499',
      href: '/packages/armenia-yerevan-4-nights/',
      image: '/images/destinations/armenia.webp',
      alt: 'Yerevan Republic Square with Mount Ararat behind',
    },
    {
      id: 'beach',
      label: 'Beach',
      countryCode: 'MV',
      title: 'Maldives',
      subtitle: 'Overwater Villas',
      price: 'Tailored Escapes',
      href: '/destinations/maldives/',
      image: '/images/destinations/maldives.webp',
      alt: 'Turquoise Maldives lagoon and overwater resort villas',
    },
    {
      id: 'mountains',
      label: 'Alps',
      countryCode: 'EU',
      title: 'Europe',
      subtitle: 'Switzerland & Capitals',
      price: 'Custom Itineraries',
      href: '/destinations/europe/',
      image: '/images/destinations/europe.webp',
      alt: 'Snow-dusted Swiss Alps overlooking green valleys',
    },
    {
      id: 'national-day',
      label: '2 Dec',
      countryCode: 'GE',
      title: 'Georgia',
      subtitle: 'Tbilisi & Kazbegi · 4N',
      price: 'From AED 3,849',
      href: '/offers/national-day-georgia-4-nights/',
      image: '/images/destinations/georgia-azerbaijan.webp',
      alt: 'Tbilisi hillside architecture and Caucasus mountains in Georgia',
    },
  ];
  const [heroTab, setHeroTab] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const activeSpotlight = heroSpotlights[heroTab] ?? heroSpotlights[0];

  // Rotate the spotlight every few seconds; pauses on hover/focus and for reduced motion.
  useEffect(() => {
    if (heroPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setHeroTab((t) => (t + 1) % heroSpotlights.length), 5000);
    return () => window.clearTimeout(timer);
  }, [heroTab, heroPaused, heroSpotlights.length]);

  const heroReel = DESTINATIONS;

  return (
    <Layout currentPath="/">
    <div className="travel-home">
      {/* Rich Twilight Dubai Skyline Hero */}
      <section className="travel-hero-original relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/hero/palm-jumeirah-aerial.webp"
            alt="Aerial view of Palm Jumeirah, Atlantis The Palm and the Dubai Marina skyline"
            width={2000}
            height={1082}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1020]/80 via-[#0A1020]/40 to-[#0A1020]/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1020]/35 via-transparent to-[#0A1020]/45" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" />
          
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-14 sm:pt-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Editorial Title & Single Focused CTA */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-[34px] sm:text-5xl lg:text-[60px] font-medium tracking-[-0.025em] leading-[1.08] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
                Bespoke Travel, Curated in Dubai
              </h1>
              <p className="text-sm sm:text-lg text-white/90 font-medium drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
                Inbound UAE luxury stays, car rental &amp; outbound holidays across 70+ countries.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="/packages/"
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-full bg-white text-[#111318] hover:bg-[#FDEDED] font-semibold text-sm shadow-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>See packages</span>
                  <ArrowRight className="w-4 h-4 text-[#111318]" aria-hidden="true" />
                </a>
                <a
                  href="/inbound-uae-holidays/"
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white hover:bg-black/65 font-medium text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <CountryFlag code="AE" className="w-4 h-3 ring-white/40" />
                  <span>Inbound UAE</span>
                </a>
              </div>

              {/* Interactive Mood Switcher */}
              <div
                className="pt-2 hidden lg:flex items-center gap-2"
                role="group"
                aria-label="Preview featured vibe"
                onMouseEnter={() => setHeroPaused(true)}
                onMouseLeave={() => setHeroPaused(false)}
                onFocus={() => setHeroPaused(true)}
                onBlur={() => setHeroPaused(false)}
              >
                {heroSpotlights.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setHeroTab(idx)}
                    aria-pressed={heroTab === idx}
                    className={`relative overflow-hidden h-9 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      heroTab === idx
                        ? 'bg-[#C31A20] text-white shadow-md'
                        : 'bg-black/40 backdrop-blur-md border border-white/20 text-white/85 hover:bg-black/60'
                    }`}
                  >
                    {spot.label}
                    {heroTab === idx && (
                      <span
                        key={`progress-${heroTab}`}
                        aria-hidden="true"
                        className={`hero-pill-progress absolute left-0 bottom-0 h-[2px] bg-white/80 ${heroPaused ? 'is-paused' : ''}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Interactive Framed Spotlight Card */}
            <div
              className="hidden lg:flex lg:col-span-5 justify-end"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocus={() => setHeroPaused(true)}
              onBlur={() => setHeroPaused(false)}
            >
              <a
                href={activeSpotlight.href}
                className="group block w-full max-w-[300px] rounded-[24px] bg-white p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative rounded-[18px] overflow-hidden aspect-[4/4.2] bg-[#111318]">
                  {heroSpotlights.map((spot, idx) => (
                    <img
                      key={spot.id}
                      src={spot.image}
                      alt={idx === heroTab ? spot.alt : `${spot.title} preview`}
                      aria-hidden={idx === heroTab ? undefined : true}
                      width={1200}
                      height={896}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
                        idx === heroTab ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.06]'
                      } group-hover:scale-[1.04]`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-semibold text-[#FFFFFF]">
                    {activeSpotlight.price}
                  </span>
                </div>
                <div key={activeSpotlight.id} className="hero-spot-caption px-3 pt-3 pb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={activeSpotlight.countryCode} className="w-4 h-3" />
                      <p className="text-base font-semibold text-[#111318] truncate group-hover:text-[#C31A20] transition-colors">
                        {activeSpotlight.title}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7180] truncate">{activeSpotlight.subtitle}</p>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#111318] group-hover:bg-[#C31A20] text-white shrink-0 transition-colors">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile & Desktop Visual Swipeable Destination Reel */}
          <div className="mt-7 sm:mt-11">
            <div className="flex items-center justify-between gap-4 mb-3.5">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <h2 className="text-sm sm:text-base font-semibold text-white whitespace-nowrap shrink-0">
                  Where to next
                </h2>
              </div>
              <a
                href="/destinations/"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#FFFFFF] hover:text-white whitespace-nowrap shrink-0"
              >
                <span>All 16</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="dest-reel -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
              <div className="dest-reel-track flex w-max">
              {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-3.5 pr-3.5 pb-1" aria-hidden={copy === 1 || undefined}>
              {heroReel.map((dest, i) => (
                <a
                  key={`${copy}-${dest.slug}`}
                  href={dest.url}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group relative w-[165px] sm:w-[210px] lg:w-[240px] aspect-[3/4] lg:aspect-[4/3] rounded-[20px] overflow-hidden border border-white/25 shadow-[0_12px_28px_rgba(0,0,0,0.3)] shrink-0"
                >
                  <img
                    src={dest.image}
                    alt={dest.imageAlt}
                    width={dest.imageWidth}
                    height={dest.imageHeight}
                    loading={copy === 0 && i < 6 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CountryFlag code={dest.countryCode} className="w-4 h-[11px] ring-white/50" />
                        <p className="text-sm font-semibold text-white truncate">{dest.shortName}</p>
                      </div>
                      <p className="text-[11px] font-medium text-[#FFFFFF] tabular-nums truncate">
                        {dest.startingPriceAed
                          ? `From AED ${dest.startingPriceAed.toLocaleString('en-US')}`
                          : dest.slug === 'uae'
                          ? 'Inbound & Transfers'
                          : dest.filterRegion}
                      </p>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 group-hover:bg-[#C31A20] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
              </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docked Floating App Search & Region Filter Console */}
      <div className="relative z-20 -mt-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[22px] bg-white text-[#111318] p-3.5 sm:p-4 shadow-[0_18px_44px_rgba(27,23,24,0.08)] border border-[#ECEEF2]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3.5">
            <div className="lg:w-[360px] shrink-0">
              <label htmlFor="home-search" className="sr-only">
                Search destinations or packages
              </label>
              <div className="relative flex items-center bg-[#F6F7F9] rounded-full border border-[#E8EAEE] px-4 h-11 focus-within:bg-white focus-within:border-[#C31A20] transition-all">
                <Search className="w-4 h-4 text-[#7A808C] shrink-0 mr-2.5" aria-hidden="true" />
                <input
                  id="home-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, suites, or packages"
                  className="w-full bg-transparent text-sm text-[#111318] placeholder:text-[#7A808C] focus:outline-none py-1.5"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs font-semibold text-[#111318] px-2 py-1 rounded-full hover:bg-[#ECEEF2] shrink-0"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 flex-1"
              role="group"
              aria-label="Filter by region"
            >
              {REGIONS.map((region) => {
                const isSelected = activeRegion === region;
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    aria-pressed={isSelected}
                    className={`h-11 px-4 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#111318] text-white'
                        : 'bg-[#F6F7F9] text-[#4B5160] hover:bg-[#ECEEF2] hover:text-[#111318]'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Round Category Icons Row */}
      <section className="py-6 bg-white border-b border-[#ECEEF2]" aria-label="Travel service categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-1 md:grid md:grid-cols-9">
            {categoryIcons.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center gap-2 min-w-[68px] shrink-0 text-center focus-visible:outline-2 focus-visible:outline-[#C31A20] rounded-2xl py-1"
                >
                  <span className="w-12 h-12 rounded-full bg-[#F6F7F9] group-hover:bg-[#111318] text-[#111318] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-[#4B5160] group-hover:text-[#111318] whitespace-nowrap">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 sm:py-14 bg-white" aria-labelledby="destinations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="destinations-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              Destinations
            </h2>
            <a
              href="/destinations/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              View all 16 <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {visibleDestinationsCount === 0 && (
            <p className="text-sm text-[#5B6170] bg-[#F6F7F9] rounded-[18px] p-5 mb-4">
              No destinations matched &ldquo;{query}&rdquo; in {activeRegion}.
            </p>
          )}

          <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {DESTINATIONS.map((dest, idx) => {
              const visible = matchesFilter(
                dest.filterRegion,
                `${dest.name} ${dest.regionLabel} ${dest.filterRegion} ${dest.idealFor} ${dest.highlights.join(' ')}`.toLowerCase()
              );
              return (
                <div key={dest.slug} className={visible ? 'contents' : 'hidden'}>
                  <DestinationCard destination={dest} compact lazy={idx > 3} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Holiday Packages Grid */}
      <section className="py-14 bg-[#F6F7F9]" aria-labelledby="packages-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="packages-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              A little further from the everyday.
            </h2>
            <a
              href="/packages/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              All packages <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {visiblePackagesCount === 0 && (
            <p className="text-sm text-[#5B6170] bg-white rounded-[18px] p-5 mb-4">
              No packages matched &ldquo;{query}&rdquo; in {activeRegion}. Message our Business Bay desk for custom itineraries.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GENERAL_PACKAGES.map((pkg, idx) => {
              const visible = matchesFilter(
                pkg.region,
                `${pkg.name} ${pkg.destinationName} ${pkg.cities} ${pkg.region} ${pkg.idealFor}`.toLowerCase()
              );
              return (
                <div key={pkg.slug} className={visible ? '' : 'hidden'}>
                  <PackageCard pkg={pkg} lazy={idx > 3} />
                </div>
              );
            })}
          </div>

          {/* UAE National Day 2026 Departures */}
          <div className="mt-14 pt-12 border-t border-[#E5E7EB]">
            <div className="flex items-baseline justify-between gap-4 mb-7">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111318]">
                UAE National Day 2026 Escapes
              </h2>
              <a
                href="/offers/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
              >
                View offers <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {NATIONAL_DAY_OFFERS.map((pkg) => {
                const visible = matchesFilter(
                  pkg.region,
                  `${pkg.name} ${pkg.destinationName} ${pkg.cities} ${pkg.region} ${pkg.idealFor}`.toLowerCase()
                );
                return (
                  <div key={pkg.slug} className={visible ? '' : 'hidden'}>
                    <PackageCard pkg={pkg} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Hotels & Signature Stays Showcase */}
      <section className="py-14 bg-white border-b border-[#ECEEF2]" aria-labelledby="hotels-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="hotels-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              Hotels we book
            </h2>
            <a
              href="/services/hotel-bookings/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              Explore hotels <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeHotelShowcase.map((hotel) => (
              <a
                key={hotel.slug}
                href="/services/hotel-bookings/"
                className="group flex flex-col"
              >
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-[#F6F7F9]">
                  <img
                    src={hotel.image}
                    alt={hotel.imageAlt}
                    width={hotel.imageWidth}
                    height={hotel.imageHeight}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="pt-3.5 px-0.5">
                  <h3 className="text-base font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors line-clamp-1">
                    {hotel.brandGroup}
                  </h3>
                  <p className="text-xs text-[#6B7180] mt-0.5 truncate">{hotel.locationLabel}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai Experiences & Full-Service Travel Portfolio */}
      <section className="py-14 bg-[#F6F7F9]" aria-labelledby="services-spotlight-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="services-spotlight-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              Experiences in Dubai and the UAE
            </h2>
            <a
              href="/services/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              All 15 services <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map((service) => (
              <a
                key={service.slug}
                href={service.url}
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] bg-[#111318] shadow-[0_6px_22px_rgba(27,23,24,0.06)]"
              >
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug truncate">{service.name}</h3>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-[#C31A20] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Al Basel Group Car Rental Integration Strip */}
          <div className="mt-10 rounded-[22px] bg-white border border-[#ECEEF2] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C]">
                Al Basel Group Mobility Partner
              </p>
              <h3 className="text-xl font-semibold text-[#111318]">
                Travelling to Dubai and Need a Car?
              </h3>
              <p className="text-sm text-[#5B6170] leading-relaxed">
                Arrange self-drive sedans, 4x4 SUVs, luxury cars, or uniformed chauffeurs through our sister company Najd Rent a Car alongside your flights and hotel stay.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/dubai-car-rental-najd/"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#111318] hover:bg-[#C31A20] text-white text-sm font-semibold transition-colors"
              >
                <span>Dubai Car Rental Guide</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://najdrentacar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-[#D9DCE1] text-[#111318] hover:border-[#111318] text-sm font-semibold transition-colors"
              >
                <span>Visit najdrentacar.com</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Seasonal Calendar & Hospitality Heritage Band */}
      <section className="py-14 bg-white border-b border-[#ECEEF2]" aria-labelledby="seasonal-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-7">
              <h2 id="seasonal-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
                Where to Travel by Season
              </h2>
              <a
                href="/guides/best-time-to-visit-our-16-destinations/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
              >
                Seasonal guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SEASONAL_PLANNER.map((slot, idx) => {
                const image = SEASON_IMAGES[idx % SEASON_IMAGES.length];
                return (
                  <a
                    key={slot.season}
                    href={slot.href}
                    className="group flex flex-col rounded-[24px] bg-white overflow-hidden shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_rgba(16,24,40,0.06)] hover:shadow-[0_2px_4px_rgba(16,24,40,0.06),0_16px_40px_rgba(16,24,40,0.10)] transition-shadow"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#111318]">
                        {slot.season}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-lg font-semibold text-[#111318]">{slot.title}</h3>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {slot.destinations.slice(0, 3).map((d) => (
                          <li key={d} className="rounded-full bg-[#F6F7F9] px-2.5 py-1 text-xs text-[#4B5160]">
                            {d}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] group-hover:text-[#C31A20]">
                        Explore season <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Hospitality Heritage & Leadership Overview */}
          <div className="rounded-[24px] bg-[#F6F7F9] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C] mb-2">
                  Al Basel Group · Est. 2007
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#111318]">
                  Built on Dubai hospitality
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#5B6170] leading-relaxed max-w-xl">
                  Established in 2014 by Basel Al Kasem, former Business Development Manager at Burj Al Arab, delivering private leisure, corporate, and VIP travel from Business Bay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEADERSHIP.map((leader) => (
                  <div key={leader.name} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                    {LEADER_PHOTOS[leader.name] && (
                      <img
                        src={LEADER_PHOTOS[leader.name].src}
                        alt={LEADER_PHOTOS[leader.name].alt}
                        width={LEADER_PHOTOS[leader.name].width}
                        height={LEADER_PHOTOS[leader.name].height}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111318] truncate">{leader.name}</p>
                      <p className="text-xs text-[#6B7180] mt-0.5 truncate">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="/about/"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#111318] hover:bg-[#C31A20] text-white text-sm font-semibold transition-colors"
                >
                  About Tuwaiq
                </a>
                <a
                  href="/partnerships/"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-[#D9DCE1] text-[#111318] hover:border-[#111318] text-sm font-semibold transition-colors"
                >
                  Partnerships
                </a>
                <a
                  href={`tel:${COMPANY.contact.officeTel}`}
                  className="inline-flex items-center gap-1.5 h-11 px-4 text-[#111318] hover:text-[#C31A20] text-sm font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#111318]" aria-hidden="true" />
                  <span>{COMPANY.contact.officeDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src={GROUP_TEAM_PHOTO.src}
                alt={GROUP_TEAM_PHOTO.alt}
                width={GROUP_TEAM_PHOTO.width}
                height={GROUP_TEAM_PHOTO.height}
                loading="lazy"
                className="col-span-2 rounded-[18px] w-full h-44 sm:h-52 object-cover"
              />
              <a href="/partnerships/" className="group block rounded-[18px] bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <img
                  src={FOUR_SEASONS_LETTER.image.src}
                  alt={FOUR_SEASONS_LETTER.image.alt}
                  width={FOUR_SEASONS_LETTER.image.width}
                  height={FOUR_SEASONS_LETTER.image.height}
                  loading="lazy"
                  className="w-full h-28 object-cover object-top rounded-lg"
                />
                <p className="mt-2 text-xs font-semibold text-[#111318] group-hover:text-[#C31A20]">Four Seasons Washington DC, 2015</p>
                <p className="text-[11px] text-[#6B7180]">VIP delegation booking letter</p>
              </a>
              <a href="/press/" className="group block rounded-[18px] bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <img
                  src={PRESS_ITEMS[0].image.src}
                  alt={PRESS_ITEMS[0].image.alt}
                  width={PRESS_ITEMS[0].image.width}
                  height={PRESS_ITEMS[0].image.height}
                  loading="lazy"
                  className="w-full h-28 object-cover object-top rounded-lg"
                />
                <p className="mt-2 text-xs font-semibold text-[#111318] group-hover:text-[#C31A20]">Arabian Travel News, 2014</p>
                <p className="text-[11px] text-[#6B7180]">Cover story on our founder</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Styles & Editorial Link Directory */}
      <section className="py-14 bg-white" aria-labelledby="styles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="styles-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              Trips for every kind of traveller
            </h2>
            <a
              href="/packages/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              See all <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#ECEEF2] divide-y sm:divide-y-0 lg:divide-x divide-[#ECEEF2]">
            {TRAVEL_STYLES.map((style) => (
              <a
                key={style.slug}
                href={style.href}
                className="group pt-6 pb-4 lg:py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-4 hover:bg-[#FAF9F8] transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors">
                    {style.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5B6170] leading-relaxed">{style.summary}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111318] group-hover:text-[#C31A20]">
                  Explore options <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          {/* Clean Editorial 3-Column Directory */}
          <div className="mt-14 pt-10 border-t border-[#ECEEF2]">
            <h3 className="text-lg font-semibold text-[#111318] mb-5">Popular searches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
              {activeBuyers.map((buyer) => (
                <a
                  key={buyer.url}
                  href={buyer.url}
                  className="group flex items-center justify-between gap-3 py-3.5 border-b border-[#ECEEF2] text-sm font-medium text-[#111318] hover:text-[#C31A20] transition-colors"
                >
                  <span className="truncate">{buyer.h1}</span>
                  <ArrowRight className="w-4 h-4 text-[#B4B8BF] group-hover:text-[#C31A20] group-hover:translate-x-0.5 shrink-0 transition-all" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Concierge Booking Process */}
      <section className="py-14 bg-[#0E0F12] text-white" aria-labelledby="booking-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 id="booking-heading" className="text-2xl sm:text-3xl font-semibold">
              How booking works
            </h2>
            <a
              href="/how-booking-works/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFFFFF] hover:underline whitespace-nowrap shrink-0"
            >
              Booking guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/10 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            {BOOKING_STEPS.map((item) => (
              <div
                key={item.step}
                className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 space-y-2.5"
              >
                <p className="text-xs font-semibold tracking-widest text-[#FFFFFF] tabular-nums">
                  0{item.step}
                </p>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <WhatsAppEnquiryBuilder
              defaultSubject="Custom Holiday Package"
              contextLabel="What would you like to arrange?"
              defaultDirection="Both / Multi-Country"
              darkSurface
            />
          </div>

          <div className="mt-6 flex items-center justify-between flex-wrap gap-3 text-xs text-white/65">
            <p>Or visit our travel consultants in person at Business Bay, Dubai.</p>
            <a
              href="/contact/"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFFFFF] font-medium transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Fifty One Tower, Office 301</span>
            </a>
          </div>
        </div>
      </section>

      {/* Travel Guides */}
      <section className="py-14 bg-white" aria-labelledby="guides-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="guides-heading" className="text-2xl sm:text-3xl font-semibold text-[#111318]">
              Travel and visa guides
            </h2>
            <a
              href="/guides/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0"
            >
              All {GUIDES.length} guides <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GUIDES.slice(0, 3).map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
}
