import { useState } from 'react';
import { Car, Check, ExternalLink, Phone, Sparkles } from 'lucide-react';
import { COMPANY } from '../data/siteConfig';
import { GENERAL_PACKAGES, NATIONAL_DAY_OFFERS } from '../data/packages';
import { DESTINATIONS } from '../data/destinations';
import { SERVICES } from '../data/services';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppEnquiryBuilderProps {
  defaultSubject: string;
  contextLabel?: string;
  fixedSelection?: boolean;
  defaultDirection?: 'Outbound from Dubai' | 'Inbound to UAE / Dubai' | 'Both / Multi-Country';
  defaultCarRental?: boolean;
  darkSurface?: boolean;
}

const VEHICLE_OPTIONS = [
  'Economy / Daily Sedan',
  'Family 4x4 SUV',
  'Luxury / Sports Car',
  'Chauffeur Limousine + Airport Transfer',
] as const;

const GUEST_OPTIONS = [
  '2 Adults (Couple)',
  'Family (Adults + Children)',
  'Solo Traveller',
  'Small Group (4 to 8 Guests)',
  'Corporate / VIP Delegation',
] as const;

export function WhatsAppEnquiryBuilder({
  defaultSubject,
  contextLabel = 'Package or Service',
  fixedSelection = false,
  defaultDirection = 'Outbound from Dubai',
  defaultCarRental = false,
  darkSurface = false,
}: WhatsAppEnquiryBuilderProps) {
  const [selectedService, setSelectedService] = useState<string>(defaultSubject);
  const [selectedPackageOrDest, setSelectedPackageOrDest] = useState<string>('');
  const [direction, setDirection] = useState<string>(defaultDirection);
  const [dates, setDates] = useState<string>('');
  const [guests, setGuests] = useState<string>(GUEST_OPTIONS[0]);
  const [needCarRental, setNeedCarRental] = useState<boolean>(defaultCarRental);
  const [vehicleType, setVehicleType] = useState<string>(VEHICLE_OPTIONS[1]);
  const [notes, setNotes] = useState<string>('');

  const allPackages = [...GENERAL_PACKAGES, ...NATIONAL_DAY_OFFERS];

  const buildWhatsAppMessage = (): string => {
    const lines = [
      'Hello Tuwaiq Travel, I would like to request a quote with the following details:',
      `- Primary Interest: ${selectedService || defaultSubject}`,
      `- Travel Direction: ${direction}`,
    ];

    if (selectedPackageOrDest) {
      lines.push(`- Preferred Package / Destination: ${selectedPackageOrDest}`);
    }

    lines.push(`- Guests: ${guests}`);
    lines.push(`- Preferred Dates: ${dates.trim() ? dates.trim() : 'Flexible dates'}`);
    lines.push(
      needCarRental
        ? `- Car Rental Needed: Yes, ${vehicleType} (via Najd Rent a Car)`
        : '- Car Rental Needed: No'
    );

    if (notes.trim()) {
      lines.push(`- Additional Inquiries: ${notes.trim()}`);
    }

    return lines.join('\n');
  };

  const fullMessage = buildWhatsAppMessage();
  const href = `https://wa.me/${COMPANY.contact.whatsappDigits}?text=${encodeURIComponent(fullMessage)}`;

  const cardSurface = darkSurface
    ? 'bg-[#1D1719] border-white/10 text-white'
    : 'bg-[#F8F6F5] border-[#EAE3DF] text-[#1B1718]';

  const inputSurface = darkSurface
    ? 'bg-black/40 border-white/15 text-white placeholder:text-white/45 focus:border-[#E2CC96]'
    : 'bg-white border-[#DED6D2] text-[#1B1718] placeholder:text-[#766D71] focus:border-[#C31A20]';

  const labelTone = darkSurface ? 'text-white/75' : 'text-[#574F52]';

  return (
    <div id="enquire" className={`rounded-[22px] border p-5 sm:p-7 scroll-mt-24 ${cardSurface}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-current/10">
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-wider ${darkSurface ? 'text-[#E2CC96]' : 'text-[#8C6822]'}`}>
            Instant WhatsApp Concierge
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mt-0.5">
            Build Your Enquiry Brief
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${darkSurface ? 'text-white/70' : 'text-[#6B6266]'}`}>
          <Sparkles className="w-3.5 h-3.5 text-[#B88E3D]" aria-hidden="true" />
          <span>Full context sent to our Dubai desk</span>
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service / Primary Subject */}
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
            {contextLabel}
          </label>
          {fixedSelection ? (
            <div className={`h-11 px-3.5 rounded-xl border flex items-center text-sm font-medium truncate ${darkSurface ? 'bg-black/30 border-white/15 text-white' : 'bg-white/80 border-[#DED6D2] text-[#1B1718]'}`}>
              {selectedService}
            </div>
          ) : (
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={`w-full h-11 px-3.5 rounded-xl border text-sm focus:outline-none ${inputSurface}`}
            >
              <option value="Custom Holiday Package">Custom Holiday Package</option>
              <option value="Inbound UAE & Dubai Holiday">Inbound UAE &amp; Dubai Holiday</option>
              <option value="Dubai Car Rental & Transfers (Najd Rent a Car)">Car Rental &amp; Chauffeur (Najd Rent a Car)</option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Inbound vs Outbound */}
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
            Travel Direction
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className={`w-full h-11 px-3.5 rounded-xl border text-sm focus:outline-none ${inputSurface}`}
          >
            <option value="Outbound from Dubai">Outbound from Dubai / UAE</option>
            <option value="Inbound to UAE / Dubai">Inbound Visit to UAE / Dubai</option>
            <option value="Both / Multi-Country">Multi-Country / Stopover</option>
          </select>
        </div>

        {/* Optional Package or Destination Pairing */}
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
            {fixedSelection ? 'Add Another Package or Destination (Optional)' : 'Preferred Package or Destination (Optional)'}
          </label>
          <select
            value={selectedPackageOrDest}
            onChange={(e) => setSelectedPackageOrDest(e.target.value)}
            className={`w-full h-11 px-3.5 rounded-xl border text-sm focus:outline-none ${inputSurface}`}
          >
            <option value="">None / Discuss with consultant</option>
            <optgroup label="Priced Packages">
              {allPackages.map((p) => (
                <option key={p.slug} value={`${p.shortTitle} (From AED ${p.priceAed})`}>
                  {p.shortTitle} (From AED {p.priceAed.toLocaleString('en-US')})
                </option>
              ))}
            </optgroup>
            <optgroup label="Destinations">
              {DESTINATIONS.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Guests & Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
              Travellers
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`w-full h-11 px-3 rounded-xl border text-sm focus:outline-none ${inputSurface}`}
            >
              {GUEST_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
              Travel Dates
            </label>
            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="e.g. Dec 2026"
              className={`w-full h-11 px-3 rounded-xl border text-sm focus:outline-none ${inputSurface}`}
            />
          </div>
        </div>
      </div>

      {/* Najd Rent a Car Add-on Checkbox */}
      <div className={`mt-4 rounded-2xl border p-4 transition-colors ${
        needCarRental
          ? darkSurface
            ? 'bg-[#C31A20]/15 border-[#C31A20]'
            : 'bg-white border-[#C31A20] shadow-xs'
          : darkSurface
          ? 'bg-black/25 border-white/15'
          : 'bg-white border-[#DED6D2]'
      }`}>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            needCarRental
              ? 'bg-[#C31A20] border-[#C31A20] text-white'
              : darkSurface
              ? 'border-white/35 bg-transparent'
              : 'border-[#B8B0AD] bg-white'
          }`}>
            <input
              type="checkbox"
              checked={needCarRental}
              onChange={(e) => setNeedCarRental(e.target.checked)}
              className="sr-only"
            />
            {needCarRental && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
          </span>
          <span className="flex-1 min-w-0">
            <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              <Car className="w-4 h-4 text-[#C31A20]" aria-hidden="true" />
              <span>I need a car for rent (via Najd Rent a Car)</span>
            </span>
            <span className={`block text-xs mt-1 ${labelTone}`}>
              Visiting Dubai or heading to the airport? Add a self-drive car, 4x4 SUV, or chauffeur limousine under our Al Basel Group sister company.
            </span>
          </span>
        </label>

        {needCarRental && (
          <div className="mt-3.5 pt-3.5 border-t border-current/10 space-y-3">
            <div className="flex flex-wrap gap-2">
              {VEHICLE_OPTIONS.map((v) => {
                const selected = vehicleType === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicleType(v)}
                    className={`h-8 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#1B1718] text-white'
                        : darkSurface
                        ? 'bg-white/10 text-white/85 hover:bg-white/20'
                        : 'bg-[#F8F6F5] text-[#4A4245] hover:bg-[#EFEAE8]'
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <p className={`text-xs ${labelTone}`}>
              Direct fleet partner:{' '}
              <a
                href="https://najdrentacar.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 font-semibold underline ${darkSurface ? 'text-[#E2CC96]' : 'text-[#C31A20]'}`}
              >
                <span>najdrentacar.com</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Additional Inquiries */}
      <div className="mt-4">
        <label className={`block text-xs font-medium mb-1.5 ${labelTone}`}>
          Additional Inquiries (Hotel tier, visas, pickup airport, suites, or requests)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Need UAE visit visas for 2 adults, connecting 5-star hotel rooms, and Dubai airport pick-up."
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none resize-y ${inputSurface}`}
        />
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>Send Full Enquiry on WhatsApp</span>
        </a>
        <a
          href={`tel:${COMPANY.contact.officeTel}`}
          className={`inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border font-semibold text-sm transition-colors ${
            darkSurface
              ? 'border-white/25 text-white hover:bg-white/10'
              : 'border-[#D8D0CC] text-[#1B1718] hover:border-[#1B1718]'
          }`}
        >
          <Phone className="w-4 h-4 text-[#C31A20]" aria-hidden="true" />
          <span>Call {COMPANY.contact.officeDisplay}</span>
        </a>
      </div>
    </div>
  );
}
