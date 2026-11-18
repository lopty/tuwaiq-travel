// Evidence shown on the trust pages. Every item here comes from the company's own
// archive (2026 company deck, office records) or from openly licensed photo libraries.
// Captions state only what the document or photo itself shows.

export interface TrustImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const LEADER_PHOTOS: Record<string, TrustImage> = {
  'Basel Al Kasem': { src: '/images/trust/basel-al-kasem.webp', width: 600, height: 600, alt: 'Basel Al Kasem, founder of Tuwaiq Travel and Al Basel Group' },
  'Omar Al Kasem': { src: '/images/trust/omar-al-kasem.webp', width: 600, height: 619, alt: 'Omar Al Kasem, VIP travel lead at Tuwaiq Travel' },
  'Asad Javed, ACCA': { src: '/images/trust/asad-javed.webp', width: 400, height: 400, alt: 'Asad Javed, Head of Accounts' },
  'Ahmed Mohsen': { src: '/images/trust/ahmed-mohsen.webp', width: 600, height: 600, alt: 'Ahmed Mohsen, business development and sales contact at Tuwaiq Travel' },
};

export const FOUR_SEASONS_LETTER = {
  image: {
    src: '/images/trust/letter-four-seasons-washington-2015.webp',
    width: 1200,
    height: 1563,
    alt: 'Letter from the General Manager of Four Seasons Hotel Washington DC to Basel Al Kasem, dated 24 August 2015',
  },
  date: '24 August 2015',
  from: 'David Bernand, General Manager, Four Seasons Hotel Washington, DC',
  summary:
    'The hotel thanked Basel Al Kasem and Tuwaiq Travel for their partnership in booking a VIP Saudi delegation at the Four Seasons Washington, DC. The letter records that the booking exceeded one million US dollars in room revenue alone, and invites Tuwaiq to work with the hotel again.',
};

export const ROYAL_COLLABORATION = {
  image: {
    src: '/images/trust/hrh-prince-mansour-2015.webp',
    width: 798,
    height: 809,
    alt: 'Basel Al Kasem with HRH Prince Mansour bin Nasser bin Abdul Aziz Al Saud in 2015',
  },
  year: '2015',
  caption:
    'Collaboration with HRH Prince Mansour bin Nasser bin Abdul Aziz Al Saud, Saudi Ambassador to Switzerland at the time the company profile was prepared.',
};

export interface PressItem {
  date: string;
  outlet: string;
  headline: string;
  summary: string;
  image: TrustImage;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    date: 'September 2014',
    outlet: 'Arabian Travel News',
    headline: 'Natural Progression',
    summary: 'Cover story on Basel Al Kasem taking Al Basel Group into travel with the launch of Tuwaiq Travel & Tourism.',
    image: { src: '/images/trust/press-arabian-travel-news-2014.webp', width: 643, height: 849, alt: 'Arabian Travel News cover featuring Basel Al Kasem, September 2014' },
  },
  {
    date: '2014',
    outlet: 'Regional business press',
    headline: 'Rapid growth of Middle East tourism prompts Al Basel Group to open new travel agency',
    summary: 'Report on the opening of Tuwaiq Travel for local and international tourists in Dubai.',
    image: { src: '/images/trust/press-tuwaiq-launch-2014.webp', width: 560, height: 736, alt: 'Press clipping on Al Basel Group opening the Tuwaiq travel agency' },
  },
  {
    date: '2009',
    outlet: 'Hospitality press',
    headline: 'Al Basel ties up with The Address',
    summary: 'Al Basel Consulting drew up a joint sales strategy with The Address Hotels + Resorts targeting VIPs in Saudi Arabia, Kuwait and Qatar.',
    image: { src: '/images/trust/press-al-basel-the-address-2009.webp', width: 584, height: 625, alt: 'Press clipping: Al Basel ties up with The Address' },
  },
  {
    date: '2008',
    outlet: 'Newspaper clipping',
    headline: 'Al Basel, Raffles in consultancy deal',
    summary: 'Earlier group milestone: a consultancy agreement between Al Basel and Raffles.',
    image: { src: '/images/trust/press-al-basel-raffles-2008.webp', width: 1016, height: 671, alt: 'Newspaper clipping: Al Basel, Raffles in consultancy deal' },
  },
];

export const EVENT_PHOTOS: (TrustImage & { caption: string })[] = [
  { src: '/images/trust/event-certificate.webp', width: 481, height: 318, alt: 'Tuwaiq team members holding a certificate at a hospitality trade event', caption: 'Recognition at a hospitality trade event' },
  { src: '/images/trust/event-ritz-carlton-yacht.webp', width: 371, height: 495, alt: 'Meeting at The Ritz-Carlton Yacht Collection stand', caption: 'The Ritz-Carlton Yacht Collection stand' },
  { src: '/images/trust/event-meeting-1.webp', width: 371, height: 279, alt: 'Partner meeting at a travel trade show', caption: 'Partner meeting at a travel trade show' },
  { src: '/images/trust/event-office-handshake.webp', width: 428, height: 321, alt: 'Handshake with a partner in the Al Basel Group office', caption: 'Partner visit at the Al Basel Group office' },
  { src: '/images/trust/event-meeting-2.webp', width: 348, height: 261, alt: 'Discussion with hotel representatives at a trade show stand', caption: 'Hotel partner discussion at a trade show' },
];

export const GROUP_TEAM_PHOTO: TrustImage = {
  src: '/images/trust/al-basel-group-team.webp',
  width: 1170,
  height: 779,
  alt: 'The Al Basel Group team, including Tuwaiq Travel and Najd Rent a Car staff',
};

/** Framed correspondence and photographs from the founder's office. Filled once originals are supplied. */
export const OFFICE_ARCHIVE: (TrustImage & { title: string; caption: string })[] = [
  {
    src: '/images/trust/archive-carter-letter-2010.webp', width: 720, height: 1280,
    alt: 'Framed letter from former US President Jimmy Carter to Farrah and Basel Al Kasem, dated 27 July 2010, with a photograph of a gift presentation',
    title: 'Letter from President Jimmy Carter, 27 July 2010',
    caption: 'Addressed to Farrah and Basel Al Kasem at Najd Rent a Car, Dubai. President Carter thanks them for a dagger presented to mark his wedding anniversary, for their support of The Carter Center’s work in the Middle East, and for hosting events during his visit to Dubai.',
  },
  {
    src: '/images/trust/archive-carter-signed-2009.webp', width: 720, height: 1280,
    alt: 'Framed page signed by Jimmy Carter to Basel in 2009, with a photograph of the signing',
    title: 'Signed by Jimmy Carter, 2009',
    caption: 'A page personally signed by former US President Jimmy Carter to Basel, framed with a photograph taken at the signing.',
  },
  {
    src: '/images/trust/archive-alwaleed-book.webp', width: 720, height: 1280,
    alt: 'Framed signed title page of the book Alwaleed: Businessman Billionaire Prince by Riz Khan, inscribed to Mr. Basel Al Kasem',
    title: 'Alwaleed: Businessman Billionaire Prince',
    caption: 'The title page of Riz Khan’s biography, with a handwritten inscription to Mr. Basel Al Kasem, framed with a photograph.',
  },
  {
    src: '/images/trust/archive-desert-warrior-2004.webp', width: 720, height: 1280,
    alt: 'Framed signed page of the book Desert Warrior inscribed to Basel Al Kasem, dated 19 February 2004',
    title: 'Desert Warrior, inscribed 19 February 2004',
    caption: 'A signed copy of Desert Warrior (Muqatil min al-Sahra), inscribed in Arabic to Mr. Basel Al Kasem with warm greetings, framed with a photograph.',
  },
  {
    src: '/images/trust/archive-ibrahim-nafie-book.webp', width: 720, height: 1280,
    alt: 'Framed title page of Hiwarat al-Tarikh signed by Ibrahim Nafie, with a photograph',
    title: 'Hiwarat al-Tarikh, signed by Ibrahim Nafie',
    caption: 'A signed copy of Ibrahim Nafie’s book of conversations with kings, presidents and heads of government, framed with a photograph.',
  },
];

/** Recent appearances published on the Al Basel Group Instagram account. */
export const RECENT_EVENTS = [
  { date: 'February 2026', title: 'VIP Majlis', summary: 'Basel Al Kasem, CEO of Al Basel Group, attended a VIP majlis to discuss future collaboration with business leaders, including Abdelmonem Bin Eisa Alserkal.', url: 'https://www.instagram.com/p/DUp3Lp-jGQA/' },
  { date: 'November 2025', title: 'UOWD Alumni Awards', summary: 'Our CEO attended the University of Wollongong in Dubai Alumni Awards ceremony.', url: 'https://www.instagram.com/p/DRRJMvADIxb/' },
  { date: 'November 2025', title: 'UAE Love Syria', summary: 'Al Basel Consultancy took part in the UAE Love Syria event.', url: 'https://www.instagram.com/p/DRXGGsaCVS7/' },
  { date: 'April 2025', title: 'Arabian Travel Market 2025', summary: 'Al Basel Group, headed by Basel Al Kasem, held meetings and partnership discussions on luxury travel and hospitality at Arabian Travel Market in Dubai.', url: 'https://www.instagram.com/p/DJBouLRJvvH/' },
];

/** Openly licensed photographs used on the site, with the attribution their licences require. */
export const PHOTO_CREDITS = [
  { image: '/images/hero/palm-jumeirah-aerial.webp', title: 'Palm Jumeirah and Dubai Marina, with Atlantis in the foreground', author: 'giggel', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Vereinigte_Arabische_Emirate_-_Dubai_-_Palm_Jumeirah_und_Dubai_Marina_-_im_Vordergrund_das_Hotel_Atlantis_-_panoramio.jpg' },
  { image: '/images/destinations/armenia.webp', title: 'Mount Ararat and the Yerevan skyline in spring', author: 'Serouj Ourishian', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Mount_Ararat_and_the_Yerevan_skyline_in_spring.jpg' },
  { image: '/images/destinations/azerbaijan.webp', title: 'Baku Boulevard 2024', author: 'Rufatazizzade', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Baku_Boulevard_2024.jpg' },
  { image: '/images/destinations/kyrgyzstan.webp', title: 'Ala-Archa from above', author: 'Nikolai Bulykin', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:%D0%90%D0%BB%D0%B0-%D0%90%D1%80%D1%87%D0%B0_%D1%81%D0%B2%D0%B5%D1%80%D1%85%D1%83_(1).jpg' },
  { image: '/images/destinations/uzbekistan.webp', title: 'Samarkand, Registan Square', author: 'Kraftabbas', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4._%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C-%D0%A0%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D0%B0%D0%BD.jpg' },
  { image: '/images/services/dhow-cruise.webp', title: 'Wooden Dhow Boat', author: 'Gaurav Dhwaj Khadka', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Wooden_Dhow_Boat.jpg' },
  { image: '/images/hotels/burj-al-arab-night.webp', title: 'Burj Al-Arab', author: 'Marco Becerra', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Burj_Al-Arab_(13996844503).jpg' },
  { image: '/images/hotels/atlantis-the-palm.webp', title: 'Atlantis on Palm Jumeirah', author: 'giggel', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Vereinigte_Arabische_Emirate_-_Atlantis_on_Palm_Jumeirah_-_%D8%A3%D8%AA%D9%84%D8%A7%D9%86%D8%AA%D9%8A%D8%B3_%D9%81%D9%8A_%D9%86%D8%AE%D9%84%D8%A9_%D8%AC%D9%85%D9%8A%D8%B1%D8%A7_-_panoramio.jpg' },
  { image: '/images/hotels/corinthia-london.webp', title: 'Corinthia London, Hotel Front Exterior', author: 'Alex Corinthia', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Corinthia_London,_Hotel_Front_Exterior.jpg' },
  { image: '/images/hotels/mandarin-oriental-singapore.webp', title: 'Mandarin Oriental Singapore facade', author: 'Commosin', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:41_HOTEL_FACADE_RITZ_DAY.jpg' },
];

/** Recent meetings. Names supplied by Al Basel Group; captions are shared because photos are not matched to individual names. */
export const RECENT_MEETINGS = {
  caption:
    'Basel Al Kasem with HE Mohamed Al Abbar, HE Ali Al Shafar, HE Al Serkal, HE Arif Amiri of DIFC and HE Dr Khayat at recent gatherings in the UAE.',
  photos: [1, 2, 3, 4, 5].map((n) => ({
    src: `/images/trust/meeting-${n}.webp`,
    width: 900,
    height: 1200,
    alt: 'Basel Al Kasem with a guest at a recent gathering in the UAE',
  })),
};

/** Hotel and airline partners shown on the "Partners" slide of the Tuwaiq 2026 company deck. */
export const PARTNER_LOGOS: { name: string; src: string; width: number; height: number; kind: 'Hotel' | 'Airline' }[] = [
  { name: 'Mandarin Oriental', src: '/images/partners/mandarin-oriental.webp', width: 204, height: 160, kind: 'Hotel' },
  { name: 'Four Seasons Hotels and Resorts', src: '/images/partners/four-seasons.webp', width: 241, height: 160, kind: 'Hotel' },
  { name: 'Corinthia', src: '/images/partners/corinthia.webp', width: 437, height: 160, kind: 'Hotel' },
  { name: 'Raffles', src: '/images/partners/raffles.webp', width: 198, height: 139, kind: 'Hotel' },
  { name: 'One&Only', src: '/images/partners/one-and-only.webp', width: 400, height: 106, kind: 'Hotel' },
  { name: 'Hyatt Hotels and Resorts', src: '/images/partners/hyatt.webp', width: 384, height: 160, kind: 'Hotel' },
  { name: 'Emirates', src: '/images/partners/emirates.webp', width: 193, height: 160, kind: 'Airline' },
  { name: 'Etihad Airways', src: '/images/partners/etihad.webp', width: 328, height: 160, kind: 'Airline' },
  { name: 'flydubai', src: '/images/partners/flydubai.webp', width: 466, height: 95, kind: 'Airline' },
  { name: 'Saudia', src: '/images/partners/saudia.webp', width: 618, height: 160, kind: 'Airline' },
  { name: 'Riyadh Air', src: '/images/partners/riyadh-air.webp', width: 330, height: 160, kind: 'Airline' },
  { name: 'flynas', src: '/images/partners/flynas.webp', width: 390, height: 160, kind: 'Airline' },
];
