import { BadgeCheck, GraduationCap, Scale, BookOpenCheck } from 'lucide-react';
import { UserCategory, UserProfile } from '../types/community';
import { getInitials } from '../utils/legalTextFormatter';

const AVATAR_TONES: Record<UserCategory, string> = {
  advogado: 'bg-slate-900 text-amber-300 border-amber-500/40',
  examinando: 'bg-amber-700 text-white border-amber-500/40',
  estudante: 'bg-slate-700 text-slate-100 border-slate-500/40',
};

export function UserAvatar({
  profile,
  size = 'md',
  onClick,
  className = '',
}: {
  profile: UserProfile;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
}) {
  const sizeClasses = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-9 h-9 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl',
  }[size];

  const inner = profile.avatarUrl ? (
    <img
      src={profile.avatarUrl}
      alt={profile.name}
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    <span className="font-bold tracking-tight select-none">{getInitials(profile.name)}</span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={`Ver perfil de ${profile.name}`}
        className={`relative inline-flex items-center justify-center rounded-full border shrink-0 overflow-hidden cursor-pointer hover:ring-2 hover:ring-amber-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
          profile.avatarUrl ? 'bg-slate-100 border-slate-200' : AVATAR_TONES[profile.category]
        } ${sizeClasses} ${className}`}
      >
        {inner}
      </button>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full border shrink-0 overflow-hidden ${
        profile.avatarUrl ? 'bg-slate-100 border-slate-200' : AVATAR_TONES[profile.category]
      } ${sizeClasses} ${className}`}
    >
      {inner}
    </span>
  );
}

export function getCategoryLabel(profile: UserProfile): string {
  if (profile.category === 'advogado') {
    if (profile.oabNumber && profile.oabUf) {
      return `Advogado(a) · OAB/${profile.oabUf} ${profile.oabNumber}`;
    }
    return 'Advogado(a)';
  }
  if (profile.category === 'examinando') {
    return profile.targetExam ? `Examinando · ${profile.targetExam}` : 'Bacharel / Examinando OAB';
  }
  return profile.semester
    ? `Estudante de Direito · ${profile.semester}`
    : 'Estudante de Direito';
}

export function CategoryBadge({
  profile,
  compact = false,
}: {
  profile: UserProfile;
  compact?: boolean;
}) {
  const Icon =
    profile.category === 'advogado'
      ? Scale
      : profile.category === 'examinando'
      ? BookOpenCheck
      : GraduationCap;

  const badgeTone =
    profile.category === 'advogado'
      ? 'bg-slate-900 text-amber-200 border-slate-800'
      : profile.category === 'examinando'
      ? 'bg-amber-50 text-amber-900 border-amber-200'
      : 'bg-slate-100 text-slate-700 border-slate-200';

  const label = compact
    ? profile.category === 'advogado'
      ? profile.oabUf
        ? `OAB/${profile.oabUf}`
        : 'Advogado(a)'
      : profile.category === 'examinando'
      ? profile.targetExam || 'Examinando OAB'
      : profile.semester || 'Estudante'
    : getCategoryLabel(profile);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold whitespace-nowrap shrink-0 ${badgeTone}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{label}</span>
      {profile.category === 'advogado' && profile.isVerified && (
        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-label="OAB Verificada" />
      )}
    </span>
  );
}
