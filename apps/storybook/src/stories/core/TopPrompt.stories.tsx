import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HnineDSProvider, TopPrompt } from '@hnineds/core';
import type { PromptFile, PromptListItem } from '@hnineds/core';

// ── 픽스처 ────────────────────────────────────────────────────────────────────

const RECOMMENDATIONS: PromptListItem[] = [
  { id: 'r1', content: 'React에서 상태 관리를 어떻게 하나요?' },
  { id: 'r2', content: 'TypeScript와 JavaScript의 차이점은?' },
  { id: 'r3', content: 'CSS-in-JS 방식의 장단점을 알려주세요.' },
];

const SEARCH_RESULTS: PromptListItem[] = [
  { id: 's1', content: 'React 공식 문서 — Getting Started' },
  { id: 's2', content: 'TypeScript Deep Dive — 한국어 번역본' },
  { id: 's3', content: 'CSS-in-JS 라이브러리 비교 (emotion vs styled-components)' },
];

const MOCK_FILES: PromptFile[] = [
  { id: 'f1', name: 'report.pdf', status: 'normal', size: 204800 },
  {
    id: 'f2',
    name: 'screenshot.png',
    status: 'normal',
    thumbUrl: 'https://placehold.co/80x80/e0e7ff/818cf8?text=IMG',
  },
];

const CUSTOM_ICONS_SET = {
  plus: <span style={{ fontSize: '18px' }}>📎</span>,
  send: <span style={{ fontSize: '18px' }}>🚀</span>,
  loading: <span style={{ fontSize: '18px' }}>⏳</span>,
  bulb: <span style={{ fontSize: '16px' }}>💡</span>,
  arrowUpRight: <span style={{ fontSize: '16px' }}>↗</span>,
  fileText: <span style={{ fontSize: '16px' }}>📄</span>,
  picture: <span style={{ fontSize: '16px' }}>🖼️</span>,
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopPrompt> = {
  title: 'Core/TopPrompt',
  component: TopPrompt,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <HnineDSProvider>
        <div style={{ padding: '40px 24px 120px', maxWidth: '800px' }}>
          <Story />
        </div>
      </HnineDSProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`@hnineds/core`의 검색형 상단 입력 컴포넌트입니다. Enter 전송 · Shift+Enter 줄바꿈 · 자동 높이 조절 · 로고 스피너 · 추천/검색결과 드롭다운 · 파일 첨부 · 커스텀 아이콘을 지원합니다.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
      table: { defaultValue: { summary: "'무엇이든 물어보세요...'" } },
    },
    status: {
      control: 'select',
      options: ['default', 'typing', 'responding'],
      description: '컴포넌트 상태 — `responding` 시 입력 비활성화 + 로딩 아이콘',
      table: { defaultValue: { summary: 'default' } },
    },
    autoFocus: {
      control: 'boolean',
      description: '마운트 시 자동 포커스',
      table: { defaultValue: { summary: 'true' } },
    },
    maxHeight: {
      control: 'number',
      description: '입력창 최대 높이 (px)',
      table: { defaultValue: { summary: '260' } },
    },
    isSearching: {
      control: 'boolean',
      description: '로고 테두리 회전 스피너 표시 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    logoTooltip: {
      control: 'text',
      description: '로고 호버 시 native title 툴팁',
      table: { defaultValue: { summary: "'AI 에이전트'" } },
    },
    onSend: {
      action: 'sent',
      description: '전송 핸들러 — 버튼 클릭 또는 Enter 키 시 호출',
    },
    onChange: {
      action: 'changed',
      description: '입력 값 변경 핸들러',
    },
    onFileUpload: {
      action: 'file-uploaded',
      description: '파일 업로드 핸들러',
    },
    onFileDelete: {
      action: 'file-deleted',
      description: '파일 삭제 핸들러',
    },
    onRecommendationClick: {
      action: 'recommendation-clicked',
      description: '추천 아이템 클릭 콜백',
    },
    onSearchResultClick: {
      action: 'search-result-clicked',
      description: '검색결과 아이템 클릭 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopPrompt>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TopPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
      />
    );
  },
  args: {
    placeholder: '무엇이든 물어보세요...',
    autoFocus: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태. Enter로 전송, Shift+Enter로 줄바꿈합니다.',
      },
    },
  },
};

export const Responding: Story = {
  render: (args) => {
    const [value, setValue] = useState('응답을 기다리는 중...');
    const [status, setStatus] = useState<'default' | 'responding'>('default');

    const handleSend = (v: string) => {
      args.onSend?.(v);
      setStatus('responding');
      setTimeout(() => {
        setStatus('default');
        setValue('');
      }, 2500);
    };

    return (
      <TopPrompt {...args} value={value} onChange={setValue} onSend={handleSend} status={status} />
    );
  },
  args: { autoFocus: false },
  parameters: {
    docs: {
      description: {
        story:
          "`status='responding'` 시 입력이 비활성화되고 전송 버튼이 로딩 스피너로 전환됩니다. 전송 후 2.5초간 responding 상태를 시뮬레이션합니다.",
      },
    },
  },
};

export const WithRecommendations: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TopPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
        recommendations={RECOMMENDATIONS}
        onRecommendationClick={(item) => {
          setValue(item.content);
        }}
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '입력창을 클릭해 포커스하면 추천 목록이 하향 전개됩니다. 값이 없을 때만 표시되며, 아이템 클릭 시 입력창에 내용이 채워집니다.',
      },
    },
  },
};

export const WithSearchResults: Story = {
  render: (args) => {
    const [value, setValue] = useState('React');
    return (
      <TopPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
        searchResults={SEARCH_RESULTS}
        onSearchResultClick={(item) => {
          setValue(item.content);
        }}
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '입력값이 있을 때 포커스하면 검색결과 목록이 하향 전개됩니다. 우측 화살표 아이콘을 클릭해 해당 결과를 선택합니다.',
      },
    },
  },
};

export const WithLogo: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSend = (v: string) => {
      args.onSend?.(v);
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setValue('');
      }, 2000);
    };

    return (
      <TopPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={handleSend}
        isSearching={isSearching}
        logoIcon={<span style={{ fontSize: '22px' }}>🤖</span>}
        logoTooltip="AI 에이전트 (전송 시 2초간 검색 중 표시)"
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`logoIcon`으로 커스텀 로고를 삽입할 수 있습니다. 전송하면 2초간 `isSearching=true`로 전환되어 테두리 회전 스피너(`@keyframes hnineds-tp-spin`)가 표시됩니다.',
      },
    },
  },
};

export const WithFiles: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [files, setFiles] = useState<PromptFile[]>(MOCK_FILES);

    return (
      <TopPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
        files={files}
        onFileDelete={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        onFileUpload={(fileList) => {
          args.onFileUpload?.(fileList);
          const newFiles: PromptFile[] = Array.from(fileList).map((f) => ({
            id: `${Date.now()}-${f.name}`,
            name: f.name,
            status: 'normal' as const,
            size: f.size,
          }));
          setFiles((prev) => [...prev, ...newFiles]);
        }}
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '파일이 첨부된 상태. + 버튼 → 파일/이미지 업로드 메뉴. X 클릭으로 개별 삭제합니다.',
      },
    },
  },
};

export const CustomIcons: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TopPrompt
        recommendations={RECOMMENDATIONS}
        searchResults={SEARCH_RESULTS}
        autoFocus={false}
        icons={CUSTOM_ICONS_SET}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`icons` prop으로 7개 아이콘 슬롯 모두 외부에서 교체 가능합니다. 디자인 시스템에 맞는 아이콘 라이브러리를 자유롭게 연결할 수 있습니다.',
      },
    },
  },
};

export const CustomPrefix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>
          기본 prefix ("hnineds1")
        </p>
        <HnineDSProvider>
          <TopPrompt value="" placeholder="기본 prefix..." autoFocus={false} />
        </HnineDSProvider>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>
          커스텀 prefix ("custom")
        </p>
        <HnineDSProvider prefix="custom">
          <TopPrompt
            value=""
            placeholder="커스텀 prefix — 스타일은 동일하게 적용됨..."
            autoFocus={false}
          />
        </HnineDSProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`HnineDSProvider`의 `prefix` prop으로 CSS 클래스 네임스페이스를 변경할 수 있습니다. prefix가 달라져도 `useComponentStyle`이 새 prefix 기준으로 CSS 규칙과 클래스명을 함께 생성하므로 스타일은 동일하게 적용됩니다.',
      },
    },
  },
};
