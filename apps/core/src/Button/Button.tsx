import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** prefixCls로 생성된 클래스와 병합할 추가 className */
  className?: string;
  /** 커스텀 prefix 사용 시 theme와 동일한 namespace 전달 */
  namespace?: string;
}

/**
 * 기능만 담당하는 버튼 (스타일 없음).
 * namespace를 주면 해당 prefix로 클래스를 붙이며, theme 스타일과 동일한 선택자를 쓸 수 있음.
 */
export function Button({ children, className, namespace, ...rest }: ButtonProps) {
  const ROOT_CLS = namespace != null ? createPrefixCls(namespace)('Button') : prefixCls('Button');
  const resolvedClass = [ROOT_CLS, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={resolvedClass} {...rest}>
      {children}
    </button>
  );
}
