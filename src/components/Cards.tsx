import { ChevronDown, ArrowRight, ChevronRight } from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import type { TravelPackage, PackageFaq } from '../data/packages';
import type { DestinationItem } from '../data/destinations';
import type { ServiceItem } from '../data/services';
import type { GuideArticle } from '../data/guides';
import type { BreadcrumbItem } from '../lib/seo';

export function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-xs ${light ? 'text-white/80' : 'text-[#6B7180]'}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.url} className="inline-flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-55" aria-hidden="true" />}
            {isLast ? (
              <span className={light ? 'text-white font-medium' : 'text-[#111318] font-medium'} aria-current="page">
                {item.name}
              </span>
            ) : (
              <a href={item.url} className="hover:underline">
                {item.name}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function PackageCard({ pkg, lazy = true }: { pkg: TravelPackage; lazy?: boolean }) {
  return (
    <a
      href={pkg.url}
      data-filter-card="package"
      data-region={pkg.region}
      data-search={`${pkg.name} ${pkg.destinationName} ${pkg.cities} ${pkg.region} ${pkg.idealFor}`.toLowerCase()}
      className="travel-card travel-package-card group flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#ECEEF2] shadow-[0_4px_20px_rgba(27,23,24,0.035)] hover:shadow-[0_14px_34px_rgba(27,23,24,0.08)] hover:border-[#DCDFE4] transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F6F7F9]">
        <img
          src={pkg.image}
          alt={pkg.imageAlt}
          width={pkg.imageWidth}
          height={pkg.imageHeight}
          loading={lazy ? 'lazy' : 'eager'}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white tracking-wide">
          {pkg.durationLabel}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center p-0.5 rounded-[5px] bg-white/95 shadow-sm">
          <CountryFlag code={pkg.countryCode} className="w-6 h-[17px]" />
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#7A808C] truncate">
            {pkg.destinationName}
            {pkg.departureDate ? ' · Departs 2 Dec 2026' : ''}
          </p>
          <h3 className="mt-1 text-base font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors leading-snug line-clamp-1">
            {pkg.shortTitle}
          </h3>
        </div>

        <div className="pt-3.5 border-t border-[#F3F4F6] flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-semibold text-[#111318] tabular-nums whitespace-nowrap">
              From AED {pkg.priceAed.toLocaleString('en-US')}
            </p>
            <p className="text-[11px] text-[#7A808C]">per person</p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E7EB] text-[#111318] group-hover:bg-[#C31A20] group-hover:border-[#C31A20] group-hover:text-white transition-colors shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function DestinationCard({ destination, compact = false, lazy = true }: { destination: DestinationItem; compact?: boolean; lazy?: boolean }) {
  return (
    <a
      href={destination.url}
      data-filter-card="destination"
      data-region={destination.filterRegion}
      data-search={`${destination.name} ${destination.regionLabel} ${destination.filterRegion} ${destination.idealFor} ${destination.highlights.join(' ')}`.toLowerCase()}
      className={`travel-card travel-destination-card group relative block rounded-[20px] overflow-hidden shadow-[0_6px_24px_rgba(27,23,24,0.06)] bg-[#111318] ${
        compact ? 'w-[240px] sm:w-[264px] shrink-0 snap-start aspect-[4/5]' : 'aspect-[4/5]'
      }`}
    >
      <img
        src={destination.image}
        alt={destination.imageAlt}
        width={destination.imageWidth}
        height={destination.imageHeight}
        loading={lazy ? 'lazy' : 'eager'}
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <CountryFlag code={destination.countryCode} className="w-5 h-[14px] ring-white/50" />
            {destination.secondaryCountryCode && (
              <CountryFlag code={destination.secondaryCountryCode} className="w-5 h-[14px] ring-white/50 -ml-1" />
            )}
            <h3 className="text-xl font-semibold leading-tight truncate">{destination.name}</h3>
          </div>
          <p className="mt-1 text-xs font-medium text-white/85 tabular-nums truncate">
            {destination.startingPriceAed
              ? `From AED ${destination.startingPriceAed.toLocaleString('en-US')}`
              : destination.filterRegion}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center shrink-0 group-hover:bg-[#C31A20] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export function ServiceCard({ service, lazy = true }: { service: ServiceItem; lazy?: boolean }) {
  return (
    <a
      href={service.url}
      className="travel-card travel-service-card group flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#ECEEF2] shadow-[0_4px_20px_rgba(27,23,24,0.03)] hover:shadow-[0_12px_30px_rgba(27,23,24,0.07)] hover:border-[#DCDFE4] transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#F6F7F9]">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={service.imageWidth}
          height={service.imageHeight}
          loading={lazy ? 'lazy' : 'eager'}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors truncate">
            {service.name}
          </h3>
          <p className="mt-1 text-sm text-[#6B7180] truncate">{service.tagline}</p>
        </div>
        <span
          aria-hidden="true"
          className="w-9 h-9 rounded-full border border-[#E5E7EB] text-[#111318] group-hover:bg-[#C31A20] group-hover:border-[#C31A20] group-hover:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export function GuideCard({ guide, lazy = true }: { guide: GuideArticle; lazy?: boolean }) {
  return (
    <a
      href={guide.url}
      className="travel-card travel-guide-card group flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#ECEEF2] shadow-[0_4px_20px_rgba(27,23,24,0.03)] hover:shadow-[0_12px_30px_rgba(27,23,24,0.07)] hover:border-[#DCDFE4] transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#F6F7F9]">
        <img
          src={guide.image}
          alt={guide.imageAlt}
          width={guide.imageWidth}
          height={guide.imageHeight}
          loading={lazy ? 'lazy' : 'eager'}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#7A808C] mb-1.5">
            {guide.category} · {guide.readTime}
          </p>
          <h3 className="text-base font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors leading-snug line-clamp-2">
            {guide.h1}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#111318] group-hover:text-[#C31A20] transition-colors">
          <span>Read guide</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </a>
  );
}

export function FaqSection({faqs,id='faqs'}:{faqs:PackageFaq[];id?:string}) { return <section id={id} className="travel-faq scroll-mt-24 pt-8 border-t border-[#ECEEF2]"><h2 className="text-2xl font-semibold text-[#111318] mb-2">Questions, answered.</h2><div>{faqs.map(faq=><details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>; }

export function StatChips({
  duration,
  bestTime,
  idealFor,
}: {
  duration: string;
  bestTime: string;
  idealFor: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-4 my-6 border-y border-[#ECEEF2] sm:divide-x sm:divide-[#ECEEF2]">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#7A808C]">Duration</p>
        <p className="mt-0.5 text-sm font-semibold text-[#111318]">{duration}</p>
      </div>
      <div className="sm:pl-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#7A808C]">Best time</p>
        <p className="mt-0.5 text-sm font-semibold text-[#111318]">{bestTime}</p>
      </div>
      <div className="sm:pl-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#7A808C]">Ideal for</p>
        <p className="mt-0.5 text-sm font-semibold text-[#111318]">{idealFor}</p>
      </div>
    </div>
  );
}
