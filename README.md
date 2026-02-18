# Design System Monorepo

pnpm 워크스페이스 기반 모노레포입니다.

## 구조

```
├── playground/       # 디자인시스템 사용 예제 / 개발용 앱
├── apps/
│   ├── core/         # 기능만 담당 (Headless 컴포넌트 + prefixCls)
│   └── theme/        # 스타일만 담당 (CSS-in-JS, core 기반 스타일)
```

- **core**: 동작·접근성·마크업만 담당. `prefixCls(componentName)` 로 루트 클래스 생성.
- **theme**: core를 import한 뒤 Emotion으로 스타일 적용. 스타일 셀렉터에 `${prefixCls('Button')}` 사용.
- **의존성 방향**: theme → core (theme가 core를 import해 스타일만 입힘).

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

## prefixCls

- **core**에서 `prefixCls('Button')` → `'ds-button'` 형태로 사용.
- **theme**의 CSS-in-JS에서는 동일한 `prefixCls`를 import해 셀렉터에 사용:

```ts
import { prefixCls } from '@test1/core';
const buttonPrefixCls = prefixCls('Button'); // 'ds-button'

// Emotion 등에서
`.${buttonPrefixCls} { ... }`
```

## Playground

`playground`는 `@test1/theme`를 사용하는 Vite + React 앱입니다.  
스토리북 등으로 바꿀 수 있습니다.
