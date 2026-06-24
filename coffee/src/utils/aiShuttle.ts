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
  '오늘 FE팀 주문 만들어줘',
  '디자인팀 포함해줘',
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
    id: 'hist-today',
    period: 'today',
    label: '오늘',
    dateLabel: '오늘 오전',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-soyeon'],
    summary: '아이스 아메리카노 ×2 · 바닐라 라떼 ×1',
  },
  {
    id: 'hist-yesterday',
    period: 'yesterday',
    label: '어제',
    dateLabel: '어제 15:20',
    memberIds: ['profile-jihyun', 'profile-minsu', 'profile-junho', 'profile-chaerin-y'],
    summary: '아이스 아메리카노 ×2 · 카페라떼 ×1 · 콜드브루 ×1',
  },
  {
    id: 'hist-lastweek',
    period: 'lastweek',
    label: '지난주',
    dateLabel: '6/17 (월)',
    memberIds: [
      'profile-jihyun',
      'profile-minsu',
      'profile-soyeon',
      'profile-junho',
      'profile-chaerin-y',
      'profile-kyungho-m',
    ],
    summary: '6명 · 8잔',
  },
]

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
    const snap = ORDER_HISTORY.find((h) => h.period === 'lastweek')!
    const valid = snap.memberIds.filter((id) => profiles.some((p) => p.id === id))
    return {
      memberIds: valid,
      groupLabel: '지난주 주문',
      reply: `지난주 ${valid.length}명 구성으로 맞췄어요. 음료는 저장된 취향 기준으로 채울게요.`,
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
      reply: `${label} ${ids.length}명으로 오늘 주문 그룹을 만들었어요.`,
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
      reply: `⭐ ${favorite.name} 그룹 ${valid.length}명을 불러왔어요.`,
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
