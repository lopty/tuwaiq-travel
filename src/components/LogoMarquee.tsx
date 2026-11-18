import { PARTNER_LOGOS } from '../data/trustMedia';

/**
 * Continuously scrolling strip of partner logos. Pure CSS, so it works without
 * JavaScript, pauses on hover and stops for visitors who prefer reduced motion.
 * The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
 */
export function LogoMarquee({ title = 'Hotel and airline partners' }: { title?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {PARTNER_LOGOS.map((logo) => (
        <li key={logo.name} className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white px-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <img
            src={logo.src}
            alt={`${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            loading="lazy"
            className="max-h-11 w-auto max-w-[80%] object-contain"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={title} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#111318]">{title}</h2>
      </div>
      <div className="logo-marquee mt-7 overflow-hidden bg-[#F6F7F9] py-6">
        <div className="logo-marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
