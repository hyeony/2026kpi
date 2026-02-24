# PromptInput

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

## Changelog

### v0.1.0 (2026-02-19)

#### Added
- PromptInput 컴포넌트 추가
- size: sm, md, lg
- controlled value / onValueChange
- onSubmit 핸들러 (Enter 키 & 버튼 클릭)
- submitOnEnter 옵션
- loading 상태 (전송 중 버튼 UI)
- maxRows 자동 높이 조절
- actions 슬롯 (좌측 추가 버튼)
- submitIcon 커스터마이징
- maxLength 글자 수 표시
- On-demand 스타일 주입 (CSS import 불필요)
