# test2 – 대안 세팅 (tsup + watch)

- **기본(namespace='ds')**: 빌드타임 CSS(`dist/theme.css`) 사용 → 깜빡임 없음
- **커스텀 namespace**: 런타임 주입 (깜빡임 가능)

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

- **dev**: core/theme 수정 시 자동 재빌드되고, playground가 새 dist를 참조합니다.
- **concurrently**로 `core dev`, `theme dev`, `playground dev`를 한 번에 띄웁니다.

## 패키지 배포 전 체크리스트

배포 전에 아래 항목을 확인하세요:

- [ ] **d.ts 정상 생성**: `dist/*.d.ts` 파일이 존재하는지 확인
- [ ] **theme.css 산출물**: `dist/theme.css` 빌드 시 자동 생성됨 (tsup onSuccess)
- [ ] **peer deps external 처리**: `react`, `react-dom` 등이 번들에 포함되지 않았는지 확인 (tsup `external` 설정)
- [ ] **CSS 주입 모듈 sideEffects 처리**: theme 패키지가 스타일 주입을 하므로 `package.json`에 `"sideEffects": true` 또는 `["dist/index.js"]` 등 지정
- [ ] **exports/entrypoints**: ESM/CJS 소비자에서 `import`/`require` 정상 동작하는지 확인

## 스타일 적용 (깜빡임 방지)

앱 엔트리 **최상단**에 theme CSS를 import하세요:

```tsx
import '@test2/theme/theme.css';  // 반드시 다른 import보다 먼저
import './index.css';
import { ThemeProvider } from '@test2/theme';
// ...
```

- `dist/theme.css`: theme 빌드 시 자동 생성 (namespace='ds' 고정)
- CSS가 JS 실행 전에 로드되어 깜빡임 없음

## 구조

test1과 동일: `playground`, `apps/core`, `apps/theme`. prefixCls·namespace·ThemeProvider·토큰·컴포넌트별 스타일 파일 모두 동일한 방식입니다.
