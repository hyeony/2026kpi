import type { AppState } from '../types'

const STORAGE_KEY = 'coffee-shuttle-state'

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { projects: [], activeProjectId: null }
    return JSON.parse(raw) as AppState
  } catch {
    return { projects: [], activeProjectId: null }
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function todayString(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
