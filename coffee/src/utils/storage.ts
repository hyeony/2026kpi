import type { AppState, LegacyAppState, Meeting, Profile } from '../types'
import { todayString } from './date'
import { SEED_VERSION, createSeedState } from './seed'

const STORAGE_KEY = 'coffee-runner-state'
const LEGACY_KEY = 'coffee-shuttle-state'

export { todayString } from './date'

function isLegacyState(raw: unknown): raw is LegacyAppState {
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
    'meetings' in raw &&
    Array.isArray((raw as AppState).profiles)
  )
}

function migrateFromLegacy(old: LegacyAppState): AppState {
  const profileByName = new Map<string, Profile>()
  const meetings: Meeting[] = []

  for (const project of old.projects) {
    const memberIds: string[] = []

    for (const member of project.members) {
      const key = member.name.trim().toLowerCase()
      let profile = [...profileByName.values()].find((p) => p.name.toLowerCase() === key)

      if (!profile) {
        profile = {
          id: member.id,
          name: member.name.trim(),
          preferredDrinks: member.preferredDrinks.filter(Boolean).slice(0, 2),
        }
        profileByName.set(key, profile)
      }

      memberIds.push(profile.id)
    }

    const idSet = new Set(memberIds)
    meetings.push({
      id: project.id,
      name: project.name,
      memberIds,
      guests: [],
      participation: {
        date: project.participation.date,
        memberIds: project.participation.memberIds.filter((id) => idSet.has(id)),
        guestIds: [],
      },
    })
  }

  const profiles = [...profileByName.values()]

  return {
    companyName: 'H9',
    profiles,
    meId: profiles[0]?.id ?? null,
    meetings,
    activeMeetingId: old.activeProjectId,
    activeView: 'order',
  }
}

function normalizeMeeting(meeting: Meeting): Meeting {
  const today = todayString()
  const participation =
    meeting.participation.date !== today
      ? { date: today, memberIds: [] as string[], guestIds: [] as string[] }
      : meeting.participation

  return {
    ...meeting,
    participation,
    guests: meeting.guests.map((g) => ({
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
      preferredDrinks: p.preferredDrinks.filter(Boolean).slice(0, 2),
    })),
    meetings: state.meetings.map(normalizeMeeting),
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
      if (isLegacyState(parsed) && parsed.projects.length > 0) {
        const migrated = normalizeState(migrateFromLegacy(parsed))
        saveState(migrated)
        return migrated
      }
    }
  } catch {
    // fall through to seed
  }

  const seed = createSeedState()
  saveState(seed)
  return seed
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
