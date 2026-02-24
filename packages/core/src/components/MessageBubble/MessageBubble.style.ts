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
      alignItems: "flex-end",
      maxWidth: "70%",
      boxSizing: "border-box",
    },
    [`.${b}-root-left`]: {
      alignSelf: "flex-start",
    },
    [`.${b}-root-right`]: {
      alignSelf: "flex-end",
      [`.${b}-actions`]: {
        opacity: 0,
        transition: "opacity 0.15s ease",
      },
      ["&:hover ." + `${b}-actions`]: {
        opacity: 1,
      },
    },
    [`.${b}-content`]: {
      padding: "10px 14px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    [`.${b}-content-user`]: {
      backgroundColor: "#f8f7fa",
      borderRadius: "16px 16px 4px 16px",
    },
    /** 편집 모드: wrapper 배경 변경(옅은 회색) */
    [`.${b}-content-user-editing`]: {
      backgroundColor: "#eef0f3",
      borderRadius: "16px 16px 4px 16px",
    },
    /** 사용자 파일 블록: 말풍선 X, 전체 동일 radius + 옅은 배경 */
    [`.${b}-content-user-file`]: {
      borderRadius: "12px",
      backgroundColor: "rgba(0,0,0,0.02)",
    },
    [`.${b}-content-agent`]: {
      borderRadius: "12px",
    },
    [`.${b}-user-img-wrap`]: {
      /* 이미지 그리드/단일 이미지 래퍼 */
    },
    [`.${b}-content-user-next`]: {
      marginTop: "8px",
    },
    [`.${b}-user-img-single`]: {
      display: "block",
      maxWidth: "100%",
      borderRadius: "8px",
      verticalAlign: "top",
      objectFit: "cover",
      objectPosition: "center",
      overflow: "hidden",
    },
    [`.${b}-user-img-single-square`]: {
      width: "200px",
      height: "200px",
    },
    [`.${b}-user-img-single-horizon`]: {
      maxWidth: "250px",
      maxHeight: "200px",
    },
    [`.${b}-user-img-single-portrait`]: {
      width: "200px",
      maxHeight: "250px",
    },
    [`.${b}-user-img-grid`]: {
      gap: "4px",
    },
    [`.${b}-user-img-grid-2`]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 120px)",
    },
    [`.${b}-user-img-grid-4`]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 120px)",
    },
    /** 3열 레이아웃(3장·5장·6장…). flex+flex-end로 마지막 줄이 몇 장이든 오른쪽 정렬, 장수 의존 없음 */
    [`.${b}-user-img-grid-3col`]: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      maxWidth: "368px",
    },
    [`.${b}-user-img-grid-item`]: {
      width: "120px",
      height: "120px",
      flexShrink: 0,
      objectFit: "cover",
      objectPosition: "center",
      overflow: "hidden",
      borderRadius: "6px",
      display: "block",
    },
    /** 편집 모드: 이미지 셀 래퍼(삭제 버튼 절대 위치용) */
    [`.${b}-user-img-edit-item-wrap`]: {
      position: "relative",
      flexShrink: 0,
      display: "block",
    },
    [`.${b}-user-img-edit-item-wrap .${b}-user-img-grid-item`]: {
      display: "block",
    },
    [`.${b}-user-img-edit-item-wrap.${b}-user-img-single-square-wrap`]: {
      width: "200px",
      height: "200px",
    },
    /** 편집 모드: 이미지 우측 상단 원형 X 삭제 버튼 (이미지·파일 공통) */
    [`.${b}-user-img-delete-btn`]: {
      position: "absolute",
      top: "6px",
      right: "6px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "#fff",
      border: "none",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.15s",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    },
    /** 파일 개별 블록(말풍선 하나당 파일 하나). 너비 통일 */
    [`.${b}-user-file-item`]: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      minWidth: 0,
      width: "280px",
      maxWidth: "280px",
      boxSizing: "border-box",
    },
    /** 편집 모드: 파일 행 래퍼(삭제 버튼 절대 위치용, 이미지와 동일한 원형 X) */
    [`.${b}-user-file-edit-wrap`]: {
      position: "relative",
      width: "280px",
      boxSizing: "border-box",
    },
    [`.${b}-user-file-icon`]: {
      flexShrink: 0,
      width: "36px",
      height: "44px",
      color: "#6b7280",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    [`.${b}-user-file-body`]: {
      flex: 1,
      minWidth: 0,
    },
    [`.${b}-user-file-name`]: {
      fontSize: "14px",
      lineHeight: 1.4,
      color: "#111827",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    },
    [`.${b}-user-file-type`]: {
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "2px",
    },
    /** 편집 모드: 텍스트 영역을 구분하는 input 스타일(이미지/파일+텍스트일 때) */
    [`.${b}-edit-text-wrap`]: {
      marginTop: "8px",
      width: "100%",
      boxSizing: "border-box",
    },
    [`.${b}-edit-textarea`]: {
      width: "100%",
      minHeight: "60px",
      padding: "10px 12px",
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#111827",
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      resize: "vertical",
      boxSizing: "border-box",
      outline: "none",
      "&:focus": {
        borderColor: "#6b7280",
      },
    },
    [`.${b}-edit-actions`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      marginTop: "10px",
    },
    [`.${b}-edit-btn`]: {
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: 500,
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.15s, color 0.15s",
    },
    [`.${b}-edit-btn-cancel`]: {
      backgroundColor: "#fff",
      color: "#111827",
      border: "1px solid #e5e7eb",
      "&:hover": {
        backgroundColor: "#f9fafb",
      },
    },
    [`.${b}-edit-btn-confirm`]: {
      backgroundColor: "#111827",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#374151",
      },
    },
    /** 편집 모드: 파일 삭제는 .user-img-delete-btn 재사용(이미지와 동일 원형 X) */
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
      "&:hover": {
        background: "#f3f4f6",
        color: "#111827",
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  };
}

export function getMessageBubbleStyleId(prefix: string): string {
  return `${prefix}-${MB}`;
}
