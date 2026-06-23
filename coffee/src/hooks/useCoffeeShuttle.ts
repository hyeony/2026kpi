import { useCallback, useEffect, useState } from 'react';
import {
  defaultData,
  loadData,
  participationKey,
  saveData,
  todayKey,
} from '../lib/storage';
import type { AppData, Member, Project } from '../types';

function uid(): string {
  return crypto.randomUUID();
}

export function useCoffeeShuttle() {
  const [data, setData] = useState<AppData>(defaultData);

  useEffect(() => {
    setData(loadData());
  }, []);

  const persist = useCallback((next: AppData) => {
    setData(next);
    saveData(next);
  }, []);

  const activeProject =
    data.projects.find((p) => p.id === data.activeProjectId) ?? null;

  const todayParticipation =
    activeProject
      ? (data.participation[participationKey(activeProject.id)] ?? [])
      : [];

  const addProject = (name: string) => {
    const project: Project = { id: uid(), name: name.trim(), members: [] };
    persist({
      ...data,
      projects: [...data.projects, project],
      activeProjectId: project.id,
    });
  };

  const deleteProject = (projectId: string) => {
    const projects = data.projects.filter((p) => p.id !== projectId);
    const participation = { ...data.participation };
    for (const key of Object.keys(participation)) {
      if (key.startsWith(`${projectId}:`)) delete participation[key];
    }
    persist({
      ...data,
      projects,
      activeProjectId:
        data.activeProjectId === projectId
          ? (projects[0]?.id ?? null)
          : data.activeProjectId,
      participation,
    });
  };

  const setActiveProject = (projectId: string) => {
    persist({ ...data, activeProjectId: projectId });
  };

  const updateProjectName = (projectId: string, name: string) => {
    persist({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId ? { ...p, name: name.trim() } : p,
      ),
    });
  };

  const addMember = (name: string, drinks: string[]) => {
    if (!activeProject) return;
    const member: Member = {
      id: uid(),
      name: name.trim(),
      preferredDrinks: drinks.slice(0, 2),
    };
    persist({
      ...data,
      projects: data.projects.map((p) =>
        p.id === activeProject.id
          ? { ...p, members: [...p.members, member] }
          : p,
      ),
    });
  };

  const updateMember = (
    memberId: string,
    name: string,
    drinks: string[],
  ) => {
    if (!activeProject) return;
    persist({
      ...data,
      projects: data.projects.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              members: p.members.map((m) =>
                m.id === memberId
                  ? { ...m, name: name.trim(), preferredDrinks: drinks.slice(0, 2) }
                  : m,
              ),
            }
          : p,
      ),
    });
  };

  const deleteMember = (memberId: string) => {
    if (!activeProject) return;
    const key = participationKey(activeProject.id);
    persist({
      ...data,
      projects: data.projects.map((p) =>
        p.id === activeProject.id
          ? { ...p, members: p.members.filter((m) => m.id !== memberId) }
          : p,
      ),
      participation: {
        ...data.participation,
        [key]: (data.participation[key] ?? []).filter((id) => id !== memberId),
      },
    });
  };

  const toggleParticipation = (memberId: string) => {
    if (!activeProject) return;
    const key = participationKey(activeProject.id);
    const current = data.participation[key] ?? [];
    const next = current.includes(memberId)
      ? current.filter((id) => id !== memberId)
      : [...current, memberId];
    persist({
      ...data,
      participation: { ...data.participation, [key]: next },
    });
  };

  const selectAllParticipation = () => {
    if (!activeProject) return;
    const key = participationKey(activeProject.id);
    persist({
      ...data,
      participation: {
        ...data.participation,
        [key]: activeProject.members.map((m) => m.id),
      },
    });
  };

  const clearParticipation = () => {
    if (!activeProject) return;
    const key = participationKey(activeProject.id);
    persist({
      ...data,
      participation: { ...data.participation, [key]: [] },
    });
  };

  return {
    data,
    activeProject,
    todayDate: todayKey(),
    todayParticipation,
    addProject,
    deleteProject,
    setActiveProject,
    updateProjectName,
    addMember,
    updateMember,
    deleteMember,
    toggleParticipation,
    selectAllParticipation,
    clearParticipation,
  };
}
