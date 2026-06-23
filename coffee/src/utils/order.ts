import type { Member } from '../types'

export interface OrderItem {
  memberName: string
  drinks: string[]
}

export interface DrinkCount {
  drink: string
  count: number
}

export function buildOrderItems(
  members: Member[],
  participantIds: string[],
): OrderItem[] {
  const participantSet = new Set(participantIds)
  return members
    .filter((m) => participantSet.has(m.id))
    .map((m) => ({
      memberName: m.name,
      drinks: m.preferredDrinks.filter(Boolean),
    }))
    .filter((item) => item.drinks.length > 0)
}

export function aggregateDrinks(items: OrderItem[]): DrinkCount[] {
  const map = new Map<string, number>()
  for (const item of items) {
    for (const drink of item.drinks) {
      map.set(drink, (map.get(drink) ?? 0) + 1)
    }
  }
  return [...map.entries()]
    .map(([drink, count]) => ({ drink, count }))
    .sort((a, b) => b.count - a.count || a.drink.localeCompare(b.drink, 'ko'))
}

export function formatOrderMessage(
  projectName: string,
  items: OrderItem[],
  aggregated: DrinkCount[],
): string {
  const total = aggregated.reduce((sum, d) => sum + d.count, 0)
  const date = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })

  const lines: string[] = [
    `☕ ${projectName} 커피 셔틀 (${date})`,
    '',
  ]

  if (items.length === 0) {
    lines.push('참여자가 없습니다.')
    return lines.join('\n')
  }

  lines.push('[참여자별]')
  for (const item of items) {
    lines.push(`• ${item.memberName}: ${item.drinks.join(', ')}`)
  }

  lines.push('', '[음료별 집계]')
  for (const { drink, count } of aggregated) {
    lines.push(`• ${drink} ×${count}`)
  }

  lines.push('', `총 ${total}잔`)
  return lines.join('\n')
}
