import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AppState, Profile, ViewId } from '../types'
import { loadState, normalizeState, saveState, todayString } from '../utils/storage'

function uid(): string {
  return crypto.randomUUID()
}

function freshOrderSelection() {
  return { date: todayString(), memberIds: [] as string[], guests: [] as AppState['orderSelection']['guests'] }
}

function normalizeSelection(selection: AppState['orderSelection']) {
  if (selection.date !== todayString()) return freshOrderSelection()
  return selection
}

export function useCoffeeShuttle() {
  const [state, setState] = useState<AppState>(() => normalizeState(loadState()))

  useEffect(() => {
    saveState(state)
  }, [state])

  const meProfile = state.profiles.find((p) => p.id === state.meId) ?? null
  const orderSelection = useMemo(
    () => normalizeSelection(state.orderSelection),
    [state.orderSelection],
  )

  const setActiveView = useCallback((view: ViewId) => {
    setState((prev) => ({ ...prev, activeView: view }))
  }, [])

  const toggleOrderMember = useCallback((profileId: string) => {
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      const isSelected = selection.memberIds.includes(profileId)
      return {
        ...prev,
        orderSelection: {
          ...selection,
          memberIds: isSelected
            ? selection.memberIds.filter((id) => id !== profileId)
            : [...selection.memberIds, profileId],
        },
      }
    })
  }, [])

  const selectDepartment = useCallback((department: string) => {
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      const deptIds = prev.profiles
        .filter((p) => p.department === department && p.preferredDrinks.length > 0)
        .map((p) => p.id)
      const merged = new Set([...selection.memberIds, ...deptIds])
      return {
        ...prev,
        orderSelection: { ...selection, memberIds: [...merged] },
      }
    })
  }, [])

  const clearDepartment = useCallback((department: string) => {
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      const deptIdSet = new Set(
        prev.profiles.filter((p) => p.department === department).map((p) => p.id),
      )
      return {
        ...prev,
        orderSelection: {
          ...selection,
          memberIds: selection.memberIds.filter((id) => !deptIdSet.has(id)),
        },
      }
    })
  }, [])

  const clearOrderSelection = useCallback(() => {
    setState((prev) => ({ ...prev, orderSelection: freshOrderSelection() }))
  }, [])

  const addGuest = useCallback((name: string, drinks: string[]) => {
    const guest = {
      id: uid(),
      name: name.trim(),
      drinks: drinks.filter(Boolean).slice(0, 2),
    }
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      return {
        ...prev,
        orderSelection: { ...selection, guests: [...selection.guests, guest] },
      }
    })
  }, [])

  const removeGuest = useCallback((guestId: string) => {
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      return {
        ...prev,
        orderSelection: {
          ...selection,
          guests: selection.guests.filter((g) => g.id !== guestId),
        },
      }
    })
  }, [])

  const addProfile = useCallback((name: string, department: string, drinks: string[]) => {
    const profile: Profile = {
      id: uid(),
      name: name.trim(),
      department: department.trim() || 'Development',
      preferredDrinks: drinks.filter(Boolean).slice(0, 2),
    }
    setState((prev) => ({ ...prev, profiles: [...prev.profiles, profile] }))
  }, [])

  const updateProfile = useCallback(
    (profileId: string, name: string, department: string, drinks: string[]) => {
      setState((prev) => ({
        ...prev,
        profiles: prev.profiles.map((p) =>
          p.id === profileId
            ? {
                ...p,
                name: name.trim(),
                department: department.trim() || p.department,
                preferredDrinks: drinks.filter(Boolean).slice(0, 2),
              }
            : p,
        ),
      }))
    },
    [],
  )

  const deleteProfile = useCallback((profileId: string) => {
    setState((prev) => {
      const selection = normalizeSelection(prev.orderSelection)
      return {
        ...prev,
        profiles: prev.profiles.filter((p) => p.id !== profileId),
        meId: prev.meId === profileId ? null : prev.meId,
        orderSelection: {
          ...selection,
          memberIds: selection.memberIds.filter((id) => id !== profileId),
        },
      }
    })
  }, [])

  const updateMyPreferences = useCallback((drinks: string[]) => {
    if (!state.meId) return
    setState((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) =>
        p.id === prev.meId
          ? { ...p, preferredDrinks: drinks.filter(Boolean).slice(0, 2) }
          : p,
      ),
    }))
  }, [state.meId])

  return {
    state,
    meProfile,
    orderSelection,
    setActiveView,
    toggleOrderMember,
    selectDepartment,
    clearDepartment,
    clearOrderSelection,
    addGuest,
    removeGuest,
    addProfile,
    updateProfile,
    deleteProfile,
    updateMyPreferences,
  }
}
