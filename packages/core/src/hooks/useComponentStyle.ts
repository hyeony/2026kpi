import { useContext, useEffect } from "react";
import { HnineDSContext } from "../context/HnineDSContext";
import {
  injectStyle,
  releaseStyle,
  cssObjectToString,
  type CssObject,
} from "../utils/injectStyle";
import { globalStyleRegistry, registerGlobalStyleOverride } from "../styleRegistry";

interface UseComponentStyleConfig {
  /** 컴포넌트 고유 ID (예: "Button", "Input") */
  componentId: string;
  /** prefix를 받아 CssObject를 반환하는 함수 */
  styleFn: (prefix: string) => CssObject;
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
/** layer suffix: core와 styles 주입 스타일을 DOM에서 구분하기 위한 접미사 */
const LAYER_SUFFIX = {
  core: "--core",
  styles: "--styles",
} as const;

/**
 * getStyleId(prefix) 결과에 layer suffix를 붙여 최종 styleId를 생성한다.
 *
 * suffix 부여 책임을 훅에 일원화함으로써,
 * 개별 style 파일은 순수하게 "{prefix}-{componentName}" 형태만 반환하면 된다.
 * 컴포넌트가 추가되더라도 suffix 규칙을 별도로 신경 쓸 필요가 없다.
 */
function resolveStyleId(baseId: string, isOverride: boolean): string {
  return `${baseId}${isOverride ? LAYER_SUFFIX.styles : LAYER_SUFFIX.core}`;
}

export function useComponentStyle({
  componentId,
  styleFn,
  getStyleId,
  isOverride = false,
}: UseComponentStyleConfig): void {
  const { prefix } = useContext(HnineDSContext);

  useEffect(() => {
    // layer suffix는 훅 내부에서 자동으로 부여 — style 파일은 신경 쓰지 않아도 됨
    const styleId = resolveStyleId(getStyleId(prefix), isOverride);
    // 이번 effect 실행에서 실제로 injectStyle을 호출했는지 추적.
    // cleanup에서는 inject한 경우에만 release하여 카운트 불일치를 방지한다.
    let injected = false;

    if (isOverride) {
      // styles 패키지 모드: 전역 레지스트리에 등록 + 현재 prefix 기반 스타일 직접 주입
      registerGlobalStyleOverride(componentId, styleFn);
      injectStyle(styleId, cssObjectToString(styleFn(prefix)));
      injected = true;
    } else {
      // core 패키지 모드: 전역 레지스트리에 override가 없을 때만 주입
      // (globalStyleRegistry에 등록된 override가 있으면 그쪽이 우선)
      if (!globalStyleRegistry.has(componentId)) {
        injectStyle(styleId, cssObjectToString(styleFn(prefix)));
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
