# test2 – 대안 세팅 (tsup + watch)

- **기본 namespace(BUILD_PREFIX)**: CSS import 없이, 사용 중인 컴포넌트 마운트 시 해당 스타일만 `<head>`에 지연 주입
- **커스텀 namespace**: ThemeProvider에서 해당 namespace 스타일 일괄 주입
- **빌드**: Turborepo 사용 (`turbo run build`), BUILD_PREFIX로 버전별 클래스 격리 가능

## 한 줄 요약

**test1 vs test2**: 작업 속도/개발 경험은 test2(tsup + watch)가 확실히 우수하고, 배포 안정성은 test2 + tsc 타입체크/산출물 검증 조합이 가장 안전함.

## test1과의 차이

| 항목 | test1 | test2 |
|------|--------|--------|
| core/theme 빌드 | `tsc` | **tsup** (단일 번들 + `dist/theme.css`) |
| 개발 시 | `pnpm dev` → core·theme 1회 빌드 후 playground만 실행 | `pnpm dev` → 1회 빌드 후 **core watch + theme watch + playground** 동시 실행 |
| 패키지명 | @test1/core, @test1/theme | @test2/core, @test2/theme |

## 추천 운영안 (가장 실용적인 조합)

### 로컬 개발 기본값: test2 방식

```bash
pnpm dev   # tsup watch(core/theme) + playground 동시 실행
```

- core/theme 수정 시 자동 재빌드되고, playground가 새 dist를 참조합니다.

### 검증/배포 빌드: 타입체크를 별도 단계로

```bash
# 빌드 전에 (또는 CI에서) 타입체크 먼저 실행
pnpm typecheck

# 또는 build와 함께
pnpm typecheck && pnpm build
```

- `pnpm build` 전에 `pnpm typecheck`(`tsc --noEmit`)로 tsup이 놓칠 수 있는 타입 오류를 한 번 더 검증합니다.

## 사용법

```bash
# 루트(test2)에서 반드시 먼저 실행
pnpm install

pnpm dev        # core·theme 1회 빌드 후, watch 2개 + playground 동시 실행
pnpm typecheck  # 전체 타입체크 (tsc --noEmit)
pnpm build      # 전체 빌드
```

- **dev**: Turborepo로 core/theme 먼저 빌드 후, 세 패키지 dev를 동시 실행.
- **스타일**: 기본 namespace는 CSS 파일 import 없이, Button/Prompt 등 사용 시 해당 컴포넌트 스타일만 `<head>`에 주입됨.

### Windows에서 개발하기

- **Node**: 20.8.1 또는 20 LTS ( [nodejs.org](https://nodejs.org/) 또는 [nvm-windows](https://github.com/coreybutler/nvm-windows) 권장 )
- **실행**: 터미널은 **PowerShell** 또는 **CMD** 모두 사용 가능. 위와 동일하게 `pnpm install` 후 `pnpm dev` 실행하면 됩니다.
- **줄바꿈**: 저장소에 `.gitattributes`가 있어 LF로 통일됩니다. Windows에서 Git `core.autocrlf` 기본값이면 커밋 시 자동으로 LF로 저장됩니다.

## 패키지 배포 전 체크리스트

배포 전에 아래 항목을 확인하세요:

- [ ] **d.ts 정상 생성**: `dist/*.d.ts` 파일이 존재하는지 확인
- [ ] **theme.css 산출물**: `dist/theme.css` 빌드 시 자동 생성됨 (tsup onSuccess)
- [ ] **peer deps external 처리**: `react`, `react-dom` 등이 번들에 포함되지 않았는지 확인 (tsup `external` 설정)
- [ ] **CSS 주입 모듈 sideEffects 처리**: theme 패키지가 스타일 주입을 하므로 `package.json`에 `"sideEffects": true` 또는 `["dist/index.js"]` 등 지정
- [ ] **exports/entrypoints**: ESM/CJS 소비자에서 `import`/`require` 정상 동작하는지 확인

## 스타일 적용 (On-demand / Lazy)

- **기본 namespace**: CSS 파일 import 없이 `ThemeProvider`와 컴포넌트만 사용하면, 해당 컴포넌트가 마운트될 때 해당 스타일만 `<head>`에 주입됩니다.
- **선택적 사전 로드**: 깜빡임을 줄이고 싶다면 `import '@test2/theme/theme.css'`를 엔트리 최상단에 두면 됩니다 (BUILD_PREFIX와 동일한 namespace일 때만 적용).

```tsx
import './index.css';
import { ThemeProvider, Button, Prompt } from '@test2/theme';

// Button/Prompt 사용 시 해당 스타일만 자동 주입
<ThemeProvider>
  <Button>클릭</Button>
</ThemeProvider>
```

## BUILD_PREFIX (빌드 타임 prefix)

버전별 클래스 격리 또는 배포 prefix 변경 시 환경변수로 지정합니다:

```bash
# 기본값 'ds'. 배포 시 예: myui1, myui2
BUILD_PREFIX=myui1 pnpm build
```

- core/theme 빌드 시 `BUILD_PREFIX`가 클래스명과 `dist/theme.css` 선택자에 반영됩니다.
- 한 화면에 구/신 버전 라이브러리가 공존해도 prefix를 다르게 빌드하면 스타일 충돌이 나지 않습니다.

## 구조

test1과 동일: `playground`, `apps/core`, `apps/theme`. prefixCls·namespace·ThemeProvider·토큰·컴포넌트별 스타일 파일 모두 동일한 방식입니다.
