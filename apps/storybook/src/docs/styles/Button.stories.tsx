import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import raw from "../../../../../packages/styles/src/components/Button/Button.md?raw";
import { ComponentDocsTabs } from "../ComponentDocsTabs";

const Page = () => <ComponentDocsTabs raw={raw} />;

const meta: Meta<typeof Page> = {
  title: "Docs/Styles/Button",
  component: Page,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { source: { code: null } },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Docs: Story = {
  render: () => <Page />,
};
