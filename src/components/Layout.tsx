import { useState } from 'react';
import type { ReactNode } from 'react';
import { Briefcase, Compass, Home, Phone, Tag, MapPin, Mail, Instagram, Facebook, Menu, X } from 'lucide-react';
import { COMPANY, FEATURE_FLAGS, whatsAppUrl } from '../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface LayoutProps {
  currentPath: string;
  hideBottomNav?: boolean;
  children: ReactNode;
}

export function Layout({ currentPath, hideBottomNav = false, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: 'Packages', href: '/packages/' },
    { label: 'Offers', href: '/offers/' },
    { label: 'Destinations', href: '/destinations/' },
    { label: 'Services', href: '/services/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'About', href: '/about/' },
  ];

  const mobileTabs = [
    { label: 'Home', href: '/', icon: Home, active: currentPath === '/' },
    {
      label: 'Explore',
      href: '/destinations/',
      icon: Compass,
      active: currentPath.startsWith('/destinations/'),
    },
    {
      label: 'Offers',
      href: '/packages/',
      icon: Tag,
      active: currentPath.startsWith('/packages/') || currentPath.startsWith('/offers/'),
    },
    {
      label: 'Services',
      href: '/services/',
      icon: Briefcase,
      active: currentPath.startsWith('/services/'),
    },
  ];

  return (
    <div className="travel-shell min-h-screen flex flex-col bg-white text-[#111318]">
      {/* Top Bar */}
      <header className="travel-header sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECEEF2]">
        <div className="travel-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          <a
            href="/"
            className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C31A20] rounded-lg"
            aria-label="Tuwaiq Travel & Tourism LLC Home"
          >
            <img
              src={COMPANY.logos.colour}
              alt="Tuwaiq Travel and Tourism LLC"
              width={COMPANY.logos.width}
              height={COMPANY.logos.height}
              className="travel-header-logo block h-8 sm:h-9 w-auto"
            />
          </a>

          <nav aria-label="Primary navigation" id="primary-navigation" className={`travel-primary-nav hidden md:flex items-center gap-6 text-sm font-medium text-[#4B5160] ${menuOpen ? 'is-open' : ''}`}>
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== '/' && currentPath.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap shrink-0 py-2 transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#C31A20] border-[#C31A20] font-semibold'
                      : 'border-transparent hover:text-[#C31A20]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY.contact.officeTel}`}
              className="travel-header-contact hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#5B6170] hover:text-[#C31A20] whitespace-nowrap shrink-0 px-3 py-2 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{COMPANY.contact.officeDisplay}</span>
            </a>
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="travel-header-cta inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#118444] hover:bg-[#0D6B37] text-white text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#118444]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>
<button className="travel-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className={`travel-footer bg-[#0E0F12] text-white mt-20 ${hideBottomNav ? 'pb-24 md:pb-12' : 'pb-24 md:pb-12'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
            <div>
              <a href="/" className="inline-flex mb-5 bg-white rounded-2xl px-4 py-3" aria-label="Tuwaiq Travel & Tourism LLC Home">
                <img
                  src={COMPANY.logos.colour}
                  alt="Tuwaiq Travel and Tourism LLC"
                  width={COMPANY.logos.width}
                  height={COMPANY.logos.height}
                  loading="lazy"
                  className="block h-8 w-auto"
                />
              </a>
              <p className="text-sm text-white/85 leading-relaxed mb-4">
                Dubai travel agency established in {COMPANY.foundedYear} by Basel Al Kasem. Member of{' '}
                <a href="/al-basel-group/" className="underline decoration-[#FFFFFF]/60 hover:text-[#FFFFFF]">
                  Al Basel Group
                </a>{' '}
                (est. {COMPANY.parentGroup.establishedYear}).
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tuwaiq Travel on Instagram"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href={COMPANY.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tuwaiq Travel on Facebook"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#FFFFFF] tracking-wide mb-4">Explore Travel</h2>
              <ul className="space-y-2.5 text-sm text-white/85">
                <li><a href="/packages/" className="hover:text-white hover:underline">Holiday Packages</a></li>
                <li><a href="/offers/" className="hover:text-white hover:underline">UAE National Day 2026 Offers</a></li>
                <li><a href="/destinations/" className="hover:text-white hover:underline">16 Featured Destinations</a></li>
                <li><a href="/services/" className="hover:text-white hover:underline">All 15 Travel Services</a></li>
                <li><a href="/holiday-packages-from-dubai/" className="hover:text-white hover:underline">Packages From Dubai</a></li>
                <li><a href="/guides/" className="hover:text-white hover:underline">Travel Guides &amp; Visa Advice</a></li>
                {FEATURE_FLAGS.enableUmrahPages && (
                  <li><a href="/umrah-package-from-dubai/" className="hover:text-white hover:underline">Umrah Packages</a></li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#FFFFFF] tracking-wide mb-4">Company &amp; Trust</h2>
              <ul className="space-y-2.5 text-sm text-white/85">
                <li><a href="/about/" className="hover:text-white hover:underline">About Tuwaiq Travel</a></li>
                <li><a href="/founder/" className="hover:text-white hover:underline">Our Founder: Basel Al Kasem</a></li>
                <li><a href="/leadership/" className="hover:text-white hover:underline">Leadership Team</a></li>
                <li><a href="/al-basel-group/" className="hover:text-white hover:underline">Al Basel Group &amp; Najd Rent a Car</a></li>
                <li><a href="/partnerships/" className="hover:text-white hover:underline">Partnerships &amp; Recognition</a></li>
                <li><a href="/press/" className="hover:text-white hover:underline">Press Archive</a></li>
                <li><a href="/licence/" className="hover:text-white hover:underline">Licence &amp; Verification</a></li>
                <li><a href="/how-booking-works/" className="hover:text-white hover:underline">How Booking Works</a></li>
                <li><a href="/how-we-build-trust-in-ai-search/" className="hover:text-white hover:underline">How We Build Trust in AI Search</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#FFFFFF] tracking-wide mb-4">Dubai Office &amp; Bookings</h2>
              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{COMPANY.address.full}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a href={whatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                    WhatsApp: {COMPANY.contact.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFFFFF] shrink-0" aria-hidden="true" />
                  <a href={`tel:${COMPANY.contact.officeTel}`} className="hover:text-white hover:underline">
                    Office: {COMPANY.contact.officeDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FFFFFF] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${COMPANY.contact.bookingsEmail}`} className="hover:text-white hover:underline">
                    {COMPANY.contact.bookingsEmail}
                  </a>
                </li>
                <li className="pt-1">
                  <a href="/contact/" className="inline-flex items-center text-[#FFFFFF] font-medium hover:underline">
                    Contact page &amp; map details
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/70">
            <p>&copy; 2026 {COMPANY.legalName}. Business Bay, Dubai, United Arab Emirates. <a href="/photo-credits/" className="underline hover:text-white">Photo credits</a></p>
            <p>
              Mobility partner:{' '}
              <a
                href="https://najdrentacar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFFFFF] hover:underline"
              >
                Najd Rent a Car
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      {!hideBottomNav && (
        <nav
          aria-label="Mobile navigation"
          className="travel-mobile-nav md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECEEF2]"
        >
          <div className="grid grid-cols-4 h-15">
            {mobileTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  className={`flex flex-col items-center justify-center min-h-[44px] text-[11px] font-medium transition-colors ${
                    tab.active ? 'text-[#C31A20] font-semibold' : 'text-[#5B6170]'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-0.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
