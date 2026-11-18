import { useId, useRef } from 'react';
import { ArrowUpRight, Phone, X } from 'lucide-react';
import { COMPANY, whatsAppUrl } from '../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

export function BookingContactButton({subject,className='',label='Book'}:{subject:string;className?:string;label?:string}) {
 const dialog=useRef<HTMLDialogElement>(null);
 const title=useId();
 return <>
  <button type="button" className={`booking-contact-trigger ${className}`} aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}>{label}<ArrowUpRight aria-hidden="true" /></button>
  <dialog ref={dialog} className="booking-contact-dialog" aria-labelledby={title} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
   <button type="button" className="booking-dialog-close" aria-label="Close booking options" onClick={()=>dialog.current?.close()}><X aria-hidden="true" /></button>
   <span className="booking-dialog-eyebrow">YOUR NEXT TRIP STARTS HERE</span>
   <h2 id={title}>How would you like<br />to book?</h2>
   <div className="booking-dialog-trip"><span>Your selected trip</span><strong>{subject}</strong></div>
   <a href={`tel:${COMPANY.contact.officeTel}`} className="booking-dialog-choice"><span className="booking-dialog-choice-icon"><Phone aria-hidden="true" /></span><span><strong>Call our travel team</strong><small>{COMPANY.contact.officeDisplay}</small></span><ArrowUpRight aria-hidden="true" /></a>
   <a href={whatsAppUrl(subject)} target="_blank" rel="noopener noreferrer" className="booking-dialog-choice booking-dialog-whatsapp"><span className="booking-dialog-choice-icon"><WhatsAppIcon className="w-5 h-5" /></span><span><strong>Continue on WhatsApp</strong><small>Your trip is included in the message</small></span><ArrowUpRight aria-hidden="true" /></a>
   <p>Our team will confirm your options, availability and final price.</p>
  </dialog>
 </>;
}
