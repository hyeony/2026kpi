import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HnineDSProvider, PromptInput } from "@hnineds/styles";

const meta: Meta<typeof PromptInput> = {
  title: "Styles/PromptInput",
  component: PromptInput,
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
          "`@hnineds/styles`의 PromptInput 컴포넌트입니다. core 기본 스타일 대신 gradient 전송 버튼, focus glow, tabular-nums 카운터 등 enhanced 디자인이 적용됩니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "입력창 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    placeholder: {
      control: "text",
      description: "placeholder 텍스트",
    },
    submitOnEnter: {
      control: "boolean",
      description: "Enter 키로 전송 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    loading: {
      control: "boolean",
      description: "전송 중 상태",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "전송 버튼 비활성화 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    maxLength: {
      control: "number",
      description: "최대 입력 글자 수",
    },
    maxRows: {
      control: "number",
      description: "자동 높이 조절 상한 (px)",
      table: {
        defaultValue: { summary: "200" },
      },
    },
    onSubmit: {
      action: "submitted",
      description: "전송 핸들러 (value: string)",
    },
    onValueChange: {
      action: "value-changed",
      description: "입력 값 변경 핸들러 (value: string)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  args: {
    placeholder: "무엇이든 물어보세요...",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "enhanced 스타일 기본 상태. gradient 전송 버튼과 focus glow 효과가 적용됩니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>size="sm"</p>
        <PromptInput size="sm" placeholder="Small..." />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>size="md" (default)</p>
        <PromptInput size="md" placeholder="Medium..." />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>size="lg"</p>
        <PromptInput size="lg" placeholder="Large..." />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    placeholder: "전송 중...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화 상태...",
    disabled: true,
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <PromptInput
        placeholder="액션 슬롯 + 글자수 제한..."
        maxLength={200}
        actions={
          <>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                color: "#6b7280",
                fontSize: "18px",
              }}
              title="파일 첨부"
            >
              📎
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                color: "#6b7280",
                fontSize: "18px",
              }}
              title="마이크"
            >
              🎤
            </button>
          </>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`actions` 슬롯과 `maxLength` 카운터를 함께 사용하는 예시입니다. tabular-nums 폰트로 카운터 너비가 안정적으로 표시됩니다.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>sm</p>
        <PromptInput size="sm" placeholder="Small prompt..." />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>md (default)</p>
        <PromptInput size="md" placeholder="Medium prompt..." />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>lg</p>
        <PromptInput size="lg" placeholder="Large prompt..." />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>loading</p>
        <PromptInput placeholder="로딩 중..." loading />
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 6px" }}>disabled</p>
        <PromptInput placeholder="비활성화..." disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 크기와 상태를 한눈에 비교합니다.",
      },
    },
  },
};
