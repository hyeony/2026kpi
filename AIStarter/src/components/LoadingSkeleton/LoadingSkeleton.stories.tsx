import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSkeleton } from './LoadingSkeleton';

const meta = {
  title: 'Components/LoadingSkeleton',
  component: LoadingSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'card', 'conversation'],
    },
  },
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 4,
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
};

export const Conversation: Story = {
  args: {
    variant: 'conversation',
  },
};

export const Static: Story = {
  args: {
    variant: 'text',
    lines: 3,
    animated: false,
  },
};
