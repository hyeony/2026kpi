import { COMPONENT_NAMES } from "@hnineds/core";

/**
 * PromptInput enhanced 스타일 (@hnineds/styles 패키지)
 *
 * core 대비 변경점:
 * - glassmorphism 배경 + 미묘한 그라디언트 테두리
 * - 전송 버튼: 보라-파랑 gradient + 호버 shadow
 * - textarea 폰트: 시스템 sans-serif 통일
 * - 전반적인 spacing · radius 세련화
 */
export function getPromptInputStyles(prefix: string): string {
  const p = `${prefix}-${COMPONENT_NAMES.PromptInput}`;

  return `
    /* ── 루트 컨테이너 ── */
    .${p} {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 14px;
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }
    .${p}:focus-within {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    /* ── 크기 변형 ── */
    .${p}-sm { border-radius: 10px; }
    .${p}-md { border-radius: 14px; }
    .${p}-lg { border-radius: 18px; }

    /* ── textarea 영역 ── */
    .${p}-textarea {
      width: 100%;
      resize: none;
      border: none;
      outline: none;
      background: transparent;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #0f172a;
      line-height: 1.65;
      box-sizing: border-box;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #e2e8f0 transparent;
    }
    .${p}-textarea::placeholder {
      color: #94a3b8;
    }
    .${p}-textarea:disabled {
      color: #94a3b8;
      cursor: not-allowed;
    }

    /* textarea 크기별 패딩·폰트 */
    .${p}-sm .${p}-textarea { padding: 10px 14px 0; font-size: 13px; }
    .${p}-md .${p}-textarea { padding: 14px 18px 0; font-size: 14px; }
    .${p}-lg .${p}-textarea { padding: 16px 22px 0; font-size: 15px; }

    /* ── 하단 바 ── */
    .${p}-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .${p}-sm .${p}-footer { padding: 6px 10px 10px; }
    .${p}-md .${p}-footer { padding: 8px 12px 14px; }
    .${p}-lg .${p}-footer { padding: 10px 16px 16px; }

    /* ── 좌측 액션 슬롯 ── */
    .${p}-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    /* ── 글자수 카운터 ── */
    .${p}-count {
      font-size: 11px;
      color: #94a3b8;
      white-space: nowrap;
      flex-shrink: 0;
      margin-left: auto;
      padding-right: 4px;
      font-variant-numeric: tabular-nums;
    }
    .${p}-count-warn {
      color: #f59e0b;
      font-weight: 600;
    }
    .${p}-count-over {
      color: #ef4444;
      font-weight: 600;
    }

    /* ── 전송 버튼 ── */
    .${p}-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: none;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #ffffff;
      cursor: pointer;
      transition: all 0.15s ease;
      outline: none;
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
    }
    .${p}-submit:hover:not(:disabled) {
      background: linear-gradient(135deg, #4f46e5, #2563eb);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.45);
      transform: translateY(-1px);
    }
    .${p}-submit:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
    }
    .${p}-submit:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* 전송 버튼 크기 */
    .${p}-sm .${p}-submit { width: 28px; height: 28px; border-radius: 7px; }
    .${p}-md .${p}-submit { width: 34px; height: 34px; border-radius: 9px; }
    .${p}-lg .${p}-submit { width: 40px; height: 40px; border-radius: 11px; }

    /* ── 로딩 스피너 ── */
    .${p}-submit-loading {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: ${p}-spin 0.7s linear infinite;
    }
    @keyframes ${p}-spin {
      to { transform: rotate(360deg); }
    }
  `.trim();
}

export function getPromptInputStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.PromptInput}`;
}
