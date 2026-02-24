# Button

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | 버튼 스타일 유형 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| startIcon | `ReactNode` | — | 좌측 아이콘 |
| endIcon | `ReactNode` | — | 우측 아이콘 |
| disabled | `boolean` | `false` | 비활성화 여부 |
| className | `string` | — | 추가 CSS 클래스 |

`ButtonHTMLAttributes<HTMLButtonElement>`의 모든 표준 속성을 추가로 지원합니다.

## Changelog

### v0.1.0 (2026-02-19)

#### Added
- Button 컴포넌트 추가
- variant: primary, secondary, ghost
- size: sm, md, lg
- startIcon / endIcon 슬롯
- On-demand 스타일 주입 (CSS import 불필요)
- BUILD_PREFIX 기반 클래스명 격리
