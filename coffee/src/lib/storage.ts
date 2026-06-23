import type { AppData } from '../types';

const STORAGE_KEY = 'coffee-shuttle-data';

export const defaultData = (): AppData => ({
  projects: [],
  activeProjectId: null,
  participation: {},
});

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw) as AppData;
    return {
      projects: parsed.projects ?? [],
      activeProjectId: parsed.activeProjectId ?? null,
      participation: parsed.participation ?? {},
    };
  } catch {
    return defaultData();
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function participationKey(projectId: string, date = todayKey()): string {
  return `${projectId}:${date}`;
}
