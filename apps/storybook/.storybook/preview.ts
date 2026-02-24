import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          "Docs",
          ["Core", ["Changelog", "*"], "Styles", ["Changelog", "*"]],
          "Release Notes",
          "*",
        ],
      },
    },
  },
};

export default preview;
