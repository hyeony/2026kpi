import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // 루트 .env에서 BUILD_PREFIX 로드
  const env = loadEnv(mode, resolve(__dirname, "../../"), "VITE_");
  const BUILD_PREFIX = env.VITE_BUILD_PREFIX || "hnineds1";

  return {
    plugins: [react()],
    define: {
      __BUILD_PREFIX__: JSON.stringify(BUILD_PREFIX),
    },
    resolve: {
      alias: {
        // No-Build Dev Flow: dist가 아닌 src 직접 참조
        "@hnineds/core": resolve(__dirname, "../../packages/core/src/index.ts"),
      },
    },
  };
});
