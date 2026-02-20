import { useContext, useEffect } from "react";
import { HnineDSContext } from "../context/HnineDSContext";
import { injectStyle, releaseStyle } from "../utils/injectStyle";
import { globalStyleRegistry, registerGlobalStyleOverride } from "../styleRegistry";

interface UseComponentStyleConfig {
  /** 컴포넌트 고유 ID (예: "Button", "Input") */
  componentId: string;
  /** prefix를 받아 CSS 문자열을 반환하는 함수 */
  styleFn: (prefix: string) => string;
  /** prefix를 받아 styleId 문자열을 반환하는 함수 */
  getStyleId: (prefix: string) => string;
  /**
   * true: styles 패키지 override 모드
   *   - 전역 레지스트리에 등록 + 직접 스타일 주입
   * false (기본): core 패키지 기본 스타일 모드
   *   - 전역 레지스트리에 override가 없을 때만 스타일 주입
   */
  isOverride?: boolean;
}

/**
 * 컴포넌트 스타일을 on-demand로 주입하는 공통 훅
 *
 * - prefix가 변경되면 해당 prefix 기반의 CSS가 즉시 주입됨
 * - 이전 prefix의 스타일 태그는 참조 카운팅으로 자동 정리됨
 * - 복수 인스턴스가 같은 styleId를 쓸 때 마지막 인스턴스가 사라질 때만 DOM에서 제거
 * - Provider 없이도 동작 (전역 globalStyleRegistry 기반)
 *
 * @example core 컴포넌트
 * useComponentStyle({
 *   componentId: COMPONENT_NAMES.Button,
 *   styleFn: getButtonStyles,
 *   getStyleId: getButtonStyleId,
 * });
 *
 * @example styles 패키지 override 컴포넌트
 * useComponentStyle({
 *   componentId: COMPONENT_NAMES.Button,
 *   styleFn: getButtonStyles,
 *   getStyleId: getButtonStyleId,
 *   isOverride: true,
 * });
 */
export function useComponentStyle({
  componentId,
  styleFn,
  getStyleId,
  isOverride = false,
}: UseComponentStyleConfig): void {
  const { prefix } = useContext(HnineDSContext);

  useEffect(() => {
    const styleId = getStyleId(prefix);
    // 이번 effect 실행에서 실제로 injectStyle을 호출했는지 추적.
    // cleanup에서는 inject한 경우에만 release하여 카운트 불일치를 방지한다.
    let injected = false;

    if (isOverride) {
      // styles 패키지 모드: 전역 레지스트리에 등록 + 현재 prefix 기반 스타일 직접 주입
      registerGlobalStyleOverride(componentId, styleFn);
      injectStyle(styleId, styleFn(prefix));
      injected = true;
    } else {
      // core 패키지 모드: 전역 레지스트리에 override가 없을 때만 주입
      // (globalStyleRegistry에 등록된 override가 있으면 그쪽이 우선)
      if (!globalStyleRegistry.has(componentId)) {
        injectStyle(styleId, styleFn(prefix));
        injected = true;
      }
    }

    // cleanup: prefix가 바뀌거나 컴포넌트가 unmount될 때 실행.
    // 이 클로저는 현재 렌더의 styleId를 캡처하므로,
    // prefix가 바뀐 후에도 "이전 prefix의 styleId"에 대해 정확히 releaseStyle을 호출한다.
    return () => {
      if (injected) {
        releaseStyle(styleId);
      }
    };
  }, [prefix, componentId, styleFn, getStyleId, isOverride]);
}
