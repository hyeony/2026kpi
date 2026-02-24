import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { TopPromptProps } from './TopPrompt.types';
import {
  DefaultPlusIcon,
  DefaultSendIcon,
  DefaultLoadingIcon,
  DefaultBulbIcon,
  DefaultArrowUpRightIcon,
  DefaultFileTextIcon,
  DefaultPictureIcon,
} from './icons';
import { useKeydownHandler } from '../shared/hooks/useKeydownHandler';
import { usePromptFocus } from '../shared/hooks/usePromptFocus';
import { useClickOutside } from '../shared/hooks/useClickOutside';
import { FilePreviewList } from '../shared/component/FilePreviewList';
import { COMPONENT_NAMES, getClass, HnineDSContext, useComponentStyle, cn } from '@hnineds/core';
import { getTopPromptStyles, getTopPromptStyleId } from './TopPrompt.styles';

export const TopPrompt: React.FC<TopPromptProps> = ({
  value = '',
  onChange,
  onSend,
  placeholder = '무엇이든 물어보세요...',
  autoFocus = true,
  status = 'default',
  logoIcon,
  logoTooltip = 'AI 에이전트',
  isSearching = false,
  searchResults = [],
  onSearchResultClick,
  recommendations = [],
  onRecommendationClick,
  renderItem,
  files = [],
  onFileUpload,
  onFileDelete,
  maxHeight = 260,
  className,
  icons = {},
}) => {
  const { prefix } = useContext(HnineDSContext);
  const { inputRef } = usePromptFocus(autoFocus);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isResponding = status === 'responding';
  const hasValue = value.trim().length > 0;

  const plusIcon = icons.plus ?? <DefaultPlusIcon />;
  const sendIcon = icons.send ?? <DefaultSendIcon />;
  const loadingIcon = icons.loading ?? <DefaultLoadingIcon />;
  const bulbIcon = icons.bulb ?? <DefaultBulbIcon />;
  const arrowUpRight = icons.arrowUpRight ?? <DefaultArrowUpRightIcon />;
  const fileTextIcon = icons.fileText ?? <DefaultFileTextIcon />;
  const pictureIcon = icons.picture ?? <DefaultPictureIcon />;

  useComponentStyle({
    componentId: COMPONENT_NAMES.TopPrompt,
    styleFn: getTopPromptStyles,
    getStyleId: getTopPromptStyleId,
  });

  useClickOutside(listRef, () => setIsFocused(false));
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  // ── 클래스 헬퍼 ──────────────────────────────────────────────────────────
  const componentName = COMPONENT_NAMES.TopPrompt;
  const cls = (modifier?: string) => getClass(prefix, componentName, modifier);

  // ── 핸들러 ───────────────────────────────────────────────────────────────
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '27px';
    const containerMaxH = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight);
    const availableInputH = containerMaxH - 24 - 10.5;
    const nextHeight = Math.max(27, Math.min(target.scrollHeight, availableInputH));
    target.style.height = `${nextHeight}px`;
    target.style.overflowY = target.scrollHeight > availableInputH ? 'auto' : 'hidden';
    onChange?.(target.value);
  };

  const handleSend = () => {
    if (!value.trim() || isResponding) return;
    onSend?.(value);
    setIsFocused(false);
  };

  const { handleKeyDown } = useKeydownHandler({ onSend: handleSend, disabled: isResponding });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload?.(e.target.files);
      e.target.value = '';
      setIsMenuOpen(false);
    }
  };

  const handleListItemClick = (item: { content: string }, callback?: (item: any) => void) => {
    onChange?.(item.content);
    callback?.(item);
    setIsFocused(false);
  };

  const shouldShowRecommendations = isFocused && !hasValue && recommendations.length > 0;
  const shouldShowSearchResults = isFocused && hasValue && searchResults.length > 0;

  // ── 렌더 ─────────────────────────────────────────────────────────────────
  return (
    <div className={cn(cls(), className)}>
      <div className={cls('inputRow')}>
        {/* [좌] 로고 */}
        <div className={cn(cls('logo'), isSearching && 'searching')} title={logoTooltip}>
          <div className="loading-border" />
          <div className="logo-inner">{logoIcon}</div>
        </div>

        {/* [중] 텍스트 입력 */}
        <textarea
          ref={inputRef}
          className={cls('textArea')}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          rows={1}
          disabled={isResponding}
        />

        {/* [우] 액션 그룹 */}
        <div className={cls('actionGroup')}>
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

          {/* 전송 버튼 */}
          <button
            className={cls('sendBtn')}
            onClick={handleSend}
            disabled={!value.trim() && !isResponding}
            title="전송"
          >
            {isResponding ? loadingIcon : sendIcon}
          </button>
        </div>
      </div>

      {/* 파일 목록 */}
      <FilePreviewList
        files={files}
        onFileDelete={onFileDelete}
        className={cls('file')}
        containerStyle={{ paddingLeft: 64, marginTop: 12 }}
      />

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleFileChange}
        multiple
      />
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />

      {/* 리스트 오버레이 (하향 전개) */}
      {(shouldShowRecommendations || shouldShowSearchResults) && (
        <div className={cls('listOverlay')} ref={listRef}>
          {shouldShowRecommendations && (
            <div className="list-section">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="list-item recommend-item"
                  onClick={() => handleListItemClick(item, onRecommendationClick)}
                >
                  <div className="recommend-icon">{bulbIcon}</div>
                  <div className="text-ellipsis">
                    {renderItem ? renderItem(item) : item.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {shouldShowSearchResults && (
            <div className="list-section">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="list-item search-item"
                  onClick={() => handleListItemClick(item, onSearchResultClick)}
                >
                  <div className="text-ellipsis">
                    {renderItem ? renderItem(item) : item.content}
                  </div>
                  <div className="apply-icon">{arrowUpRight}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
