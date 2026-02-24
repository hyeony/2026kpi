import React, { useContext } from "react";
import { AgentMessageBubbleProps } from "./MessageBubble.types";
import { MessageBlock } from "./MessageBlock";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";
import { CopyIcon, BookmarkIcon, LikeIcon, DislikeIcon, RefreshIcon } from "./MessageBubble.icons";

/**
 * 에이전트 메시지: 항상 좌측 정렬, 정보 전달형 블록.
 * 액션: showX로 표시 여부(기본 true), onX로 동작(없으면 noop 또는 추후 내부 기본 동작).
 */
export function AgentMessageBubble({
  children,
  showCopy = true,
  onCopy,
  showLike = true,
  onLike,
  showDislike = true,
  onDislike,
  showRefresh = true,
  onRefresh,
  showBookmark = true,
  onBookmark,
  className,
}: AgentMessageBubbleProps) {
  const { prefix } = useContext(HnineDSContext);
  const p = COMPONENT_NAMES.MessageBubble;
  const cls = (modifier?: string) => getClass(prefix, p, modifier);

  const actions = (
    <>
      {showCopy && (
        <button type="button" className={cls("action-btn")} onClick={onCopy ?? (() => {})} aria-label="복사">
          <CopyIcon />
        </button>
      )}
      {showLike && (
        <button type="button" className={cls("action-btn")} onClick={onLike ?? (() => {})} aria-label="좋아요">
          <LikeIcon />
        </button>
      )}
      {showDislike && (
        <button type="button" className={cls("action-btn")} onClick={onDislike ?? (() => {})} aria-label="싫어요">
          <DislikeIcon />
        </button>
      )}
      {showRefresh && (
        <button type="button" className={cls("action-btn")} onClick={onRefresh ?? (() => {})} aria-label="새로고침">
          <RefreshIcon />
        </button>
      )}
      {showBookmark && (
        <button type="button" className={cls("action-btn")} onClick={onBookmark ?? (() => {})} aria-label="북마크">
          <BookmarkIcon />
        </button>
      )}
    </>
  );

  const hasActions = showCopy || showLike || showDislike || showRefresh || showBookmark;

  const contentCls = cls("content-agent");
  const agentContent = <div className={contentCls}>{children}</div>;

  return (
    <MessageBlock
      content={agentContent}
      actions={hasActions ? actions : undefined}
      align="left"
      className={className}
    />
  );
}
