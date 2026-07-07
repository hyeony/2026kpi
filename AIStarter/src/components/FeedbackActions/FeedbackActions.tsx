import { useEffect, useState, type ButtonHTMLAttributes } from 'react';
import './FeedbackActions.css';

export type FeedbackType = 'up' | 'down';

export interface FeedbackActionsProps {
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: FeedbackType) => void;
  disabled?: boolean;
  className?: string;
}

function ActionButton({
  label,
  active,
  success,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
  success?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        'feedback-actions__button',
        active && 'feedback-actions__button--active',
        success && 'feedback-actions__button--success',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
      {...rest}
    />
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function ThumbsDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

export function FeedbackActions({
  onCopy,
  onRegenerate,
  onFeedback,
  disabled = false,
  className = '',
}: FeedbackActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
  };

  const handleFeedback = (type: FeedbackType) => {
    setFeedback(type);
    onFeedback?.(type);
  };

  return (
    <div className={`feedback-actions ${className}`.trim()} role="toolbar" aria-label="결과 액션">
      {onCopy && (
        <ActionButton
          label={copied ? '복사됨' : '복사'}
          onClick={handleCopy}
          disabled={disabled}
          success={copied}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </ActionButton>
      )}
      {onRegenerate && (
        <ActionButton label="재생성" onClick={onRegenerate} disabled={disabled}>
          <RefreshIcon />
        </ActionButton>
      )}
      {onFeedback && (
        <>
          <ActionButton
            label="좋아요"
            onClick={() => handleFeedback('up')}
            disabled={disabled || feedback !== null}
            active={feedback === 'up'}
          >
            <ThumbsUpIcon />
          </ActionButton>
          <ActionButton
            label="싫어요"
            onClick={() => handleFeedback('down')}
            disabled={disabled || feedback !== null}
            active={feedback === 'down'}
          >
            <ThumbsDownIcon />
          </ActionButton>
        </>
      )}
    </div>
  );
}
