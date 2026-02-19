import type { ReactNode } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';

export interface BubbleActionItem {
  id: string;
  label: string;
  onClick: () => void;
}

const DEFAULT_AGENT_ACTIONS: BubbleActionItem[] = [
  { id: 'copy', label: '복사', onClick: () => {} },
  { id: 'like', label: '좋아요', onClick: () => {} },
  { id: 'dislike', label: '싫어요', onClick: () => {} },
  { id: 'refresh', label: '새로고침', onClick: () => {} },
];

export interface AgentMessageProps {
  children?: ReactNode;
  className?: string;
  namespace?: string;
  /** 말풍선 하단 액션 버튼. 미전달 시 복사/좋아요/싫어요/새로고침 기본 표시. */
  actions?: BubbleActionItem[];
}

export function AgentMessage({
  children,
  className,
  namespace,
  actions = DEFAULT_AGENT_ACTIONS,
}: AgentMessageProps) {
  const p = namespace != null ? createPrefixCls(namespace) : (name: string) => prefixCls(name);
  const rootCls = p('AgentMessage');
  const actionsCls = `${rootCls}-actions`;
  const actionCls = `${rootCls}-action`;
  const resolvedClass = [rootCls, className].filter(Boolean).join(' ');
  return (
    <div className={resolvedClass}>
      {children}
      {actions.length > 0 && (
        <div className={actionsCls}>
          {actions.map(({ id, label, onClick }) => (
            <button
              key={id}
              type="button"
              className={actionCls}
              onClick={onClick}
              aria-label={label}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
