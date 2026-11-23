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
import { LogoMarquee } from './LogoMarquee';
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
import {
  EVENT_PHOTOS,
  FOUR_SEASONS_LETTER,
  GROUP_TEAM_PHOTO,
  LEADER_PHOTOS,
  OFFICE_ARCHIVE,
  PHOTO_CREDITS,
  PRESS_ITEMS,
  PARTNER_LOGOS,
  RECENT_EVENTS,
  RECENT_MEETINGS,
  ROYAL_COLLABORATION,
} from '../data/trustMedia';

export function PackagesIndexView({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <Layout currentPath="/packages/">
      <section className="relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/turkiye.webp"
            alt="Hot air balloons drifting above fairy chimneys in Cappadocia"
            width={1043}
            height={1281}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/85 via-[#0A1020]/25 to-[#0A1020]/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Holiday packages
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#FFFFFF]">
            Flights, Five-Star Suites &amp; Private Transfers
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[#111318] mb-6">Year-Round Getaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GENERAL_PACKAGES.map((pkg, idx) => (
            <PackageCard key={pkg.slug} pkg={pkg} lazy={idx > 3} />
          ))}
        </div>
      </section>

      <section className="py-12 bg-[#F6F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-[#111318]">UAE National Day 2026</h2>
            <a href="/offers/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline whitespace-nowrap shrink-0">
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
          <h2 className="text-2xl font-semibold text-[#111318] mb-6">Umrah Packages (3 Nights Makkah)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {UMRAH_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </section>
      )}

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[22px] bg-[#0E0F12] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
      <section className="relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/hero/dubai-skyline-twilight.webp"
            alt="Dubai Business Bay and Burj Khalifa twilight skyline"
            width={1800}
            height={1012}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/85 via-[#0A1020]/25 to-[#0A1020]/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            UAE National Day 2026 Escapes
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#FFFFFF]">
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

        <div className="mt-12 rounded-[22px] bg-[#F6F7F9] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#ECEEF2]">
          <div>
            <h2 className="text-xl font-semibold text-[#111318]">Prefer flexible travel dates?</h2>
            <p className="text-sm text-[#5B6170] mt-1">
              Browse year-round packages starting from AED 1,499 per person.
            </p>
          </div>
          <a
            href="/packages/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#111318] hover:bg-[#C31A20] text-white font-semibold text-sm whitespace-nowrap shrink-0 transition-colors"
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
      <section className="relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/europe.webp"
            alt="Snow-dusted Swiss Alps towering over green meadows and alpine lake"
            width={1043}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/85 via-[#0A1020]/25 to-[#0A1020]/20" />
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
      <section className="relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/services/yacht-charters.webp"
            alt="Private luxury motor yacht docked in Dubai Marina at sunset"
            width={1440}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/85 via-[#0A1020]/25 to-[#0A1020]/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Private Travel &amp; Concierge Services
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#FFFFFF]">
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
      <section className="relative bg-[#0A1020] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/destinations/japan.webp"
            alt="Snow-capped Mount Fuji bathed in warm sunrise light in Japan"
            width={1043}
            height={1280}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/85 via-[#0A1020]/25 to-[#0A1020]/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12">
          <Breadcrumbs items={breadcrumbs} light />
          <h1 className="mt-3 text-3xl sm:text-5xl font-medium tracking-[-0.02em] text-white">
            Dubai Travel Guides
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#FFFFFF]">
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
      <section className="bg-[#F6F7F9] py-12 border-b border-[#ECEEF2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-[#111318]">
            {info.h1}
          </h1>
          <p className="mt-2 text-base text-[#5B6170] max-w-2xl">{info.description}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {slug === 'about' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <h2 className="text-2xl font-semibold text-[#111318]">
                  Dubai Travel House Built on Hospitality
                </h2>
                <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
                  Tuwaiq Travel &amp; Tourism LLC was founded in 2014 in Dubai by Basel Al Kasem, former Business Development Manager at Burj Al Arab. Operating within Al Basel Group (established in 2007), the agency connects GCC residents, international visitors, and corporate delegations with coordinated flights, hotels, holiday packages across 70+ countries, visas, and VIP concierge services.
                </p>
                <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
                  From Fifty One Tower in Business Bay, our consultants handle both ready-made regional getaways and tailor-made long-haul trips directly on WhatsApp and telephone rather than automated call centres.
                </p>
              </div>
              <div className="md:col-span-5">
                <img
                  src={GROUP_TEAM_PHOTO.src}
                  alt={GROUP_TEAM_PHOTO.alt}
                  width={GROUP_TEAM_PHOTO.width}
                  height={GROUP_TEAM_PHOTO.height}
                  className="rounded-[22px] w-full aspect-[3/2] object-cover shadow-md"
                />
              </div>
            </div>

            {FEATURE_FLAGS.enableUnconfirmedStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {UNCONFIRMED_STATS_HOLDER.map((s) => (
                  <div key={s.label} className="rounded-[18px] bg-[#0E0F12] text-white p-5">
                    <p className="text-2xl font-semibold text-[#FFFFFF] tabular-nums">{s.value}</p>
                    <p className="text-xs text-white/80 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-8 border-t border-[#ECEEF2]">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">Popular Trips &amp; Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {buyerPages.slice(0, 8).map((b) => (
                  <a
                    key={b.url}
                    href={b.url}
                    className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318] hover:text-[#C31A20]"
                  >
                    <span>{b.h1}</span>
                    <ArrowRight className="w-4 h-4 text-[#B4B8BF] group-hover:text-[#C31A20]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {slug === 'founder' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <img
                  src={LEADER_PHOTOS['Basel Al Kasem'].src}
                  alt={LEADER_PHOTOS['Basel Al Kasem'].alt}
                  width={LEADER_PHOTOS['Basel Al Kasem'].width}
                  height={LEADER_PHOTOS['Basel Al Kasem'].height}
                  className="rounded-[22px] w-full max-w-xs aspect-square object-cover shadow-md"
                />
              </div>
              <div className="md:col-span-8 space-y-4">
                <h2 className="text-2xl font-semibold text-[#111318]">Basel Al Kasem</h2>
                <p className="text-sm font-semibold text-[#7A808C]">
                  Founder, Tuwaiq Travel &amp; Tourism LLC · Founder, Al Basel Group (est. 2007)
                </p>
                <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
                  Before founding Al Basel Group in 2007 and Tuwaiq Travel &amp; Tourism in 2014, Basel Al Kasem was Business Development Manager at Burj Al Arab from 1999 to 2007. He has lived in Dubai for more than 40 years, and the group he built now spans travel, car rental, consultancy, real estate, investments and recruitment.
                </p>
                <ul className="space-y-3 pt-2">
                  {LEADERSHIP[0].highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[#2F3440]">
                      <Check className="w-4 h-4 text-[#111318] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="space-y-6 pt-8 border-t border-[#ECEEF2]">
              <h2 className="text-2xl font-semibold text-[#111318]">Partnerships and press</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <figure className="space-y-3">
                  <img
                    src={FOUR_SEASONS_LETTER.image.src}
                    alt={FOUR_SEASONS_LETTER.image.alt}
                    width={FOUR_SEASONS_LETTER.image.width}
                    height={FOUR_SEASONS_LETTER.image.height}
                    loading="lazy"
                    className="w-full rounded-[18px] border border-[#ECEEF2] shadow-sm bg-white"
                  />
                  <figcaption className="text-[15px] text-[#4B5160] leading-[1.75]">
                    <span className="block font-semibold text-[#111318]">{FOUR_SEASONS_LETTER.from}, {FOUR_SEASONS_LETTER.date}</span>
                    {FOUR_SEASONS_LETTER.summary}
                  </figcaption>
                </figure>
                <div className="space-y-8">
                  <figure className="space-y-3">
                    <img
                      src={ROYAL_COLLABORATION.image.src}
                      alt={ROYAL_COLLABORATION.image.alt}
                      width={ROYAL_COLLABORATION.image.width}
                      height={ROYAL_COLLABORATION.image.height}
                      loading="lazy"
                      className="w-full rounded-[18px] shadow-sm"
                    />
                    <figcaption className="text-[15px] text-[#4B5160] leading-[1.75]">
                      <span className="block font-semibold text-[#111318]">{ROYAL_COLLABORATION.year}</span>
                      {ROYAL_COLLABORATION.caption}
                    </figcaption>
                  </figure>
                  <figure className="space-y-3">
                    <img
                      src={PRESS_ITEMS[0].image.src}
                      alt={PRESS_ITEMS[0].image.alt}
                      width={PRESS_ITEMS[0].image.width}
                      height={PRESS_ITEMS[0].image.height}
                      loading="lazy"
                      className="w-2/3 rounded-[18px] shadow-sm"
                    />
                    <figcaption className="text-sm text-[#4B5160]">
                      <span className="block font-semibold text-[#111318]">{PRESS_ITEMS[0].outlet}, {PRESS_ITEMS[0].date}</span>
                      {PRESS_ITEMS[0].summary}{' '}
                      <a href="/press/" className="text-[#111318] font-semibold hover:underline">See all press</a>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111318]">Network</h3>
                <p className="mt-2 text-[15px] text-[#4B5160] leading-[1.75] max-w-[68ch]">{RECENT_MEETINGS.caption}</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {RECENT_MEETINGS.photos.map((p) => (
                    <img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="w-full aspect-[3/4] object-cover rounded-[18px] shadow-sm" />
                  ))}
                </div>
              </div>

              {OFFICE_ARCHIVE.length > 0 && (
                <>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111318]">Recognition</h3>
                  
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {OFFICE_ARCHIVE.map((item) => (
                    <figure key={item.src} className="space-y-3">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className="w-full rounded-[18px] shadow-sm"
                      />
                      <figcaption className="text-[15px] text-[#4B5160] leading-[1.75]">
                        <span className="block font-semibold text-[#111318]">{item.title}</span>
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                </>
              )}
            </section>
          </>
        )}

        {slug === 'leadership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#ECEEF2] pt-2">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="py-6 border-b border-[#ECEEF2] space-y-3">
                <div className="flex items-center gap-4">
                  {LEADER_PHOTOS[leader.name] && (
                    <img
                      src={LEADER_PHOTOS[leader.name].src}
                      alt={LEADER_PHOTOS[leader.name].alt}
                      width={LEADER_PHOTOS[leader.name].width}
                      height={LEADER_PHOTOS[leader.name].height}
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover shadow-sm shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C]">{leader.role}</p>
                    <h2 className="text-xl font-semibold text-[#111318] mt-0.5">{leader.name}</h2>
                  </div>
                </div>
                <p className="text-[15px] text-[#4B5160] leading-[1.75]">{leader.bio}</p>
                <ul className="space-y-2 pt-1">
                  {leader.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#5B6170]">
                      <Check className="w-3.5 h-3.5 text-[#111318] shrink-0 mt-0.5" aria-hidden="true" />
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
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
              Founded in 2007 by Basel Al Kasem, Al Basel Group operates across travel, mobility, consultancy, real estate, investments, and executive talent acquisition in the UAE and wider region.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#ECEEF2]">
              {COMPANY.sisterCompanies.map((co) => (
                <div key={co.name} className="py-6 border-b border-[#ECEEF2] flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C]">Al Basel Group</p>
                    <h2 className="text-lg font-semibold text-[#111318] mt-1">{co.name}</h2>
                    <p className="mt-1.5 text-sm text-[#4B5160]">{co.role}</p>
                  </div>
                  {co.externalUrl && (
                    <a
                      href={co.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111318] hover:underline"
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
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
              Across Tuwaiq Travel &amp; Tourism LLC and Al Basel Group, long-standing hospitality relationships support VIP suites, regional advisory, and GCC travellers.
            </p>
            <figure className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start rounded-[22px] bg-[#F6F7F9] border border-[#ECEEF2] p-5 sm:p-6">
              <img
                src={FOUR_SEASONS_LETTER.image.src}
                alt={FOUR_SEASONS_LETTER.image.alt}
                width={FOUR_SEASONS_LETTER.image.width}
                height={FOUR_SEASONS_LETTER.image.height}
                loading="lazy"
                className="md:col-span-5 w-full rounded-[14px] border border-[#ECEEF2] bg-white"
              />
              <figcaption className="md:col-span-7 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C]">Four Seasons Hotel Washington, DC · {FOUR_SEASONS_LETTER.date}</p>
                <h2 className="text-xl font-semibold text-[#111318]">A million-dollar VIP delegation booking</h2>
                <p className="text-[15px] text-[#4B5160] leading-[1.75]">{FOUR_SEASONS_LETTER.summary}</p>
              </figcaption>
            </figure>
            <div className="space-y-8">
              {(['Hotel', 'Airline'] as const).map((kind) => (
                <div key={kind}>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">{kind === 'Hotel' ? 'Hotel partners' : 'Airline partners'}</h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {PARTNER_LOGOS.filter((l) => l.kind === kind).map((logo) => (
                      <li key={logo.name} className="flex h-24 items-center justify-center rounded-2xl bg-white border border-[#ECEEF2] px-6">
                        <img src={logo.src} alt={`${logo.name} logo`} width={logo.width} height={logo.height} loading="lazy" className="max-h-12 w-auto max-w-[75%] object-contain" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#ECEEF2]">
              {PARTNERSHIPS.map((item) => (
                <div key={item.name} className="py-6 border-b border-[#ECEEF2]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C] mb-1">{item.entity}</p>
                  <h2 className="text-lg font-semibold text-[#111318]">{item.name}</h2>
                  <p className="mt-2 text-[15px] text-[#4B5160] leading-[1.75]">{item.summary}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">Trade events and partner meetings</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {EVENT_PHOTOS.map((photo) => (
                  <figure key={photo.src} className="space-y-2">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover rounded-[14px]"
                    />
                    <figcaption className="text-xs text-[#5B6170]">{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">Recent appearances</h2>
              <ul className="divide-y divide-[#ECEEF2] border-y border-[#ECEEF2]">
                {RECENT_EVENTS.map((e) => (
                  <li key={e.url} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <p className="sm:col-span-3 text-sm font-semibold text-[#7A808C]">{e.date}</p>
                    <div className="sm:col-span-9">
                      <h3 className="text-[17px] font-semibold text-[#111318]">{e.title}</h3>
                      <p className="mt-1.5 text-[15px] text-[#4B5160] leading-[1.75]">{e.summary}{' '}<a href={e.url} target="_blank" rel="noopener" className="font-semibold text-[#111318] underline underline-offset-2 hover:text-[#C31A20]">View on Instagram</a></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {FEATURE_FLAGS.enableClientLogoWall && (
              <div className="pt-4">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-3">Clients</h2>
                <p className="text-[16px] text-[#4B5160] leading-[1.75]">Brands we have worked with include Mandarin Oriental, One&amp;Only, Chopard and Stantec.</p>
              </div>
            )}
          </div>
        )}

        {slug === 'press' && (
          <div className="space-y-6">
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
              Press coverage of the launch of Tuwaiq Travel &amp; Tourism LLC and the hospitality track record of Al Basel Group.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PRESS_ITEMS.map((item) => (
                <figure key={item.headline} className="space-y-3">
                  <div className="rounded-[18px] bg-[#F6F7F9] border border-[#ECEEF2] p-4 flex items-center justify-center">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      className="max-h-96 w-auto shadow-sm"
                    />
                  </div>
                  <figcaption>
                    <p className="text-xs font-semibold text-[#7A808C]">{item.date} · {item.outlet}</p>
                    <h2 className="mt-1 text-lg font-semibold text-[#111318]">{item.headline}</h2>
                    <p className="mt-1.5 text-[15px] text-[#4B5160] leading-[1.75]">{item.summary}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {slug === 'licence' && (
          <div className="rounded-[22px] bg-[#F6F7F9] p-6 sm:p-8 border border-[#ECEEF2] space-y-6">
            <div className="flex items-center gap-2.5 text-[#111318]">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[#111318]">Official Company Verification</h2>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-[#E5E7EB]">
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Legal Entity</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.legalName}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Established</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.foundedYear} (Al Basel Group est. 2007)</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Dubai Office Address</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.address.full}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Official Phone &amp; WhatsApp</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">
                  Office: {COMPANY.contact.officeDisplay} · WhatsApp: {COMPANY.contact.whatsappDisplay}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Official Email Domains</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">
                  {COMPANY.contact.bookingsEmail} · {COMPANY.contact.generalEmail}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Trade Licence Number</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1 tabular-nums">
                  {COMPANY.verification.licenceNumber}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Issuing Authority</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.verification.issuingAuthority}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Name on Licence</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.verification.licensedName}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Legal Form</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.verification.legalForm}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Licensed Activity</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">{COMPANY.verification.licensedActivity}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">First Issued &amp; Valid Until</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1">
                  {COMPANY.verification.licenceIssued} · valid until {COMPANY.verification.licenceExpiry}
                </dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Dubai Chamber Membership</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1 tabular-nums">{COMPANY.verification.chamberNumber}</dd>
              </div>
              <div className="py-4 border-b border-[#E5E7EB]">
                <dt className="text-xs text-[#6B7180]">Commercial Register Number</dt>
                <dd className="font-semibold text-sm text-[#111318] mt-1 tabular-nums">{COMPANY.verification.registerNumber}</dd>
              </div>
            </dl>
          </div>
        )}

        {slug === 'how-booking-works' && (
          <div className="space-y-8">
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
              We check availability with airlines, hotels and transfer companies before you confirm anything.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#ECEEF2] divide-y sm:divide-y-0 lg:divide-x divide-[#ECEEF2]">
              {BOOKING_STEPS.map((step) => (
                <div key={step.step} className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                  <p className="text-xs font-semibold tracking-widest text-[#111318] mb-2 tabular-nums">
                    0{step.step}
                  </p>
                  <h2 className="text-lg font-semibold text-[#111318]">{step.title}</h2>
                  <p className="mt-2 text-sm text-[#5B6170] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slug === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-[22px] bg-[#F6F7F9] p-6 sm:p-8 border border-[#ECEEF2] space-y-5">
              <h2 className="text-xl font-semibold text-[#111318]">Direct Reservations &amp; Office</h2>
              <div className="space-y-3.5 text-sm text-[#2F3440]">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#111318] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY.address.full}</span>
                </p>
                <p className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-[#118444] shrink-0" />
                  <a href={whatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-[#118444]">
                    WhatsApp: {COMPANY.contact.whatsappDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#111318] shrink-0" aria-hidden="true" />
                  <a href={`tel:${COMPANY.contact.officeTel}`} className="font-semibold hover:underline">
                    Office: {COMPANY.contact.officeDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#111318] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY.contact.bookingsEmail}`} className="font-semibold hover:underline">
                    Bookings: {COMPANY.contact.bookingsEmail}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#111318] shrink-0" aria-hidden="true" />
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
                  className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-[#D9DCE1] text-[#111318] hover:border-[#111318] text-sm font-semibold transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="rounded-[22px] overflow-hidden border border-[#ECEEF2] bg-white">
              <img
                src="/images/hero/palm-jumeirah-aerial.webp"
                alt="Business Bay and Sheikh Zayed Road in Dubai"
                width={1800}
                height={1012}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-2">
                <h2 className="text-lg font-semibold text-[#111318]">Fifty One Tower, Business Bay</h2>
                <p className="text-sm text-[#5B6170]">
                  Office 301 on Marasi Drive, Business Bay, Dubai. Corporate account enquiries reach Ahmed Mohsen directly on +971 54 460 8771.
                </p>
                <p className="text-xs text-[#7A808C]">
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

        {slug === 'ai-visibility' && (
          <div className="space-y-10 text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#111318]">Why this matters to travellers</h2>
              <p>
                More travellers now ask ChatGPT, Gemini, Perplexity or Google&apos;s AI Overviews which agency to use before they book. Those assistants recommend businesses they can understand and verify. Our aim is simple: when someone asks for a Georgia package from Dubai, a Maldives honeymoon or a corporate travel partner, the answer they get about Tuwaiq should be accurate, current and easy to check.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#111318]">How the website is structured</h2>
              <ul className="space-y-3">
                {[
                  'One page per real traveller need: each package, destination, service and common question has its own page, so no page tries to answer everything.',
                  'One source of facts: prices, durations, inclusions, contact details and company history live in a single data file that every page and every piece of structured data reads from, so they never contradict each other.',
                  'Prices exactly as we sell them: "from AED X per person, based on two sharing", with what is and is not included stated on the page.',
                  'Evidence before claims: letters, press coverage and partner records are shown on our trust pages, and anything we cannot document is left out.',
                  'Readable by machines as well as people: every page is pre-built as plain HTML, with structured data, a sitemap, and an llms.txt file that summarises who we are for AI assistants.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#111318] shrink-0 mt-1.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#111318]">The tool we use: Prezlo</h2>
              <p>
                We measure and improve how AI assistants describe Tuwaiq with{' '}
                <a href="https://prezlo.io/" target="_blank" rel="noopener" className="text-[#111318] font-semibold underline underline-offset-2">Prezlo</a>, an AI SEO and GEO platform. Prezlo is used by many brands in the UAE, from large enterprises to mid-sized and small businesses, and it serves as a GEO tool for UAE companies and for brands across the globe. It shows which traveller questions AI assistants answer with our name, which competitors they prefer, and which facts are missing or wrong, so we fix the cause on our own pages rather than guessing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#111318]">The expert behind the work: Lopty Pascal</h2>
              <p>
                Our AI search and GEO strategy is guided by{' '}
                <a href="https://loptypascal.com" target="_blank" rel="noopener" className="text-[#111318] font-semibold underline underline-offset-2">Lopty Pascal</a>, a Dubai-based AI SEO and GEO consultant and the CTO and co-founder of Prezlo. His approach starts from the questions real buyers ask and the evidence an AI assistant needs before it recommends a business, which is the method behind the structure described above.
              </p>
              <p>
                The same approach runs across Al Basel Group, including our sister company{' '}
                <a href="https://najdrentacar.com" target="_blank" rel="noopener" className="text-[#111318] font-semibold underline underline-offset-2">Najd Rent a Car</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#111318]">If something about us is wrong</h2>
              <p>
                If an AI assistant or any page gives incorrect information about Tuwaiq, tell us on WhatsApp at {COMPANY.contact.whatsappDisplay} or email {COMPANY.contact.generalEmail}. We correct the source on our website first, because that is what search engines and assistants read.
              </p>
            </section>
          </div>
        )}

        {slug === 'privacy' && (
          <div className="max-w-[68ch] space-y-10">
            {[
              ['What we collect', 'When you press Book, Request a quote or a WhatsApp button, we ask for your name and mobile number. You can also add your email, travel dates, who is travelling and any notes. We also record the page you were on and how you reached our website, for example a search engine or an advert.'],
              ['Why we keep it', 'So our travel team can reply to your enquiry, follow up if a WhatsApp message does not reach us, and prepare the quote you asked for. We do not sell your details or share them for other companies’ marketing.'],
              ['Where it is stored', 'Enquiries are saved in a private Google spreadsheet that only our team can open. WhatsApp, phone and email then work under their own privacy terms.'],
              ['How long we keep it', 'We keep enquiry details for as long as we need them to handle your trip and our business records, then delete them.'],
              ['Your choices', `To see, correct or delete the details you gave us, email ${COMPANY.contact.generalEmail} or call ${COMPANY.contact.officeDisplay}.`],
            ].map(([heading, body]) => (
              <section key={heading}>
                <h2 className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] text-[#111318]">{heading}</h2>
                <p className="mt-3 text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">{body}</p>
              </section>
            ))}
          </div>
        )}

        {slug === 'photo-credits' && (
          <div className="space-y-6">
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">
              Photographs of our team, letters and press coverage come from the Tuwaiq and Al Basel Group archive. Destination and hotel photographs are either from our company materials or openly licensed images from Wikimedia Commons, credited below as their licences require.
            </p>
            <ul className="divide-y divide-[#ECEEF2] border-y border-[#ECEEF2]">
              {PHOTO_CREDITS.map((c) => (
                <li key={c.image} className="py-4 flex items-center gap-4">
                  <img src={c.image} alt={c.title} width={96} height={64} loading="lazy" className="w-24 h-16 object-cover rounded-lg shrink-0" />
                  <p className="text-sm text-[#4B5160]">
                    <a href={c.source} target="_blank" rel="noopener" className="font-semibold text-[#111318] hover:underline">{c.title}</a>
                    <span className="block">Photo by {c.author}, licensed under {c.license}. Resized for this website.</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Shared Company Trust Cross-Navigation */}
        <section className="pt-8 border-t border-[#ECEEF2]">
          <h2 className="text-base font-semibold text-[#111318] mb-4">Company Directory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
            {trustLinks.map(([s, item]) => (
              <a
                key={s}
                href={item.url}
                className={`py-1.5 transition-colors ${
                  s === slug
                    ? 'text-[#C31A20] font-semibold'
                    : 'text-[#4B5160] hover:text-[#111318]'
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
