import type { Profile } from '../types'

export interface FavoriteGroup {
  id: string
  name: string
  memberIds: string[]
  tag?: string
}

export interface HistorySnapshot {
  id: string
  period: 'today' | 'yesterday' | 'lastweek'
  label: string
  dateLabel: string
  memberIds: string[]
  summary: string
}

export interface AiCommandResult {
  memberIds: string[]
  groupLabel: string
  reply: string
  insight: string
}

export const AI_SUGGESTIONS = [
  'FE팀 주문 목록 만들어줘',
  '디자인팀 전원 추가',
  '지난주랑 동일하게',
] as const

export const FAVORITE_GROUPS: FavoriteGroup[] = [
  {
    id: 'fe-sprint',
    name: 'FE Sprint',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-soyeon'],
    tag: '3명',
  },
  {
    id: 'dev-daily',
    name: 'Dev Daily',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-junho', 'profile-doyoon-k'],
    tag: '4명',
  },
  {
    id: 'design-sync',
    name: 'Design Sync',
    memberIds: ['profile-chaerin-y', 'profile-kyungho-m', 'profile-areum-s', 'profile-yeeun-d'],
    tag: '4명',
  },
]

export const ORDER_HISTORY: HistorySnapshot[] = [
  {
    id: 'hist-today-1',
    period: 'today',
    label: '오늘',
    dateLabel: '오늘 10:30 · FE 스탠드업',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-soyeon'],
    summary: '아이스 아메리카노 ×2 · 바닐라 라떼 ×1',
  },
  {
    id: 'hist-today-2',
    period: 'today',
    label: '오늘',
    dateLabel: '오늘 14:15 · PM 체크인',
    memberIds: ['profile-taeyoung-k', 'profile-dahey-n', 'profile-jihwan-b'],
    summary: '아메리카노 HOT ×2 · 카페라떼 HOT ×1',
  },
  {
    id: 'hist-yesterday-1',
    period: 'yesterday',
    label: '어제',
    dateLabel: '어제 15:20 · Dev Daily',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-junho', 'profile-doyoon-k'],
    summary: '아이스 아메리카노 ×2 · 카페라떼 HOT ×1 · 아메리카노 HOT ×1',
  },
  {
    id: 'hist-yesterday-2',
    period: 'yesterday',
    label: '어제',
    dateLabel: '어제 11:00 · Design Sync',
    memberIds: ['profile-chaerin-y', 'profile-kyungho-m', 'profile-areum-s', 'profile-yeeun-d'],
    summary: '바닐라 라떼 ×2 · 플랫 화이트 ×1 · 아이스 아메리카노 ×1',
  },
  {
    id: 'hist-yesterday-3',
    period: 'yesterday',
    label: '어제',
    dateLabel: '어제 09:40 · Strategy 팀',
    memberIds: ['profile-seoyeon-k', 'profile-junhyuk-l', 'profile-jiwon-p'],
    summary: '아이스 아메리카노 ×2 · 카페라떼 HOT ×1',
  },
  {
    id: 'hist-lastweek-1',
    period: 'lastweek',
    label: '지난주',
    dateLabel: '6/17 (월) · 전사 주간 회의',
    memberIds: [
      'profile-jihyun',
      'profile-minsu',
      'profile-soyeon',
      'profile-junho',
      'profile-chaerin-y',
      'profile-kyungho-m',
    ],
    summary: '6명 · 아이스 아메리카노 ×3 · 카페라떼 ×2 · 콜드브루 ×1',
  },
  {
    id: 'hist-lastweek-2',
    period: 'lastweek',
    label: '지난주',
    dateLabel: '6/18 (화) · Interaction 리뷰',
    memberIds: ['profile-yejun-s', 'profile-narae-k', 'profile-chaewon-i', 'profile-geonwoo-n'],
    summary: '바닐라 라떼 ×2 · 카페라떼 ICE ×1 · 아이스 티 ×1',
  },
  {
    id: 'hist-lastweek-3',
    period: 'lastweek',
    label: '지난주',
    dateLabel: '6/19 (수) · C-level 미팅',
    memberIds: ['profile-hyunwoo-k', 'profile-seojun-p', 'profile-jieun-l', 'profile-taeyoung-k'],
    summary: '에스프레소 ×2 · 아메리카노 HOT ×1 · 카페라떼 HOT ×1',
  },
  {
    id: 'hist-lastweek-4',
    period: 'lastweek',
    label: '지난주',
    dateLabel: '6/20 (목) · Visual 팀',
    memberIds: ['profile-kyungho-m', 'profile-areum-s', 'profile-siu-b', 'profile-sora-j', 'profile-yula-h'],
    summary: '플랫 화이트 ×2 · 아이스 아메리카노 ×2 · 에스프레소 ×1',
  },
]

/** 기간 탭 순서 */
export const HISTORY_PERIODS: HistorySnapshot['period'][] = ['today', 'yesterday', 'lastweek']

export function historyLabelForPeriod(period: HistorySnapshot['period']): string {
  return ORDER_HISTORY.find((h) => h.period === period)?.label ?? period
}

const DEPT_ALIASES: Record<string, string[]> = {
  fe: ['Development'],
  fe팀: ['Development'],
  frontend: ['Development'],
  개발: ['Development'],
  development: ['Development'],
  디자인: ['UX', 'Visual'],
  디자인팀: ['UX', 'Visual'],
  design: ['UX', 'Visual'],
  ux: ['UX'],
  visual: ['Visual'],
  strategy: ['Strategy'],
  pmo: ['PMO Group'],
}

function idsForDepartments(profiles: Profile[], departments: string[]): string[] {
  const set = new Set(departments)
  return profiles
    .filter((p) => set.has(p.department) && p.preferredDrinks.length > 0)
    .map((p) => p.id)
}

function matchDepartments(text: string): string[] | null {
  const lower = text.toLowerCase()
  for (const [key, depts] of Object.entries(DEPT_ALIASES)) {
    if (lower.includes(key)) return depts
  }
  return null
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function processAiCommand(
  text: string,
  profiles: Profile[],
): Promise<AiCommandResult> {
  await delay(900 + Math.random() * 400)

  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (lower.includes('지난주') || lower.includes('동일') || lower.includes('같게')) {
    const snap = ORDER_HISTORY.find((h) => h.id === 'hist-lastweek-1')!
    const valid = snap.memberIds.filter((id) => profiles.some((p) => p.id === id))
    return {
      memberIds: valid,
      groupLabel: '지난주 주문',
      reply: `지난주 ${valid.length}명 주문 목록으로 맞췄어요. 음료는 저장된 취향 기준으로 채울게요.`,
      insight: buildInsight(profiles, valid, '지난주에 함께 주문했던 패턴'),
    }
  }

  if (lower.includes('포함') && matchDepartments(lower)) {
    const depts = matchDepartments(lower)!
    const ids = idsForDepartments(profiles, depts)
    return {
      memberIds: ids,
      groupLabel: `${depts.join(' · ')}`,
      reply: `${depts.join(', ')} 팀 ${ids.length}명을 추가했어요.`,
      insight: buildInsight(profiles, ids, `${depts.join('/')} 팀 최근 주문 패턴`),
    }
  }

  const depts = matchDepartments(lower)
  if (depts) {
    const ids = idsForDepartments(profiles, depts)
    const label = lower.includes('fe') ? 'FE팀' : depts[0]
    return {
      memberIds: ids,
      groupLabel: label,
      reply: `${label} ${ids.length}명 주문 목록을 만들었어요.`,
      insight: buildInsight(profiles, ids, `${label} 최근 스프린트 주문 이력`),
    }
  }

  const favorite = FAVORITE_GROUPS.find(
    (g) => lower.includes(g.name.toLowerCase()) || lower.includes('sprint'),
  )
  if (favorite) {
    const valid = favorite.memberIds.filter((id) => profiles.some((p) => p.id === id))
    return {
      memberIds: valid,
      groupLabel: favorite.name,
      reply: `⭐ ${favorite.name} 주문 목록 ${valid.length}명을 불러왔어요.`,
      insight: buildInsight(profiles, valid, `${favorite.name} 즐겨찾기 그룹`),
    }
  }

  // fallback: Development core
  const fallback = idsForDepartments(profiles, ['Development']).slice(0, 5)
  return {
    memberIds: fallback,
    groupLabel: '추천',
    reply: `요청을 해석해 Development 팀 ${fallback.length}명을 추천했어요. 수정이 필요하면 말씀해 주세요.`,
    insight: buildInsight(profiles, fallback, '최근 함께 주문한 팀원'),
  }
}

export function buildInsight(
  profiles: Profile[],
  memberIds: string[],
  context: string,
): string {
  const selected = memberIds
    .map((id) => profiles.find((p) => p.id === id))
    .filter((p): p is Profile => p != null)

  if (selected.length === 0) {
    return '선택된 구성원이 없어요. 팀이나 이름을 말씀해 주세요.'
  }

  const drinkCount = new Map<string, number>()
  for (const p of selected) {
    for (const d of p.preferredDrinks) {
      drinkCount.set(d, (drinkCount.get(d) ?? 0) + 1)
    }
  }

  const top = [...drinkCount.entries()].sort((a, b) => b[1] - a[1])[0]
  const names = selected.slice(0, 3).map((p) => p.name).join(', ')
  const rest = selected.length > 3 ? ` 외 ${selected.length - 3}명` : ''

  if (top) {
    return `${context}을 분석했어요. ${names}${rest} — ${top[0]}가 가장 많아요 (${top[1]}잔 예상).`
  }

  return `${context} 기준으로 ${selected.length}명을 선택했어요.`
}

export function analyzeSelection(profiles: Profile[], memberIds: string[]): string {
  return buildInsight(profiles, memberIds, '선택한 구성원들의 최근 주문 이력')
}
