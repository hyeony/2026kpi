import React from "react";

const iconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" as const };

export function CopyIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export function BookmarkIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function LikeIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function DislikeIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M10 15v4a2 2 0 0 0 2 2h4" />
      <path d="M12 3h4a2 2 0 0 1 2 2v4" />
      <path d="M4 12h4l2-2 2 2h4" />
      <path d="M2 10v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export function RefreshIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

/** 닫기(X) 아이콘 — 편집 모드 이미지 삭제 등, 원형 버튼 내부용 */
export function CloseIcon() {
  return (
    <svg {...iconProps} aria-hidden width={14} height={14} viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** 삭제(휴지통) 아이콘 — 편집 모드 파일 삭제 등 */
export function TrashIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

/** 파일 첨부용 직사각형(문서) 아이콘 */
export function FileIcon() {
  return (
    <svg
      width="36"
      height="44"
      viewBox="0 0 36 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 2h20l8 8v32H4V2z" />
      <path d="M24 2v8h8" />
    </svg>
  );
}
