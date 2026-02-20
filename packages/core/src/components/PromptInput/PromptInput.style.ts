import { COMPONENT_NAMES } from "../../componentNames";

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
export function getPromptInputStyles(prefix: string): string {
  const p = `${prefix}-${COMPONENT_NAMES.PromptInput}`;

  return `
    /* ── 루트 컨테이너 ── */
    .${p} {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #ffffff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      box-sizing: border-box;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .${p}:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
    }

    /* ── 크기 변형 ── */
    .${p}-sm { border-radius: 8px; }
    .${p}-md { border-radius: 12px; }
    .${p}-lg { border-radius: 16px; }

    /* ── textarea 영역 ── */
    .${p}-textarea {
      width: 100%;
      resize: none;
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      color: #111827;
      line-height: 1.6;
      box-sizing: border-box;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #e5e7eb transparent;
    }
    .${p}-textarea::placeholder {
      color: #9ca3af;
    }
    .${p}-textarea:disabled {
      color: #9ca3af;
      cursor: not-allowed;
    }

    /* textarea 크기별 패딩·폰트 */
    .${p}-sm .${p}-textarea { padding: 8px 12px 0; font-size: 13px; }
    .${p}-md .${p}-textarea { padding: 12px 16px 0; font-size: 14px; }
    .${p}-lg .${p}-textarea { padding: 14px 20px 0; font-size: 15px; }

    /* ── 하단 바 (액션 + 카운터 + 전송) ── */
    .${p}-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .${p}-sm .${p}-footer { padding: 6px 8px 8px; }
    .${p}-md .${p}-footer { padding: 8px 10px 12px; }
    .${p}-lg .${p}-footer { padding: 10px 14px 14px; }

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
      color: #9ca3af;
      white-space: nowrap;
      flex-shrink: 0;
      margin-left: auto;
      padding-right: 4px;
    }
    .${p}-count-warn {
      color: #f59e0b;
    }
    .${p}-count-over {
      color: #ef4444;
    }

    /* ── 전송 버튼 ── */
    .${p}-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: none;
      border-radius: 8px;
      background-color: #3b82f6;
      color: #ffffff;
      cursor: pointer;
      transition: background-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease;
      outline: none;
    }
    .${p}-submit:hover:not(:disabled) {
      background-color: #2563eb;
      transform: translateY(-1px);
    }
    .${p}-submit:active:not(:disabled) {
      transform: translateY(0);
    }
    .${p}-submit:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* 전송 버튼 크기 */
    .${p}-sm .${p}-submit { width: 28px; height: 28px; border-radius: 6px; }
    .${p}-md .${p}-submit { width: 32px; height: 32px; border-radius: 8px; }
    .${p}-lg .${p}-submit { width: 38px; height: 38px; border-radius: 10px; }

    /* ── 로딩 스피너 ── */
    .${p}-submit-loading {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.35);
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
