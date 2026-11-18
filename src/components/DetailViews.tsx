import { DestinationBookingView } from './DestinationBookingView';
import { BookingContactButton } from './BookingContactButton';
import { PackageBookingView } from './PackageBookingView';
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from 'lucide-react';
import { Layout } from './Layout';
import { Breadcrumbs, FaqSection, GuideCard, PackageCard, StatChips } from './Cards';
import { CountryFlag } from './CountryFlag';
import { WhatsAppEnquiryBuilder } from './WhatsAppEnquiryBuilder';
import { ArticleBody } from './ArticleBody';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY, FEATURE_FLAGS, HOTEL_SHOWCASE, whatsAppUrl } from '../data/siteConfig';
import { getActivePackages } from '../data/routes';
import type { BreadcrumbItem } from '../lib/seo';
import type { TravelPackage } from '../data/packages';
import { DESTINATIONS, type DestinationItem } from '../data/destinations';
import { SERVICES, type ServiceItem } from '../data/services';
import type { BuyerQueryPage } from '../data/buyerPages';
import { GUIDES, type GuideArticle } from '../data/guides';

export function PackageDetailView({pkg,breadcrumbs}:{pkg:TravelPackage;breadcrumbs:BreadcrumbItem[]}) { return <PackageBookingView pkg={pkg} breadcrumbs={breadcrumbs} />; }

export function DestinationDetailView({destination,breadcrumbs}:{destination:DestinationItem;breadcrumbs:BreadcrumbItem[]}) { return <DestinationBookingView destination={destination} breadcrumbs={breadcrumbs} />; }

export function ServiceDetailView({
  service,
  breadcrumbs,
}: {
  service: ServiceItem;
  breadcrumbs: BreadcrumbItem[];
}) {
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <Layout currentPath={service.url} hideBottomNav>
      <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden bg-[#0E0F12]">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={service.imageWidth}
          height={service.imageHeight}
          loading="eager"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/75 via-[#0A1020]/10 to-[#0A1020]/25" />
        <div className="absolute top-5 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 flex items-center">
          <a
            href="/services/"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Services</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-0 sm:px-6 -mt-12 relative z-10 pb-12">
        <div className="bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_18px_48px_rgba(27,23,24,0.08)] border border-[#ECEEF2] px-5 py-7 sm:p-10">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-5 text-2xl sm:text-4xl font-semibold text-[#111318] leading-tight">
            {service.h1}
          </h1>
          <p className="mt-2 text-base text-[#5B6170]">{service.tagline}</p>

          <div className="mt-6 space-y-6">
            <p className="text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">{service.overview}</p>

            <div className="rounded-[18px] bg-[#F6F7F9] p-6">
              <h2 className="text-base font-semibold text-[#111318] mb-3">What We Arrange</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#111318]">
                    <Check className="w-4 h-4 text-[#111318] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[18px] border border-[#ECEEF2] p-5 text-[15px] text-[#4B5160] leading-[1.75]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C] mb-1.5">Consultant note</p>
              <p>{service.consultantNote}</p>
            </div>

            {service.slug === 'hotel-bookings' && (
              <section className="pt-4">
                <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111318] mb-6">
                  Hotels we book
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {HOTEL_SHOWCASE.map((hotel) => (
                    <div
                      key={hotel.slug}
                      className="flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#ECEEF2] shadow-[0_4px_20px_rgba(27,23,24,0.03)]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#F6F7F9]">
                        <img
                          src={hotel.image}
                          alt={hotel.imageAlt}
                          width={hotel.imageWidth}
                          height={hotel.imageHeight}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-[#7A808C] truncate">{hotel.locationLabel}</p>
                          <h3 className="mt-1 text-base font-semibold text-[#111318] leading-snug line-clamp-1">
                            {hotel.brandGroup}
                          </h3>
                          <p className="mt-1.5 text-xs text-[#5B6170] line-clamp-2 leading-relaxed">
                            {hotel.roomSummary}
                          </p>
                        </div>
                        <a
                          href={whatsAppUrl(hotel.whatsappSubject)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-xs font-semibold transition-colors"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>Enquire on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {service.externalPartner && (
              <div className="rounded-[18px] bg-[#F6F7F9] border border-[#ECEEF2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A808C]">Al Basel Group</p>
                  <h2 className="text-lg font-semibold text-[#111318] mt-0.5">{service.externalPartner.name}</h2>
                  <p className="text-sm text-[#5B6170] mt-1">{service.externalPartner.note}</p>
                </div>
                <a
                  href={service.externalPartner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#111318] hover:bg-[#C31A20] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Visit najdrentacar.com</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}

            <div className="pt-2 space-y-4">
              {service.relatedBuyerUrl && (
                <a
                  href={service.relatedBuyerUrl}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#111318] hover:underline"
                >
                  <span>Explore dedicated booking guide</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <WhatsAppEnquiryBuilder
                defaultSubject={service.name}
                contextLabel="Selected Service"
                fixedSelection
                defaultDirection={
                  service.slug === 'airport-transfers' ||
                  service.slug === 'tourist-car-rental' ||
                  service.slug === 'desert-safari' ||
                  service.slug === 'city-tours' ||
                  service.slug === 'yacht-charters' ||
                  service.slug === 'theme-water-parks' ||
                  service.slug === 'attraction-tickets'
                    ? 'Inbound to UAE / Dubai'
                    : 'Outbound from Dubai'
                }
                defaultCarRental={service.slug === 'tourist-car-rental' || service.slug === 'airport-transfers'}
              />
            </div>
          </div>

          <div className="mt-12">
            <FaqSection faqs={service.faqs} />
          </div>

          <section className="pt-12 mt-12 border-t border-[#ECEEF2]">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">More Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
              {otherServices.map((s) => (
                <a
                  key={s.slug}
                  href={s.url}
                  className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318] hover:text-[#C31A20]"
                >
                  <span>{s.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#B4B8BF] group-hover:text-[#C31A20]" aria-hidden="true" />
                </a>
              ))}
              <a
                href="/services/"
                className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-semibold text-[#111318]"
              >
                <span>All 15 services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECEEF2] px-4 py-2.5 flex items-center gap-3">
        <a
          href={`tel:${COMPANY.contact.officeTel}`}
          className="h-11 px-4 rounded-full border border-[#D9DCE1] text-[#111318] text-xs font-semibold inline-flex items-center justify-center shrink-0"
        >
          Call Desk
        </a>
        <a
          href={whatsAppUrl(service.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-11 px-5 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>Book on WhatsApp</span>
        </a>
      </div>
    </Layout>
  );
}

export function BuyerQueryView({
  page,
  breadcrumbs,
}: {
  page: BuyerQueryPage;
  breadcrumbs: BreadcrumbItem[];
}) {
  const allPackages = getActivePackages();
  const matchedPackages = allPackages.filter((p) => page.featuredPackageSlugs.includes(p.slug));
  const matchedDestinations = DESTINATIONS.filter((d) =>
    page.featuredDestinationSlugs.includes(d.slug)
  );
  const matchedServices = SERVICES.filter((s) => page.featuredServiceSlugs.includes(s.slug));
  const matchedGuides = GUIDES.filter((g) => page.relatedGuideSlugs.includes(g.slug));

  return (
    <Layout currentPath={page.url} hideBottomNav>
      <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden bg-[#0E0F12]">
        <img
          src={page.image}
          alt={page.imageAlt}
          width={page.imageWidth}
          height={page.imageHeight}
          loading="eager"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/75 via-[#0A1020]/10 to-[#0A1020]/25" />
        <div className="absolute top-5 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 flex items-center">
          <a
            href="/packages/"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Packages</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-0 sm:px-6 -mt-12 relative z-10 pb-12">
        <div className="bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_18px_48px_rgba(27,23,24,0.08)] border border-[#ECEEF2] px-5 py-7 sm:p-10">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mt-5 text-xs font-medium text-[#7A808C]">{page.categoryLabel}</p>
          <h1 className="mt-1 text-2xl sm:text-4xl font-semibold text-[#111318] leading-tight">
            {page.h1}
          </h1>
          <p className="mt-3 text-[16px] sm:text-[17px] text-[#2F3440] leading-[1.8]">{page.intro}</p>

          <div className="mt-12">
            <ArticleBody sections={page.bodySections} />
          </div>

          {matchedPackages.length > 0 && (
            <section className="pt-12 mt-12 border-t border-[#ECEEF2]">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111318] mb-6">Available Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchedPackages.map((pkg) => (
                  <PackageCard key={pkg.slug} pkg={pkg} />
                ))}
              </div>
            </section>
          )}

          {(matchedDestinations.length > 0 || matchedServices.length > 0) && (
            <section className="pt-12 mt-12 border-t border-[#ECEEF2]">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">Related Destinations &amp; Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
                {matchedDestinations.map((d) => (
                  <a
                    key={d.slug}
                    href={d.url}
                    className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318] hover:text-[#C31A20]"
                  >
                    <span>{d.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#B4B8BF] group-hover:text-[#C31A20]" aria-hidden="true" />
                  </a>
                ))}
                {matchedServices.map((s) => (
                  <a
                    key={s.slug}
                    href={s.url}
                    className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318]"
                  >
                    <span>{s.name}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {page.slug === 'dubai-car-rental-najd' && (
            <section className="mt-8 rounded-[22px] bg-[#0E0F12] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFFFFF]">
                  Al Basel Group Mobility Partner
                </p>
                <h2 className="text-xl font-semibold text-white">
                  Direct Fleet Access at najdrentacar.com
                </h2>
                <p className="text-sm text-white/80 leading-relaxed">
                  Travelling to Dubai and need your car waiting at DXB, DWC, AUH, or delivered to your hotel? Browse live vehicle fleets with our sister company Najd Rent a Car or bundle your car right into your WhatsApp brief below.
                </p>
              </div>
              <a
                href="https://najdrentacar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[#111318] hover:bg-[#FDEDED] text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <span>Visit najdrentacar.com</span>
                <ExternalLink className="w-4 h-4 text-[#111318]" aria-hidden="true" />
              </a>
            </section>
          )}

          <div className="mt-12">
            <WhatsAppEnquiryBuilder
              defaultSubject={page.whatsappSubject}
              contextLabel="Enquiry Focus"
              fixedSelection
              defaultDirection={page.defaultDirection || 'Outbound from Dubai'}
              defaultCarRental={Boolean(page.defaultCarRental)}
            />
          </div>

          <div className="mt-12">
            <FaqSection faqs={page.faqs} />
          </div>

          {matchedGuides.length > 0 && (
            <section className="pt-12 mt-12 border-t border-[#ECEEF2]">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111318] mb-6">Planning Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {matchedGuides.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECEEF2] px-4 py-2.5 flex items-center gap-3">
        <a
          href={`tel:${COMPANY.contact.officeTel}`}
          className="h-11 px-4 rounded-full border border-[#D9DCE1] text-[#111318] text-xs font-semibold inline-flex items-center justify-center shrink-0"
        >
          Call Desk
        </a>
        <a
          href={whatsAppUrl(page.whatsappSubject)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-11 px-5 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>Book on WhatsApp</span>
        </a>
      </div>
    </Layout>
  );
}

export function GuideDetailView({
  guide,
  breadcrumbs,
}: {
  guide: GuideArticle;
  breadcrumbs: BreadcrumbItem[];
}) {
  const allPackages = getActivePackages();
  const matchedPackages = allPackages.filter((p) => guide.relatedPackageSlugs.includes(p.slug));
  const matchedDestinations = DESTINATIONS.filter((d) =>
    guide.relatedDestinationSlugs.includes(d.slug)
  );
  const matchedServices = SERVICES.filter((s) => guide.relatedServiceSlugs.includes(s.slug));

  return (
    <Layout currentPath={guide.url}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-5">
          <p className="text-xs font-medium text-[#7A808C]">
            {guide.category} · {guide.readTime} · Updated {guide.publishedDate}
          </p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-semibold text-[#111318] leading-tight">
            {guide.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6170] leading-relaxed">{guide.summary}</p>
        </header>

        <div className="mt-6 rounded-[22px] overflow-hidden aspect-[16/9] bg-[#F6F7F9]">
          <img
            src={guide.image}
            alt={guide.imageAlt}
            width={guide.imageWidth}
            height={guide.imageHeight}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-12">
          <ArticleBody sections={guide.sections} />
        </div>

        {(matchedDestinations.length > 0 || matchedServices.length > 0) && (
          <section className="mt-16 pt-8 border-t border-[#ECEEF2]">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#111318] mb-5">Relevant Services &amp; Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
              {matchedDestinations.map((d) => (
                <a
                  key={d.slug}
                  href={d.url}
                  className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318] hover:text-[#C31A20]"
                >
                  <span>{d.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#B4B8BF] group-hover:text-[#C31A20]" aria-hidden="true" />
                </a>
              ))}
              {matchedServices.map((s) => (
                <a
                  key={s.slug}
                  href={s.url}
                  className="group flex items-center justify-between py-3 border-b border-[#ECEEF2] text-sm font-medium text-[#111318]"
                >
                  <span>{s.name}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        )}

        {matchedPackages.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#ECEEF2]">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111318] mb-6">Matching Packages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {matchedPackages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <FaqSection faqs={guide.faqs} />
        </div>

        <div className="mt-10 rounded-[22px] bg-[#0E0F12] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Need advice on your travel dates?</h2>
            <p className="text-sm text-white/75 mt-1">
              Message Tuwaiq Travel in Business Bay for live fares and visa guidance.
            </p>
          </div>
          <a
            href={whatsAppUrl(guide.h1)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white font-semibold text-sm whitespace-nowrap shrink-0 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </article>
    </Layout>
  );
}
