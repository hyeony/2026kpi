import type { Meta, StoryObj } from '@storybook/react';
import { FabButton, PlusIcon, SendIcon, StopIcon } from './FabButton';

const meta = {
  title: 'Components/FabButton',
  component: FabButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'danger'],
    },
    position: {
      control: 'radio',
      options: ['inline', 'fixed'],
    },
  },
} satisfies Meta<typeof FabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Send: Story = {
  args: {
    'aria-label': '메시지 전송',
    icon: <SendIcon />,
    variant: 'primary',
  },
};

export const NewChat: Story = {
  args: {
    'aria-label': '새 대화',
    icon: <PlusIcon />,
    variant: 'secondary',
    size: 'lg',
  },
};

export const Stop: Story = {
  args: {
    'aria-label': '생성 중지',
    icon: <StopIcon />,
    variant: 'danger',
  },
};

export const Extended: Story = {
  args: {
    'aria-label': '새 대화 시작',
    icon: <PlusIcon />,
    label: '새 대화',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': '메시지 전송',
    icon: <SendIcon />,
    disabled: true,
  },
};

export const AllVariants: Story = {
  args: {
    'aria-label': '전송',
    icon: <SendIcon />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <FabButton aria-label="전송" icon={<SendIcon />} variant="primary" />
      <FabButton aria-label="새 대화" icon={<PlusIcon />} variant="secondary" />
      <FabButton aria-label="중지" icon={<StopIcon />} variant="danger" />
      <FabButton aria-label="새 대화" icon={<PlusIcon />} label="새 대화" variant="primary" />
    </div>
  ),
};

export const FixedPosition: Story = {
  args: {
    'aria-label': '새 대화',
    icon: <PlusIcon />,
    position: 'fixed',
    variant: 'primary',
    size: 'lg',
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '320px', padding: '24px', position: 'relative' }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          우측 하단 고정 FAB (채팅 입력창 위 등)
        </p>
        <Story />
      </div>
    ),
  ],
};
