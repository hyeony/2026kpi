import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackActions } from './FeedbackActions';

const meta = {
  title: 'Components/FeedbackActions',
  component: FeedbackActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FeedbackActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCopy: () => {},
    onRegenerate: () => {},
    onFeedback: () => {},
  },
};

export const CopyOnly: Story = {
  args: {
    onCopy: () => {},
  },
};

export const Disabled: Story = {
  args: {
    onCopy: () => {},
    onRegenerate: () => {},
    onFeedback: () => {},
    disabled: true,
  },
};

export const BelowMessage: Story = {
  args: {
    onCopy: () => {},
    onRegenerate: () => {},
    onFeedback: () => {},
  },
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <div
        style={{
          padding: '12px 16px',
          marginBottom: 8,
          borderRadius: 12,
          background: '#f3f4f6',
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        이번 분기 KPI는 매출 12% 성장, 고객 이탈률 3.2%로 전분기 대비 개선되었습니다.
      </div>
      <FeedbackActions {...args} />
    </div>
  ),
};
