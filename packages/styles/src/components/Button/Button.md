# Button (`@hnineds/styles`)

`@hnineds/styles`의 Button은 `@hnineds/core`의 Button을 그대로 re-export하며, 스타일 override를 자동 등록합니다. API는 core와 동일합니다.

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

### @hnineds/styles 전용 스타일 특성

`@hnineds/styles`에서 Button을 import하면 다음 시각적 향상이 자동 적용됩니다:

- **primary**: 그라디언트 배경, box-shadow, hover 시 밝기 상승 애니메이션
- **secondary**: 테두리 강조, hover 시 배경 전환
- **ghost**: hover 시 반투명 배경

## Changelog

### v0.1.0 (2026-02-19)

#### Added
- Button 스타일 override 등록 (@hnineds/styles 전용)
- primary variant: 그라디언트 배경 + box-shadow + hover 애니메이션
- secondary variant: 테두리 강조 스타일
- ghost variant: hover 반투명 배경
- @hnineds/core Button re-export
