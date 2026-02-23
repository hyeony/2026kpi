import { COMPONENT_NAMES } from "../../componentNames";
import type { CssObject } from "../../utils/injectStyle";

/**
 * PromptInput 기본 스타일 (core 패키지)
 *
 * 클래스명 구조:
 *   {prefix}-prompt          루트 컨테이너
 *   {prefix}-prompt-sm/md/lg 크기 변형
 *   {prefix}-prompt-inner    내부 flex row (textarea + 우측 영역)
 *   {prefix}-prompt-textarea  실제 textarea 요소
 *   {prefix}-prompt-footer   하단 영역 (액션 + 글자수 + 전송버튼)
 *   {prefix}-prompt-actions  좌측 추가 액션 슬롯
 *   {prefix}-prompt-count    글자수 카운터
 *   {prefix}-prompt-submit   전송 버튼
 *   {prefix}-prompt-submit-loading 로딩 스피너
 */
export function getPromptInputStyles(prefix: string): CssObject {
  const p = `${prefix}-${COMPONENT_NAMES.PromptInput}`;

  return {
    // ── 루트 컨테이너 ──
    [`.${p}`]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      background: "#ffffff",
      border: "1.5px solid #e5e7eb",
      borderRadius: "12px",
      boxSizing: "border-box",
      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    },
    [`.${p}:focus-within`]: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.12)",
    },

    // ── 크기 변형 ──
    [`.${p}-sm`]: { borderRadius: "8px" },
    [`.${p}-md`]: { borderRadius: "12px" },
    [`.${p}-lg`]: { borderRadius: "16px" },

    // ── textarea 영역 ──
    [`.${p}-textarea`]: {
      width: "100%",
      resize: "none",
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "inherit",
      color: "#111827",
      lineHeight: 1.6,
      boxSizing: "border-box",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#e5e7eb transparent",
    },
    [`.${p}-textarea::placeholder`]: {
      color: "#9ca3af",
    },
    [`.${p}-textarea:disabled`]: {
      color: "#9ca3af",
      cursor: "not-allowed",
    },

    // textarea 크기별 패딩·폰트
    [`.${p}-sm .${p}-textarea`]: { padding: "8px 12px 0", fontSize: "13px" },
    [`.${p}-md .${p}-textarea`]: { padding: "12px 16px 0", fontSize: "14px" },
    [`.${p}-lg .${p}-textarea`]: { padding: "14px 20px 0", fontSize: "15px" },

    // ── 하단 바 (액션 + 카운터 + 전송) ──
    [`.${p}-footer`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    [`.${p}-sm .${p}-footer`]: { padding: "6px 8px 8px" },
    [`.${p}-md .${p}-footer`]: { padding: "8px 10px 12px" },
    [`.${p}-lg .${p}-footer`]: { padding: "10px 14px 14px" },

    // ── 좌측 액션 슬롯 ──
    [`.${p}-actions`]: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      flexShrink: 0,
    },

    // ── 글자수 카운터 ──
    [`.${p}-count`]: {
      fontSize: "11px",
      color: "#9ca3af",
      whiteSpace: "nowrap",
      flexShrink: 0,
      marginLeft: "auto",
      paddingRight: "4px",
    },
    [`.${p}-count-warn`]: {
      color: "#f59e0b",
    },
    [`.${p}-count-over`]: {
      color: "#ef4444",
    },

    // ── 전송 버튼 ──
    [`.${p}-submit`]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease",
      outline: "none",
    },
    [`.${p}-submit:hover:not(:disabled)`]: {
      backgroundColor: "#2563eb",
      transform: "translateY(-1px)",
    },
    [`.${p}-submit:active:not(:disabled)`]: {
      transform: "translateY(0)",
    },
    [`.${p}-submit:disabled`]: {
      opacity: 0.4,
      cursor: "not-allowed",
    },

    // 전송 버튼 크기
    [`.${p}-sm .${p}-submit`]: { width: "28px", height: "28px", borderRadius: "6px" },
    [`.${p}-md .${p}-submit`]: { width: "32px", height: "32px", borderRadius: "8px" },
    [`.${p}-lg .${p}-submit`]: { width: "38px", height: "38px", borderRadius: "10px" },

    // ── 로딩 스피너 ──
    [`.${p}-submit-loading`]: {
      width: "14px",
      height: "14px",
      border: "2px solid rgba(255,255,255,0.35)",
      borderTopColor: "#ffffff",
      borderRadius: "50%",
      animation: `${p}-spin 0.7s linear infinite`,
    },
    [`@keyframes ${p}-spin`]: {
      to: { transform: "rotate(360deg)" },
    },
  };
}

/** 스타일 기본 ID — layer suffix는 useComponentStyle이 자동으로 부여한다 */
export function getPromptInputStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.PromptInput}`;
}
