import { ArrowUpRight } from 'lucide-react';
import { whatsAppUrl } from '../data/siteConfig';

declare global {
  interface Window {
    SiteLeads?: { open: (opts: { subject?: string; source?: string; waText?: string; choose?: boolean }) => void };
  }
}

/**
 * "Book" button. Opens the lead form from /leads/leads.js (name and phone first, then WhatsApp).
 * If that script has not loaded, it falls back to WhatsApp directly.
 */
export function BookingContactButton({subject,className='',label='Book'}:{subject:string;className?:string;label?:string}) {
 const onClick=()=>{
  if (window.SiteLeads) { window.SiteLeads.open({ subject, source: `${label} button`, choose: true }); return; }
  window.open(whatsAppUrl(subject), '_blank', 'noopener');
 };
 return <button type="button" className={`booking-contact-trigger ${className}`} aria-haspopup="dialog" onClick={onClick}>{label}<ArrowUpRight aria-hidden="true" /></button>;
}
