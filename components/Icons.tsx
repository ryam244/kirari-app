// Inline SVG icons for consistent rendering across all devices
// (emoji rendering varies by OS/browser, SVGs are pixel-perfect)

interface IconProps {
  size?: number;
  className?: string;
}

export function HomeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" opacity="0.2" />
      <rect
        x="4" y="3" width="16" height="18" rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 8H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 16H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DiaryIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 7H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 11H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 15L14 17L17 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PetIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="13" r="8" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="14.5" cy="12" r="1.2" fill="currentColor" />
      <path
        d="M10 15.5C10.5 16.3 11.2 16.7 12 16.7C12.8 16.7 13.5 16.3 14 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 5L10 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 5L14 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 2V5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SettingsIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 1V4M12 20V23M23 12H20M4 12H1M20.07 3.93L17.95 6.05M6.05 17.95L3.93 20.07M20.07 20.07L17.95 17.95M6.05 6.05L3.93 3.93"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScaleIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="14" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10V13L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrophyIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M8 2H16V10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10V2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M8 2H16V10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10V2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 4H5C4.44772 4 4 4.44772 4 5V6C4 7.65685 5.34315 9 7 9H8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 4H19C19.5523 4 20 4.44772 20 5V6C20 7.65685 18.6569 9 17 9H16" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 14V17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 17H15V19C15 20.1046 14.1046 21 13 21H11C9.89543 21 9 20.1046 9 20V17Z" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function SparkleIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
