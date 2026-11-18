import { useState } from 'react';
import { ArrowRight, Briefcase, CalendarDays, Car, ExternalLink, KeyRound, MapPin, ShieldCheck, Star, Users } from 'lucide-react';
import { Layout } from './Layout';
import { Breadcrumbs, FaqSection } from './Cards';
import { BookingContactButton } from './BookingContactButton';
import type { BreadcrumbItem } from '../lib/seo';
import type { BuyerQueryPage } from '../data/buyerPages';
import { FLEET_GROUPS, NAJD, NAJD_FLEET, fleetImage, headlineRate, najdCarUrl, type FleetGroup } from '../data/najdFleet';

const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`;

export function CarRentalView({ page, breadcrumbs }: { page: BuyerQueryPage; breadcrumbs: BreadcrumbItem[] }) {
  const [group, setGroup] = useState<FleetGroup | 'all'>('all');
  const cars = group === 'all' ? NAJD_FLEET : NAJD_FLEET.filter((c) => c.group === group);

  return (
    <Layout currentPath={page.url}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#0B0C0F] text-white">
        <img
          src="/images/najd-fleet/najd-escalade-fleet.webp"
          alt="Two black Cadillac Escalade SUVs from the Najd Rent a Car fleet arriving at a Dubai hotel entrance"
          width={1280}
          height={852}
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0C0F]/95 via-[#0B0C0F]/70 to-[#0B0C0F]/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-[#0B0C0F]/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-8 sm:pb-20">
          <Breadcrumbs items={breadcrumbs} light />
          <div className="mt-10 sm:mt-16 max-w-2xl">
            <p className="text-[11px] tracking-[0.18em] text-white/70">AL BASEL GROUP · NAJD RENT A CAR</p>
            <h1 className="mt-4 text-[34px] sm:text-5xl lg:text-[56px] font-medium leading-[1.08] tracking-[-0.03em]">
              Your car in Dubai, arranged with your trip.
            </h1>
            <p className="mt-5 text-[15px] sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Chauffeur-driven and self-drive cars from Najd Rent a Car, our sister company since {NAJD.since}. From a Range Rover for a VIP arrival to a monthly family SUV, delivered to your hotel or address.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookingContactButton subject="Car rental with Najd Rent a Car" label="Book a car" className="!rounded-full !px-6 !min-h-[48px] !text-[14px]" />
              <a href="#fleet" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium hover:bg-white/20 transition-colors">
                See the fleet <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <dl className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 max-w-4xl">
            {[
              ['Fleet', `${NAJD.fleetSize} cars`],
              ['Renting in Dubai', `Since ${NAJD.since}`],
              ['Google rating', `${NAJD.googleRating} from ${NAJD.googleReviewCount} reviews`],
              ['Dubai licence', NAJD.licence],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0B0C0F]/70 backdrop-blur-md px-4 py-4">
                <dt className="text-[11px] text-white/60">{k}</dt>
                <dd className="mt-1 text-[15px] font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.18em] text-[#70756f]">THE FLEET</p>
            <h2 className="mt-3 text-[28px] sm:text-[38px] font-medium tracking-[-0.03em] leading-[1.15] text-[#111318]">
              Choose the car. We arrange the rest.
            </h2>
            <p className="mt-3 text-[15px] text-[#5B6170] leading-relaxed">
              Tap Book on any car. Your Tuwaiq consultant confirms availability, delivery and the final quote with Najd before anything is booked.
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0" role="group" aria-label="Filter cars">
            {FLEET_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
                className={`h-10 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  group === g.id ? 'bg-[#111318] text-white' : 'bg-[#F3F4F1] text-[#2F3440] hover:bg-[#E9EBE6]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car) => {
            const rate = headlineRate(car);
            return (
              <li key={car.slug} className="group flex flex-col rounded-[20px] border border-[#E7E9E4] bg-white overflow-hidden transition-shadow hover:shadow-[0_18px_40px_rgba(17,19,24,0.08)]">
                <div className="relative bg-white">
                  <img
                    src={fleetImage(car)}
                    alt={`${car.name}, ${car.label.toLowerCase()} available from Najd Rent a Car`}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full aspect-[8/5] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {car.group === 'vip' && (
                    <span className="absolute top-4 left-4 rounded-full bg-[#111318] px-3 py-1 text-[11px] font-medium text-white">VIP</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col border-t border-[#F0F1EE] p-5">
                  <p className="text-[12px] text-[#70756f]">{car.label}</p>
                  <h3 className="mt-1 text-[19px] font-medium tracking-[-0.02em] text-[#111318]">{car.name}</h3>
                  <p className="mt-3 flex items-center gap-4 text-[13px] text-[#5B6170]">
                    <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" aria-hidden="true" />{car.seats} seats</span>
                    {car.bags ? <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4" aria-hidden="true" />{car.bags} bags</span> : null}
                    <span className="inline-flex items-center gap-1.5"><KeyRound className="w-4 h-4" aria-hidden="true" />Automatic</span>
                  </p>
                  <div className="mt-auto pt-5 flex items-end justify-between gap-3">
                    <div>
                      {rate ? (
                        <>
                          <p className="text-[11px] text-[#70756f]">From</p>
                          <p className="text-[18px] font-medium text-[#111318] tabular-nums">
                            {aed(rate.amount)} <span className="text-[13px] font-normal text-[#70756f]">/ {rate.unit}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-[14px] font-medium text-[#111318]">Rate on request</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={najdCarUrl(car)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E2E4DF] text-[#5B6170] hover:text-[#111318] hover:border-[#C9CDC5]"
                        aria-label={`${car.name} details on najdrentacar.com`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <BookingContactButton subject={`Car rental: ${car.name}`} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[12px] text-[#70756f]">{NAJD.rateNote}</p>
      </section>

      {/* Chauffeur band */}
      <section className="bg-[#0E0F12] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.18em] text-white/60">CHAUFFEUR-DRIVEN</p>
            <h2 className="mt-3 text-[28px] sm:text-[38px] font-medium tracking-[-0.03em] leading-[1.15]">
              For VIP guests, executives and delegations.
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-white/75 leading-relaxed max-w-xl">
              Add a chauffeur-driven Escalade, Suburban, S-Class or 7 Series to a VIP itinerary, a business trip or an event. Tell us the schedule and the number of guests, and we plan the cars around it.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <BookingContactButton subject="Chauffeur-driven car with Najd Rent a Car" label="Request a chauffeur" className="!rounded-full !px-6 !min-h-[48px] !text-[14px]" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-[11px] tracking-[0.18em] text-[#70756f]">HOW IT WORKS</p>
        <h2 className="mt-3 text-[28px] sm:text-[34px] font-medium tracking-[-0.03em] text-[#111318]">One booking for your trip and your car.</h2>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            [Car, 'Choose a car', 'Pick a car above, or tell us how many people are travelling and we suggest one.'],
            [CalendarDays, 'Share your dates', 'Leave your name and number. We confirm the dates, your hotel or address, and self-drive or chauffeur.'],
            [MapPin, 'Delivered to you', 'Najd confirms the quote and delivery before you pay. The car arrives where you are staying.'],
          ].map(([Icon, title, body], i) => {
            const I = Icon as typeof Car;
            return (
              <li key={title as string} className="border-t border-[#E7E9E4] pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-[#F3F4F1]"><I className="w-5 h-5 text-[#111318]" aria-hidden="true" /></span>
                  <span className="text-[12px] text-[#70756f] tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-[18px] font-medium text-[#111318]">{title as string}</h3>
                <p className="mt-2 text-[15px] text-[#5B6170] leading-relaxed">{body as string}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Najd card + FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4">
          <div className="rounded-[20px] border border-[#E7E9E4] bg-[#F7F8F5] p-6 lg:sticky lg:top-24">
            <img src="/images/najd-fleet/najd-rent-a-car-logo.png" alt="Najd Rent a Car logo" width={600} height={267} loading="lazy" className="h-12 w-auto" />
            <p className="mt-5 text-[15px] text-[#2F3440] leading-relaxed">
              Najd Rent a Car is part of Al Basel Group, like Tuwaiq Travel. It has rented cars in Dubai since {NAJD.since} and holds Dubai trade licence {NAJD.licence}.
            </p>
            <ul className="mt-5 space-y-2 text-[14px] text-[#2F3440]">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1d7a46]" aria-hidden="true" />Licensed car rental company</li>
              <li className="flex items-center gap-2"><Star className="w-4 h-4 text-[#1d7a46]" aria-hidden="true" />{NAJD.googleRating} on Google ({NAJD.googleReviewCount} reviews, {NAJD.googleRatingChecked})</li>
              <li className="flex items-center gap-2"><Car className="w-4 h-4 text-[#1d7a46]" aria-hidden="true" />{NAJD.fleetSize} cars, from economy to VIP</li>
            </ul>
            <a href={NAJD.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#111318] underline underline-offset-4">
              Visit najdrentacar.com <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <FaqSection faqs={page.faqs} />
        </div>
      </section>
    </Layout>
  );
}
