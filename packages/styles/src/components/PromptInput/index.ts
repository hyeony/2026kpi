import React from "react";
import {
  PromptInput as CorePromptInput,
  PromptInputProps,
  useComponentStyle,
  COMPONENT_NAMES,
} from "@hnineds/core";
import { getPromptInputStyles, getPromptInputStyleId } from "./PromptInput.style";

/**
 * @hnineds/styles PromptInput
 *
 * - CorePromptInput을 그대로 렌더링
 * - useComponentStyle(isOverride: true)로 전역 레지스트리에 등록
 *   → core 기본 스타일 주입이 자동으로 생략되고 styles enhanced 스타일이 주입됨
 * - Provider 없이도 동작 (전역 레지스트리 기반)
 */
export function PromptInput(props: PromptInputProps) {
  useComponentStyle({
    componentId: COMPONENT_NAMES.PromptInput,
    styleFn: getPromptInputStyles,
    getStyleId: getPromptInputStyleId,
    isOverride: true,
  });

  return React.createElement(CorePromptInput, props);
}

export type { PromptInputProps };
