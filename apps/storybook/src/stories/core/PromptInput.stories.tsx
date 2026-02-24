import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HnineDSProvider, PromptInput } from '@hnineds/core';

const meta: Meta<typeof PromptInput> = {
  title: 'Core/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
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
          '`@hnineds/core`의 AI 프롬프트 입력창 컴포넌트입니다. Controlled/Uncontrolled 모두 지원하며, Enter 전송 · Shift+Enter 줄바꿈 · 자동 높이 조절 · 액션 슬롯을 제공합니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '입력창 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    submitOnEnter: {
      control: 'boolean',
      description: 'Enter 키로 전송 여부 (Shift+Enter는 항상 줄바꿈)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      control: 'boolean',
      description: '전송 중 상태 — 버튼이 로딩 스피너로 변경됨',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '전송 버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '최대 입력 글자 수 — 설정 시 우측 하단에 카운터 표시',
    },
    maxRows: {
      control: 'number',
      description: '자동 높이 조절 상한 (px)',
      table: {
        defaultValue: { summary: '200' },
      },
    },
    onSubmit: {
      action: 'submitted',
      description: '전송 핸들러 — 버튼 클릭 또는 Enter 키 시 호출 (value: string)',
    },
    onValueChange: {
      action: 'value-changed',
      description: '입력 값 변경 핸들러 (value: string)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  args: {
    placeholder: '메시지를 입력하세요...',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 uncontrolled 상태. Enter로 전송, Shift+Enter로 줄바꿈합니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>size="sm"</p>
        <PromptInput size="sm" placeholder="Small..." />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>size="md" (default)</p>
        <PromptInput size="md" placeholder="Medium..." />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>size="lg"</p>
        <PromptInput size="lg" placeholder="Large..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'size prop으로 입력창 크기를 제어합니다.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    placeholder: '전송 중 상태...',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`loading={true}` 시 전송 버튼이 스피너로 변경되며 입력이 비활성화됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화 상태...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` 시 전송 버튼이 비활성화됩니다.',
      },
    },
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: '최대 100자까지 입력 가능합니다...',
    maxLength: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`maxLength` 설정 시 우측 하단에 글자수 카운터가 표시됩니다. 한도 근접 시 경고색, 초과 시 빨간색으로 변경됩니다.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <PromptInput
        placeholder="액션 슬롯 테스트..."
        maxLength={200}
        actions={
          <>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                color: '#6b7280',
                fontSize: '18px',
              }}
              title="파일 첨부"
            >
              📎
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                color: '#6b7280',
                fontSize: '18px',
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
          '`actions` prop으로 전송 버튼 좌측에 커스텀 액션 버튼(파일 첨부, 마이크 등)을 삽입할 수 있습니다.',
      },
    },
  },
};

export const PrefixConnect: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>
          기본 prefix — 스타일 적용
        </p>
        <HnineDSProvider>
          <PromptInput placeholder="기본 prefix 적용됨..." />
        </HnineDSProvider>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>
          커스텀 prefix ("custom") — 스타일 해제
        </p>
        <HnineDSProvider prefix="custom">
          <PromptInput placeholder="custom prefix — 스타일 없음..." />
        </HnineDSProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'prefix가 BUILD_PREFIX와 다르면 클래스명이 달라지고 스타일 자동적용됩니다.',
      },
    },
  },
};
