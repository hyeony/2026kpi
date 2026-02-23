import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, "../../"), "VITE_");
  const BUILD_PREFIX = env.VITE_BUILD_PREFIX || "hnineds1";

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ["src"],
        outDir: "dist",
        rollupTypes: true,
      }),
    ],
    define: {
      __BUILD_PREFIX__: JSON.stringify(BUILD_PREFIX),
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "HnineDSStyles",
        formats: ["es", "cjs"],
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      },
      rollupOptions: {
        // @hnineds/core는 번들에 포함 (standalone 패키지)
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
