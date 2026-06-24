export interface Profile {
  id: string
  name: string
  department: string
  preferredDrinks: string[]
}

export interface OrderGuest {
  id: string
  name: string
  drinks: string[]
}

export interface OrderSelection {
  date: string
  memberIds: string[]
  guests: OrderGuest[]
}

export interface AppState {
  companyName: string
  profiles: Profile[]
  meId: string | null
  orderSelection: OrderSelection
  activeView: ViewId
  seedVersion?: number
}

export type ViewId = 'home' | 'members' | 'mypage'

export interface DepartmentGroup {
  department: string
  members: Profile[]
}

/** @deprecated v1 schema — used only for migration */
export interface LegacyMember {
  id: string
  name: string
  preferredDrinks: string[]
}

/** @deprecated v2 schema — used only for migration */
export interface LegacyProfile {
  id: string
  name: string
  preferredDrinks: string[]
}

/** @deprecated v2 schema */
export interface LegacyMeeting {
  id: string
  name: string
  memberIds: string[]
  guests: { id: string; name: string; drinks: string[] }[]
  participation: { date: string; memberIds: string[]; guestIds: string[] }
}

/** @deprecated v1 schema */
export interface LegacyProject {
  id: string
  name: string
  members: LegacyMember[]
  participation: { date: string; memberIds: string[] }
}

/** @deprecated v2 schema */
export interface LegacyAppStateV2 {
  companyName: string
  profiles: LegacyProfile[]
  meId: string | null
  meetings: LegacyMeeting[]
  activeMeetingId: string | null
  activeView: string
  seedVersion?: number
}

/** @deprecated v1 schema */
export interface LegacyAppState {
  projects: LegacyProject[]
  activeProjectId: string | null
}
