import React, { useMemo } from "react";
import { BUILD_PREFIX } from "../prefix";
import { HnineDSContext, HnineDSContextValue } from "./HnineDSContext";

interface HnineDSProviderProps {
  children: React.ReactNode;
  /**
   * 런타임 prefix 제어 (전역)
   * - 미지정 시 BUILD_PREFIX 사용 → 기본 스타일 적용
   * - 변경 시 클래스명 불일치 → 기본 스타일 자동 해제(Disconnect)
   */
  prefix?: string;
}

export function HnineDSProvider({ children, prefix }: HnineDSProviderProps) {
  const resolvedPrefix = prefix ?? BUILD_PREFIX;

  const value = useMemo<HnineDSContextValue>(
    () => ({ prefix: resolvedPrefix }),
    [resolvedPrefix]
  );

  return (
    <HnineDSContext.Provider value={value}>{children}</HnineDSContext.Provider>
  );
}
