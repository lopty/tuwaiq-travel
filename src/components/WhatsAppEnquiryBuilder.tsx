import { useId, useState } from 'react';
import { ArrowUpRight, CalendarDays, Car, ChevronDown, MessageCircle, Phone, Users } from 'lucide-react';
import { COMPANY, WHATSAPP_GREETING } from '../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppEnquiryBuilderProps {
 defaultSubject:string;
 contextLabel?:string;
 fixedSelection?:boolean;
 defaultDirection?:'Outbound from Dubai'|'Inbound to UAE / Dubai'|'Both / Multi-Country';
 defaultCarRental?:boolean;
 darkSurface?:boolean;
 compact?:boolean;
}
const PLANNING_OPTIONS=['A holiday package','Flights','Hotel booking','Visa help','Tours and experiences in the UAE','Corporate or VIP travel','Something else'];
const TRAVELLER_OPTIONS=['Two adults','Family with children','Just me','A group of four or more','Corporate or VIP delegation'];

export function WhatsAppEnquiryBuilder({defaultSubject,contextLabel='What are you planning?',fixedSelection=false,defaultCarRental=false,darkSurface=false,compact=false}:WhatsAppEnquiryBuilderProps) {
 const id=useId();
 const options=PLANNING_OPTIONS.includes(defaultSubject)?PLANNING_OPTIONS:[defaultSubject,...PLANNING_OPTIONS];
 const [subject,setSubject]=useState(defaultSubject);
 const [dates,setDates]=useState('');
 const [travellers,setTravellers]=useState(TRAVELLER_OPTIONS[0]);
 const [car,setCar]=useState(defaultCarRental);
 const [notes,setNotes]=useState('');
 const message=[WHATSAPP_GREETING,'I would like a quote.',`Planning: ${subject}`,`Dates: ${dates.trim()||'Flexible'}`,`Travellers: ${travellers}`,...(car?['Also need: a car or chauffeur in the UAE (Najd Rent a Car)']:[]),...(notes.trim()?[`Notes: ${notes.trim()}`]:[])].join('\n');
 const href=`https://wa.me/${COMPANY.contact.whatsappDigits}?text=${encodeURIComponent(message)}`;
 return <div id="enquire" className={`travel-enquiry enquiry-redesign ${compact?'enquiry-compact':''} ${darkSurface?'enquiry-dark':''}`}>
  <div className="enquiry-heading"><span className="enquiry-heading-icon"><MessageCircle aria-hidden="true" /></span><div><h3>{compact?'Make this trip yours.':'Let’s plan your trip.'}</h3><p>{compact?'A few details to get the conversation started.':'Tell us a little about your plans. We’ll take it from there.'}</p></div></div>
  {fixedSelection?(compact?null:<div className="enquiry-selection"><small>{contextLabel}</small><span>{subject}</span></div>):<div className="enquiry-subject"><label htmlFor={`${id}-subject`}>{contextLabel}</label><select id={`${id}-subject`} value={subject} onChange={event=>setSubject(event.target.value)}>{options.map(option=><option key={option}>{option}</option>)}</select></div>}
  <div className="enquiry-fields"><div><label htmlFor={`${id}-dates`}><CalendarDays aria-hidden="true" />When would you like to go?</label><input id={`${id}-dates`} type="text" value={dates} onChange={event=>setDates(event.target.value)} placeholder="Dates, month or ‘flexible’" maxLength={120} /></div><div><label htmlFor={`${id}-travellers`}><Users aria-hidden="true" />Who’s coming along?</label><select id={`${id}-travellers`} value={travellers} onChange={event=>setTravellers(event.target.value)}>{TRAVELLER_OPTIONS.map(option=><option key={option}>{option}</option>)}</select></div></div>
  <details className="enquiry-extras" open={defaultCarRental||undefined}><summary>Anything else? <span>Optional</span><ChevronDown aria-hidden="true" /></summary><div><label htmlFor={`${id}-notes`}>What would make it your kind of trip?</label><textarea id={`${id}-notes`} value={notes} onChange={event=>setNotes(event.target.value)} placeholder="Your budget, hotel style or any questions" rows={2} maxLength={1600} /><label className="enquiry-car"><input type="checkbox" checked={car} onChange={event=>setCar(event.target.checked)} /><Car aria-hidden="true" /><span>Add a UAE car or chauffeur<small>Through Najd Rent a Car</small></span></label></div></details>
  <a href={href} target="_blank" rel="noopener noreferrer" className="enquiry-send"><WhatsAppIcon className="w-4 h-4" /><span>Request a quote</span><ArrowUpRight aria-hidden="true" /></a>
  <p className="enquiry-footnote">Opens WhatsApp with your details. Your consultant will confirm availability and the final price.</p>
  {!compact&&<a className="enquiry-phone" href={`tel:${COMPANY.contact.officeTel}`}><Phone aria-hidden="true" />Or call {COMPANY.contact.officeDisplay}</a>}
 </div>;
}
