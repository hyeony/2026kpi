import { COMPONENT_NAMES } from "@hnineds/core";

/**
 * @hnineds/styles 전용 Button 스타일 (enhanced design)
 * core 기본 스타일보다 시각적으로 고도화된 디자인
 */
export function getButtonStyles(prefix: string): string {
  const btn = `${prefix}-${COMPONENT_NAMES.Button}`;

  return `
    .${btn} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      letter-spacing: 0.01em;
      transition: all 0.15s ease;
      outline: none;
      box-sizing: border-box;
    }
    .${btn}:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Enhanced Size variants */
    .${btn}-sm { padding: 5px 12px; font-size: 12px; min-height: 28px; }
    .${btn}-md { padding: 9px 18px; font-size: 14px; min-height: 36px; }
    .${btn}-lg { padding: 13px 24px; font-size: 16px; min-height: 44px; }

    /* Enhanced Color variants */
    .${btn}-primary {
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.35);
    }
    .${btn}-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #4f46e5, #2563eb);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.45);
      transform: translateY(-1px);
    }
    .${btn}-primary:active:not(:disabled) {
      transform: translateY(0);
    }
    .${btn}-secondary {
      background-color: #f1f5f9;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    .${btn}-secondary:hover:not(:disabled) {
      background-color: #e2e8f0;
      border-color: #cbd5e1;
    }
    .${btn}-ghost {
      background-color: transparent;
      color: #6366f1;
    }
    .${btn}-ghost:hover:not(:disabled) {
      background-color: #eef2ff;
    }

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

/** 스타일 고유 ID */
export function getButtonStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.Button}`;
}
