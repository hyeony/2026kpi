import React from "react";
import {
  Button as CoreButton,
  ButtonProps,
  useComponentStyle,
  COMPONENT_NAMES,
} from "@hnineds/core";
import { getButtonStyles, getButtonStyleId } from "./Button.style";

/**
 * @hnineds/styles Button
 *
 * - CoreButton을 그대로 렌더링
 * - useComponentStyle(isOverride: true)로 전역 레지스트리에 등록
 *   → core 기본 스타일 주입이 자동으로 생략되고 styles 스타일이 주입됨
 * - Provider 없이도 동작 (전역 레지스트리 기반)
 */
export function Button(props: ButtonProps) {
  // styles 패키지 override 모드: 전역 레지스트리 등록 + enhanced 스타일 주입
  useComponentStyle({
    componentId: COMPONENT_NAMES.Button,
    styleFn: getButtonStyles,
    getStyleId: getButtonStyleId,
    isOverride: true,
  });

  return React.createElement(CoreButton, props);
}

export type { ButtonProps };
