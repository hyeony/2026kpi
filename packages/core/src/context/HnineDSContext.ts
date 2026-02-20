import { createContext } from "react";
import { BUILD_PREFIX } from "../prefix";

export interface HnineDSContextValue {
  /** 현재 적용 중인 prefix (미지정 시 BUILD_PREFIX) */
  prefix: string;
}

export const HnineDSContext = createContext<HnineDSContextValue>({
  prefix: BUILD_PREFIX,
});
