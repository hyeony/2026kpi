import type { ReactNode } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';

export type BubbleMessageVariant = 'agent' | 'user';

export interface BubbleMessageProps {
  variant: BubbleMessageVariant;
  children?: ReactNode;
  className?: string;
  namespace?: string;
}

export function BubbleMessage({
  variant,
  children,
  className,
  namespace,
}: BubbleMessageProps) {
  const p = namespace != null ? createPrefixCls(namespace) : (name: string) => prefixCls(name);
  const rootCls = p('BubbleMessage');
  const modifierCls = `${rootCls}--${variant}`;
  const resolvedClass = [rootCls, modifierCls, className].filter(Boolean).join(' ');
  return <div className={resolvedClass} data-variant={variant} role="article">{children}</div>;
}
