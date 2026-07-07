import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Prompt } from './Prompt';

const meta = {
  title: 'Components/Prompt',
  component: Prompt,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Prompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: 640 }}>
        <Prompt
          value={value}
          onChange={setValue}
          onSubmit={() => alert(`전송: ${value}`)}
        />
      </div>
    );
  },
};

export const WithText: Story = {
  args: {
    value: '이번 분기 KPI를 요약해줘.',
    onChange: () => {},
    onSubmit: () => {},
  },
  render: function Render() {
    const [value, setValue] = useState('이번 분기 KPI를 요약해줘.');
    return (
      <div style={{ maxWidth: 640 }}>
        <Prompt
          value={value}
          onChange={setValue}
          onSubmit={() => alert(`전송: ${value}`)}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: '생성 중에는 입력할 수 없습니다.',
    onChange: () => {},
    onSubmit: () => {},
    disabled: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <Prompt {...args} />
    </div>
  ),
};
