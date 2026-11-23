/*
 * Lead capture settings for tuwaiq.ae.
 * endpoint: the Google Apps Script "Web app URL" (ends in /exec). See docs/leads-setup.md.
 * The same Google Sheet collects leads from albaselrealestate.ae (site: 'albasel').
 */
window.SITE_LEADS = {
  endpoint: 'https://script.google.com/macros/s/AKfycbzDsPvfWdSRDKFRTof__oSqUFQlhv1INbblCZhMuyKGceKnq2C22r9qZGk2yhhzU6LcQQ/exec',
  site: 'tuwaiq',
  siteName: 'Tuwaiq Travel',
  kind: 'travel',
  whatsapp: '971544608771',
  greeting: 'Hi, I am from your website.',
  phoneDisplay: '+971 54 460 8771',
  phoneTel: '+971544608771',
  privacyUrl: '/privacy/',
  sites: { tuwaiq: 'Tuwaiq Travel', albasel: 'Al Basel Real Estate' }
};
