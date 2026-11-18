/**
 * Najd Rent a Car fleet, copied from the Najd catalogue (najdrentacar-latest/src/data/cars.ts).
 * Rates are Najd's published AED rates. Where Najd has not published a rate, none is shown.
 * Keep this in step with najdrentacar.com when the fleet or rates change.
 */
export type FleetGroup = 'vip' | 'suv' | 'family' | 'economy';

export interface FleetCar {
  slug: string;
  name: string;
  label: string;
  group: FleetGroup;
  seats: string;
  bags?: number;
  rates?: { day?: number; week?: number; month?: number; longTerm?: number };
}

export const NAJD = {
  name: 'Najd Rent a Car',
  url: 'https://najdrentacar.com',
  since: 2002,
  fleetSize: '200+',
  licence: '532541',
  googleRating: '4.8',
  googleReviewCount: 23,
  googleRatingChecked: 'October 2026',
  rateNote: 'Rates in AED from Najd Rent a Car. Long-term rates are per month for 5+ months. Your quote is confirmed before booking.',
};

export const FLEET_GROUPS: { id: FleetGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All cars' },
  { id: 'vip', label: 'VIP & Executive' },
  { id: 'suv', label: 'SUVs' },
  { id: 'family', label: '7-seaters' },
  { id: 'economy', label: 'Everyday' },
];

export const NAJD_FLEET: FleetCar[] = [
  { slug: 'range-rover-vogue', name: 'Range Rover Vogue', label: 'Luxury SUV', group: 'vip', seats: '5', bags: 4, rates: { day: 900, week: 5500, month: 23000, longTerm: 19000 } },
  { slug: 'cadillac-escalade', name: 'Cadillac Escalade', label: 'Full-size luxury SUV', group: 'vip', seats: '7', bags: 5, rates: { day: 700, week: 4400, month: 12500, longTerm: 10500 } },
  { slug: 'mercedes-s-class', name: 'Mercedes-Benz S-Class', label: 'Luxury sedan', group: 'vip', seats: '5' },
  { slug: 'bmw-7-series', name: 'BMW 7 Series', label: 'Luxury sedan', group: 'vip', seats: '5' },
  { slug: 'porsche-cayenne', name: 'Porsche Cayenne', label: 'Luxury performance SUV', group: 'vip', seats: '5' },
  { slug: 'audi-a6', name: 'Audi A6', label: 'Executive sedan', group: 'vip', seats: '5', bags: 3, rates: { day: 250, week: 1600, month: 4500, longTerm: 3800 } },
  { slug: 'chevrolet-suburban', name: 'Chevrolet Suburban', label: 'Full-size 8-seater SUV', group: 'family', seats: '8', bags: 5, rates: { day: 550, week: 3465, month: 8000 } },
  { slug: 'gmc-yukon', name: 'GMC Yukon', label: 'Full-size SUV', group: 'family', seats: '7 or 8' },
  { slug: 'mitsubishi-destinator-2027', name: 'Mitsubishi Destinator 2027', label: '7-seater family SUV', group: 'family', seats: '7', rates: { month: 3100, longTerm: 2800 } },
  { slug: 'mitsubishi-outlander', name: 'Mitsubishi Outlander', label: 'Mid-size 7-seater SUV', group: 'family', seats: '7', bags: 3, rates: { month: 3200, longTerm: 3000 } },
  { slug: 'mitsubishi-xpander', name: 'Mitsubishi Xpander', label: '7-seater MPV', group: 'family', seats: '7', bags: 4, rates: { month: 2500, longTerm: 2300 } },
  { slug: 'mitsubishi-asx-2027', name: 'Mitsubishi ASX 2027', label: 'Compact crossover SUV', group: 'suv', seats: '5', rates: { month: 2500, longTerm: 2200 } },
  { slug: 'mitsubishi-asx', name: 'Mitsubishi ASX', label: 'Compact crossover SUV', group: 'suv', seats: '5', bags: 3, rates: { month: 2300, longTerm: 2000 } },
  { slug: 'nissan-kicks', name: 'Nissan Kicks', label: 'Compact crossover', group: 'suv', seats: '5' },
  { slug: 'nissan-sunny', name: 'Nissan Sunny', label: 'Economy sedan', group: 'economy', seats: '5', bags: 2, rates: { month: 1700, longTerm: 1300 } },
  { slug: 'mitsubishi-attrage', name: 'Mitsubishi Attrage', label: 'Economy sedan', group: 'economy', seats: '5', bags: 2, rates: { month: 1400, longTerm: 1200 } },
  { slug: 'mitsubishi-mirage', name: 'Mitsubishi Mirage', label: 'Economy hatchback', group: 'economy', seats: '5' },
];

export const fleetImage = (car: FleetCar) => `/images/najd-fleet/${car.slug}.webp`;
export const najdCarUrl = (car: FleetCar) => `${NAJD.url}/cars/${car.slug}/`;

/** The headline rate for a card: daily where published, otherwise monthly. */
export function headlineRate(car: FleetCar): { amount: number; unit: string } | null {
  if (car.rates?.day) return { amount: car.rates.day, unit: 'day' };
  if (car.rates?.month) return { amount: car.rates.month, unit: 'month' };
  return null;
}
