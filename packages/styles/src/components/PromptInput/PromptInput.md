# PromptInput (`@hnineds/styles`)

`@hnineds/styles`의 PromptInput은 `@hnineds/core`의 PromptInput을 그대로 re-export하며, 스타일 override를 자동 등록합니다. API는 core와 동일합니다.

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 입력창 크기 |
| placeholder | `string` | `'메시지를 입력하세요...'` | placeholder 텍스트 |
| value | `string` | — | 현재 입력 값 (controlled) |
| onValueChange | `(value: string) => void` | — | 입력 값 변경 핸들러 |
| onSubmit | `(value: string) => void` | — | 전송 핸들러 (버튼 클릭 또는 Enter 키) |
| submitOnEnter | `boolean` | `true` | Enter 키로 전송 여부 (Shift+Enter는 항상 줄바꿈) |
| loading | `boolean` | `false` | 전송 중 상태 (버튼 로딩 표시) |
| disabled | `boolean` | `false` | 전송 버튼 비활성화 여부 |
| maxRows | `number` | `200` | 최대 높이 (자동 높이 조절 상한, px) |
| actions | `ReactNode` | — | 전송 버튼 좌측에 추가 액션 버튼 (파일 첨부, 마이크 등) |
| submitIcon | `ReactNode` | — | 커스텀 전송 버튼 아이콘 (기본: 화살표 아이콘) |
| maxLength | `number` | — | 최대 입력 글자 수 표시 |

`TextareaHTMLAttributes<HTMLTextAreaElement>`의 표준 속성을 지원합니다 (`onSubmit` 제외).

### @hnineds/styles 전용 스타일 특성

`@hnineds/styles`에서 PromptInput을 import하면 다음 시각적 향상이 자동 적용됩니다:

- 강화된 테두리 및 포커스 링 스타일
- 전송 버튼에 그라디언트 배경 적용
- 로딩 상태 애니메이션 강화

## Changelog

### v0.1.0 (2026-02-19)

#### Added
- PromptInput 스타일 override 등록 (@hnineds/styles 전용)
- 강화된 테두리 및 포커스 링 스타일
- 전송 버튼 그라디언트 배경
- 로딩 상태 애니메이션 강화
- @hnineds/core PromptInput re-export
