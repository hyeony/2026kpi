/**
 * 전역 스타일 override 레지스트리 (모듈 싱글톤)
 *
 * styles 패키지가 특정 컴포넌트의 스타일을 등록하면,
 * Provider 유무에 관계없이 core 컴포넌트가 이를 감지하여
 * 기본 스타일 주입을 생략하고 styles 스타일을 사용한다.
 */
export const globalStyleRegistry = new Map<string, (prefix: string) => string>();

/**
 * 컴포넌트 스타일 override를 전역 레지스트리에 등록
 * styles 패키지의 컴포넌트가 모듈 로드 시점에 즉시 호출
 */
export function registerGlobalStyleOverride(
  componentId: string,
  styleFn: (prefix: string) => string
): void {
  globalStyleRegistry.set(componentId, styleFn);
}
