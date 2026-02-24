# @hnineds/storybook

HnineDS 컴포넌트 라이브러리의 문서 앱입니다.
컴포넌트 스토리, API 명세, 변경 이력을 한 곳에서 열람할 수 있습니다.

```bash
pnpm dev:storybook   # http://localhost:6006
```

---

## 사이드바 구조

```
Docs
  Core
    Changelog         ← @hnineds/core 전체 컴포넌트 변경 이력 (날짜별)
    Button            ← API / Changelog 탭
    PromptInput
  Styles
    Changelog         ← @hnineds/styles 전체 컴포넌트 변경 이력 (날짜별)
    Button
    PromptInput
Release Notes
  Core                ← packages/core/CHANGELOG.md 전문
  Styles              ← packages/styles/CHANGELOG.md 전문
Core                  ← @hnineds/core 컴포넌트 인터랙티브 스토리
  Button
  PromptInput
Styles                ← @hnineds/styles 컴포넌트 인터랙티브 스토리
  Button
  PromptInput
```

---

## 컴포넌트 문서 시스템 (Docs/)

### 구조 개요

각 컴포넌트 소스 폴더에 `ComponentName.md` 파일 하나로 **API 명세**와 **변경 이력**을 함께 관리합니다.
Storybook은 이 파일을 `?raw`로 읽어 탭 UI로 렌더링합니다.

```
packages/
├── core/src/components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.md        ← API + Changelog
│   └── PromptInput/
│       └── PromptInput.md
└── styles/src/components/
    ├── Button/
    │   └── Button.md        ← styles 전용 스타일 특성 + 동일한 API 표
    └── PromptInput/
        └── PromptInput.md
```

### Markdown 파일 형식

섹션 제목은 반드시 `## API`, `## Changelog`로 작성해야 파서가 인식합니다.
Changelog의 버전 헤딩은 `### vX.Y.Z (YYYY-MM-DD)` 형식이어야 날짜별 집계가 동작합니다.

```markdown
# ComponentName

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary'` | `'primary'` | 스타일 유형 |

## Changelog

### v0.2.0 (2026-03-01)

#### Added
- 새 prop 추가

### v0.1.0 (2026-02-19)

#### Added
- 컴포넌트 최초 추가
```

---

## 새 컴포넌트 추가 방법

### 1. Markdown 파일 작성

컴포넌트 소스 폴더 안에 `ComponentName.md`를 위 형식으로 작성합니다.

```
packages/core/src/components/NewComponent/NewComponent.md
packages/styles/src/components/NewComponent/NewComponent.md   # styles 패키지에도 있다면
```

### 2. 스토리 파일 추가

`apps/storybook/src/docs/` 아래에 스토리 파일을 추가합니다.

```tsx
// apps/storybook/src/docs/core/NewComponent.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import raw from "../../../../../packages/core/src/components/NewComponent/NewComponent.md?raw";
import { ComponentDocsTabs } from "../ComponentDocsTabs";

const Page = () => <ComponentDocsTabs raw={raw} />;

const meta: Meta<typeof Page> = {
  title: "Docs/Core/NewComponent",
  component: Page,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { source: { code: null } },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Docs: Story = { render: () => <Page /> };
```

### 3. Changelog 집계에 등록

`apps/storybook/src/docs/core/Changelog.stories.tsx`의 `sources` 배열에 추가합니다.

```ts
const sources = [
  { raw: coreButton,      component: "Button",       pkg: "@hnineds/core" },
  { raw: corePromptInput, component: "PromptInput",  pkg: "@hnineds/core" },
  { raw: coreNewComponent, component: "NewComponent", pkg: "@hnineds/core" }, // 추가
];
```

styles 패키지도 동일하게 `styles/Changelog.stories.tsx`에 추가합니다.

### 4. 사이드바 순서 조정 (선택)

`.storybook/preview.ts`의 `storySort.order`에 새 컴포넌트명을 삽입합니다.

```ts
order: [
  "Docs",
  ["Core", ["Changelog", "Button", "NewComponent", "PromptInput", "*"], ...],
  ...
]
```

---

## 변경 이력 업데이트 방법

해당 컴포넌트의 `.md` 파일에 새 버전 블록을 추가하기만 하면 됩니다.
Storybook HMR로 즉시 반영됩니다.

```markdown
## Changelog

### v0.2.0 (2026-03-01)      ← 최신 버전을 위에 추가

#### Changed
- variant에 `danger` 추가

### v0.1.0 (2026-02-19)

#### Added
- 컴포넌트 최초 추가
```

`Docs/Core/Changelog`와 `Docs/Styles/Changelog` 페이지에서 날짜별로 자동 집계됩니다.

---

## 내부 구조

### 유틸리티

| 파일 | 역할 |
|------|------|
| `src/docs/parseChangelog.ts` | `.md` 파싱 유틸리티 |
| `src/docs/ComponentDocsTabs.tsx` | API / Changelog 탭 UI 컴포넌트 |

#### `parseChangelog.ts` API

```ts
// ## Changelog 또는 ## API 섹션 내용만 추출
extractSection(raw: string, sectionTitle: string): string

// Changelog 섹션에서 버전 블록을 파싱 → ChangeEntry[]
parseChangelog(raw: string, component: string, pkg: string): ChangeEntry[]

// ChangeEntry[]를 날짜별로 묶어 DateGroup[] 반환 (날짜 내림차순)
groupByDate(entries: ChangeEntry[]): DateGroup[]
```

```ts
interface ChangeEntry {
  version: string;   // "v0.1.0"
  date: string;      // "2026-02-19"
  content: string;   // 해당 버전 블록의 내용
  component: string; // "Button"
  pkg: string;       // "@hnineds/core"
}

interface DateGroup {
  date: string;
  entries: ChangeEntry[];
}
```

### Vite 설정 (`main.ts`)

```ts
// .md 파일을 ?raw import로 문자열로 읽을 수 있도록 설정
config.assetsInclude = ["**/*.md"];
```

### 마크다운 렌더링

GFM(표, 체크박스 등)을 지원하기 위해 `remark-gfm` 플러그인을 사용합니다.

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
```
