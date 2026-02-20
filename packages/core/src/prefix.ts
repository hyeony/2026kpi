// vite.config의 define으로 빌드 타임 치환됨
// 개발 환경(playground)에서는 Vite define이 동일하게 작동
declare const __BUILD_PREFIX__: string;

export const BUILD_PREFIX: string =
  typeof __BUILD_PREFIX__ !== "undefined"
    ? __BUILD_PREFIX__
    : "hnineds1"; // fallback (비-Vite 환경용)

/**
 * prefix와 나머지 parts를 모두 `-`로 연결하여 클래스명 생성
 * falsy 값은 자동 제거
 *
 * @example
 * getClass("hnineds1", "btn")                   → "hnineds1-btn"
 * getClass("hnineds1", "btn", "icon")            → "hnineds1-btn-icon"
 * getClass("hnineds1", "btn", "primary")         → "hnineds1-btn-primary"
 * getClass("hnineds1", "btn", "icon", "active")  → "hnineds1-btn-icon-active"
 */
export function getClass(prefix: string, ...parts: string[]): string {
  return [prefix, ...parts].filter(Boolean).join("-");
}
