import type { OrderGuest, Profile } from '../types'

export interface OrderItem {
  memberName: string
  drinks: string[]
  tasteTags?: string[]
  aiNotes?: string
  isGuest?: boolean
}

export interface DrinkCount {
  drink: string
  count: number
  names: string[]
}

function formatMemberLine(item: OrderItem): string {
  const tag = item.isGuest ? ' (게스트)' : ''
  let line = `• ${item.memberName}${tag}: ${item.drinks.join(', ')}`
  if (item.tasteTags && item.tasteTags.length > 0) {
    line += ` (${item.tasteTags.join(' · ')})`
  }
  return line
}

export function buildOrderItems(
  profiles: Profile[],
  guests: OrderGuest[],
  selectedMemberIds: string[],
): OrderItem[] {
  const profileMap = new Map(profiles.map((p) => [p.id, p]))

  const memberItems: OrderItem[] = selectedMemberIds
    .map((id) => profileMap.get(id))
    .filter((p): p is Profile => p != null)
    .map((p) => ({
      memberName: p.name,
      drinks: p.preferredDrinks.filter(Boolean),
      tasteTags: p.tasteTags.filter(Boolean),
      aiNotes: p.aiNotes.trim() || undefined,
    }))
    .filter((item) => item.drinks.length > 0)

  const guestItems: OrderItem[] = guests
    .map((g) => ({
      memberName: g.name,
      drinks: g.drinks.filter(Boolean),
      isGuest: true,
    }))
    .filter((item) => item.drinks.length > 0)

  return [...memberItems, ...guestItems]
}

export function aggregateDrinks(items: OrderItem[]): DrinkCount[] {
  const map = new Map<string, { count: number; names: Set<string> }>()

  for (const item of items) {
    for (const drink of item.drinks) {
      const entry = map.get(drink) ?? { count: 0, names: new Set<string>() }
      entry.count += 1
      entry.names.add(item.memberName)
      map.set(drink, entry)
    }
  }

  return [...map.entries()]
    .map(([drink, { count, names }]) => ({
      drink,
      count,
      names: [...names].sort((a, b) => a.localeCompare(b, 'ko')),
    }))
    .sort((a, b) => b.count - a.count || a.drink.localeCompare(b.drink, 'ko'))
}

export function formatOrderMessage(
  companyName: string,
  items: OrderItem[],
  aggregated: DrinkCount[],
): string {
  const total = aggregated.reduce((sum, d) => sum + d.count, 0)
  const date = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })

  const lines: string[] = [`☕ ${companyName} CUPPIN (${date})`, '']

  if (items.length === 0) {
    lines.push('참여자가 없습니다.')
    return lines.join('\n')
  }

  lines.push('[참여자별]')
  for (const item of items) {
    lines.push(formatMemberLine(item))
  }

  const notesBlock = items.filter((i) => i.aiNotes && !i.isGuest)
  if (notesBlock.length > 0) {
    lines.push('', '[AI 취향 메모]')
    for (const item of notesBlock) {
      lines.push(`• ${item.memberName}: ${item.aiNotes}`)
    }
  }

  lines.push('', '[음료별 집계]')
  for (const { drink, count, names } of aggregated) {
    lines.push(`• ${drink} ×${count} (${names.join(', ')})`)
  }

  lines.push('', `총 ${total}잔 · ${items.length}명`)
  return lines.join('\n')
}
