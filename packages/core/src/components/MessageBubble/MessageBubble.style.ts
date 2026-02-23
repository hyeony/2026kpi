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
      backgroundColor: "#e0d8ed",
      borderRadius: "16px 16px 4px 16px",
    },
    [`.${b}-content-agent`]: {
      borderRadius: "12px",
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
