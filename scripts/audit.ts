import fs from 'fs';
import path from 'path';
import { getAllStaticRoutes } from '../src/data/routes';
import { SITE_URL } from '../src/data/siteConfig';

const distDir = path.resolve(process.cwd(), 'dist');

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

function audit() {
  const routes = getAllStaticRoutes();
  const routeSet = new Set(routes);
  const errors: string[] = [];

  const seenUrls = new Set<string>();
  const seenTitles = new Map<string, string>();
  const seenDescriptions = new Map<string, string>();
  const seenH1s = new Map<string, string>();
  const seenParagraphs = new Map<string, string>();
  const incomingLinks = new Map<string, number>();

  for (const r of routes) {
    incomingLinks.set(r, 0);
  }

  const bannedPatterns = [
    /\bConfidential\b/i,
    /\bmarkup\b/i,
    /\bAir Arabia base\b/i,
    /\bWas AED\b/i,
    /\bposter price\b/i,
  ];

  for (const route of routes) {
    if (seenUrls.has(route)) {
      errors.push(`Duplicate URL route: ${route}`);
    }
    seenUrls.add(route);

    const filePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\/+/, '').replace(/\/+$/, ''), 'index.html');

    if (!fs.existsSync(filePath)) {
      errors.push(`Missing static HTML file for route: ${route} (${filePath})`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');

    // Title check
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
    if (!title) {
      errors.push(`[${route}] Missing <title>`);
    } else {
      if (title.length >= 60) {
        errors.push(`[${route}] Title too long (${title.length} chars >= 60): "${title}"`);
      }
      if (seenTitles.has(title)) {
        errors.push(`[${route}] Duplicate title with ${seenTitles.get(title)}: "${title}"`);
      } else {
        seenTitles.set(title, route);
      }
    }

    // Meta description check
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : '';
    if (!desc) {
      errors.push(`[${route}] Missing meta description`);
    } else {
      if (seenDescriptions.has(desc)) {
        errors.push(`[${route}] Duplicate description with ${seenDescriptions.get(desc)}`);
      } else {
        seenDescriptions.set(desc, route);
      }
    }

    // Canonical check
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const expectedCanonical = `${SITE_URL}${route}`;
    if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
      errors.push(`[${route}] Missing or mismatched canonical URL (got ${canonicalMatch?.[1]})`);
    }

    // H1 check (exactly 1)
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1Matches.length !== 1) {
      errors.push(`[${route}] Expected exactly 1 <h1>, found ${h1Matches.length}`);
    } else {
      const h1Text = stripTags(h1Matches[0][1]);
      if (!h1Text) {
        errors.push(`[${route}] Empty <h1>`);
      } else if (seenH1s.has(h1Text)) {
        errors.push(`[${route}] Duplicate H1 with ${seenH1s.get(h1Text)}: "${h1Text}"`);
      } else {
        seenH1s.set(h1Text, route);
      }
    }

    // Navigation buttons check (fail if <nav> contains <button>)
    const navBlocks = [...html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi)];
    for (const nb of navBlocks) {
      if (/<button\b/i.test(nb[1])) {
        errors.push(`[${route}] <nav> element contains a <button> instead of <a href>`);
      }
    }

    // Internal links check & incoming link tracking
    const hrefMatches = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)];
    for (const hm of hrefMatches) {
      const href = hm[1];
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        continue;
      }
      const cleanTarget = href.split('#')[0].split('?')[0];
      if (!cleanTarget) continue;
      if (!routeSet.has(cleanTarget)) {
        errors.push(`[${route}] Broken internal link to missing route: ${href}`);
      } else if (cleanTarget !== route) {
        incomingLinks.set(cleanTarget, (incomingLinks.get(cleanTarget) || 0) + 1);
      }
    }

    // Repeated long paragraphs (>140 chars) check
    const pMatches = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];
    for (const pm of pMatches) {
      const pText = stripTags(pm[1]);
      if (pText.length > 140) {
        if (seenParagraphs.has(pText) && seenParagraphs.get(pText) !== route) {
          errors.push(
            `[${route}] Repeated long paragraph (${pText.length} chars) also on ${seenParagraphs.get(pText)}: "${pText.slice(0, 80)}..."`
          );
        } else {
          seenParagraphs.set(pText, route);
        }
      }
    }

    // Visible prose checks: no em dashes and no banned strings
    const bodyMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const visibleMainText = bodyMatch ? stripTags(bodyMatch[1]) : stripTags(html);
    if (visibleMainText.includes('—')) {
      errors.push(`[${route}] Em dash character found in visible copy`);
    }
    for (const pat of bannedPatterns) {
      if (pat.test(visibleMainText)) {
        errors.push(`[${route}] Banned text matched pattern ${pat}`);
      }
    }

    // Image checks: alt, width, height, local file exists
    const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
    for (const im of imgMatches) {
      const attrs = im[1];
      const srcM = attrs.match(/\bsrc="([^"]+)"/i);
      const altM = attrs.match(/\balt="([^"]*)"/i);
      const wM = attrs.match(/\bwidth="([^"]+)"/i);
      const hM = attrs.match(/\bheight="([^"]+)"/i);
      if (!altM || !altM[1].trim()) {
        errors.push(`[${route}] <img> missing descriptive alt attribute (${srcM?.[1]})`);
      }
      if (!wM || !hM) {
        errors.push(`[${route}] <img> missing width/height attributes (${srcM?.[1]})`);
      }
      if (srcM && srcM[1].startsWith('/')) {
        const assetPath = path.join(distDir, srcM[1].replace(/^\/+/, ''));
        if (!fs.existsSync(assetPath)) {
          errors.push(`[${route}] Missing image asset in dist: ${srcM[1]}`);
        }
      }
    }
  }

  // Orphan pages check
  for (const [route, count] of incomingLinks.entries()) {
    if (route !== '/' && count === 0) {
      errors.push(`Orphan page detected (0 incoming internal links): ${route}`);
    }
  }

  // Required root SEO artifacts
  for (const reqFile of ['sitemap.xml', 'robots.txt', 'llms.txt']) {
    if (!fs.existsSync(path.join(distDir, reqFile))) {
      errors.push(`Missing required SEO file in dist: ${reqFile}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\nSEO QUALITY GATE FAILED (${errors.length} errors):\n`);
    for (const err of errors) {
      console.error(` - ${err}`);
    }
    process.exit(1);
  }

  console.log(`\nSEO QUALITY GATE PASSED: Audited ${routes.length} prerendered static pages cleanly.`);
}

audit();
