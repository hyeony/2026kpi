import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import changelog from "../../../../packages/styles/CHANGELOG.md?raw";
import ReactMarkdown from "react-markdown";

const ChangelogPage = () => (
  <div
    style={{
      padding: "32px",
      maxWidth: "800px",
      fontFamily: "sans-serif",
      lineHeight: "1.6",
    }}
  >
    <ReactMarkdown>{changelog}</ReactMarkdown>
  </div>
);

const meta: Meta<typeof ChangelogPage> = {
  title: "Release Notes/Styles",
  component: ChangelogPage,
  parameters: {
    docs: {
      description: {
        component: "@hnineds/styles 패키지의 변경 이력입니다.",
      },
    },
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;
type Story = StoryObj<typeof ChangelogPage>;

export const StylesReleaseNotes: Story = {
  render: () => <ChangelogPage />,
  parameters: {
    docs: {
      source: { code: null },
    },
  },
};
