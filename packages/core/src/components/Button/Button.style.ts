import { COMPONENT_NAMES } from "../../componentNames";

/**
 * core 기본 Button 스타일
 * prefix를 받아 해당 prefix 기반 CSS 문자열 반환
 */
export function getButtonStyles(prefix: string): string {
  const btn = `${prefix}-${COMPONENT_NAMES.Button}`;

  return `
    .${btn} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      transition: background-color 0.2s, opacity 0.2s;
      outline: none;
      box-sizing: border-box;
    }
    .${btn}:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Size variants */
    .${btn}-sm { padding: 4px 10px; font-size: 12px; min-height: 28px; }
    .${btn}-md { padding: 8px 16px; font-size: 14px; min-height: 36px; }
    .${btn}-lg { padding: 12px 22px; font-size: 16px; min-height: 44px; }

    /* Color variants */
    .${btn}-primary {
      background-color: #3b82f6;
      color: #ffffff;
    }
    .${btn}-primary:hover:not(:disabled) {
      background-color: #2563eb;
    }
    .${btn}-secondary {
      background-color: #e5e7eb;
      color: #111827;
    }
    .${btn}-secondary:hover:not(:disabled) {
      background-color: #d1d5db;
    }
    .${btn}-ghost {
      background-color: transparent;
      color: #374151;
    }
    .${btn}-ghost:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    /* Inner elements */
    .${btn}-icon {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .${btn}-label {
      display: inline-block;
    }
  `.trim();
}

/** 스타일 고유 ID (data-hnineds-id 속성값으로 사용) */
export function getButtonStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.Button}`;
}
