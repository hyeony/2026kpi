import { ReactNode } from "react";

/** 메시지 정렬: agent 좌측, user 우측 */
export type MessageBubbleAlign = "left" | "right";

/** 레이아웃만 담당. content 시각(말풍선/블록)은 User/Agent에서 wrapper로 처리. */
export interface MessageBlockProps {
  content: ReactNode;
  actions?: ReactNode;
  align: MessageBubbleAlign;
  className?: string;
}

/** 말풍선 내 이미지 한 장. width/height 있으면 1장일 때 horizon/portrait 판단, 없으면 정사각 fallback */
export interface UserMessageImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** User 말풍선 액션: 복사, 편집(콜백만), 북마크. 표시 여부(showX)와 동작(onX) 분리. */
export interface UserMessageBubbleProps {
  children?: ReactNode;
  /** 말풍선 내부 이미지. 1장: width/height 있으면 horizon(250x200)·portrait(200x250) 판단, 없으면 정사각. 2장~: 120x120 그리드, 5장: 위3 아래2 */
  images?: UserMessageImage[];
  /** 복사 버튼 표시 @default true */
  showCopy?: boolean;
  /** 복사 클릭 (없으면 내부 기본 동작 또는 noop) */
  onCopy?: () => void;
  /** 편집 버튼 표시 @default true */
  showEdit?: boolean;
  /** 편집 클릭 — 콜백만 동작 */
  onEdit?: () => void;
  /** 북마크 버튼 표시 @default true */
  showBookmark?: boolean;
  onBookmark?: () => void;
  className?: string;
}

/** Agent 블록 액션: 복사, 좋아요, 싫어요, 새로고침, 북마크. 표시 여부(showX)와 동작(onX) 분리. */
export interface AgentMessageBubbleProps {
  children?: ReactNode;
  showCopy?: boolean;
  onCopy?: () => void;
  showLike?: boolean;
  onLike?: () => void;
  showDislike?: boolean;
  onDislike?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showBookmark?: boolean;
  onBookmark?: () => void;
  className?: string;
}
