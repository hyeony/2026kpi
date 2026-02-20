// 참조 카운팅 기반 스타일 태그 관리
// key: styleId (예: "hnineds1-btn"), value: 해당 styleId를 사용 중인 컴포넌트 인스턴스 수
const styleRefCount = new Map<string, number>();

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
