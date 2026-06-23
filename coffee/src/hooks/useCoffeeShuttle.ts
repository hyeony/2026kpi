import { useCallback, useEffect, useState } from 'react'
import type { AppState, Member, Project } from '../types'
import { loadState, saveState, todayString } from '../utils/storage'

function uid(): string {
  return crypto.randomUUID()
}

function freshParticipation() {
  return { date: todayString(), memberIds: [] as string[] }
}

function normalizeParticipation(p: Project['participation']) {
  if (p.date !== todayString()) return freshParticipation()
  return p
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    participation: normalizeParticipation(project.participation),
    members: project.members.map((m) => ({
      ...m,
      preferredDrinks: m.preferredDrinks.slice(0, 2),
    })),
  }
}

export function useCoffeeShuttle() {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadState()
    return {
      ...loaded,
      projects: loaded.projects.map(normalizeProject),
    }
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const activeProject = state.projects.find((p) => p.id === state.activeProjectId) ?? null

  const updateProjects = useCallback((updater: (projects: Project[]) => Project[]) => {
    setState((prev) => ({ ...prev, projects: updater(prev.projects) }))
  }, [])

  const createProject = useCallback((name: string) => {
    const project: Project = {
      id: uid(),
      name: name.trim(),
      members: [],
      participation: freshParticipation(),
    }
    setState((prev) => ({
      projects: [...prev.projects, project],
      activeProjectId: project.id,
    }))
  }, [])

  const selectProject = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeProjectId: id }))
  }, [])

  const deleteProject = useCallback((id: string) => {
    setState((prev) => {
      const projects = prev.projects.filter((p) => p.id !== id)
      const activeProjectId =
        prev.activeProjectId === id ? (projects[0]?.id ?? null) : prev.activeProjectId
      return { projects, activeProjectId }
    })
  }, [])

  const renameProject = useCallback((id: string, name: string) => {
    updateProjects((projects) =>
      projects.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)),
    )
  }, [updateProjects])

  const addMember = useCallback(
    (projectId: string, name: string, drinks: string[]) => {
      const member: Member = {
        id: uid(),
        name: name.trim(),
        preferredDrinks: drinks.filter(Boolean).slice(0, 2),
      }
      updateProjects((projects) =>
        projects.map((p) =>
          p.id === projectId ? { ...p, members: [...p.members, member] } : p,
        ),
      )
    },
    [updateProjects],
  )

  const updateMember = useCallback(
    (projectId: string, memberId: string, name: string, drinks: string[]) => {
      updateProjects((projects) =>
        projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                members: p.members.map((m) =>
                  m.id === memberId
                    ? { ...m, name: name.trim(), preferredDrinks: drinks.filter(Boolean).slice(0, 2) }
                    : m,
                ),
              }
            : p,
        ),
      )
    },
    [updateProjects],
  )

  const deleteMember = useCallback(
    (projectId: string, memberId: string) => {
      updateProjects((projects) =>
        projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                members: p.members.filter((m) => m.id !== memberId),
                participation: {
                  ...p.participation,
                  memberIds: p.participation.memberIds.filter((id) => id !== memberId),
                },
              }
            : p,
        ),
      )
    },
    [updateProjects],
  )

  const toggleParticipation = useCallback((projectId: string, memberId: string) => {
    updateProjects((projects) =>
      projects.map((p) => {
        if (p.id !== projectId) return p
        const participation = normalizeParticipation(p.participation)
        const isJoined = participation.memberIds.includes(memberId)
        return {
          ...p,
          participation: {
            ...participation,
            memberIds: isJoined
              ? participation.memberIds.filter((id) => id !== memberId)
              : [...participation.memberIds, memberId],
          },
        }
      }),
    )
  }, [updateProjects])

  const selectAllParticipation = useCallback((projectId: string) => {
    updateProjects((projects) =>
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              participation: {
                date: todayString(),
                memberIds: p.members.map((m) => m.id),
              },
            }
          : p,
      ),
    )
  }, [updateProjects])

  const clearParticipation = useCallback((projectId: string) => {
    updateProjects((projects) =>
      projects.map((p) =>
        p.id === projectId ? { ...p, participation: freshParticipation() } : p,
      ),
    )
  }, [updateProjects])

  return {
    state,
    activeProject,
    createProject,
    selectProject,
    deleteProject,
    renameProject,
    addMember,
    updateMember,
    deleteMember,
    toggleParticipation,
    selectAllParticipation,
    clearParticipation,
  }
}
