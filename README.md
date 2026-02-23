# HnineDS

React 컴포넌트 라이브러리 모노레포.

**Zero CSS Import** 철학을 기반으로 설계되었습니다.
CSS 파일을 별도로 import하지 않아도 컴포넌트가 마운트되는 시점에 스타일이 `<head>`에 자동 주입됩니다.

---

## 패키지 구조

```
hnineds/
├── packages/
│   ├── core/        # @hnineds/core   — 기본 스타일 내장, 단독 배포 가능
│   └── styles/      # @hnineds/styles — core re-export + enhanced 스타일 override
└── apps/
    ├── playground-core/    # @hnineds/core 개발용 playground  (http://localhost:5173)
    ├── playground-styles/  # @hnineds/styles 개발용 playground (http://localhost:5174)
    └── storybook/          # 컴포넌트 문서 + API + Release Notes (http://localhost:6006)
```

| 패키지 | 설명 |
|---|---|
| `@hnineds/core` | 기본 디자인 스타일이 내장된 베이스 패키지. 단독으로도 사용 가능 |
| `@hnineds/styles` | `@hnineds/core`를 의존하며 enhanced 디자인(gradient, shadow, animation)으로 스타일 재정의. **일반 사용자는 이 패키지만 import** |

---

## 요구 사항

| 도구 | 버전 |
|---|---|
| Node.js | 20.8.1 이상 |
| pnpm | 8.15.0 이상 |

---

## 시작하기

### 1. 저장소 클론

```bash
git clone <repository-url>
cd hnineds
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 확인

프로젝트 루트의 `.env` 파일에 `VITE_BUILD_PREFIX`가 정의되어 있습니다.
이 값이 컴포넌트 클래스명의 prefix로 사용됩니다.

```env
# .env
VITE_BUILD_PREFIX=hnineds1
```

> prefix를 변경하면 클래스명이 바뀌어 기존 스타일이 자동으로 해제됩니다 (Style Disconnection).

---

## 실행 방법

### playground-core — `@hnineds/core` 개발 확인

core 패키지의 기본 스타일을 브라우저에서 직접 확인하는 개발용 앱입니다.

```bash
pnpm dev:core
```

- 주소: **http://localhost:5173**
- `@hnineds/core` 소스를 빌드 없이 직접 참조합니다 (No-Build Dev Flow)
- DevTools → `<head>` 에서 `data-hnineds-id` 스타일 태그를 확인할 수 있습니다

---

### playground-styles — `@hnineds/styles` 개발 확인

styles 패키지의 enhanced 스타일(gradient, shadow, animation)을 확인하는 개발용 앱입니다.

```bash
pnpm dev:styles
```

- 주소: **http://localhost:5174**
- `@hnineds/styles` 소스를 빌드 없이 직접 참조합니다 (No-Build Dev Flow)
- Provider 없이도 styles 스타일이 자동 주입되는 것을 확인할 수 있습니다

---

### Storybook — 컴포넌트 문서 & API

컴포넌트 스토리, Props API 테이블, Release Notes를 확인하는 문서 앱입니다.

```bash
pnpm dev:storybook
```

- 주소: **http://localhost:6006**
- `Core/` — `@hnineds/core` 컴포넌트 스토리 및 Props 자동 문서화
- `Styles/` — `@hnineds/styles` 컴포넌트 스토리 및 Props 자동 문서화
- `Release Notes/` — 각 패키지의 `CHANGELOG.md` 렌더링

---

### 패키지 빌드

```bash
# core + styles 패키지만 빌드
pnpm build:packages

# 전체 (패키지 + 앱 포함) 빌드
pnpm build:all
```

빌드 결과물은 각 패키지의 `dist/` 디렉토리에 생성됩니다.

```
packages/core/dist/
  index.js      # ESM
  index.cjs     # CommonJS
  index.d.ts    # TypeScript 타입

packages/styles/dist/
  index.js
  index.cjs
  index.d.ts
```

### 빌드 캐시 초기화

```bash
pnpm clean
```

### 빌드 및 배포

```bash
# 1. 빌드 먼저
pnpm --filter @hnineds/styles build

# 2. publish (빌드된 dist + CHANGELOG.md만 업로드됨 — package.json "files" 기준)
pnpm --filter @hnineds/styles publish --access public
```

---

## 핵심 개념

### Zero CSS Import

컴포넌트가 렌더링될 때 필요한 스타일이 `<head>`에 자동으로 주입됩니다.
별도의 CSS 파일 import가 필요 없습니다.

```tsx
// CSS import 불필요
import { Button } from "@hnineds/styles";

function App() {
  return <Button variant="primary">Click</Button>; // 스타일 자동 주입
}
```

### Style Disconnection by Prefix

`HnineDSProvider`로 `prefix`를 변경하면 클래스명이 달라져 기본 스타일이 자동으로 해제됩니다.
퍼블리셔가 직접 스타일을 작성해야 하는 영역에서 활용합니다.

```tsx
import { HnineDSProvider, Button } from "@hnineds/styles";

// prefix 기본값(hnineds1) → 스타일 자동 적용
<Button variant="primary">스타일 있음</Button>

// prefix 변경 → 클래스명이 custom-btn으로 바뀜 → 스타일 해제
<HnineDSProvider prefix="custom">
  <Button variant="primary">스타일 없음 (직접 작성)</Button>
</HnineDSProvider>
```

### Provider 선택적 사용

prefix를 변경할 필요가 없다면 `HnineDSProvider`를 사용하지 않아도 됩니다.

```tsx
// Provider 없이도 기본 스타일 정상 동작
import { Button } from "@hnineds/styles";

<Button variant="primary">바로 사용 가능</Button>
```

---

## Button 컴포넌트 Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | 버튼 스타일 유형 |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 버튼 크기 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `startIcon` | `ReactNode` | — | 텍스트 앞 아이콘 |
| `endIcon` | `ReactNode` | — | 텍스트 뒤 아이콘 |
| `className` | `string` | — | 추가 CSS 클래스 (내부 클래스 뒤에 병합) |
| `onClick` | `MouseEventHandler` | — | 클릭 이벤트 핸들러 |

---

## 개발 스크립트 전체 목록

| 명령어 | 설명 |
|---|---|
| `pnpm dev:core` | playground-core 개발 서버 실행 (localhost:5173) |
| `pnpm dev:styles` | playground-styles 개발 서버 실행 (localhost:5174) |
| `pnpm dev:storybook` | Storybook 개발 서버 실행 (localhost:6006) |
| `pnpm build:packages` | `@hnineds/core`, `@hnineds/styles` 패키지 빌드 |
| `pnpm build:all` | 전체 빌드 (패키지 + 앱) |
| `pnpm clean` | 빌드 캐시 및 dist 디렉토리 삭제 |
