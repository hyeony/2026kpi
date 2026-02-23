/**
 * 컴포넌트별 prefix 뒤에 붙는 고유 이름 (라이브러리 내부 고정)
 *
 * 클래스명 생성 방식: {prefix}-{COMPONENT_NAMES.Button}
 * 예: prefix="hnineds1" → "hnineds1-btn"
 * 예: prefix="custom"   → "custom-btn"
 *
 * 신규 컴포넌트 추가 시 이 파일에만 등록하면 됨
 */
export const COMPONENT_NAMES = {
  Button: "btn",
  Input: "input",
  PromptInput: "prompt",
  MessageBubble: "message-bubble",
} as const;

export type ComponentNameKey = keyof typeof COMPONENT_NAMES;
