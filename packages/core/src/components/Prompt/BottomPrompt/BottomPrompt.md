# BottomPrompt

## API

### BottomPromptProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | 현재 입력 값 (controlled) |
| `onChange` | `(value: string) => void` | — | 입력 값 변경 핸들러 |
| `onSend` | `(value: string) => void` | — | 전송 핸들러 (버튼 클릭 또는 Enter 키) |
| `placeholder` | `string` | `'질문을 입력하세요...'` | placeholder 텍스트 |
| `autoFocus` | `boolean` | `true` | 마운트 시 자동 포커스 여부 |
| `status` | `'default' \| 'typing' \| 'responding'` | `'default'` | 컴포넌트 상태 — `responding` 시 입력 비활성화 및 로딩 아이콘 표시 |
| `maxHeight` | `number \| string` | `264` | 입력창 최대 높이 (px) — 초과 시 스크롤 |
| `className` | `string` | — | 루트 엘리먼트 추가 클래스 |
| `onFocus` | `FocusEventHandler<HTMLTextAreaElement>` | — | textarea 포커스 이벤트 |
| `onBlur` | `FocusEventHandler<HTMLTextAreaElement>` | — | textarea 블러 이벤트 |

### 파일 첨부 관련

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `files` | `PromptFile[]` | `[]` | 첨부된 파일 목록 |
| `onFileDelete` | `(fileId: string) => void` | — | 파일 삭제 핸들러 |
| `onFileUpload` | `(files: FileList) => void` | — | 파일 업로드 핸들러 (파일/이미지 공용) |

### 히스토리 관련

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `historyList` | `PromptListItem[]` | `[]` | 히스토리 목록 |
| `isHistoryOpen` | `boolean` | `false` | 히스토리 목록 표시 여부 |
| `onHistoryToggle` | `(open: boolean) => void` | — | 히스토리 열림/닫힘 콜백 |

### 북마크 관련

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bookmarkList` | `PromptListItem[]` | `[]` | 북마크 목록 |
| `isBookmarkOpen` | `boolean` | `false` | 북마크 목록 표시 여부 |
| `onBookmarkToggle` | `(open: boolean) => void` | — | 북마크 열림/닫힘 콜백 |

### 커스텀 아이콘 (`icons`)

`icons` prop으로 기본 SVG 아이콘을 외부에서 교체할 수 있습니다.

| 키 | 위치 | 기본값 |
|----|------|--------|
| `plus` | 파일 첨부 버튼 | Plus SVG |
| `send` | 전송 버튼 | Send SVG |
| `loading` | 전송 버튼 (responding 상태) | Loading SVG (회전 애니메이션) |
| `starOutlined` | 북마크 버튼 (비활성) | Star Outlined SVG |
| `starFilled` | 북마크 버튼 (활성) | Star Filled SVG |
| `fileText` | 파일 업로드 메뉴 아이템 | FileText SVG |
| `picture` | 이미지 업로드 메뉴 아이템 | Picture SVG |

### PromptFile

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `name` | `string` | 파일명 |
| `status` | `'normal' \| 'error' \| 'loading'` | 파일 상태 |
| `url` | `string?` | 파일 URL |
| `thumbUrl` | `string?` | 썸네일 URL (이미지 미리보기) |
| `size` | `number?` | 파일 크기 (bytes) |

### PromptListItem

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | 고유 식별자 |
| `content` | `string` | 표시 텍스트 (클릭 시 입력창에 입력됨) |
| `subContent` | `string?` | 부제목 |
| `icon` | `ReactNode?` | 아이콘 |
| `timestamp` | `number?` | 타임스탬프 |
| `metadata` | `any?` | 추가 데이터 |

## Changelog

### v0.1.0 (2026-02-24)

#### Added
- `BottomPrompt` 컴포넌트 추가
- 텍스트 입력 (자동 높이 조절, `maxHeight` 상한)
- Enter 전송 / Shift+Enter 줄바꿈 / IME 조합 중 전송 방지
- `status` prop — `responding` 시 입력 비활성화 + 로딩 아이콘
- 파일 첨부 컨텍스트 메뉴 (파일 / 이미지 분리)
- `FilePreviewList` 연동 — 파일 칩 및 이미지 썸네일 미리보기
- 히스토리 / 북마크 상향 전개 목록
- 목록 외부 클릭 시 자동 닫힘 (`useClickOutside`)
- `icons` prop — 7개 아이콘 슬롯 외부 교체 지원
- On-demand 스타일 주입 (CSS import 불필요)
- `@keyframes hnineds-bp-spin` 로딩 스피너 애니메이션
