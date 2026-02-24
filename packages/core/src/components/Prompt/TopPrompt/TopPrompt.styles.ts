import { COMPONENT_NAMES, CssObject } from '@hnineds/core';

/**
 * TopPrompt 기본 스타일
 *
 * 클래스명 구조:
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}           루트 컨테이너
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-inputRow  인풋 로우 (로고 + 텍스트 + 액션)
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-logo      로고 래퍼 (스피너 포함)
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-textArea  텍스트 입력창
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-file  첨부파일 목록
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-listOverlay 검색/추천 드롭다운
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-contextMenu 파일 첨부 메뉴
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-icon      아이콘 래퍼
 *   {prefix}-{COMPONENT_NAMES.TopPrompt}-sendBtn   전송 버튼
 */
export const getTopPromptStyles = (prefix: string): CssObject => {
  const tp = `${prefix}-${COMPONENT_NAMES.TopPrompt}`;

  return {
    // ── 루트 컨테이너 ──
    [`.${tp}`]: {
      position: 'relative',
      width: '100%',
      minHeight: '72px',
      maxWidth: '800px',
      background: '#ffffff',
      border: '1.5px solid #e5e7eb',
      borderRadius: '24px',
      padding: '12px 12px 12px 16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    [`.${tp}:focus-within`]: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.12)',
    },

    // ── inputRow ──
    [`.${tp}-inputRow`]: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      width: '100%',
    },

    // ── logo (48×48 래퍼 + 스피너) ──
    [`.${tp}-logo`]: {
      position: 'relative',
      width: '48px',
      height: '48px',
      flexShrink: 0,
      borderRadius: '50%',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'help',
      '.loading-border': {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '2px solid #3b82f6',
        borderTopColor: 'transparent',
        animation: 'hnineds-tp-spin 1s linear infinite',
        display: 'none',
      },
      '&.searching .loading-border': { display: 'block' },
      '.logo-inner': {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },

    // ── textArea ──
    [`.${tp}-textArea`]: {
      flex: 1,
      height: '27px',
      minHeight: '27px',
      lineHeight: '27px',
      padding: '0px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      resize: 'none',
      fontSize: '14px',
      color: '#111111',
      boxSizing: 'content-box',
      overflowY: 'hidden',
      alignSelf: 'center',
      '&::placeholder': { color: '#9ca3af' },
    },

    // ── 액션 그룹 (plus + send) ──
    [`.${tp}-actionGroup`]: {
      display: 'flex',
      gap: '4px',
      flexShrink: 0,
      alignItems: 'flex-start',
    },

    // ── icon wrapper ──
    [`.${tp}-icon`]: {
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '20px',
      color: '#6b7280',
      transition: 'color 0.2s',
      '&:hover': { color: '#3b82f6' },
    },

    // ── 전송 버튼 ──
    [`.${tp}-sendBtn`]: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '20px',
      padding: 0,
      '&:disabled': {
        backgroundColor: '#e5e7eb',
        color: '#9ca3af',
        cursor: 'not-allowed',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: '#2563eb',
      },
    },

    // ── file ──
    [`.${tp}-file`]: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px', // 파일간 gap 10
      padding: '8px 16px 12px 64px', // 로고(48) + 간격(16) 위치에 맞춤

      // 일반 첨부파일 칩 (120px)
      '.file-chip-custom': {
        width: '120px',
        minHeight: '58px',
        maxHeight: '76px',
        padding: '8px 8px 10px 12px', // top 8, right 8, bottom 10, left 12
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #e5e7eb',

        '.file-top': {
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          '.type-icon': { fontSize: 16, color: '#000000' }, // 16x16
          '.ext-text': { fontSize: 12, color: '#000000', fontWeight: 'bold' },
        },

        '.file-name': {
          fontSize: 11,
          lineHeight: '1.2',
          color: '#000000',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-all',
        },

        '.close-btn': {
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '8px', // 16x16
          cursor: 'pointer',
          color: '#000000',
        },
      },

      // 이미지 칩 (80x80)
      '.image-chip-custom': {
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',

        img: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },

        // [수정] 중앙 오버레이 삭제 버튼
        '.delete-overlay': {
          position: 'absolute',
          inset: 0, // 전체 영역 덮기
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // 반투명 검정
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0, // 평소엔 숨김
          cursor: 'pointer',
          zIndex: 2,

          '&:hover': {
            opacity: 1, // 호버 시 노출
          },

          '.delete-icon': {
            color: '#fff',
            fontSize: '24px', // 중앙 X 아이콘 크기
          },
        },

        // 로딩 상태일 때 표시
        '.loading-overlay': {
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          zIndex: 1,
        },
      },
    },

    // ── listOverlay (하향 전개 드롭다운) ──
    [`.${tp}-listOverlay`]: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: '0px',
      right: '0px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      zIndex: 1000,
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      '.list-section': {
        padding: '4px',
      },
      '.list-item': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        cursor: 'pointer',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#111111',
        transition: 'background 0.15s',
        '&:hover': { backgroundColor: '#f3f4f6' },
      },
      '.recommend-icon': {
        fontSize: '16px',
        color: '#f59e0b',
        flexShrink: 0,
      },
      '.apply-icon': {
        fontSize: '14px',
        color: '#6b7280',
        flexShrink: 0,
        marginLeft: 'auto',
      },
      '.text-ellipsis': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },

    // ── contextMenu (상향 전개) ──
    [`.${tp}-contextMenu`]: {
      position: 'absolute',
      top: '100%',
      right: '0px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '4px',
      zIndex: 1000,
      minWidth: '140px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      '.menu-item': {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#111111',
        '&:hover': { backgroundColor: '#f3f4f6' },
      },
    },

    // ── 로딩 스피너 애니메이션 ──
    ['@keyframes hnineds-tp-spin']: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  };
};

export function getTopPromptStyleId(prefix: string): string {
  return `${prefix}-${COMPONENT_NAMES.TopPrompt}`;
}
