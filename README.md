# Design System Monorepo

pnpm 워크스페이스 기반 모노레포입니다.

## 구조

```
├── playground/       # 디자인시스템 사용 예제 / 개발용 앱
├── apps/
│   ├── core/         # 기능만 담당 (Headless + prefixCls, 필요 시 최소 구조용 인라인 스타일)
│   └── theme/        # 스타일 담당 (namespace 기반 CSS 문자열 주입, 토큰, core 래퍼)
```

- **core**: 동작·접근성·마크업. `prefixCls` / `namespace` 로 루트 클래스 생성. 레이아웃이 필요한 컴포넌트는 최소한의 인라인 스타일만 사용.
- **theme**: core를 감싸서 `namespace`를 넘기고, `getThemeStyles(namespace)` 로 생성한 CSS를 `<style>` 로 주입. 스타일은 컴포넌트별 파일(Button/styles.ts, Prompt/styles.ts) + tokens 참조.
- **의존성**: theme → core. 사용자는 **theme만** 설치하면 됨.

## 사용법

```bash
# 의존성 설치
pnpm install

# core → theme 빌드 후 playground 개발 서버
pnpm dev

# 전체 빌드
pnpm build

# 패키지별
pnpm --filter @test1/core build
pnpm --filter @test1/theme build
pnpm --filter playground dev
```

## 라이브러리 사용자 (theme만 설치)

```bash
pnpm add @test1/theme
```

```tsx
import { ThemeProvider, Button, Prompt } from '@test1/theme';

// 커스텀 prefix 사용 시 namespace 지정 (기본값 'ds')
<ThemeProvider namespace="myapp">
  <Button>클릭</Button>
  <Prompt value={value} onChange={...} onCopy={...} />
</ThemeProvider>
```

- **ThemeProvider**가 `namespace`에 맞는 스타일을 한 번 주입하고, 하위 컴포넌트에 namespace를 넘김.
- 스타일은 라이브러리 없이 CSS 문자열 + `<style>` 주입. 선택자는 `namespace` 변수로 생성해 `.ds-button` 같은 고정 클래스 없이 커스텀 prefix 대응.

## prefixCls / namespace

- **core**: `prefixCls('Button')` 또는 `createPrefixCls(namespace)('Button')` 로 루트 클래스 생성 (예: `ds-button`, `myapp-button`).
- **theme**: `getThemeStyles(namespace)` 안에서 동일한 `createPrefixCls(namespace)` 로 선택자 생성. 컴포넌트와 스타일이 같은 prefix를 쓰도록 맞춤.
- 스타일 파일은 **컴포넌트별** (Button/styles.ts, Prompt/styles.ts). `styles.ts`에서 모아서 `getThemeStyles` 반환.

## 토큰

- **theme/tokens.ts**: 색, radius 등 짧은 토큰 객체. 컴포넌트 스타일에서 참조하고, theme에서 `tokens` export.

## Playground

`playground`는 `@test1/theme` + React Router로 컴포넌트별 페이지를 보는 예제 앱입니다.
