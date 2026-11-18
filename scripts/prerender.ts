import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { getAllStaticRoutes, getActivePackages } from '../src/data/routes';
import { COMPANY, FEATURE_FLAGS, SITE_URL } from '../src/data/siteConfig';
import { DESTINATIONS } from '../src/data/destinations';
import { SERVICES } from '../src/data/services';
import { GUIDES } from '../src/data/guides';
import { escapeHtml, renderMetaHeadHtml, type PageMeta } from '../src/lib/seo';

const distDir = path.resolve(process.cwd(), 'dist');
const ssrEntryPath = path.resolve(process.cwd(), 'dist-ssr/entry-server.js');

async function prerender() {
  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const mod = await import(pathToFileURL(ssrEntryPath).href);
  const render: (url: string) => { html: string; meta: PageMeta } = mod.render;

  const routes = getAllStaticRoutes();
  console.log(`Prerendering ${routes.length} static routes...`);

  for (const route of routes) {
    const { html, meta } = render(route);
    const headTags = renderMetaHeadHtml(meta);

    let outHtml = templateHtml
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(meta.description)}" />`
      )
      .replace(/<meta\s+property="og:title"[^>]*>/i, '')
      .replace(/<meta\s+property="og:description"[^>]*>/i, '')
      .replace(/<meta\s+property="og:type"[^>]*>/i, '')
      .replace(/<meta\s+property="og:image"[^>]*>/i, '')
      .replace('<!--SSR_HEAD-->', headTags)
      .replace('<!--SSR_APP-->', html);

    if (route === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), outHtml, 'utf-8');
    } else {
      const cleanRel = route.replace(/^\/+/, '').replace(/\/+$/, '');
      const targetDir = path.join(distDir, cleanRel);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), outHtml, 'utf-8');
    }
  }

  // Generate sitemap.xml
  const today = '2026-11-17';
  const sitemapUrls = routes
    .map((r) => {
      const priority =
        r === '/'
          ? '1.0'
          : r.startsWith('/packages/') || r.startsWith('/offers/')
          ? '0.9'
          : r.startsWith('/destinations/') || r.startsWith('/services/')
          ? '0.8'
          : '0.7';
      return `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  // Generate robots.txt allowing search and AI crawlers
  const allowedAgents = [
    'Googlebot',
    'Bingbot',
    'Google-Extended',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'PerplexityBot',
    'Applebot',
  ];
  const robotsTxt =
    allowedAgents.map((ua) => `User-agent: ${ua}\nAllow: /`).join('\n\n') +
    `\n\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');

  // Generate llms.txt summarizing verified facts, packages, services, destinations & key pages
  const activePkgs = getActivePackages();
  const llmsLines = [
    `# ${COMPANY.legalName} (${SITE_URL})`,
    '',
    `> Dubai travel agency founded in ${COMPANY.foundedYear} by Basel Al Kasem, member of ${COMPANY.parentGroup.name} (est. ${COMPANY.parentGroup.establishedYear}).`,
    '',
    '## Verified Contact & Office',
    `- Address: ${COMPANY.address.full}`,
    `- WhatsApp & Mobile: ${COMPANY.contact.whatsappDisplay}`,
    `- Office Phone: ${COMPANY.contact.officeDisplay}`,
    `- Bookings Email: ${COMPANY.contact.bookingsEmail}`,
    `- General Email: ${COMPANY.contact.generalEmail}`,
    `- Instagram: ${COMPANY.social.instagram}`,
    `- Facebook: ${COMPANY.social.facebook}`,
    `- Mobility Sister Company: Najd Rent a Car (https://najdrentacar.com)`,
    '',
    '## Trade Licence',
    `- Licence No. ${COMPANY.verification.licenceNumber}, issued by the ${COMPANY.verification.issuingAuthority}`,
    `- Name on licence: ${COMPANY.verification.licensedName} (${COMPANY.verification.legalForm})`,
    `- Licensed activity: ${COMPANY.verification.licensedActivity}`,
    `- First issued ${COMPANY.verification.licenceIssued}, valid until ${COMPANY.verification.licenceExpiry}`,
    `- Dubai Chamber membership ${COMPANY.verification.chamberNumber}, Commercial Register No. ${COMPANY.verification.registerNumber}`,
    `- Details: ${SITE_URL}/licence/`,
    '',
    '## Priced Holiday Packages (per person, based on two sharing)',
    ...activePkgs.map(
      (p) =>
        `- [${p.name}](${SITE_URL}${p.url}): From AED ${p.priceAed.toLocaleString('en-US')} per person, based on two sharing (${p.durationLabel}${p.departureDate ? `, departs ${p.departureDate}` : ''})`
    ),
    '',
    '## 15 Travel Services',
    ...SERVICES.map((s) => `- [${s.name}](${SITE_URL}${s.url}): ${s.tagline}`),
    '',
    '## 16 Featured Destinations',
    ...DESTINATIONS.map(
      (d) =>
        `- [${d.name}](${SITE_URL}${d.url}): Best time ${d.bestTime} | Ideal for ${d.idealFor}${
          d.startingPriceAed ? ` | From AED ${d.startingPriceAed.toLocaleString('en-US')}` : ''
        }`
    ),
    '',
    '## Travel Guides & Trust Pages',
    `- [About Tuwaiq](${SITE_URL}/about/)`,
    `- [Our Founder](${SITE_URL}/founder/)`,
    `- [Leadership Team](${SITE_URL}/leadership/)`,
    `- [Al Basel Group](${SITE_URL}/al-basel-group/)`,
    `- [Partnerships & Recognition](${SITE_URL}/partnerships/)`,
    `- [Licence & Verification](${SITE_URL}/licence/)`,
    `- [Contact](${SITE_URL}/contact/)`,
    `- [Press & Media Archive](${SITE_URL}/press/)`,
    `- [How We Build Trust in AI Search](${SITE_URL}/how-we-build-trust-in-ai-search/): our AI SEO and GEO approach, using Prezlo (https://prezlo.io) and guided by Lopty Pascal (https://loptypascal.com)`,
    ...GUIDES.map((g) => `- [${g.h1}](${SITE_URL}${g.url})`),
    '',
    `Notes: Umrah pages enabled=${FEATURE_FLAGS.enableUmrahPages}. All packages start on WhatsApp or telephone; no online checkout.`,
  ].join('\n');

  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsLines, 'utf-8');
  console.log(`Generated ${routes.length} HTML pages, sitemap.xml, robots.txt, and llms.txt.`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
