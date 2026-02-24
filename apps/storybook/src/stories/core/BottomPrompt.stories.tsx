import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HnineDSProvider, BottomPrompt } from '@hnineds/core';
import type { PromptFile, PromptListItem } from '@hnineds/core';

// ── 픽스처 ────────────────────────────────────────────────────────────────────

const HISTORY_LIST: PromptListItem[] = [
  { id: 'h1', content: 'React에서 상태 관리를 어떻게 하나요?' },
  { id: 'h2', content: 'TypeScript와 JavaScript의 차이점은?' },
  { id: 'h3', content: 'CSS-in-JS 방식의 장단점을 알려주세요.' },
];

const BOOKMARK_LIST: PromptListItem[] = [
  { id: 'b1', content: '자주 쓰는 Git 명령어 모음' },
  { id: 'b2', content: 'REST API vs GraphQL 비교' },
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
  plus: <span style={{ fontSize: '16px' }}>📎</span>,
  send: <span style={{ fontSize: '16px' }}>🚀</span>,
  loading: <span style={{ fontSize: '16px' }}>⏳</span>,
  starOutlined: <span style={{ fontSize: '16px' }}>☆</span>,
  starFilled: <span style={{ fontSize: '16px', color: '#faad14' }}>★</span>,
  fileText: <span style={{ fontSize: '16px' }}>📄</span>,
  picture: <span style={{ fontSize: '16px' }}>🖼️</span>,
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof BottomPrompt> = {
  title: 'Core/BottomPrompt',
  component: BottomPrompt,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <HnineDSProvider>
        <div style={{ padding: '40px 24px 24px', maxWidth: '640px' }}>
          <Story />
        </div>
      </HnineDSProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`@hnineds/core`의 채팅 하단 입력 컴포넌트입니다. Enter 전송 · Shift+Enter 줄바꿈 · 자동 높이 조절 · 파일 첨부 · 히스토리/북마크 목록 · 커스텀 아이콘을 지원합니다.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
      table: { defaultValue: { summary: "'질문을 입력하세요...'" } },
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
      table: { defaultValue: { summary: '264' } },
    },
    isHistoryOpen: {
      control: 'boolean',
      description: '히스토리 목록 표시 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    isBookmarkOpen: {
      control: 'boolean',
      description: '북마크 목록 표시 여부',
      table: { defaultValue: { summary: 'false' } },
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
    onHistoryToggle: {
      action: 'history-toggled',
      description: '히스토리 열림/닫힘 콜백',
    },
    onBookmarkToggle: {
      action: 'bookmark-toggled',
      description: '북마크 열림/닫힘 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomPrompt>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <BottomPrompt
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
    placeholder: '질문을 입력하세요...',
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
      <BottomPrompt
        {...args}
        value={value}
        onChange={setValue}
        onSend={handleSend}
        status={status}
      />
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

export const WithHistory: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [isHistoryOpen, setIsHistoryOpen] = useState(true);

    return (
      <BottomPrompt
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          setIsHistoryOpen(false);
        }}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
        historyList={HISTORY_LIST}
        isHistoryOpen={isHistoryOpen}
        onHistoryToggle={setIsHistoryOpen}
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '히스토리 목록이 열린 상태. 아이템 클릭 시 입력창에 내용이 채워집니다. 목록 외부 클릭 시 자동 닫힙니다.',
      },
    },
  },
};

export const WithBookmark: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [isBookmarkOpen, setIsBookmarkOpen] = useState(true);

    return (
      <BottomPrompt
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          setIsBookmarkOpen(false);
        }}
        onSend={(v) => {
          args.onSend?.(v);
          setValue('');
        }}
        bookmarkList={BOOKMARK_LIST}
        isBookmarkOpen={isBookmarkOpen}
        onBookmarkToggle={setIsBookmarkOpen}
        autoFocus={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '북마크 목록이 열린 상태. 우측 하단 별 아이콘으로 토글합니다.',
      },
    },
  },
};

export const WithFiles: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [files, setFiles] = useState<PromptFile[]>(MOCK_FILES);

    return (
      <BottomPrompt
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
      <BottomPrompt
        {...args}
        value={value}
        onChange={setValue}
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
          <BottomPrompt value="" placeholder="기본 prefix..." autoFocus={false} />
        </HnineDSProvider>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>
          커스텀 prefix ("custom")
        </p>
        <HnineDSProvider prefix="custom">
          <BottomPrompt
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
