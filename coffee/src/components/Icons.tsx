type IconProps = { size?: number; className?: string; animated?: boolean }

export function CoffeeIcon({ size = 20, className, animated = false }: IconProps) {
  const iceClass = (slot: string) => (animated ? `iced-icon__ice iced-icon__ice--${slot}` : undefined)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={[className, animated ? 'iced-icon' : ''].filter(Boolean).join(' ')}
      aria-hidden
    >
      <path
        d="M15.2 3.8l1.8 1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={animated ? 'iced-icon__straw' : undefined}
      />
      <path
        d="M15.6 5.2L14.4 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
        className={animated ? 'iced-icon__straw' : undefined}
      />
      <path
        d="M8.2 7h7.6l-.9 12.2H9.1L8.2 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 14.2h7.2v4.1c0 .55-.45 1-1 1H9.4c-.55 0-1-.45-1-1v-4.1Z"
        fill="currentColor"
        opacity="0.28"
        className={animated ? 'iced-icon__liquid' : undefined}
      />
      <rect
        x="9.3"
        y="9.8"
        width="2.7"
        height="2.7"
        rx="0.55"
        fill="currentColor"
        opacity="0.18"
        stroke="currentColor"
        strokeWidth="0.9"
        className={iceClass('1')}
      />
      <rect
        x="12.7"
        y="10.8"
        width="2.4"
        height="2.4"
        rx="0.5"
        fill="currentColor"
        opacity="0.14"
        stroke="currentColor"
        strokeWidth="0.9"
        className={iceClass('2')}
      />
      {animated && (
        <>
          <circle cx="10.8" cy="16.8" r="0.55" fill="currentColor" opacity="0.35" className="iced-icon__bubble iced-icon__bubble--1" />
          <circle cx="13.4" cy="17.4" r="0.45" fill="currentColor" opacity="0.3" className="iced-icon__bubble iced-icon__bubble--2" />
        </>
      )}
    </svg>
  )
}

export function UsersIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c0-2.8 2.5-4.5 5.5-4.5s5.5 1.7 5.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.5 11.2a2.7 2.7 0 1 1 0 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19.5 19c0-2.2-1.8-3.8-4-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function ClipboardIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="7" y="4.5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 4.5h5a1.5 1.5 0 0 1 1.5 1.5V6a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 6V6a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function ChevronIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EditIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 18.5V16l9.5-9.5 2.5 2.5L6.5 18.5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13 6.5l2.5 2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function TrashIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 7h14M9 7V5.5h6V7M8 7l.7 10.5h6.6L16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FolderIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 7.5A2 2 0 0 1 6 5.5h4.2l1.8 2h6a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function SendIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12l14-7-7 14-2-5-5-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 20.5s-6.5-4.2-8.5-8.2C1.8 8.8 3.6 5.5 6.8 5.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 3.2 0 5 3.3 3.3 6.8-2 4-8.5 8.2-8.5 8.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
