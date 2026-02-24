import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import coreButton from '../../../../../packages/core/src/components/Button/Button.md?raw';
// @ts-ignore
import corePromptInput from '../../../../../packages/core/src/components/PromptInput/PromptInput.md?raw';
// @ts-ignore
import coreBottomPrompt from '../../../../../packages/core/src/components/Prompt/BottomPrompt/BottomPrompt.md?raw';
// @ts-ignore
import coreTopPrompt from '../../../../../packages/core/src/components/Prompt/TopPrompt/TopPrompt.md?raw';
import { parseChangelog, groupByDate, type DateGroup } from '../parseChangelog';

const sources = [
  { raw: coreButton, component: 'Button', pkg: '@hnineds/core' },
  { raw: corePromptInput, component: 'PromptInput', pkg: '@hnineds/core' },
  { raw: coreBottomPrompt, component: 'BottomPrompt', pkg: '@hnineds/core' },
  { raw: coreTopPrompt, component: 'TopPrompt', pkg: '@hnineds/core' },
];

const groups: DateGroup[] = groupByDate(
  sources.flatMap(({ raw, component, pkg }) => parseChangelog(raw, component, pkg)),
);

const Badge = ({ component }: { component: string }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 600,
      background: '#dbeafe',
      color: '#1d4ed8',
    }}
  >
    {component}
  </span>
);

const Page = () => (
  <div style={{ padding: '32px', maxWidth: '800px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
      @hnineds/core Changelog
    </h1>
    <p style={{ color: '#64748b', marginBottom: '32px' }}>
      컴포넌트별 변경 이력을 날짜순으로 표시합니다.
    </p>

    {groups.map((group) => (
      <div key={group.date} style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#3b82f6',
              flexShrink: 0,
            }}
          />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1e293b' }}>
            {group.date}
          </h2>
        </div>
        <div style={{ marginLeft: '24px', borderLeft: '2px solid #e2e8f0', paddingLeft: '24px' }}>
          {group.entries.map((entry, i) => (
            <div
              key={`${entry.component}-${entry.version}-${i}`}
              style={{
                marginBottom: '20px',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}
              >
                <Badge component={entry.component} />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{entry.version}</span>
              </div>
              <div style={{ fontSize: '14px' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof Page> = {
  title: 'Docs/Core/Changelog',
  component: Page,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { source: { code: null } },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const CoreChangelog: Story = {
  render: () => <Page />,
};
