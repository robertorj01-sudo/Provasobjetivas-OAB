interface JurisTantumLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: {
    iconBox: 'w-9 h-9',
    title: 'text-base',
    tagline: 'text-[11px]',
    gap: 'gap-2.5',
  },
  md: {
    iconBox: 'w-10 h-10',
    title: 'text-lg sm:text-xl',
    tagline: 'text-xs',
    gap: 'gap-3',
  },
  lg: {
    iconBox: 'w-14 h-14',
    title: 'text-2xl sm:text-3xl',
    tagline: 'text-xs sm:text-sm',
    gap: 'gap-3.5',
  },
};

export function JurisTantumEmblem({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#0F172A" />
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="11.5"
        stroke="#D97706"
        strokeOpacity="0.42"
        strokeWidth="1.25"
      />
      {/* Central Judicial Pillar & Apex */}
      <circle cx="32" cy="14" r="2.2" fill="#F59E0B" />
      <path d="M32 16.5V45" stroke="#F8FAFC" strokeWidth="2.4" strokeLinecap="round" />
      {/* Pedestal / Codex Base */}
      <path d="M21 47.5H43" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M25 44.5H39" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
      {/* Symmetric Crossbeam */}
      <path d="M16 22.5H48" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      {/* Left Scale Pan */}
      <path
        d="M18.5 22.5L13.5 34.5H23.5L18.5 22.5Z"
        stroke="#CBD5E1"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 34.5C12.5 37.8 15.2 40 18.5 40C21.8 40 24.5 37.8 24.5 34.5H12.5Z"
        fill="#F59E0B"
      />
      {/* Right Scale Pan */}
      <path
        d="M45.5 22.5L40.5 34.5H50.5L45.5 22.5Z"
        stroke="#CBD5E1"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 34.5C39.5 37.8 42.2 40 45.5 40C48.8 40 51.5 37.8 51.5 34.5H39.5Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function JurisTantumLogo({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
}: JurisTantumLogoProps) {
  const tokens = SIZE_MAP[size];

  if (variant === 'icon') {
    return (
      <span className={`inline-flex shrink-0 ${className}`}>
        <JurisTantumEmblem className={tokens.iconBox} />
      </span>
    );
  }

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col text-center items-center' : 'items-center'
      } ${tokens.gap} ${className}`}
    >
      <JurisTantumEmblem className={`${tokens.iconBox} shrink-0 shadow-xs rounded-xl`} />

      <div className="min-w-0 leading-none">
        <div
          className={`font-bold tracking-tight text-slate-900 whitespace-nowrap ${tokens.title}`}
          style={{ fontFamily: "'Merriweather', Georgia, serif" }}
        >
          Juris <span className="text-amber-700">Tantum</span>
        </div>

        {showTagline && (
          <p className={`text-slate-500 font-medium mt-1 whitespace-nowrap hidden sm:block ${tokens.tagline}`}>
            Simulado OAB <span aria-hidden="true">·</span> Banca FGV <span aria-hidden="true">·</span> 1ª Fase
          </p>
        )}
      </div>
    </div>
  );
}
