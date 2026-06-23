export interface Member {
  id: string;
  name: string;
  preferredDrinks: string[];
}

export interface Project {
  id: string;
  name: string;
  members: Member[];
}

export interface AppData {
  projects: Project[];
  activeProjectId: string | null;
  /** key: `${projectId}:${YYYY-MM-DD}` → participating member IDs */
  participation: Record<string, string[]>;
}

export type Tab = 'members' | 'order';
