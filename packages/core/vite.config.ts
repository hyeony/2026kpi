import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // 루트 .env 로드 (Windows 경로 호환)
  const env = loadEnv(mode, resolve(__dirname, "../../"), "VITE_");
  const BUILD_PREFIX = env.VITE_BUILD_PREFIX || "hnineds1";

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ["src"],
        outDir: "dist",
      }),
    ],
    define: {
      // 빌드 타임에 BUILD_PREFIX를 상수로 치환
      __BUILD_PREFIX__: JSON.stringify(BUILD_PREFIX),
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "HnineDSCore",
        formats: ["es", "cjs"],
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
      sourcemap: true,
    },
  };
});
