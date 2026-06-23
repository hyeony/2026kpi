export interface Member {
  id: string
  name: string
  preferredDrinks: string[]
}

export interface Participation {
  date: string
  memberIds: string[]
}

export interface Project {
  id: string
  name: string
  members: Member[]
  participation: Participation
}

export interface AppState {
  projects: Project[]
  activeProjectId: string | null
}

export type TabId = 'members' | 'order'
