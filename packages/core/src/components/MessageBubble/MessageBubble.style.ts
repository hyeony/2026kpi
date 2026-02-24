import { COMPONENT_NAMES } from "../../componentNames";
import type { CssObject } from "../../utils/injectStyle";

const MB = COMPONENT_NAMES.MessageBubble;

/**
 * MessageBubble 공통 스타일
 * - block: 컨테이너 (좌/우 정렬)
 * - content: 말풍선/블록 영역
 * - actions: 말풍선 아래 액션 영역
 * - user: 사용자(우측) 말풍선 스타일
 * - agent: 에이전트(좌측) 정보 블록 스타일
 */
export function getMessageBubbleStyles(prefix: string): CssObject {
  const b = `${prefix}-${MB}`;

  return {
    [`.${b}-root`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      maxWidth: "70%",
      boxSizing: "border-box",
    },
    [`.${b}-root-left`]: {
      alignSelf: "flex-start",
    },
    [`.${b}-root-right`]: {
      alignSelf: "flex-end",
    },
    [`.${b}-content`]: {
      padding: "10px 14px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    [`.${b}-content-user`]: {
      backgroundColor: "#f8f7fa",
      borderRadius: "16px 16px 4px 16px",
    },
    [`.${b}-content-agent`]: {
      borderRadius: "12px",
    },
    [`.${b}-user-img-wrap`]: {
      /* 이미지 그리드/단일 이미지 래퍼 */
    },
    [`.${b}-content-user-next`]: {
      marginTop: "8px",
    },
    [`.${b}-user-img-single`]: {
      display: "block",
      maxWidth: "100%",
      borderRadius: "8px",
      verticalAlign: "top",
      objectFit: "cover",
      objectPosition: "center",
      overflow: "hidden",
    },
    [`.${b}-user-img-single-square`]: {
      width: "200px",
      height: "200px",
    },
    [`.${b}-user-img-single-horizon`]: {
      maxWidth: "250px",
      maxHeight: "200px",
    },
    [`.${b}-user-img-single-portrait`]: {
      width: "200px",
      maxHeight: "250px",
    },
    [`.${b}-user-img-grid`]: {
      gap: "4px",
    },
    [`.${b}-user-img-grid-2`]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 120px)",
    },
    [`.${b}-user-img-grid-4`]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 120px)",
    },
    /** 3열 레이아웃(3장·5장·6장…). flex+flex-end로 마지막 줄이 몇 장이든 오른쪽 정렬, 장수 의존 없음 */
    [`.${b}-user-img-grid-3col`]: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      maxWidth: "368px",
    },
    [`.${b}-user-img-grid-item`]: {
      width: "120px",
      height: "120px",
      flexShrink: 0,
      objectFit: "cover",
      objectPosition: "center",
      overflow: "hidden",
      borderRadius: "6px",
      display: "block",
    },
    [`.${b}-actions`]: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "6px",
      paddingLeft: "4px",
      paddingRight: "4px",
    },
    [`.${b}-actions-right`]: {
      justifyContent: "flex-end",
    },
    [`.${b}-action-btn`]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      padding: 0,
      border: "none",
      borderRadius: "6px",
      background: "transparent",
      color: "#6b7280",
      cursor: "pointer",
      transition: "background 0.15s, color 0.15s",
    },
    [`.${b}-action-btn:hover`]: {
      background: "#f3f4f6",
      color: "#111827",
    },
    [`.${b}-action-btn:disabled`]: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };
}

export function getMessageBubbleStyleId(prefix: string): string {
  return `${prefix}-${MB}`;
}
