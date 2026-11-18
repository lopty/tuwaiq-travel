import { useId, useState } from 'react';
import { Phone } from 'lucide-react';
import { COMPANY } from '../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppEnquiryBuilderProps {
  defaultSubject: string;
  contextLabel?: string;
  fixedSelection?: boolean;
  /** Kept for compatibility with existing call sites; no longer shown as a field. */
  defaultDirection?: 'Outbound from Dubai' | 'Inbound to UAE / Dubai' | 'Both / Multi-Country';
  defaultCarRental?: boolean;
  darkSurface?: boolean;
}

const PLANNING_OPTIONS = [
  'A holiday package',
  'Flights',
  'Hotel booking',
  'Visa help',
  'Tours and experiences in the UAE',
  'Corporate or VIP travel',
  'Something else',
];

const TRAVELLER_OPTIONS = ['Two adults', 'Family with children', 'Just me', 'A group of four or more', 'Corporate or VIP delegation'];

/**
 * Short enquiry form. Nothing is submitted to a server: the answers are turned into a
 * WhatsApp message that opens in the visitor's own WhatsApp.
 */
export function WhatsAppEnquiryBuilder({
  defaultSubject,
  contextLabel = 'What are you planning?',
  fixedSelection = false,
  defaultCarRental = false,
  darkSurface = false,
}: WhatsAppEnquiryBuilderProps) {
  const id = useId();
  const options = PLANNING_OPTIONS.includes(defaultSubject) ? PLANNING_OPTIONS : [defaultSubject, ...PLANNING_OPTIONS];
  const [subject, setSubject] = useState(defaultSubject);
  const [dates, setDates] = useState('');
  const [travellers, setTravellers] = useState(TRAVELLER_OPTIONS[0]);
  const [car, setCar] = useState(defaultCarRental);
  const [notes, setNotes] = useState('');

  const message = [
    'Hello Tuwaiq Travel, I would like a quote.',
    `Planning: ${subject}`,
    `Dates: ${dates.trim() || 'Flexible'}`,
    `Travellers: ${travellers}`,
    ...(car ? ['Also need: a car or chauffeur in the UAE (Najd Rent a Car)'] : []),
    ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
  ].join('\n');
  const href = `https://wa.me/${COMPANY.contact.whatsappDigits}?text=${encodeURIComponent(message)}`;

  const surface = darkSurface ? 'bg-[#17181C] border-white/10 text-white' : 'bg-white border-[#E8EAEE] text-[#111318] shadow-sm';
  const field = darkSurface
    ? 'bg-white/5 border-white/15 text-white placeholder:text-white/45 focus:border-[#FFFFFF]'
    : 'bg-[#F7F8FA] border-[#E5E7EB] text-[#111318] placeholder:text-[#8A8185] focus:border-[#C31A20]';
  const label = `block text-xs font-medium mb-1.5 ${darkSurface ? 'text-white/70' : 'text-[#5B6170]'}`;
  const input = `w-full h-12 px-4 rounded-2xl border text-sm focus:outline-none transition-colors ${field}`;

  return (
    <div id="enquire" className={`rounded-[24px] border p-5 sm:p-8 scroll-mt-24 ${surface}`}>
      <h3 className="text-xl sm:text-2xl font-semibold">Plan your trip</h3>
      <p className={`mt-1 text-sm ${darkSurface ? 'text-white/70' : 'text-[#5B6170]'}`}>
        Share the basics. A consultant replies on WhatsApp with options and prices.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-subject`} className={label}>{contextLabel}</label>
          {fixedSelection ? (
            <p id={`${id}-subject`} className={`${input} flex items-center font-medium truncate`}>{subject}</p>
          ) : (
            <select id={`${id}-subject`} value={subject} onChange={(e) => setSubject(e.target.value)} className={input}>
              {options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-dates`} className={label}>When</label>
          <input
            id={`${id}-dates`}
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            placeholder="e.g. 10 to 15 March, or flexible"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`${id}-travellers`} className={label}>Who is travelling</label>
          <select id={`${id}-travellers`} value={travellers} onChange={(e) => setTravellers(e.target.value)} className={input}>
            {TRAVELLER_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-notes`} className={label}>Anything else (optional)</label>
          <input
            id={`${id}-notes`}
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Budget, hotel style, visa questions"
            className={input}
          />
        </div>
      </div>

      <label className={`mt-4 flex items-center gap-2.5 text-sm cursor-pointer ${darkSurface ? 'text-white/80' : 'text-[#2F3440]'}`}>
        <input type="checkbox" checked={car} onChange={(e) => setCar(e.target.checked)} className="w-4 h-4 accent-[#C31A20]" />
        Add a car or chauffeur in the UAE, through our sister company Najd Rent a Car
      </label>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-sm font-semibold transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          Send on WhatsApp
        </a>
        <a
          href={`tel:${COMPANY.contact.officeTel}`}
          className={`inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border text-sm font-semibold transition-colors ${
            darkSurface ? 'border-white/25 text-white hover:border-white/60' : 'border-[#D9DCE1] text-[#111318] hover:border-[#111318]'
          }`}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call {COMPANY.contact.officeDisplay}
        </a>
      </div>
    </div>
  );
}
