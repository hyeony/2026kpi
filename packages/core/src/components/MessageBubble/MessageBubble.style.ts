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
      marginBottom: "8px",
    },
    [`.${b}-user-img-wrap:last-child`]: {
      marginBottom: 0,
    },
    [`.${b}-user-img-single`]: {
      display: "block",
      maxWidth: "100%",
      objectFit: "contain",
      borderRadius: "8px",
      verticalAlign: "top",
    },
    [`.${b}-user-img-single-square`]: {
      width: "200px",
      height: "200px",
      objectFit: "cover",
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
      display: "grid",
      gap: "4px",
      gridAutoFlow: "dense",
    },
    [`.${b}-user-img-grid-2`]: {
      gridTemplateColumns: "repeat(2, 120px)",
    },
    [`.${b}-user-img-grid-3`]: {
      gridTemplateColumns: "repeat(3, 120px)",
    },
    [`.${b}-user-img-grid-4`]: {
      gridTemplateColumns: "repeat(2, 120px)",
    },
    [`.${b}-user-img-grid-5`]: {
      gridTemplateColumns: "repeat(3, 120px)",
    },
    [`.${b}-user-img-grid-6up`]: {
      gridTemplateColumns: "repeat(3, 120px)",
    },
    [`.${b}-user-img-grid-item`]: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
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
