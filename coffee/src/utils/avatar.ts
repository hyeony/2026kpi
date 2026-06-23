const PALETTE = [
  '#6F4E37',
  '#8B5E3C',
  '#A0714F',
  '#C8956C',
  '#5C7A6B',
  '#7A6B8A',
  '#8A6B5C',
  '#6B7A8A',
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
