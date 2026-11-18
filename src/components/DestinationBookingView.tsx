import { ArrowLeft, ArrowRight, CalendarDays, Check, Compass, Lightbulb, MapPin, Sun } from 'lucide-react';
import { Layout } from './Layout';
import { Breadcrumbs, FaqSection, GuideCard, PackageCard } from './Cards';
import { CountryFlag } from './CountryFlag';
import { BookingContactButton } from './BookingContactButton';
import { BookingQuotePanel } from './BookingQuotePanel';
import { getActivePackages } from '../data/routes';
import { DESTINATIONS, type DestinationItem } from '../data/destinations';
import { GUIDES } from '../data/guides';
import type { BreadcrumbItem } from '../lib/seo';

export function DestinationBookingView({destination:d,breadcrumbs}:{destination:DestinationItem;breadcrumbs:BreadcrumbItem[]}) {
 const packages=getActivePackages().filter(item=>d.matchingPackageSlugs.includes(item.slug));
 const guides=GUIDES.filter(item=>d.relatedGuideSlugs.includes(item.slug));
 const others=DESTINATIONS.filter(item=>item.slug!==d.slug).slice(0,4);
 const subject=`${d.name} Tailored Holiday`;
 return <Layout currentPath={d.url} hideBottomNav><div className="booking-page">
  <div className="booking-photo"><img src={d.image} alt={d.imageAlt} width={d.imageWidth} height={d.imageHeight} fetchPriority="high" /><div className="booking-photo-shade" /><div className="booking-container booking-photo-caption"><a href="/destinations/" className="booking-back"><ArrowLeft aria-hidden="true" />All destinations</a><span><MapPin aria-hidden="true" />{d.name}</span></div></div>
  <div className="booking-container booking-introduction"><Breadcrumbs items={breadcrumbs} /><div className="booking-title-row"><div><div className="booking-kicker"><CountryFlag code={d.countryCode} className="w-5 h-3.5" />{d.secondaryCountryCode&&<CountryFlag code={d.secondaryCountryCode} className="w-5 h-3.5" />}{d.regionLabel}</div><h1>{d.h1}</h1><p className="booking-destination-tagline">{d.tagline}</p></div><BookingContactButton subject={subject} className="booking-title-action" /></div><div className="booking-glance"><div><CalendarDays aria-hidden="true" /><div><small>Your time away</small><strong>{packages.length?packages[0].durationLabel:'Custom duration'}</strong></div></div><div><Sun aria-hidden="true" /><div><small>A good time to go</small><strong>{d.bestTime}</strong></div></div><div><Compass aria-hidden="true" /><div><small>A trip for</small><strong>{d.idealFor}</strong></div></div></div></div>
  <div className="booking-container booking-layout"><div className="booking-content"><nav className="booking-section-nav" aria-label="Destination sections">{[['#overview','The experience'],['#highlights','Highlights'],['#packages','Holiday options'],['#faqs','Questions']].map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav>
   <section id="overview" className="booking-section booking-overview"><span className="booking-eyebrow">A LITTLE TASTE OF {d.name.toUpperCase()}</span><h2>Picture yourself here.</h2><p className="booking-lead">{d.overview}</p><div className="booking-tip"><Lightbulb aria-hidden="true" /><div><h3>A note from your travel consultant</h3><p>{d.consultantNote}</p></div></div></section>
   <section id="highlights" className="booking-section"><span className="booking-eyebrow">PLACES, MOMENTS AND POSSIBILITIES</span><h2>A few reasons to go.</h2><ul className="booking-destination-highlights">{d.highlights.map(item=><li key={item}><span><Check aria-hidden="true" /></span><strong>{item}</strong></li>)}</ul></section>
   <section id="packages" className="booking-section"><span className="booking-eyebrow">FIND YOUR WAY TO {d.name.toUpperCase()}</span><h2>{packages.length?`Explore ${d.name} packages.`:`A ${d.name} trip, shaped around you.`}</h2>{packages.length?<div className="booking-destination-packages">{packages.map(item=><PackageCard key={item.slug} pkg={item} />)}</div>:<><p className="booking-lead">Tell us when you’d like to visit {d.name}, who’s travelling and the hotel style you prefer. Your consultant can put together options for your trip.</p><BookingContactButton subject={subject} /></>}</section>
   <section className="booking-section booking-faq"><span className="booking-eyebrow">A FEW THINGS YOU MIGHT WONDER</span><FaqSection faqs={d.faqs} /></section><div className="booking-useful-links"><a href="/how-booking-works/">How booking works <ArrowRight aria-hidden="true" /></a><a href="/licence/">Licence & verification <ArrowRight aria-hidden="true" /></a><a href="/destinations/">All destinations <ArrowRight aria-hidden="true" /></a></div></div>
   <BookingQuotePanel subject={subject} price={d.startingPriceAed} />
  </div>
  <div className="booking-container booking-more">{guides.length>0&&<section><div className="booking-section-heading"><div><span className="booking-eyebrow">A LITTLE LOCAL KNOWLEDGE</span><h2>Read before you go.</h2></div><a href="/guides/" className="booking-text-link">All travel guides <ArrowRight aria-hidden="true" /></a></div><div className="booking-guide-grid">{guides.map(item=><GuideCard key={item.slug} guide={item} />)}</div></section>}<section><div className="booking-section-heading"><div><span className="booking-eyebrow">KEEP EXPLORING</span><h2>Somewhere else in mind?</h2></div><a href="/destinations/" className="booking-text-link">All destinations <ArrowRight aria-hidden="true" /></a></div><div className="booking-destination-links">{others.map(item=><a key={item.slug} href={item.url}><MapPin aria-hidden="true" /><span>{item.name}</span><ArrowRight aria-hidden="true" /></a>)}</div></section></div>
  <div className="booking-mobile-bar"><div><small>{d.startingPriceAed?'From · per person':'Your next escape'}</small><strong>{d.startingPriceAed?`AED ${d.startingPriceAed.toLocaleString('en-US')}`:'Price on request'}</strong></div><BookingContactButton subject={subject} /></div>
 </div></Layout>;
}
