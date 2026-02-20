import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, "../../"), "VITE_");
  const BUILD_PREFIX = env.VITE_BUILD_PREFIX || "hnineds1";

  return {
    plugins: [react()],
    define: {
      __BUILD_PREFIX__: JSON.stringify(BUILD_PREFIX),
    },
    resolve: {
      alias: {
        // No-Build Dev Flow: src 직접 참조
        // styles가 core를 import하므로 core도 alias 필요
        "@hnineds/styles": resolve(__dirname, "../../packages/styles/src/index.ts"),
        "@hnineds/core": resolve(__dirname, "../../packages/core/src/index.ts"),
      },
    },
  };
});
