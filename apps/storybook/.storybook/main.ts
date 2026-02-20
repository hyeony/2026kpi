import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { loadEnv } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    const mode = configType === "PRODUCTION" ? "production" : "development";
    const env = loadEnv(mode, resolve(__dirname, "../../../"), "VITE_");
    const BUILD_PREFIX = env.VITE_BUILD_PREFIX || "hnineds1";

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // core + styles 둘 다 src 직접 참조 (No-Build Dev Flow)
      "@hnineds/core": resolve(__dirname, "../../../packages/core/src/index.ts"),
      "@hnineds/styles": resolve(__dirname, "../../../packages/styles/src/index.ts"),
    };

    config.define = {
      ...(config.define || {}),
      __BUILD_PREFIX__: JSON.stringify(BUILD_PREFIX),
    };

    // CHANGELOG.md ?raw import 지원
    config.assetsInclude = ["**/*.md"];

    return config;
  },
};

export default config;
