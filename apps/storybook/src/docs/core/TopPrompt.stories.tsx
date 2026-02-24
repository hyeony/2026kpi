import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import raw from '../../../../../packages/core/src/components/Prompt/TopPrompt/TopPrompt.md?raw';
import { ComponentDocsTabs } from '../ComponentDocsTabs';

const Page = () => <ComponentDocsTabs raw={raw} />;

const meta: Meta<typeof Page> = {
  title: 'Docs/Core/TopPrompt',
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
