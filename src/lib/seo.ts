import { COMPANY, SITE_URL, FEATURE_FLAGS } from '../data/siteConfig';
import type { TravelPackage, PackageFaq } from '../data/packages';
import type { ServiceItem } from '../data/services';
import type { GuideArticle } from '../data/guides';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ogType?: 'website' | 'article';
  breadcrumbs: BreadcrumbItem[];
  schemas: Record<string, unknown>[];
}

export function buildTravelAgencySchema(): Record<string, unknown> {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}${COMPANY.logos.colour}`,
    image: `${SITE_URL}/images/hero/dubai-skyline-twilight.webp`,
    foundingDate: String(COMPANY.foundedYear),
    telephone: COMPANY.contact.officeTel,
    email: COMPANY.contact.bookingsEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${COMPANY.address.building}, ${COMPANY.address.street}`,
      addressLocality: COMPANY.address.city,
      addressCountry: COMPANY.address.countryCode,
    },
    parentOrganization: {
      '@type': 'Organization',
      name: COMPANY.parentGroup.name,
      foundingDate: String(COMPANY.parentGroup.establishedYear),
      url: `${SITE_URL}${COMPANY.parentGroup.url}`,
    },
    sameAs: [COMPANY.social.instagram, COMPANY.social.facebook],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+${COMPANY.contact.whatsappDigits}`,
        contactType: 'reservations',
        email: COMPANY.contact.bookingsEmail,
        availableLanguage: ['English', 'Arabic'],
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY.contact.officeTel,
        contactType: 'customer service',
        email: COMPANY.contact.generalEmail,
        availableLanguage: ['English', 'Arabic'],
      },
    ],
  };

  if (
    COMPANY.verification.licenceNumber &&
    COMPANY.verification.licenceNumber !== 'Pending confirmation'
  ) {
    base.identifier = {
      '@type': 'PropertyValue',
      name: COMPANY.verification.issuingAuthority,
      value: COMPANY.verification.licenceNumber,
    };
  }

  return base;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildFaqSchema(faqs: PackageFaq[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildPackageSchema(pkg: TravelPackage): Record<string, unknown> {
  const isDeparted = pkg.category === 'national-day' && FEATURE_FLAGS.nationalDayDeparted;
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'AED',
    price: String(pkg.priceAed),
    availability: isDeparted
      ? 'https://schema.org/SoldOut'
      : 'https://schema.org/InStock',
    url: `${SITE_URL}${pkg.url}`,
  };

  if (pkg.validThrough) {
    offer.validThrough = pkg.validThrough;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.name,
    description: pkg.seoDescription,
    touristType: pkg.idealFor,
    provider: { '@id': `${SITE_URL}/#organization` },
    offers: offer,
  };
}

export function buildServiceSchema(service: ServiceItem): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seoDescription,
    serviceType: service.name,
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    provider: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}${service.url}`,
  };
}

export function buildArticleSchema(guide: GuideArticle): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.seoDescription,
    image: `${SITE_URL}${guide.image}`,
    datePublished: guide.publishedDate,
    dateModified: guide.publishedDate,
    author: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${COMPANY.logos.colour}`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${guide.url}`,
  };
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderMetaHeadHtml(meta: PageMeta): string {
  const canonicalUrl = `${SITE_URL}${meta.path}`;
  const ogImage = `${SITE_URL}${meta.image}`;
  const schemasHtml = meta.schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n    ');

  return [
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" hreflang="en-ae" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(COMPANY.legalName)}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    schemasHtml,
  ].join('\n    ');
}
