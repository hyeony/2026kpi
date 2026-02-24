// 참조 카운팅 기반 스타일 태그 관리
// key: styleId (예: "hnineds1-btn"), value: 해당 styleId를 사용 중인 컴포넌트 인스턴스 수
const styleRefCount = new Map<string, number>();

// ─────────────────────────────────────────────────────────────────────────────
// CssObject 타입 정의 및 직렬화 유틸리티
// ─────────────────────────────────────────────────────────────────────────────
/**
 * 중첩 셀렉터를 포함할 수 있는 CSS 블록 타입.
 *
 * 값이 string | number이면 CSS 속성, 객체이면 중첩 셀렉터 블록으로 처리된다.
 *
 * @example
 * {
 *   display: 'flex',
 *   '.child': { color: 'red' },
 *   '&:hover': { opacity: 0.8 },
 * }
 */
export type CssNestedBlock = {
  [propertyOrSelector: string]: string | number | CssNestedBlock;
};

/**
 * CSS를 객체 형태로 표현한 타입.
 *
 * 최상위 키는 셀렉터 또는 at-rule이며, 값은 중첩 블록이다.
 * 직렬화 시 camelCase → kebab-case 변환이 자동으로 이루어진다.
 *
 * - 일반 규칙: `{ ['.btn']: { display: 'inline-flex' } }`
 * - Pseudo/복합 선택자: `{ ['.btn:hover']: { backgroundColor: '#eee' } }`
 * - 중첩 자식 셀렉터: `{ ['.parent']: { display: 'flex', '.child': { color: 'red' } } }`
 * - & 부모 참조: `{ ['.btn']: { '&:hover': { opacity: 0.8 } } }`
 * - at-rule: `{ ['@keyframes spin']: { to: { transform: 'rotate(360deg)' } } }`
 */
export type CssObject = {
  [selectorOrAtRule: string]: CssNestedBlock;
};

/** camelCase CSS 속성명을 kebab-case로 변환 (예: backgroundColor → background-color) */
function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * 셀렉터와 블록을 재귀적으로 직렬화한다.
 * - primitive 값(string | number) → CSS 속성 선언
 * - 객체 값 → 중첩 셀렉터 블록 (재귀)
 * - `&` 포함 키 → 부모 셀렉터로 치환 (예: `&:hover` → `.btn:hover`)
 */
function serializeBlock(
  selector: string,
  block: CssNestedBlock,
  output: string[]
): void {
  const declarations: string[] = [];
  const nested: [string, CssNestedBlock][] = [];

  for (const [key, value] of Object.entries(block)) {
    if (typeof value === "object" && value !== null) {
      nested.push([key, value]);
    } else {
      declarations.push(`  ${camelToKebab(key)}: ${value};`);
    }
  }

  if (declarations.length > 0) {
    output.push(`${selector} {\n${declarations.join("\n")}\n}`);
  }

  for (const [nestedKey, nestedBlock] of nested) {
    const resolvedSelector = nestedKey.includes("&")
      ? nestedKey.replace(/&/g, selector)
      : `${selector} ${nestedKey}`;
    serializeBlock(resolvedSelector, nestedBlock, output);
  }
}

/**
 * CssObject를 CSS 문자열로 직렬화한다.
 * camelCase 속성명은 자동으로 kebab-case로 변환된다.
 *
 * @example
 * cssObjectToString({
 *   '.btn': { display: 'inline-flex', '&:hover': { opacity: 0.8 } },
 *   '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
 * })
 */
export function cssObjectToString(cssObj: CssObject): string {
  const parts: string[] = [];

  for (const [selector, block] of Object.entries(cssObj)) {
    if (selector.startsWith("@keyframes")) {
      // @keyframes: 내부 키는 keyframe stop (from, to, 0% 등), 값은 flat CSS
      const innerRules = Object.entries(block)
        .map(([stop, props]) => {
          const declarations = Object.entries(props as CssNestedBlock)
            .filter(([, v]) => typeof v !== "object")
            .map(([prop, val]) => `    ${camelToKebab(prop)}: ${val};`)
            .join("\n");
          return `  ${stop} {\n${declarations}\n  }`;
        })
        .join("\n");
      parts.push(`${selector} {\n${innerRules}\n}`);
    } else {
      serializeBlock(selector, block, parts);
    }
  }

  return parts.join("\n");
}

/**
 * document.head에 <style> 태그를 on-demand로 주입하고 참조 카운트를 증가시킨다.
 *
 * - 첫 번째 참조(count=0): DOM에 style 태그를 삽입하고 count를 1로 설정
 * - 이후 참조: count만 증가 (DOM 조작 없음)
 * - SSR hydration: count가 0이어도 DOM에 이미 태그가 있으면 삽입 skip
 *
 * @param styleId  고유 식별자 (예: "hnineds1-btn")
 * @param css      주입할 CSS 문자열
 */
export function injectStyle(styleId: string, css: string): void {
  if (typeof document === "undefined") return;

  const currentCount = styleRefCount.get(styleId) ?? 0;

  if (currentCount === 0) {
    // DOM에 style 태그가 없는 경우에만 삽입
    // (SSR hydration 등으로 이미 존재할 수 있으므로 DOM도 확인)
    if (!document.querySelector(`style[data-hnineds-id="${styleId}"]`)) {
      const el = document.createElement("style");
      el.setAttribute("data-hnineds-id", styleId);
      el.textContent = css;
      document.head.appendChild(el);
    }
  }

  styleRefCount.set(styleId, currentCount + 1);
}

/**
 * 참조 카운트를 감소시키고, 0이 되면 DOM에서 style 태그를 제거한다.
 *
 * - 다른 컴포넌트 인스턴스가 동일 styleId를 사용 중이면 DOM 태그 유지
 * - count가 0이 되면 Map에서 항목을 삭제하고 DOM 태그 제거
 *
 * useComponentStyle cleanup에서 호출됨:
 *   prefix 변경 시 → 이전 prefix의 스타일 태그 참조 해제
 *   컴포넌트 unmount 시 → 스타일 태그 참조 해제
 */
export function releaseStyle(styleId: string): void {
  if (typeof document === "undefined") return;

  const currentCount = styleRefCount.get(styleId) ?? 0;

  if (currentCount <= 1) {
    // 마지막 참조 → DOM에서 제거
    document.querySelector(`style[data-hnineds-id="${styleId}"]`)?.remove();
    styleRefCount.delete(styleId);
  } else {
    styleRefCount.set(styleId, currentCount - 1);
  }
}

/**
 * 특정 스타일을 참조 카운트를 무시하고 강제로 제거한다.
 *
 * @deprecated 내부 로직에서는 releaseStyle을 사용할 것.
 * 외부에서 "모든 인스턴스를 무시하고 강제 제거"해야 하는 특수 케이스에만 사용.
 */
export function removeStyle(styleId: string): void {
  if (typeof document === "undefined") return;

  document.querySelector(`style[data-hnineds-id="${styleId}"]`)?.remove();
  styleRefCount.delete(styleId);
}

/**
 * 모든 hnineds 스타일 제거 (테스트 cleanup 등 전체 초기화용)
 */
export function removeAllStyles(): void {
  if (typeof document === "undefined") return;

  document
    .querySelectorAll("style[data-hnineds-id]")
    .forEach((el) => el.remove());
  styleRefCount.clear();
}
