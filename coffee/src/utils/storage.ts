import type { AppState, LegacyAppState } from '../types'
import { todayString } from './date'
import { SEED_VERSION, createSeedState } from './seed'

const STORAGE_KEY = 'coffee-runner-state'
const LEGACY_KEY = 'coffee-shuttle-state'

export { todayString } from './date'

function isLegacyV1(raw: unknown): raw is LegacyAppState {
  return (
    typeof raw === 'object' &&
    raw !== null &&
    'projects' in raw &&
    Array.isArray((raw as LegacyAppState).projects)
  )
}

function isAppState(raw: unknown): raw is AppState {
  return (
    typeof raw === 'object' &&
    raw !== null &&
    'profiles' in raw &&
    'orderSelection' in raw &&
    Array.isArray((raw as AppState).profiles)
  )
}

function freshOrderSelection() {
  return { date: todayString(), memberIds: [] as string[], guests: [] as AppState['orderSelection']['guests'] }
}

function normalizeOrderSelection(selection: AppState['orderSelection']): AppState['orderSelection'] {
  if (selection.date !== todayString()) return freshOrderSelection()
  return {
    ...selection,
    guests: selection.guests.map((g) => ({
      ...g,
      drinks: g.drinks.filter(Boolean).slice(0, 2),
    })),
  }
}

export function normalizeState(state: AppState): AppState {
  return {
    ...state,
    profiles: state.profiles.map((p) => ({
      ...p,
      department: p.department || 'Development',
      preferredDrinks: p.preferredDrinks.filter(Boolean).slice(0, 2),
    })),
    orderSelection: normalizeOrderSelection(state.orderSelection),
  }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (isAppState(parsed)) {
        if ((parsed.seedVersion ?? 0) < SEED_VERSION) {
          const seed = createSeedState()
          saveState(seed)
          return seed
        }
        return normalizeState(parsed)
      }
    }

    const legacyRaw = localStorage.getItem(LEGACY_KEY)
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw) as unknown
      if (isLegacyV1(parsed) && parsed.projects.length > 0) {
        const seed = createSeedState()
        saveState(seed)
        return seed
      }
    }
  } catch {
    // fall through
  }

  const seed = createSeedState()
  saveState(seed)
  return seed
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
