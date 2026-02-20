import { useContext } from "react";
import { HnineDSContext } from "../context/HnineDSContext";
import { BUILD_PREFIX } from "../prefix";

/** 현재 적용 중인 prefix 반환 */
export function usePrefix(): string {
  const ctx = useContext(HnineDSContext);
  return ctx.prefix;
}

/**
 * 현재 prefix가 BUILD_PREFIX와 일치하는지 확인
 * false인 경우 기본 스타일이 클래스명 불일치로 자동 해제됨
 */
export function useIsDefaultPrefix(): boolean {
  const prefix = usePrefix();
  return prefix === BUILD_PREFIX;
}
