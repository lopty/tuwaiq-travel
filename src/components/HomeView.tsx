import { useState } from 'react';
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
import {
  BOOKING_STEPS,
  COMPANY,
  FEATURE_FLAGS,
  HOTEL_SHOWCASE,
  LEADERSHIP,
  SEASONAL_PLANNER,
  TRAVEL_STYLES,
} from '../data/siteConfig';
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
  const activeSpotlight = heroSpotlights[heroTab] ?? heroSpotlights[0];

  const heroPopularDestinations = ['uae', 'turkiye', 'maldives', 'europe', 'japan']
    .map((slug) => DESTINATIONS.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <Layout currentPath="/">
      {/* Rich Twilight Dubai Skyline Hero */}
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/hero/dubai-highways-night.webp"
            alt="Dubai Business Bay and Burj Khalifa illuminated beneath pink twilight clouds"
            width={1800}
            height={1012}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[#130D0E]/95" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#12080A]/65 via-transparent to-transparent" />
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
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-full bg-white text-[#1B1718] hover:bg-[#FDF2F2] font-semibold text-sm shadow-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Journeys</span>
                  <ArrowRight className="w-4 h-4 text-[#C31A20]" aria-hidden="true" />
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
              <div className="pt-2 hidden lg:flex items-center gap-2" role="group" aria-label="Preview featured vibe">
                {heroSpotlights.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setHeroTab(idx)}
                    aria-pressed={heroTab === idx}
                    className={`h-9 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      heroTab === idx
                        ? 'bg-[#C31A20] text-white shadow-md'
                        : 'bg-black/40 backdrop-blur-md border border-white/20 text-white/85 hover:bg-black/60'
                    }`}
                  >
                    {spot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Interactive Framed Spotlight Card */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <a
                href={activeSpotlight.href}
                className="group block w-full max-w-[300px] rounded-[24px] bg-white p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative rounded-[18px] overflow-hidden aspect-[4/4.2] bg-[#1B1718]">
                  <img
                    src={activeSpotlight.image}
                    alt={activeSpotlight.alt}
                    width={1200}
                    height={896}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-semibold text-[#E2CC96]">
                    {activeSpotlight.price}
                  </span>
                </div>
                <div className="px-3 pt-3 pb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={activeSpotlight.countryCode} className="w-4 h-3" />
                      <p className="text-base font-semibold text-[#1B1718] truncate group-hover:text-[#C31A20] transition-colors">
                        {activeSpotlight.title}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B6266] truncate">{activeSpotlight.subtitle}</p>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1B1718] group-hover:bg-[#C31A20] text-white shrink-0 transition-colors">
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
                  Signature Escapes
                </h2>
              </div>
              <a
                href="/destinations/"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#E2CC96] hover:text-white whitespace-nowrap shrink-0"
              >
                <span>All 16</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5">
              {heroPopularDestinations.map((dest) => (
                <a
                  key={dest.slug}
                  href={dest.url}
                  className="group relative w-[165px] sm:w-[210px] lg:w-auto aspect-[3/4] lg:aspect-[4/3] rounded-[20px] overflow-hidden border border-white/25 shadow-[0_12px_28px_rgba(0,0,0,0.3)] shrink-0 snap-start"
                >
                  <img
                    src={dest.image}
                    alt={dest.imageAlt}
                    width={dest.imageWidth}
                    height={dest.imageHeight}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CountryFlag code={dest.countryCode} className="w-4 h-[11px] ring-white/50" />
                        <p className="text-sm font-semibold text-white truncate">{dest.shortName}</p>
                      </div>
                      <p className="text-[11px] font-medium text-[#E2CC96] tabular-nums truncate">
                        {dest.startingPriceAed
                          ? `AED ${dest.startingPriceAed.toLocaleString('en-US')}`
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
          </div>
        </div>
      </section>

      {/* Docked Floating App Search & Region Filter Console */}
      <div className="relative z-20 -mt-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[22px] bg-white text-[#1B1718] p-3.5 sm:p-4 shadow-[0_18px_44px_rgba(27,23,24,0.08)] border border-[#EFEAE8]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3.5">
            <div className="lg:w-[360px] shrink-0">
              <label htmlFor="home-search" className="sr-only">
                Search destinations or packages
              </label>
              <div className="relative flex items-center bg-[#F8F6F5] rounded-full border border-[#EAE3DF] px-4 h-11 focus-within:bg-white focus-within:border-[#C31A20] transition-all">
                <Search className="w-4 h-4 text-[#766D71] shrink-0 mr-2.5" aria-hidden="true" />
                <input
                  id="home-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, suites, or packages"
                  className="w-full bg-transparent text-sm text-[#1B1718] placeholder:text-[#766D71] focus:outline-none py-1.5"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs font-semibold text-[#C31A20] px-2 py-1 rounded-full hover:bg-[#EFEAE8] shrink-0"
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
                        ? 'bg-[#1B1718] text-white'
                        : 'bg-[#F8F6F5] text-[#4A4245] hover:bg-[#EFEAE8] hover:text-[#1B1718]'
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
      <section className="py-6 bg-white border-b border-[#EFEAE8]" aria-label="Travel service categories">
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
                  <span className="w-12 h-12 rounded-full bg-[#F8F6F5] group-hover:bg-[#1B1718] text-[#1B1718] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-[#4A4245] group-hover:text-[#1B1718] whitespace-nowrap">
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
            <h2 id="destinations-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              Signature Destinations
            </h2>
            <a
              href="/destinations/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
            >
              View all 16 <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {visibleDestinationsCount === 0 && (
            <p className="text-sm text-[#574F52] bg-[#F8F6F5] rounded-[18px] p-5 mb-4">
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
      <section className="py-14 bg-[#F8F6F5]" aria-labelledby="packages-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="packages-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              Curated Holidays From Dubai
            </h2>
            <a
              href="/packages/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
            >
              All packages <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {visiblePackagesCount === 0 && (
            <p className="text-sm text-[#574F52] bg-white rounded-[18px] p-5 mb-4">
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
          <div className="mt-14 pt-12 border-t border-[#E6DFDC]">
            <div className="flex items-baseline justify-between gap-4 mb-7">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
                UAE National Day 2026 Escapes
              </h2>
              <a
                href="/offers/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
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
      <section className="py-14 bg-white border-b border-[#EFEAE8]" aria-labelledby="hotels-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="hotels-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              World-Class Hotels &amp; Suites
            </h2>
            <a
              href="/services/hotel-bookings/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
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
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-[#F8F6F5]">
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
                  <h3 className="text-base font-semibold text-[#1B1718] group-hover:text-[#C31A20] transition-colors line-clamp-1">
                    {hotel.brandGroup}
                  </h3>
                  <p className="text-xs text-[#6B6266] mt-0.5 truncate">{hotel.locationLabel}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai Experiences & Full-Service Travel Portfolio */}
      <section className="py-14 bg-[#F8F6F5]" aria-labelledby="services-spotlight-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="services-spotlight-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              Private Concierge &amp; Dubai Experiences
            </h2>
            <a
              href="/services/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
            >
              All 15 services <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map((service) => (
              <a
                key={service.slug}
                href={service.url}
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] bg-[#1B1718] shadow-[0_6px_22px_rgba(27,23,24,0.06)]"
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
          <div className="mt-10 rounded-[22px] bg-white border border-[#EFEAE8] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822]">
                Al Basel Group Mobility Partner
              </p>
              <h3 className="text-xl font-semibold text-[#1B1718]">
                Travelling to Dubai and Need a Car?
              </h3>
              <p className="text-sm text-[#574F52] leading-relaxed">
                Arrange self-drive sedans, 4x4 SUVs, luxury cars, or uniformed chauffeurs through our sister company Najd Rent a Car alongside your flights and hotel stay.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/dubai-car-rental-najd/"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#1B1718] hover:bg-[#C31A20] text-white text-sm font-semibold transition-colors"
              >
                <span>Dubai Car Rental Guide</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://najdrentacar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-[#D8D0CC] text-[#1B1718] hover:border-[#1B1718] text-sm font-semibold transition-colors"
              >
                <span>Visit najdrentacar.com</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Calendar & Hospitality Heritage Band */}
      <section className="py-14 bg-white border-b border-[#EFEAE8]" aria-labelledby="seasonal-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-7">
              <h2 id="seasonal-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
                Where to Travel by Season
              </h2>
              <a
                href="/guides/best-time-to-visit-our-16-destinations/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
              >
                Seasonal guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#EFEAE8] divide-y sm:divide-y-0 lg:divide-x divide-[#EFEAE8]">
              {SEASONAL_PLANNER.map((slot) => (
                <a
                  key={slot.season}
                  href={slot.href}
                  className="group pt-6 pb-4 lg:py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-4 hover:bg-[#FAF9F8] transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822]">
                      {slot.season}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold text-[#1B1718] group-hover:text-[#C31A20] transition-colors">
                      {slot.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#574F52] leading-relaxed">
                      {slot.destinations.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B1718] group-hover:text-[#C31A20]">
                    Explore season <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Hospitality Heritage & Leadership Overview */}
          <div className="rounded-[24px] bg-[#F8F6F5] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822] mb-2">
                  Al Basel Group · Est. 2007
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
                  Founded in Five-Star Dubai Hospitality
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#574F52] leading-relaxed max-w-xl">
                  Established in 2014 by Basel Al Kasem, former Business Development Manager at Burj Al Arab, delivering private leisure, corporate, and VIP travel from Business Bay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border-y border-[#E6DFDC] divide-y sm:divide-y-0">
                {LEADERSHIP.map((leader, idx) => (
                  <div
                    key={leader.name}
                    className={`py-3.5 ${idx % 2 === 0 ? 'sm:pr-6' : 'sm:pl-6'} ${
                      idx < 2 ? 'sm:border-b sm:border-[#E6DFDC]' : ''
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#1B1718]">{leader.name}</p>
                    <p className="text-xs text-[#6B6266] mt-0.5">{leader.role}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="/about/"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1B1718] hover:bg-[#C31A20] text-white text-sm font-semibold transition-colors"
                >
                  About Tuwaiq
                </a>
                <a
                  href="/partnerships/"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-[#D8D0CC] text-[#1B1718] hover:border-[#1B1718] text-sm font-semibold transition-colors"
                >
                  Partnerships
                </a>
                <a
                  href={`tel:${COMPANY.contact.officeTel}`}
                  className="inline-flex items-center gap-1.5 h-11 px-4 text-[#1B1718] hover:text-[#C31A20] text-sm font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C31A20]" aria-hidden="true" />
                  <span>{COMPANY.contact.officeDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="/images/hero/luxury-hotel-lobby.webp"
                alt="Grand marble hotel lobby chandelier representing Dubai hospitality concierge"
                width={781}
                height={1280}
                loading="lazy"
                className="rounded-[18px] w-full h-56 sm:h-64 object-cover"
              />
              <img
                src="/images/hero/dubai-highways-night.webp"
                alt="Dubai evening skyline and Business Bay expressway"
                width={1800}
                height={1012}
                loading="lazy"
                className="rounded-[18px] w-full h-56 sm:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Styles & Editorial Link Directory */}
      <section className="py-14 bg-white" aria-labelledby="styles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <h2 id="styles-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              Crafted Around Your Travel Style
            </h2>
            <a
              href="/packages/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
            >
              Compare collections <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#EFEAE8] divide-y sm:divide-y-0 lg:divide-x divide-[#EFEAE8]">
            {TRAVEL_STYLES.map((style) => (
              <a
                key={style.slug}
                href={style.href}
                className="group pt-6 pb-4 lg:py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-4 hover:bg-[#FAF9F8] transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1718] group-hover:text-[#C31A20] transition-colors">
                    {style.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#574F52] leading-relaxed">{style.summary}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B1718] group-hover:text-[#C31A20]">
                  Explore options <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          {/* Clean Editorial 3-Column Directory */}
          <div className="mt-14 pt-10 border-t border-[#EFEAE8]">
            <h3 className="text-lg font-semibold text-[#1B1718] mb-5">Popular Collections &amp; Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
              {activeBuyers.map((buyer) => (
                <a
                  key={buyer.url}
                  href={buyer.url}
                  className="group flex items-center justify-between gap-3 py-3.5 border-b border-[#EFEAE8] text-sm font-medium text-[#1B1718] hover:text-[#C31A20] transition-colors"
                >
                  <span className="truncate">{buyer.h1}</span>
                  <ArrowRight className="w-4 h-4 text-[#B8B0AD] group-hover:text-[#C31A20] group-hover:translate-x-0.5 shrink-0 transition-all" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Concierge Booking Process */}
      <section className="py-14 bg-[#141011] text-white border-t-4 border-[#C31A20]" aria-labelledby="booking-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 id="booking-heading" className="text-2xl sm:text-3xl font-semibold">
              The Private Concierge Process
            </h2>
            <a
              href="/how-booking-works/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E2CC96] hover:underline whitespace-nowrap shrink-0"
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
                <p className="text-xs font-semibold tracking-widest text-[#E2CC96] tabular-nums">
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
              className="inline-flex items-center gap-1.5 text-white hover:text-[#E2CC96] font-medium transition-colors"
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
            <h2 id="guides-heading" className="text-2xl sm:text-3xl font-semibold text-[#1B1718]">
              Insider Travel &amp; Visa Guides
            </h2>
            <a
              href="/guides/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0"
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
    </Layout>
  );
}
