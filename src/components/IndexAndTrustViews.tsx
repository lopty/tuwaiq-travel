import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Layout } from './Layout';
import { Breadcrumbs, DestinationCard, GuideCard, PackageCard, ServiceCard } from './Cards';
import { WhatsAppEnquiryBuilder } from './WhatsAppEnquiryBuilder';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  BOOKING_STEPS,
  COMPANY,
  FEATURE_FLAGS,
  LEADERSHIP,
  PARTNERSHIPS,
  UNCONFIRMED_STATS_HOLDER,
  whatsAppUrl,
} from '../data/siteConfig';
import { GENERAL_PACKAGES, NATIONAL_DAY_OFFERS, UMRAH_PACKAGES } from '../data/packages';
import { DESTINATIONS } from '../data/destinations';
import { SERVICES } from '../data/services';
import { GUIDES } from '../data/guides';
import { TRUST_PAGES, getActiveBuyerPages, type TrustSlug } from '../data/routes';
import type { BreadcrumbItem } from '../lib/seo';

export function PackagesIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <Layout currentPath="/packages/">
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/turkiye.webp"
            alt="Hot air balloons drifting above fairy chimneys in Cappadocia"
            width={1043}
            height={1281}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Curated Holiday Collections
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#E2CC96]">
            Flights, Five-Star Suites &amp; Private Transfers
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[#1B1718] mb-6">Year-Round Getaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GENERAL_PACKAGES.map((pkg, idx) => (
            <PackageCard key={pkg.slug} pkg={pkg} lazy={idx > 3} />
          ))}
        </div>
      </section>

      <section className="py-12 bg-[#F8F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-[#1B1718]">UAE National Day 2026</h2>
            <a href="/offers/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline whitespace-nowrap shrink-0">
              View offers <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NATIONAL_DAY_OFFERS.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {FEATURE_FLAGS.enableUmrahPages && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#1B1718] mb-6">Umrah Packages (3 Nights Makkah)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {UMRAH_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </section>
      )}

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[22px] bg-[#141011] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-4 border-[#C31A20]">
          <div>
            <h2 className="text-xl font-semibold">Looking for Maldives, Europe, Japan, or custom trips?</h2>
            <p className="text-sm text-white/75 mt-1">
              Ask our Business Bay travel consultants for a tailored proposal across 70+ countries.
            </p>
          </div>
          <a
            href={whatsAppUrl('Tailored Holiday Package')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white font-semibold text-sm whitespace-nowrap shrink-0 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}

export function OffersIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <Layout currentPath="/offers/">
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/hero/dubai-skyline-twilight.webp"
            alt="Dubai Business Bay and Burj Khalifa twilight skyline"
            width={1800}
            height={1012}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            UAE National Day 2026 Escapes
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#E2CC96]">
            {FEATURE_FLAGS.nationalDayDeparted ? 'Seasonal Archive' : 'Guided Departures · 2 December 2026'}
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NATIONAL_DAY_OFFERS.map((pkg, idx) => (
            <PackageCard key={pkg.slug} pkg={pkg} lazy={idx > 3} />
          ))}
        </div>

        <div className="mt-12 rounded-[22px] bg-[#F8F6F5] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#EFEAE8]">
          <div>
            <h2 className="text-xl font-semibold text-[#1B1718]">Prefer flexible travel dates?</h2>
            <p className="text-sm text-[#574F52] mt-1">
              Browse year-round packages starting from AED 1,499 per person.
            </p>
          </div>
          <a
            href="/packages/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#1B1718] hover:bg-[#C31A20] text-white font-semibold text-sm whitespace-nowrap shrink-0 transition-colors"
          >
            <span>Browse all packages</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </Layout>
  );
}

export function DestinationsIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  const [region, setRegion] = useState<string>('All');
  const regions = ['All', 'GCC', 'Asia', 'Europe', 'Africa', 'Indian Ocean', 'Americas'];

  return (
    <Layout currentPath="/destinations/">
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/europe.webp"
            alt="Snow-dusted Swiss Alps towering over green meadows and alpine lake"
            width={1043}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            16 Destinations
          </h1>
          <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="group" aria-label="Filter destinations by region">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`h-10 px-4 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  region === r
                    ? 'bg-[#C31A20] text-white shadow-sm'
                    : 'bg-black/45 backdrop-blur-md text-white/95 border border-white/25 hover:bg-black/70'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.map((dest, idx) => {
            const visible = region === 'All' || dest.filterRegion === region;
            return (
              <div key={dest.slug} className={visible ? '' : 'hidden'}>
                <DestinationCard destination={dest} lazy={idx > 3} />
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export function ServicesIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <Layout currentPath="/services/">
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/services/yacht-charters.webp"
            alt="Private luxury motor yacht docked in Dubai Marina at sunset"
            width={1440}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Private Travel &amp; Concierge Services
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#E2CC96]">
            First-Class Ticketing, Suites, Visas &amp; Yachts
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} lazy={idx > 5} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function GuidesIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <Layout currentPath="/guides/">
      <section className="relative bg-[#130D0E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/japan.webp"
            alt="Snow-capped Mount Fuji bathed in warm sunrise light in Japan"
            width={1043}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Dubai Travel Guides
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#E2CC96]">
            Visas, Seasons &amp; Checklists
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide, idx) => (
            <GuideCard key={guide.slug} guide={guide} lazy={idx > 5} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function TrustPageView({
  slug,
  breadcrumbs,
}: {
  slug: TrustSlug;
  breadcrumbs: BreadcrumbItem[];
}) {
  const info = TRUST_PAGES[slug];
  const trustLinks = Object.entries(TRUST_PAGES) as [TrustSlug, typeof TRUST_PAGES[TrustSlug]][];
  const buyerPages = getActiveBuyerPages();

  return (
    <Layout currentPath={info.url}>
      <section className="bg-[#F8F6F5] py-12 border-b border-[#EFEAE8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-[#1B1718]">
            {info.h1}
          </h1>
          <p className="mt-2 text-base text-[#574F52] max-w-2xl">{info.description}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {slug === 'about' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <h2 className="text-2xl font-semibold text-[#1B1718]">
                  Dubai Travel House Built on Hospitality
                </h2>
                <p className="text-base text-[#352F31] leading-relaxed">
                  Tuwaiq Travel &amp; Tourism LLC was founded in 2014 in Dubai by Basel Al Kasem, former Business Development Manager at Burj Al Arab. Operating within Al Basel Group (established in 2007), the agency connects GCC residents, international visitors, and corporate delegations with coordinated flights, hotels, holiday packages across 70+ countries, visas, and VIP concierge services.
                </p>
                <p className="text-base text-[#352F31] leading-relaxed">
                  From Fifty One Tower in Business Bay, our consultants handle both ready-made regional getaways and bespoke long-haul planning directly on WhatsApp and telephone rather than automated call centres.
                </p>
              </div>
              <div className="md:col-span-5">
                <img
                  src="/images/hero/luxury-hotel-lobby.webp"
                  alt="Luxury hotel chandelier lobby representing Tuwaiq Travel hospitality roots"
                  width={781}
                  height={1280}
                  className="rounded-[22px] w-full aspect-[4/5] object-cover shadow-md"
                />
              </div>
            </div>

            {FEATURE_FLAGS.enableUnconfirmedStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {UNCONFIRMED_STATS_HOLDER.map((s) => (
                  <div key={s.label} className="rounded-[18px] bg-[#141011] text-white p-5">
                    <p className="text-2xl font-semibold text-[#E2CC96] tabular-nums">{s.value}</p>
                    <p className="text-xs text-white/80 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-8 border-t border-[#EFEAE8]">
              <h2 className="text-lg font-semibold text-[#1B1718] mb-4">Popular Trips &amp; Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {buyerPages.slice(0, 8).map((b) => (
                  <a
                    key={b.url}
                    href={b.url}
                    className="group flex items-center justify-between py-3 border-b border-[#EFEAE8] text-sm font-medium text-[#1B1718] hover:text-[#C31A20]"
                  >
                    <span>{b.h1}</span>
                    <ArrowRight className="w-4 h-4 text-[#B8B0AD] group-hover:text-[#C31A20]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {slug === 'founder' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <h2 className="text-2xl font-semibold text-[#1B1718]">Basel Al Kasem</h2>
              <p className="text-sm font-semibold text-[#8C6822]">
                Founder, Tuwaiq Travel &amp; Tourism LLC · Founder, Al Basel Group (est. 2007)
              </p>
              <p className="text-base text-[#352F31] leading-relaxed">
                Before launching Al Basel Group in 2007 and establishing Tuwaiq Travel &amp; Tourism LLC in 2014, Basel Al Kasem served as Business Development Manager at Burj Al Arab, grounding the agency in five-star UAE hospitality standards.
              </p>
              <ul className="space-y-3 pt-2">
                {LEADERSHIP[0].highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-[#352F31]">
                    <Check className="w-4 h-4 text-[#C31A20] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <img
                src="/images/hero/burj-al-arab-aerial.webp"
                alt="Aerial coastline view of Burj Al Arab in Dubai"
                width={1800}
                height={1008}
                className="rounded-[22px] w-full aspect-[4/3] object-cover shadow-md"
              />
            </div>
          </div>
        )}

        {slug === 'leadership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#EFEAE8] pt-2">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="py-6 border-b border-[#EFEAE8] space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822]">{leader.role}</p>
                  <h2 className="text-xl font-semibold text-[#1B1718] mt-0.5">{leader.name}</h2>
                </div>
                <p className="text-sm text-[#4A4245] leading-relaxed">{leader.bio}</p>
                <ul className="space-y-2 pt-1">
                  {leader.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#574F52]">
                      <Check className="w-3.5 h-3.5 text-[#C31A20] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {slug === 'al-basel-group' && (
          <div className="space-y-6">
            <p className="text-base text-[#352F31] leading-relaxed">
              Founded in 2007 by Basel Al Kasem, Al Basel Group operates across travel, mobility, consultancy, real estate, investments, and executive talent acquisition in the UAE and wider region.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#EFEAE8]">
              {COMPANY.sisterCompanies.map((co) => (
                <div key={co.name} className="py-6 border-b border-[#EFEAE8] flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822]">Al Basel Group</p>
                    <h2 className="text-lg font-semibold text-[#1B1718] mt-1">{co.name}</h2>
                    <p className="mt-1.5 text-sm text-[#4A4245]">{co.role}</p>
                  </div>
                  {co.externalUrl && (
                    <a
                      href={co.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C31A20] hover:underline"
                    >
                      <span>Visit najdrentacar.com</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {slug === 'partnerships' && (
          <div className="space-y-6">
            <p className="text-base text-[#352F31] leading-relaxed">
              Across Tuwaiq Travel &amp; Tourism LLC and Al Basel Group, long-standing hospitality relationships support VIP suites, regional advisory, and discerning GCC travellers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#EFEAE8]">
              {PARTNERSHIPS.map((item) => (
                <div key={item.name} className="py-6 border-b border-[#EFEAE8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6822] mb-1">{item.entity}</p>
                  <h2 className="text-lg font-semibold text-[#1B1718]">{item.name}</h2>
                  <p className="mt-2 text-sm text-[#4A4245] leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>

            {FEATURE_FLAGS.enableClientLogoWall && (
              <div className="pt-4">
                <h2 className="text-lg font-semibold text-[#1B1718] mb-2">Hospitality &amp; Brand Highlights</h2>
                <p className="text-sm text-[#574F52]">Mandarin Oriental · One&amp;Only · Chopard · Stantec</p>
              </div>
            )}
          </div>
        )}

        {slug === 'press' && (
          <div className="space-y-6">
            <p className="text-base text-[#352F31] leading-relaxed">
              Verified regional coverage documenting the launch of Tuwaiq Travel &amp; Tourism LLC and the hospitality track record of Al Basel Group.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#EFEAE8]">
              <div className="py-6 border-b border-[#EFEAE8]">
                <p className="text-xs font-semibold text-[#8C6822]">September 2014 · Arabian Travel News (Vol. 09, Issue 09)</p>
                <h2 className="mt-1 text-lg font-semibold text-[#1B1718]">Natural Progression</h2>
                <p className="mt-2 text-sm text-[#4A4245]">
                  Cover story highlighting Basel Al Kasem taking Al Basel Consultancy Group into its next stage with the launch of Tuwaiq Travel &amp; Tourism LLC in Dubai.
                </p>
              </div>
              <div className="py-6 border-b border-[#EFEAE8]">
                <p className="text-xs font-semibold text-[#8C6822]">June 9, 2014 · Agency Launch Coverage</p>
                <h2 className="mt-1 text-lg font-semibold text-[#1B1718]">Al Basel Group Opens New Travel Agency</h2>
                <p className="mt-2 text-sm text-[#4A4245]">
                  Announcement detailing Tuwaiq Travel&apos;s focus on consultancy, booking, and tailored leisure and VIP travel for local and international tourists in Dubai.
                </p>
              </div>
              <div className="py-6 border-b border-[#EFEAE8]">
                <p className="text-xs font-semibold text-[#8C6822]">April 7, 2009 · Hospitality Press</p>
                <h2 className="mt-1 text-lg font-semibold text-[#1B1718]">Al Basel Ties Up With The Address</h2>
                <p className="mt-2 text-sm text-[#4A4245]">
                  Joint GCC sales campaign reported between Al Basel Consulting and The Address Hotels + Resorts across Saudi Arabia, Kuwait, and Qatar.
                </p>
              </div>
              <div className="py-6 border-b border-[#EFEAE8]">
                <p className="text-xs font-semibold text-[#8C6822]">March 24, 2008 · Gulf Today</p>
                <h2 className="mt-1 text-lg font-semibold text-[#1B1718]">Al Basel, Raffles in Consultancy Deal</h2>
                <p className="mt-2 text-sm text-[#4A4245]">
                  Earlier group milestone reporting Al Basel Consultancy&apos;s regional hospitality partnership with Raffles Dubai.
                </p>
              </div>
            </div>
          </div>
        )}

        {slug === 'licence' && (
          <div className="rounded-[22px] bg-[#F8F6F5] p-6 sm:p-8 border border-[#EFEAE8] space-y-6">
            <div className="flex items-center gap-2.5 text-[#C31A20]">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[#1B1718]">Official Company Verification</h2>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-[#E6DFDC]">
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Legal Entity</dt>
                <dd className="font-semibold text-sm text-[#1B1718] mt-1">{COMPANY.legalName}</dd>
              </div>
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Established</dt>
                <dd className="font-semibold text-sm text-[#1B1718] mt-1">{COMPANY.foundedYear} (Al Basel Group est. 2007)</dd>
              </div>
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Dubai Office Address</dt>
                <dd className="font-semibold text-sm text-[#1B1718] mt-1">{COMPANY.address.full}</dd>
              </div>
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Official Phone &amp; WhatsApp</dt>
                <dd className="font-semibold text-sm text-[#1B1718] mt-1">
                  Office: {COMPANY.contact.officeDisplay} · WhatsApp: {COMPANY.contact.whatsappDisplay}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Official Email Domains</dt>
                <dd className="font-semibold text-sm text-[#1B1718] mt-1">
                  {COMPANY.contact.bookingsEmail} · {COMPANY.contact.generalEmail}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E6DFDC]">
                <dt className="text-xs text-[#6B6266]">Trade Licence Number &amp; Authority</dt>
                <dd className="font-semibold text-sm text-[#574F52] mt-1">
                  {COMPANY.verification.licenceNumber} ({COMPANY.verification.issuingAuthority})
                </dd>
              </div>
            </dl>
          </div>
        )}

        {slug === 'how-booking-works' && (
          <div className="space-y-8">
            <p className="text-base text-[#352F31] leading-relaxed">
              Every itinerary is verified live with airlines, hotels, and transfer teams before you confirm.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#EFEAE8] divide-y sm:divide-y-0 lg:divide-x divide-[#EFEAE8]">
              {BOOKING_STEPS.map((step) => (
                <div key={step.step} className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                  <p className="text-xs font-semibold tracking-widest text-[#C31A20] mb-2 tabular-nums">
                    0{step.step}
                  </p>
                  <h2 className="text-lg font-semibold text-[#1B1718]">{step.title}</h2>
                  <p className="mt-2 text-sm text-[#574F52] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slug === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-[22px] bg-[#F8F6F5] p-6 sm:p-8 border border-[#EFEAE8] space-y-5">
              <h2 className="text-xl font-semibold text-[#1B1718]">Direct Reservations &amp; Office</h2>
              <div className="space-y-3.5 text-sm text-[#352F31]">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C31A20] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY.address.full}</span>
                </p>
                <p className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-[#118444] shrink-0" />
                  <a href={whatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-[#118444]">
                    WhatsApp: {COMPANY.contact.whatsappDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C31A20] shrink-0" aria-hidden="true" />
                  <a href={`tel:${COMPANY.contact.officeTel}`} className="font-semibold hover:underline">
                    Office: {COMPANY.contact.officeDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C31A20] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY.contact.bookingsEmail}`} className="font-semibold hover:underline">
                    Bookings: {COMPANY.contact.bookingsEmail}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C31A20] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY.contact.generalEmail}`} className="font-semibold hover:underline">
                    General: {COMPANY.contact.generalEmail}
                  </a>
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-[#D8D0CC] text-[#1B1718] hover:border-[#1B1718] text-sm font-semibold transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="rounded-[22px] overflow-hidden border border-[#EFEAE8] bg-white">
              <img
                src="/images/hero/dubai-highways-night.webp"
                alt="Business Bay and Sheikh Zayed Road in Dubai"
                width={1800}
                height={1012}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-2">
                <h2 className="text-lg font-semibold text-[#1B1718]">Fifty One Tower, Business Bay</h2>
                <p className="text-sm text-[#574F52]">
                  Office 301 on Marasi Drive, Business Bay, Dubai. Corporate account enquiries reach Ahmed Mohsen directly on +971 55 915 8517.
                </p>
                <p className="text-xs text-[#766D71]">
                  Office hours: {COMPANY.verification.openingHours}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <WhatsAppEnquiryBuilder
                defaultSubject="Custom Holiday Package"
                contextLabel="Select Service or Package"
                defaultDirection="Both / Multi-Country"
              />
            </div>
          </div>
        )}

        {/* Shared Company Trust Cross-Navigation */}
        <section className="pt-8 border-t border-[#EFEAE8]">
          <h2 className="text-base font-semibold text-[#1B1718] mb-4">Company Directory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
            {trustLinks.map(([s, item]) => (
              <a
                key={s}
                href={item.url}
                className={`py-1.5 transition-colors ${
                  s === slug
                    ? 'text-[#C31A20] font-semibold'
                    : 'text-[#4A4245] hover:text-[#1B1718]'
                }`}
              >
                {item.breadcrumbLabel}
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
