import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HnineDSProvider, Button } from "@hnineds/styles";

const meta: Meta<typeof Button> = {
  title: "Styles/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <HnineDSProvider>
        <Story />
      </HnineDSProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "`@hnineds/styles`의 Button 컴포넌트입니다. core 기본 스타일 대신 enhanced 디자인(gradient, shadow, animation)이 적용됩니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "버튼 스타일 유형",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "버튼 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스 (내부 클래스명 뒤에 공백으로 병합됨)",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Ghost Button",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Disabled Button",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button startIcon={<span>🚀</span>}>Start Icon</Button>
      <Button endIcon={<span>✨</span>} variant="secondary">End Icon</Button>
      <Button startIcon={<span>←</span>} endIcon={<span>→</span>} variant="ghost">
        Both Icons
      </Button>
    </div>
  ),
};
