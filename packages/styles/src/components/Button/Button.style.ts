import { COMPONENT_NAMES } from "@hnineds/core";
import type { CssObject } from "@hnineds/core";

/**
 * @hnineds/styles 전용 Button 스타일 (enhanced design)
 * core 기본 스타일보다 시각적으로 고도화된 디자인
 */
export function getButtonStyles(prefix: string): CssObject {
  const btn = `${prefix}-${COMPONENT_NAMES.Button}`;

  return {
    [`.${btn}`]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.01em",
      transition: "all 0.15s ease",
      outline: "none",
      boxSizing: "border-box",
    },
    [`.${btn}:disabled`]: {
      opacity: 0.45,
      cursor: "not-allowed",
    },

    // Enhanced Size variants
    [`.${btn}-sm`]: { padding: "5px 12px", fontSize: "12px", minHeight: "28px" },
    [`.${btn}-md`]: { padding: "9px 18px", fontSize: "14px", minHeight: "36px" },
    [`.${btn}-lg`]: { padding: "13px 24px", fontSize: "16px", minHeight: "44px" },

    // Enhanced Color variants
    [`.${btn}-primary`]: {
      background: "linear-gradient(135deg, #6366f1, #3b82f6)",
      color: "#ffffff",
      boxShadow: "0 2px 8px rgba(99, 102, 241, 0.35)",
    },
    [`.${btn}-primary:hover:not(:disabled)`]: {
      background: "linear-gradient(135deg, #4f46e5, #2563eb)",
      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.45)",
      transform: "translateY(-1px)",
    },
    [`.${btn}-primary:active:not(:disabled)`]: {
      transform: "translateY(0)",
    },
    [`.${btn}-secondary`]: {
      backgroundColor: "#f1f5f9",
      color: "#0f172a",
      border: "1px solid #e2e8f0",
    },
    [`.${btn}-secondary:hover:not(:disabled)`]: {
      backgroundColor: "#e2e8f0",
      borderColor: "#cbd5e1",
    },
    [`.${btn}-ghost`]: {
      backgroundColor: "transparent",
      color: "#6366f1",
    },
    [`.${btn}-ghost:hover:not(:disabled)`]: {
      backgroundColor: "#eef2ff",
    },

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
