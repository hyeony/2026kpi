export interface Profile {
  id: string
  name: string
  preferredDrinks: string[]
}

export interface Guest {
  id: string
  name: string
  drinks: string[]
}

export interface Participation {
  date: string
  memberIds: string[]
  guestIds: string[]
}

export interface Meeting {
  id: string
  name: string
  memberIds: string[]
  guests: Guest[]
  participation: Participation
}

export interface AppState {
  companyName: string
  profiles: Profile[]
  meId: string | null
  meetings: Meeting[]
  activeMeetingId: string | null
  activeView: ViewId
  seedVersion?: number
}

export type ViewId = 'order' | 'meetings' | 'members' | 'preferences'

export interface ResolvedParticipant {
  id: string
  name: string
  preferredDrinks: string[]
  kind: 'member' | 'guest'
}

/** @deprecated v1 schema — used only for migration */
export interface LegacyMember {
  id: string
  name: string
  preferredDrinks: string[]
}

/** @deprecated v1 schema — used only for migration */
export interface LegacyProject {
  id: string
  name: string
  members: LegacyMember[]
  participation: { date: string; memberIds: string[] }
}

/** @deprecated v1 schema — used only for migration */
export interface LegacyAppState {
  projects: LegacyProject[]
  activeProjectId: string | null
}
