/**
 * 클래스명을 조합하는 경량 유틸
 * falsy 값은 자동 제거
 *
 * @example
 * cn("btn", "btn--primary", undefined, "my-class") → "btn btn--primary my-class"
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
