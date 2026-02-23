import { COMPONENT_NAMES } from "../../componentNames";
import type { CssObject } from "../../utils/injectStyle";

/**
 * core 기본 Button 스타일
 * prefix를 받아 해당 prefix 기반 CssObject 반환
 */
export function getButtonStyles(prefix: string): CssObject {
  const btn = `${prefix}-${COMPONENT_NAMES.Button}`;

  return {
    [`.${btn}`]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 500,
      transition: "background-color 0.2s, opacity 0.2s",
      outline: "none",
      boxSizing: "border-box",
    },
    [`.${btn}:disabled`]: {
      opacity: 0.5,
      cursor: "not-allowed",
    },

    // Size variants
    [`.${btn}-sm`]: { padding: "4px 10px", fontSize: "12px", minHeight: "28px" },
    [`.${btn}-md`]: { padding: "8px 16px", fontSize: "14px", minHeight: "36px" },
    [`.${btn}-lg`]: { padding: "12px 22px", fontSize: "16px", minHeight: "44px" },

    // Color variants
    [`.${btn}-primary`]: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    [`.${btn}-primary:hover:not(:disabled)`]: {
      backgroundColor: "#2563eb",
    },
    [`.${btn}-secondary`]: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
    [`.${btn}-secondary:hover:not(:disabled)`]: {
      backgroundColor: "#d1d5db",
    },
    [`.${btn}-ghost`]: {
      backgroundColor: "transparent",
      color: "#374151",
    },
    [`.${btn}-ghost:hover:not(:disabled)`]: {
      backgroundColor: "#f3f4f6",
    },

    // Inner elements
    [`.${btn}-icon`]: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
    [`.${btn}-label`]: {
      display: "inline-block",
    },
  };
}

/** 스타일 기본 ID — layer suffix는 useComponentStyle이 자동으로 부여한다 */
export function getButtonStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.Button}`;
}
