import { BookingQuotePanel } from './BookingQuotePanel';
import { BookingContactButton } from './BookingContactButton';
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, Compass, FileCheck2, Lightbulb, MapPin, Phone, Sun, X } from 'lucide-react';
import { Layout } from './Layout';
import { Breadcrumbs, FaqSection, GuideCard, PackageCard } from './Cards';
import { CountryFlag } from './CountryFlag';
import { WhatsAppEnquiryBuilder } from './WhatsAppEnquiryBuilder';
import { COMPANY, FEATURE_FLAGS } from '../data/siteConfig';
import { getActivePackages } from '../data/routes';
import { DESTINATIONS } from '../data/destinations';
import { GUIDES } from '../data/guides';
import type { TravelPackage } from '../data/packages';
import type { BreadcrumbItem } from '../lib/seo';

export function PackageBookingView({pkg,breadcrumbs}:{pkg:TravelPackage;breadcrumbs:BreadcrumbItem[]}) {
 const seasonal=pkg.category==='national-day';
 const departed=seasonal&&FEATURE_FLAGS.nationalDayDeparted;
 const related=getActivePackages().filter(item=>item.slug!==pkg.slug).slice(0,3);
 const guides=GUIDES.filter(guide=>pkg.relatedGuideSlugs.includes(guide.slug));
 const destination=DESTINATIONS.find(item=>(item.countryCode===pkg.countryCode||item.secondaryCountryCode===pkg.countryCode)&&item.matchingPackageSlugs.includes(pkg.slug));
 return <Layout currentPath={pkg.url} hideBottomNav>
  <div className="booking-page">
   <div className="booking-photo">
    <img src={pkg.image} alt={pkg.imageAlt} width={pkg.imageWidth} height={pkg.imageHeight} fetchPriority="high" />
    <div className="booking-photo-shade" />
    <div className="booking-container booking-photo-caption"><a href={seasonal?'/offers/':'/packages/'} className="booking-back"><ArrowLeft aria-hidden="true" />{seasonal?'All seasonal offers':'All holiday packages'}</a><span><MapPin aria-hidden="true" />{pkg.destinationName}</span></div>
   </div>

   <div className="booking-container booking-introduction">
    <Breadcrumbs items={breadcrumbs} />
    <div className="booking-title-row"><div><div className="booking-kicker"><CountryFlag code={pkg.countryCode} className="w-5 h-3.5" />{pkg.destinationName}<span> / </span>{pkg.cities}</div><h1>{pkg.h1}</h1></div><BookingContactButton subject={pkg.name} className="booking-title-action" /></div>
    {pkg.departureDate&&!departed&&<div className="booking-departure"><CalendarDays aria-hidden="true" />UAE National Day departure · 2 December 2026</div>}
    <div className="booking-glance"><div><CalendarDays aria-hidden="true" /><div><small>Your time away</small><strong>{pkg.durationLabel}</strong></div></div><div><Sun aria-hidden="true" /><div><small>A good time to go</small><strong>{pkg.bestTime}</strong></div></div><div><Compass aria-hidden="true" /><div><small>A trip for</small><strong>{pkg.idealFor}</strong></div></div></div>
   </div>

   <div className="booking-container booking-layout">
    <div className="booking-content">
     <nav className="booking-section-nav" aria-label="Package sections">{[['#overview','The experience'],['#itinerary','Your itinerary'],['#included','What’s included'],['#faqs','Questions']].map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav>
     <section id="overview" className="booking-section booking-overview"><span className="booking-eyebrow">A LITTLE TASTE OF THE TRIP</span><h2>Picture yourself here.</h2><p className="booking-lead">{pkg.overview}</p><div className="booking-tip"><Lightbulb aria-hidden="true" /><div><h3>A note from your travel consultant</h3><p>{pkg.consultantNote}</p></div></div></section>

     <section id="itinerary" className="booking-section"><div className="booking-section-heading"><div><span className="booking-eyebrow">ONE DAY AT A TIME</span><h2>Your trip, day by day.</h2></div><span className="booking-caption">Sample itinerary</span></div><p className="booking-support">A starting point for your plans. Timings can be adjusted around your flights.</p><div className="booking-timeline">{pkg.sampleItinerary.map((item,index)=><details key={item.day} open={index===0}><summary><span className="booking-day">{String(index+1).padStart(2,'0')}</span><span className="booking-day-title"><small>{item.day}</small><strong>{item.title}</strong></span><ChevronDown aria-hidden="true" /></summary><div className="booking-day-body"><p>{item.details}</p></div></details>)}</div></section>

     <section id="included" className="booking-section"><span className="booking-eyebrow">THE DETAILS, MADE CLEAR</span><h2>Know what’s in your trip.</h2><div className="booking-inclusion-grid"><div className="booking-inclusion-list"><h3><span className="booking-mini-icon"><Check aria-hidden="true" /></span>Included in the package</h3><ul>{pkg.included.map(item=><li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul></div><div className="booking-inclusion-list booking-exclusions"><h3><span className="booking-mini-icon"><X aria-hidden="true" /></span>Budget for separately</h3><ul>{pkg.notIncluded.map(item=><li key={item}><X aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div><details className="booking-visa"><summary><FileCheck2 aria-hidden="true" /><span>Before you travel: visas and entry</span><ChevronDown aria-hidden="true" /></summary><p>{pkg.visaNote}</p></details></section>

     <section className="booking-section booking-faq"><span className="booking-eyebrow">A FEW THINGS YOU MIGHT WONDER</span><FaqSection faqs={pkg.faqs} /></section>
     <div className="booking-useful-links">{destination&&<a href={destination.url}>Explore {destination.name}<ArrowRight aria-hidden="true" /></a>}<a href="/how-booking-works/">How booking works <ArrowRight aria-hidden="true" /></a><a href="/licence/">Licence & verification <ArrowRight aria-hidden="true" /></a></div>
    </div>

    <BookingQuotePanel subject={pkg.name} price={pkg.priceAed} departed={departed} />

   </div>

   <div className="booking-container booking-more">{guides.length>0&&<section><div className="booking-section-heading"><div><span className="booking-eyebrow">A LITTLE LOCAL KNOWLEDGE</span><h2>Read before you go.</h2></div><a className="booking-text-link" href="/guides/">All travel guides <ArrowRight aria-hidden="true" /></a></div><div className="booking-guide-grid">{guides.map(guide=><GuideCard key={guide.slug} guide={guide} />)}</div></section>}<section><div className="booking-section-heading"><div><span className="booking-eyebrow">KEEP EXPLORING</span><h2>Somewhere else in mind?</h2></div><a className="booking-text-link" href="/packages/">All holiday packages <ArrowRight aria-hidden="true" /></a></div><div className="booking-related-grid">{related.map(item=><PackageCard key={item.slug} pkg={item} />)}</div></section></div>

   <div className="booking-mobile-bar"><div>{departed?<strong>Find another departure</strong>:<><small>per person</small><strong>From AED {pkg.priceAed.toLocaleString('en-US')}</strong></>}</div><BookingContactButton subject={pkg.name} /></div>
  </div>
 </Layout>;
}
