import type { ReactNode } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';
import type { BubbleActionItem } from './AgentMessage';

export type UserMessageContent =
  | { type: 'text'; value: string }
  | { type: 'image'; urls: string[] };

const DEFAULT_USER_ACTIONS: BubbleActionItem[] = [
  { id: 'copy', label: '복사', onClick: () => {} },
  { id: 'edit', label: '수정', onClick: () => {} },
];

export interface UserMessageProps {
  content: UserMessageContent;
  className?: string;
  namespace?: string;
  /** 이미지 클릭 시 (url) */
  onImageClick?: (url: string) => void;
  /** 말풍선 하단 액션 버튼. 미전달 시 복사/수정 기본 표시. */
  actions?: BubbleActionItem[];
}

export function UserMessage({
  content,
  className,
  namespace,
  onImageClick,
  actions = DEFAULT_USER_ACTIONS,
}: UserMessageProps) {
  const p = namespace != null ? createPrefixCls(namespace) : (name: string) => prefixCls(name);
  const rootCls = p('UserMessage');
  const textCls = `${rootCls}-text`;
  const imagesCls = `${rootCls}-images`;
  const imageCls = `${rootCls}-image`;
  const actionsCls = `${rootCls}-actions`;
  const actionCls = `${rootCls}-action`;
  const resolvedClass = [rootCls, className].filter(Boolean).join(' ');

  const renderContent = () => {
    if (content.type === 'text') {
      return <div className={textCls}>{content.value}</div>;
    }
    const { urls } = content;
    const count = urls.length;
    const gridMod = count <= 1 ? 'single' : count === 2 ? 'double' : count === 3 ? 'triple' : 'multi';
    return (
      <div className={`${imagesCls} ${imagesCls}--${gridMod}`}>
        {urls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            className={imageCls}
            loading="lazy"
            onClick={() => onImageClick?.(url)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={resolvedClass}>
      {renderContent()}
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
