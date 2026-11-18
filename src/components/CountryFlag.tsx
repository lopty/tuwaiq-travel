export type FlagCode =
  | 'AE'
  | 'SA'
  | 'EG'
  | 'TR'
  | 'EU'
  | 'GE'
  | 'AZ'
  | 'AM'
  | 'UZ'
  | 'KG'
  | 'MV'
  | 'SC'
  | 'TZ'
  | 'TH'
  | 'MY'
  | 'ID'
  | 'CN'
  | 'TW'
  | 'JP'
  | 'BS';

interface CountryFlagProps {
  code: FlagCode;
  className?: string;
}

export function CountryFlag({ code, className = 'w-5 h-3.5' }: CountryFlagProps) {
  const baseClass = `inline-block rounded-[3px] overflow-hidden ring-1 ring-black/15 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${className}`;

  switch (code) {
    case 'AE':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="6" y="0" fill="#00732F" />
          <rect width="24" height="6" y="6" fill="#FFFFFF" />
          <rect width="24" height="6" y="12" fill="#000000" />
          <rect width="6.5" height="18" x="0" y="0" fill="#FF0000" />
        </svg>
      );
    case 'SA':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#006C35" />
          <rect x="6" y="6.5" width="12" height="2" rx="1" fill="#FFFFFF" />
          <rect x="6" y="11" width="12" height="1.4" rx="0.7" fill="#FFFFFF" />
        </svg>
      );
    case 'EG':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="6" y="0" fill="#CE1126" />
          <rect width="24" height="6" y="6" fill="#FFFFFF" />
          <rect width="24" height="6" y="12" fill="#000000" />
          <circle cx="12" cy="9" r="1.7" fill="#C09300" />
        </svg>
      );
    case 'TR':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#E30A17" />
          <circle cx="9.8" cy="9" r="4.2" fill="#FFFFFF" />
          <circle cx="10.9" cy="9" r="3.4" fill="#E30A17" />
          <polygon points="14.5,9 16.4,8.3 15.8,10.2 15.8,7.8 16.4,9.7" fill="#FFFFFF" />
        </svg>
      );
    case 'EU':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#003399" />
          <circle cx="12" cy="4" r="0.8" fill="#FFCC00" />
          <circle cx="15.5" cy="5.5" r="0.8" fill="#FFCC00" />
          <circle cx="17" cy="9" r="0.8" fill="#FFCC00" />
          <circle cx="15.5" cy="12.5" r="0.8" fill="#FFCC00" />
          <circle cx="12" cy="14" r="0.8" fill="#FFCC00" />
          <circle cx="8.5" cy="12.5" r="0.8" fill="#FFCC00" />
          <circle cx="7" cy="9" r="0.8" fill="#FFCC00" />
          <circle cx="8.5" cy="5.5" r="0.8" fill="#FFCC00" />
        </svg>
      );
    case 'GE':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#FFFFFF" />
          <rect x="10.2" y="0" width="3.6" height="18" fill="#FF0000" />
          <rect x="0" y="7.2" width="24" height="3.6" fill="#FF0000" />
          <rect x="4" y="2.8" width="2.2" height="1" fill="#FF0000" />
          <rect x="4.6" y="2.2" width="1" height="2.2" fill="#FF0000" />
          <rect x="17.8" y="2.8" width="2.2" height="1" fill="#FF0000" />
          <rect x="18.4" y="2.2" width="1" height="2.2" fill="#FF0000" />
          <rect x="4" y="14.2" width="2.2" height="1" fill="#FF0000" />
          <rect x="4.6" y="13.6" width="1" height="2.2" fill="#FF0000" />
          <rect x="17.8" y="14.2" width="2.2" height="1" fill="#FF0000" />
          <rect x="18.4" y="13.6" width="1" height="2.2" fill="#FF0000" />
        </svg>
      );
    case 'AZ':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="6" y="0" fill="#00B5E2" />
          <rect width="24" height="6" y="6" fill="#EF3340" />
          <rect width="24" height="6" y="12" fill="#509E2F" />
          <circle cx="11.5" cy="9" r="2.2" fill="#FFFFFF" />
          <circle cx="12.1" cy="9" r="1.75" fill="#EF3340" />
          <circle cx="13.8" cy="9" r="0.8" fill="#FFFFFF" />
        </svg>
      );
    case 'AM':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="6" y="0" fill="#D90012" />
          <rect width="24" height="6" y="6" fill="#0033A0" />
          <rect width="24" height="6" y="12" fill="#F2A800" />
        </svg>
      );
    case 'UZ':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="5.6" y="0" fill="#0099B5" />
          <rect width="24" height="0.8" y="5.6" fill="#CE1126" />
          <rect width="24" height="5.2" y="6.4" fill="#FFFFFF" />
          <rect width="24" height="0.8" y="11.6" fill="#CE1126" />
          <rect width="24" height="5.6" y="12.4" fill="#1EB53A" />
          <circle cx="5.2" cy="2.8" r="1.5" fill="#FFFFFF" />
          <circle cx="5.7" cy="2.8" r="1.2" fill="#0099B5" />
        </svg>
      );
    case 'KG':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#E8112D" />
          <circle cx="12" cy="9" r="4.2" fill="#FFEF00" />
          <circle cx="12" cy="9" r="2.8" fill="#E8112D" />
          <path d="M9.6 7.8 Q12 10.2 14.4 7.8 M9.6 10.2 Q12 7.8 14.4 10.2" stroke="#FFEF00" strokeWidth="0.9" fill="none" />
        </svg>
      );
    case 'MV':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#D21034" />
          <rect x="4" y="3.5" width="16" height="11" fill="#007E3A" />
          <circle cx="12.4" cy="9" r="3" fill="#FFFFFF" />
          <circle cx="13.4" cy="9" r="2.5" fill="#007E3A" />
        </svg>
      );
    case 'SC':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#003D88" />
          <polygon points="0,18 8,0 16,0" fill="#FCD856" />
          <polygon points="0,18 16,0 24,0 24,6" fill="#D62828" />
          <polygon points="0,18 24,6 24,12" fill="#FFFFFF" />
          <polygon points="0,18 24,12 24,18" fill="#007A3D" />
        </svg>
      );
    case 'TZ':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <polygon points="0,0 24,0 0,18" fill="#1EB53A" />
          <polygon points="24,0 24,18 0,18" fill="#00A3DD" />
          <path d="M-2 19 L26 -1" stroke="#FCD116" strokeWidth="6.2" />
          <path d="M-2 19 L26 -1" stroke="#000000" strokeWidth="4" />
        </svg>
      );
    case 'TH':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#A51931" />
          <rect width="24" height="12" y="3" fill="#F4F5F8" />
          <rect width="24" height="6" y="6" fill="#2D2A4A" />
        </svg>
      );
    case 'MY':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#FFFFFF" />
          <rect width="24" height="2.6" y="0" fill="#CC0001" />
          <rect width="24" height="2.6" y="5.2" fill="#CC0001" />
          <rect width="24" height="2.6" y="10.4" fill="#CC0001" />
          <rect width="24" height="2.6" y="15.4" fill="#CC0001" />
          <rect width="12" height="10.4" x="0" y="0" fill="#010066" />
          <circle cx="5" cy="5.2" r="2.6" fill="#FFCC00" />
          <circle cx="5.9" cy="5.2" r="2.1" fill="#010066" />
          <circle cx="7.9" cy="5.2" r="1.2" fill="#FFCC00" />
        </svg>
      );
    case 'ID':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="9" y="0" fill="#CE1126" />
          <rect width="24" height="9" y="9" fill="#FFFFFF" />
        </svg>
      );
    case 'CN':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#DE2910" />
          <polygon points="5,2.5 5.8,4.9 8.2,4.9 6.2,6.3 7,8.7 5,7.2 3,8.7 3.8,6.3 1.8,4.9 4.2,4.9" fill="#FFDE00" />
          <circle cx="9.6" cy="2.6" r="0.65" fill="#FFDE00" />
          <circle cx="11" cy="4.4" r="0.65" fill="#FFDE00" />
          <circle cx="11" cy="6.8" r="0.65" fill="#FFDE00" />
          <circle cx="9.6" cy="8.5" r="0.65" fill="#FFDE00" />
        </svg>
      );
    case 'TW':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#FE0000" />
          <rect width="12" height="9" fill="#000095" />
          <circle cx="6" cy="4.5" r="2.2" fill="#FFFFFF" />
        </svg>
      );
    case 'JP':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="18" fill="#FFFFFF" />
          <circle cx="12" cy="9" r="4.8" fill="#BC002D" />
        </svg>
      );
    case 'BS':
      return (
        <svg viewBox="0 0 24 18" className={baseClass} aria-hidden="true">
          <rect width="24" height="6" y="0" fill="#00778B" />
          <rect width="24" height="6" y="6" fill="#FFC72C" />
          <rect width="24" height="6" y="12" fill="#00778B" />
          <polygon points="0,0 10.5,9 0,18" fill="#000000" />
        </svg>
      );
  }
}
