import './LoadingSkeleton.css';

export type LoadingSkeletonVariant = 'text' | 'card' | 'conversation';

export interface LoadingSkeletonProps {
  variant?: LoadingSkeletonVariant;
  lines?: number;
  animated?: boolean;
  className?: string;
}

const TEXT_WIDTHS = ['100%', '92%', '78%', '65%'];

export function LoadingSkeleton({
  variant = 'text',
  lines = 3,
  animated = true,
  className = '',
}: LoadingSkeletonProps) {
  const classes = [
    'loading-skeleton',
    `loading-skeleton--${variant}`,
    animated && 'loading-skeleton--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'card') {
    return (
      <div className={classes} aria-busy="true" aria-label="로딩 중">
        <div className="loading-skeleton__card" />
      </div>
    );
  }

  if (variant === 'conversation') {
    return (
      <div className={classes} aria-busy="true" aria-label="로딩 중">
        <div className="loading-skeleton__bubble loading-skeleton__bubble--user" />
        <div className="loading-skeleton__bubble loading-skeleton__bubble--assistant" />
        <div className="loading-skeleton__bubble loading-skeleton__bubble--assistant loading-skeleton__bubble--short" />
      </div>
    );
  }

  return (
    <div className={classes} aria-busy="true" aria-label="로딩 중">
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className="loading-skeleton__line"
          style={{ width: TEXT_WIDTHS[index % TEXT_WIDTHS.length] }}
        />
      ))}
    </div>
  );
}
