export const TASTE_TAGS = [
  '디카페인',
  '산미 선호',
  'ICE 선호',
  '샷 추가',
  '얼음 적게',
] as const

export type TasteTag = (typeof TASTE_TAGS)[number]

const TAG_RULES: { tag: TasteTag; patterns: RegExp[] }[] = [
  { tag: '디카페인', patterns: [/디카페인/i, /decaf/i, /카페인.*안\s*마/i, /카페인.*피하/i] },
  { tag: '산미 선호', patterns: [/산미/i, /산미있/i, /신맛/i, /라이트\s*로스/i] },
  { tag: 'ICE 선호', patterns: [/ice/i, /아이스/i, /iced/i, /차갑게/i] },
  { tag: '샷 추가', patterns: [/샷\s*추가/i, /샷\s*넣/i, /에스프레소\s*추가/i, /한\s*샷/i] },
  { tag: '얼음 적게', patterns: [/얼음\s*적/i, /적게\s*얼음/i, /라이트\s*아이스/i, /얼음\s*빼/i] },
]

export function extractSuggestedTags(text: string): TasteTag[] {
  if (!text.trim()) return []
  const found = new Set<TasteTag>()
  for (const { tag, patterns } of TAG_RULES) {
    if (patterns.some((p) => p.test(text))) found.add(tag)
  }
  return TASTE_TAGS.filter((t) => found.has(t))
}

export const AI_NOTES_PLACEHOLDER = `저는 산미있는 아메리카노를 좋아하고
디카페인만 마셔요.
카페인은 오후 3시 이후 안 마십니다.
라떼도 좋아하지만 우유는 적게 넣어주세요.`
