import { Phone } from 'lucide-react';
import { COMPANY } from '../data/siteConfig';
import { WhatsAppEnquiryBuilder } from './WhatsAppEnquiryBuilder';

export function BookingQuotePanel({subject,price,departed=false}:{subject:string;price?:number;departed?:boolean}) {
 return <aside className="booking-sidebar" aria-label="Trip price and enquiry"><div className="booking-quote-card"><div className="booking-quote-price">{departed?<><span className="booking-eyebrow">THIS DEPARTURE HAS PASSED</span><h2>Let’s find your next trip.</h2></>:price?<><span className="booking-eyebrow">YOUR NEXT ESCAPE</span><div className="booking-price"><small>From</small><strong>AED {price.toLocaleString('en-US')}</strong></div><p>per person, based on two sharing</p></>:<><span className="booking-eyebrow">YOUR NEXT ESCAPE</span><h2>Price on request</h2><p>Tailored to your dates and preferences.</p></>}</div><WhatsAppEnquiryBuilder defaultSubject={departed?`Alternatives to ${subject}`:price?`${subject} (From AED ${price.toLocaleString('en-US')})`:subject} contextLabel="Your selected trip" fixedSelection compact /><div className="booking-call"><Phone aria-hidden="true" /><span>Prefer a conversation?</span><a href={`tel:${COMPANY.contact.officeTel}`}>{COMPANY.contact.officeDisplay}</a></div></div></aside>;
}
