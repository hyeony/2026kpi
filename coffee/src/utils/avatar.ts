const PALETTE = [
  '#6366F1',
  '#8B5CF6',
  '#0EA5E9',
  '#14B8A6',
  '#64748B',
  '#EC4899',
  '#F59E0B',
  '#10B981',
]

export function memberInitial(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  return trimmed.charAt(0).toUpperCase()
}

export function memberColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}
