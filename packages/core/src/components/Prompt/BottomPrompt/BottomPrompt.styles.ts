import {COMPONENT_NAMES, CssObject} from "@hnineds/core";

/**
 * BottomPrompt 기본 스타일
 *
 * 클래스명 구조:
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt} 루트 컨테이너
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-list 리스트박스
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-tag 태그
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-file 첨부파일
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-input 인풋박스
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-inputRow 인풋로우
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-textArea 텍스트입력창
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-actionIcon 액션아이콘
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-bottomIcon 하단아이콘
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-bottomRow 하단영역
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-leftAction 좌측영역
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-icon 아이콘
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-contextMenu 컨텍스트메뉴
 *   {prefix}-{COMPONENT_NAMES.BottomPrompt}-btn 버튼
 */
export const getBottomPromptStyles = (prefix: string): CssObject => {
    const bottomPrompt = `${prefix}-${COMPONENT_NAMES.BottomPrompt}`;

    return {
        // ── 루트 컨테이너 ──
        [`.${bottomPrompt}`]: {
            width: '100%',
            minHeight: "96px",
            maxHeight: "264px",
            position: 'relative',
            background: "#ffffff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "12px",

            // 가이드: Left 16, Top 14, Bottom 10, Right 10
            padding: '14px 10px 10px 16px',

            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
        },
        [`.${bottomPrompt}:focus-within`]: {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.12)",
        },

        // ── input ──
        [`.${bottomPrompt}-input`]: {
            display: 'flex',
            flexDirection: 'column',
            gap: "6px",
            padding: '10px',
        },
        // ── inputRow ──
        [`.${bottomPrompt}-inputRow`]: {
            display: 'flex',
            alignItems: 'flex-end', // 텍스트가 길어져도 버튼은 아래쪽에 고정
        },
        // ── list ──
        [`.${bottomPrompt}-list`]: {
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: "0px",
            right: "0px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            zIndex: 1000,
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            visibility: 'visible',
            opacity: 1,
        },
        [`.${bottomPrompt}-list .list-item`]: {
            padding: '10px 16px',
            cursor: 'pointer',
            transition: '0.2s',
        },
        [`.${bottomPrompt}-list .list-item:hover`]: {
            background: '#ef4444'
        },

        // ── tag ──
        [`.${bottomPrompt}-tag`]: {
            display: 'flex',
            gap: "8px",
            marginBottom: "8px",
            padding: '0 4px'
        },
        [`.${bottomPrompt}-tag .tag-item`]: {
            fontSize: '12px',
            padding: '2px 8px',
            backgroundColor: "#ffffff",
            borderRadius: '4px',
            color: '#000000'
        },

        // ── file ──
        [`.${bottomPrompt}-file`]: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: "10px", // 파일간 gap 10
            padding: '8px 16px 12px 64px', // 로고(48) + 간격(16) 위치에 맞춤

            // 일반 첨부파일 칩 (120px)
            '.file-chip-custom': {
                width: "120px",
                minHeight: "58px",
                maxHeight: "76px",
                padding: '8px 8px 10px 12px', // top 8, right 8, bottom 10, left 12
                backgroundColor: '#ffffff',
                borderRadius: "8px",
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e5e7eb',

                '.file-top': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: "4px",
                    '.type-icon': { fontSize: 16, color: '#000000' }, // 16x16
                    '.ext-text': { fontSize: 12, color: '#000000', fontWeight: 'bold' }
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
                    wordBreak: 'break-all'
                },

                '.close-btn': {
                    position: 'absolute',
                    top: "8px",
                    right: "8px",
                    fontSize: "8px", // 16x16
                    cursor: 'pointer',
                    color: '#000000',
                }
            },

            // 이미지 칩 (80x80)
            '.image-chip-custom': {
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',

                img: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
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
                        fontSize: "24px", // 중앙 X 아이콘 크기
                    }
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
                }
            },
        },
        // ── bottomIcon ──
        [`.${bottomPrompt}-bottomIcon`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // 좌측 아이콘들과 우측 버튼 분리
            width: '100%',
            marginTop: 'auto', // 내용이 늘어나도 하단에 고정
        },
        // ── textArea ──
        [`.${bottomPrompt}-textArea`]: {
            width: '100%', // 364 - 16(L) - 10(R) - border(2) = 336에서 여백 고려 시 약 332
            height: "24px",
            minHeight: "24px",
            lineHeight: '24px',
            padding: "0px",
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            resize: 'none',
            fontSize: "12px",
            color: '#000000',
            boxSizing: 'content-box',
            overflowY: 'hidden',
            marginBottom: "16px", // 아래 아이콘 영역과의 공백 16px
            '&::placeholder': { color: '#111111' }
        },
        // ── actionIcon ──
        [`.${bottomPrompt}-actionIcon`]: {
            fontSize: "16px", // 약간 작게 조정
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
        },
        // ── bottomRow ──
        [`.${bottomPrompt}-bottomRow`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // 좌측 아이콘들과 우측 버튼 분리
            width: '100%',
            marginTop: 'auto', // 내용이 늘어나도 하단에 고정
        },
        // ── leftAction ──
        [`.${bottomPrompt}-leftAction`]: {
            display: 'flex',
            alignItems: 'center',
            gap: "4px", // 아이콘 간격 4px
        },
        // ── icon ──
        [`.${bottomPrompt}-icon`]: {
            width: "24px",
            height: "24px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: "18px",
            transition: 'color 0.2s',
            '&.selected': { color: '#faad14' },
        },
        // ── contextMenu ──
        [`.${bottomPrompt}-contextMenu`]: {
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: "0px",
            backgroundColor: '#ffffff',
            borderRadius: "8px",
            border: `1px solid #000000`,
            padding: '4px',
            zIndex: 1000,
            minWidth: "140px",
            '.menu-item': {
                display: 'flex',
                alignItems: 'center',
                gap: "8px",
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: "4px",
                fontSize: "13px",
                '&:hover': { backgroundColor: '#111111' },
            }
        },
        // ── btn ──
        [`.${bottomPrompt}-btn`]: {
            width: "32px",
            height: "32px",
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffffff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: "16px",
        },
        // ── 로딩 스피너 애니메이션 ──
        ['@keyframes hnineds-bp-spin']: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        },
    }
};

export function getBottomPromptStyleId(prefix: string): string {
    return `${prefix}-${COMPONENT_NAMES.BottomPrompt}`;
}