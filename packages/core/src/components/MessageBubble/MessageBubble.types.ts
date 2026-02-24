import { ReactNode } from "react";

export type MessageBubbleAlign = "left" | "right";

/** 레이아웃만 담당. content 시각(말풍선/블록)은 User/Agent에서 wrapper로 처리. */
export interface MessageBlockProps {
  content: ReactNode;
  actions?: ReactNode;
  align: MessageBubbleAlign;
  className?: string;
}

/** 말풍선 내 이미지 한 장. 표시 크기는 말풍선 UI에서 강제(1장=정사각, 2장~=120×120 그리드). */
export interface UserMessageImage {
  src: string;
  alt?: string;
}

/** 말풍선 내 파일 한 개. 파일명+확장자, 하단에 파일형식(옅은 색). 블록으로 세로 쌓임. */
export interface UserMessageFile {
  /** 파일명 + 확장자 (예: "보고서.pdf"). 최대 2줄 말줄임 */
  fileName: string;
  /** 파일형식 라벨 (예: "PDF 문서"). 옅은 색으로 하단 표시 */
  fileType?: string;
}

/** User 말풍선 액션: 복사, 편집(콜백만), 북마크. 표시 여부(showX)와 동작(onX) 분리. */
export interface UserMessageBubbleProps {
  children?: ReactNode;
  /** 말풍선 내부 이미지. 1장: 정사각(200×200), 2장~: 120×120 그리드. 크기는 UI에서 통일 */
  images?: UserMessageImage[];
  /** 말풍선 내부 파일. 블록 형태로 세로 쌓임. 이미지와 별도 말풍선 가능 */
  files?: UserMessageFile[];
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
