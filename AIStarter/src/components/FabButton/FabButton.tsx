import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './FabButton.css';

export type FabSize = 'md' | 'lg';
export type FabVariant = 'primary' | 'secondary' | 'danger';

export interface FabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  icon: ReactNode;
  size?: FabSize;
  variant?: FabVariant;
  label?: string;
  position?: 'fixed' | 'inline';
}

export function FabButton({
  icon,
  label,
  size = 'md',
  variant = 'primary',
  position = 'inline',
  className = '',
  disabled,
  ...rest
}: FabButtonProps) {
  const classes = [
    'fab-button',
    `fab-button--${size}`,
    `fab-button--${variant}`,
    position === 'fixed' && 'fab-button--fixed',
    label && 'fab-button--extended',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      <span className="fab-button__icon" aria-hidden="true">
        {icon}
      </span>
      {label && <span className="fab-button__label">{label}</span>}
    </button>
  );
}

export function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function StopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}
