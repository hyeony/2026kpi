import type { ResolvedParticipant } from '../types'

export interface OrderItem {
  memberName: string
  drinks: string[]
  isGuest?: boolean
}

export interface DrinkCount {
  drink: string
  count: number
  names: string[]
}

export function buildOrderItems(
  participants: ResolvedParticipant[],
  participantMemberIds: string[],
  participantGuestIds: string[],
): OrderItem[] {
  const memberSet = new Set(participantMemberIds)
  const guestSet = new Set(participantGuestIds)

  return participants
    .filter((p) => (p.kind === 'member' ? memberSet.has(p.id) : guestSet.has(p.id)))
    .map((p) => ({
      memberName: p.name,
      drinks: p.preferredDrinks.filter(Boolean),
      isGuest: p.kind === 'guest',
    }))
    .filter((item) => item.drinks.length > 0)
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
  meetingName: string,
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

  const lines: string[] = [`☕ ${companyName} · ${meetingName} (${date})`, '']

  if (items.length === 0) {
    lines.push('참여자가 없습니다.')
    return lines.join('\n')
  }

  lines.push('[참여자별]')
  for (const item of items) {
    const tag = item.isGuest ? ' (게스트)' : ''
    lines.push(`• ${item.memberName}${tag}: ${item.drinks.join(', ')}`)
  }

  lines.push('', '[음료별 집계]')
  for (const { drink, count, names } of aggregated) {
    lines.push(`• ${drink} ×${count} (${names.join(', ')})`)
  }

  lines.push('', `총 ${total}잔 · ${items.length}명`)
  return lines.join('\n')
}
