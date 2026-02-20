import { TextareaHTMLAttributes, KeyboardEvent, ReactNode } from "react";

/** 전송 버튼 크기 */
export type PromptInputSize = "sm" | "md" | "lg";

export interface PromptInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onSubmit"> {
  /**
   * 입력창 크기
   * @default "md"
   */
  size?: PromptInputSize;

  /**
   * placeholder 텍스트
   * @default "메시지를 입력하세요..."
   */
  placeholder?: string;

  /**
   * 현재 입력 값 (controlled)
   */
  value?: string;

  /**
   * 입력 값 변경 핸들러
   */
  onValueChange?: (value: string) => void;

  /**
   * 전송 핸들러 (버튼 클릭 또는 Enter 키)
   */
  onSubmit?: (value: string) => void;

  /**
   * Enter 키로 전송 여부 (Shift+Enter는 항상 줄바꿈)
   * @default true
   */
  submitOnEnter?: boolean;

  /**
   * 전송 중 상태 (버튼 로딩 표시)
   * @default false
   */
  loading?: boolean;

  /**
   * 전송 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 최대 높이 (자동 높이 조절 상한, px)
   * @default 200
   */
  maxRows?: number;

  /**
   * 전송 버튼 좌측에 추가 액션 버튼 (파일 첨부, 마이크 등)
   */
  actions?: ReactNode;

  /**
   * 커스텀 전송 버튼 아이콘 (기본: 화살표 아이콘)
   */
  submitIcon?: ReactNode;

  /**
   * 최대 입력 글자 수 표시
   */
  maxLength?: number;
}
