import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { BottomPromptProps } from './BottomPrompt.types';
import {
  DefaultPlusIcon,
  DefaultSendIcon,
  DefaultLoadingIcon,
  DefaultStarOutlinedIcon,
  DefaultStarFilledIcon,
  DefaultFileTextIcon,
  DefaultPictureIcon,
} from './icons';
import { useKeydownHandler } from '../shared/hooks/useKeydownHandler';
import { usePromptFocus } from '../shared/hooks/usePromptFocus';
import { useClickOutside } from '../shared/hooks/useClickOutside';
import { FilePreviewList } from '../shared/component/FilePreviewList';
import { cn, COMPONENT_NAMES, getClass, HnineDSContext, useComponentStyle } from '@hnineds/core';
import { getPromptInputStyleId } from '../../PromptInput/PromptInput.style';
import { getBottomPromptStyles } from './BottomPrompt.styles';

export const BottomPrompt: React.FC<BottomPromptProps> = ({
  value = '',
  onChange,
  onSend,
  placeholder = '질문을 입력하세요...',
  autoFocus = true,
  status = 'default',
  files = [],
  onFileDelete,
  onFileUpload,
  historyList = [],
  isHistoryOpen = false,
  onHistoryToggle,
  bookmarkList = [],
  isBookmarkOpen = false,
  onBookmarkToggle,
  maxHeight = 264,
  className,
  icons = {},
}) => {
  const { prefix } = useContext(HnineDSContext);
  const { inputRef } = usePromptFocus(autoFocus);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isResponding = status === 'responding';

  const plusIcon = icons.plus ?? <DefaultPlusIcon />;
  const sendIcon = icons.send ?? <DefaultSendIcon />;
  const loadingIcon = icons.loading ?? <DefaultLoadingIcon />;
  const starOutlined = icons.starOutlined ?? <DefaultStarOutlinedIcon />;
  const starFilled = icons.starFilled ?? <DefaultStarFilledIcon />;
  const fileTextIcon = icons.fileText ?? <DefaultFileTextIcon />;
  const pictureIcon = icons.picture ?? <DefaultPictureIcon />;

  useComponentStyle({
    componentId: COMPONENT_NAMES.BottomPrompt,
    styleFn: getBottomPromptStyles,
    getStyleId: getPromptInputStyleId,
  });

  // listRef는 리스트가 렌더링될 때만 유효 → 열린 상태에서만 외부 클릭 감지
  useClickOutside(listRef, () => {
    onHistoryToggle?.(false);
    onBookmarkToggle?.(false);
  });

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  // ── 클래스 헬퍼 ──────────────────────────────────────────────────────────
  const componentName = COMPONENT_NAMES.BottomPrompt;
  const cls = (modifier?: string) => getClass(prefix, componentName, modifier);

  // ── 핸들러 ───────────────────────────────────────────────────────────────
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '24px';
    const maxH = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight);
    const inputMaxH = maxH - 72;
    const nextHeight = Math.max(24, Math.min(target.scrollHeight, inputMaxH));
    target.style.height = `${nextHeight}px`;
    target.style.overflowY = target.scrollHeight > inputMaxH ? 'auto' : 'hidden';
    onChange?.(target.value);
  };

  const handleSend = () => {
    if (!value.trim() || isResponding) return;
    onSend?.(value);
    if (inputRef.current) inputRef.current.style.height = '24px';
  };

  const { handleKeyDown } = useKeydownHandler({ onSend: handleSend, disabled: isResponding });

  const closeList = () => {
    onHistoryToggle?.(false);
    onBookmarkToggle?.(false);
  };

  const activeList = isHistoryOpen ? historyList : bookmarkList;

  // ── 렌더 ─────────────────────────────────────────────────────────────────
  return (
    <div className={cn(cls(), className)}>
      {/* 상향 전개 리스트 (히스토리 / 북마크) */}
      {(isHistoryOpen || isBookmarkOpen) && (
        <div className={cls('list')} ref={listRef}>
          <div className="list-content">
            {activeList.map((item) => (
              <div
                key={item.id}
                className="list-item"
                onClick={() => {
                  onChange?.(item.content);
                  closeList();
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 첨부 파일 목록 */}
      <FilePreviewList
        files={files}
        onFileDelete={onFileDelete}
        className={cls('file')}
        containerStyle={{ marginBottom: 16 }}
      />

      {/* 텍스트 입력 */}
      <textarea
        ref={inputRef}
        className={cls('textArea')}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isResponding}
        rows={1}
      />

      {/* 하단 액션 로우 */}
      <div className={cls('bottomRow')}>
        <div className={cls('leftAction')}>
          {/* 파일 첨부 버튼 + 컨텍스트 메뉴 */}
          <div style={{ position: 'relative' }} ref={menuRef}>
            <div className={cls('icon')} onClick={() => setIsMenuOpen((v) => !v)} title="파일 첨부">
              {plusIcon}
            </div>
            {isMenuOpen && (
              <div className={cls('contextMenu')}>
                <div
                  className="menu-item"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsMenuOpen(false);
                  }}
                >
                  {fileTextIcon}
                  <span>파일 업로드</span>
                </div>
                <div
                  className="menu-item"
                  onClick={() => {
                    imageInputRef.current?.click();
                    setIsMenuOpen(false);
                  }}
                >
                  {pictureIcon}
                  <span>이미지 업로드</span>
                </div>
              </div>
            )}
          </div>

          {/* 북마크 버튼 */}
          <div
            className={cn(cls('icon'), isBookmarkOpen && 'selected')}
            onClick={() => onBookmarkToggle?.(!isBookmarkOpen)}
            title="북마크"
          >
            {isBookmarkOpen ? starFilled : starOutlined}
          </div>
        </div>

        {/* 전송 버튼 */}
        <button
          className={cls('btn')}
          onClick={handleSend}
          disabled={!value.trim() && !isResponding}
          title="전송"
        >
          {isResponding ? loadingIcon : sendIcon}
        </button>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.doc,.docx"
        onChange={(e) => e.target.files && onFileUpload?.(e.target.files)}
        multiple
      />
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => e.target.files && onFileUpload?.(e.target.files)}
        multiple
      />
    </div>
  );
};
