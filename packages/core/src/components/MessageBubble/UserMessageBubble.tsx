import React, { useContext } from "react";
import { UserMessageBubbleProps } from "./MessageBubble.types";
import { MessageBlock } from "./MessageBlock";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";
import { CopyIcon, EditIcon, BookmarkIcon } from "./MessageBubble.icons";

/**
 * 사용자 메시지: 항상 우측 정렬, 말풍선 스타일.
 * 액션: showX로 표시 여부, onX로 동작(없으면 noop 또는 추후 내부 기본 동작).
 */
export function UserMessageBubble({
  children,
  showCopy = true,
  onCopy,
  showEdit = true,
  onEdit,
  showBookmark = true,
  onBookmark,
  className,
}: UserMessageBubbleProps) {
  const { prefix } = useContext(HnineDSContext);
  const p = COMPONENT_NAMES.MessageBubble;
  const btnCls = getClass(prefix, p, "action-btn");

  const actions = (
    <>
      {showCopy && (
        <button type="button" className={btnCls} onClick={onCopy ?? (() => {})} aria-label="복사">
          <CopyIcon />
        </button>
      )}
      {showEdit && (
        <button type="button" className={btnCls} onClick={onEdit ?? (() => {})} aria-label="편집">
          <EditIcon />
        </button>
      )}
      {showBookmark && (
        <button type="button" className={btnCls} onClick={onBookmark ?? (() => {})} aria-label="북마크">
          <BookmarkIcon />
        </button>
      )}
    </>
  );

  const hasActions = showCopy || showEdit || showBookmark;

  const contentCls = [getClass(prefix, p, "content"), getClass(prefix, p, "content", "user")].join(" ");
  const userContent = <div className={contentCls}>{children}</div>;

  return (
    <MessageBlock
      content={userContent}
      actions={hasActions ? actions : undefined}
      align="right"
      className={className}
    />
  );
}
