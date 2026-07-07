import type { HTMLAttributes, ReactNode } from 'react';
import './MessageBubble.css';

export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'default' | 'streaming' | 'error';

export interface MessageBubbleProps extends HTMLAttributes<HTMLDivElement> {
  role: MessageRole;
  children: ReactNode;
  status?: MessageStatus;
  timestamp?: string;
  maxWidth?: number;
}

export function MessageBubble({
  role,
  children,
  status = 'default',
  timestamp,
  maxWidth = 520,
  className = '',
  ...rest
}: MessageBubbleProps) {
  const classes = [
    'message-bubble',
    `message-bubble--${role}`,
    status !== 'default' && `message-bubble--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{ maxWidth }}
      data-role={role}
      data-status={status}
      {...rest}
    >
      <div className="message-bubble__inner">
        <div className="message-bubble__content">{children}</div>
        {status === 'streaming' && (
          <span className="message-bubble__cursor" aria-hidden="true" />
        )}
      </div>
      {timestamp && (
        <time className="message-bubble__timestamp">{timestamp}</time>
      )}
    </div>
  );
}
