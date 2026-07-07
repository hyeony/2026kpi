import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';

const meta = {
  title: 'Components/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    role: {
      control: 'radio',
      options: ['user', 'assistant'],
    },
    status: {
      control: 'select',
      options: ['default', 'streaming', 'error'],
    },
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: {
    role: 'user',
    children: '이번 분기 KPI 보고서 요약해줘.',
  },
};

export const Assistant: Story = {
  args: {
    role: 'assistant',
    children:
      '이번 분기 KPI는 매출 12% 성장, 고객 이탈률 3.2%로 전분기 대비 개선되었습니다.',
  },
};

export const Streaming: Story = {
  args: {
    role: 'assistant',
    status: 'streaming',
    children: '분석 결과를 정리하고 있습니다',
  },
};

export const WithTimestamp: Story = {
  args: {
    role: 'assistant',
    children: '요약이 완료되었습니다.',
    timestamp: '오후 2:34',
  },
};

export const Error: Story = {
  args: {
    role: 'assistant',
    status: 'error',
    children: '응답을 생성하지 못했습니다. 다시 시도해 주세요.',
  },
};

export const Conversation: Story = {
  args: {
    role: 'user',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 720 }}>
      <MessageBubble role="user">번역 AI 컴포넌트 가이드 초안 써줘.</MessageBubble>
      <MessageBubble role="assistant" status="streaming">
        AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를
      </MessageBubble>
      <MessageBubble role="assistant">
        AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를 정의하는 실무용 문서입니다.
      </MessageBubble>
    </div>
  ),
};
