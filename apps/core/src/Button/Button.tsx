import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  namespace?: string;
}

export function Button({ children, className, namespace, ...rest }: ButtonProps) {
  const ROOT_CLS = namespace != null ? createPrefixCls(namespace)('Button') : prefixCls('Button');
  const resolvedClass = [ROOT_CLS, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={resolvedClass} {...rest}>
      {children}
    </button>
  );
}
