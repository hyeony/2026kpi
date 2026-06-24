import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AppState, Guest, Meeting, Profile, ResolvedParticipant, ViewId } from '../types'
import { resolveMeetingParticipants } from '../utils/meeting'
import { loadState, normalizeState, saveState, todayString } from '../utils/storage'

function uid(): string {
  return crypto.randomUUID()
}

function freshParticipation() {
  return { date: todayString(), memberIds: [] as string[], guestIds: [] as string[] }
}

function normalizeParticipation(p: Meeting['participation']) {
  if (p.date !== todayString()) return freshParticipation()
  return p
}

export function useCoffeeShuttle() {
  const [state, setState] = useState<AppState>(() => normalizeState(loadState()))

  useEffect(() => {
    saveState(state)
  }, [state])

  const activeMeeting = state.meetings.find((m) => m.id === state.activeMeetingId) ?? null
  const meProfile = state.profiles.find((p) => p.id === state.meId) ?? null

  const activeParticipants = useMemo((): ResolvedParticipant[] => {
    if (!activeMeeting) return []
    return resolveMeetingParticipants(activeMeeting, state.profiles)
  }, [activeMeeting, state.profiles])

  const updateMeetings = useCallback((updater: (meetings: Meeting[]) => Meeting[]) => {
    setState((prev) => ({ ...prev, meetings: updater(prev.meetings) }))
  }, [])

  const setActiveView = useCallback((view: ViewId) => {
    setState((prev) => ({ ...prev, activeView: view }))
  }, [])

  const createMeeting = useCallback((name: string) => {
    const meeting: Meeting = {
      id: uid(),
      name: name.trim(),
      memberIds: state.meId ? [state.meId] : [],
      guests: [],
      participation: freshParticipation(),
    }
    setState((prev) => ({
      ...prev,
      meetings: [...prev.meetings, meeting],
      activeMeetingId: meeting.id,
      activeView: 'order',
    }))
  }, [state.meId])

  const selectMeeting = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeMeetingId: id, activeView: 'order' }))
  }, [])

  const deleteMeeting = useCallback((id: string) => {
    setState((prev) => {
      const meetings = prev.meetings.filter((m) => m.id !== id)
      const activeMeetingId =
        prev.activeMeetingId === id ? (meetings[0]?.id ?? null) : prev.activeMeetingId
      return { ...prev, meetings, activeMeetingId }
    })
  }, [])

  const renameMeeting = useCallback(
    (id: string, name: string) => {
      updateMeetings((meetings) =>
        meetings.map((m) => (m.id === id ? { ...m, name: name.trim() } : m)),
      )
    },
    [updateMeetings],
  )

  const addProfile = useCallback((name: string, drinks: string[]) => {
    const profile: Profile = {
      id: uid(),
      name: name.trim(),
      preferredDrinks: drinks.filter(Boolean).slice(0, 2),
    }
    setState((prev) => ({ ...prev, profiles: [...prev.profiles, profile] }))
  }, [])

  const updateProfile = useCallback((profileId: string, name: string, drinks: string[]) => {
    setState((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) =>
        p.id === profileId
          ? { ...p, name: name.trim(), preferredDrinks: drinks.filter(Boolean).slice(0, 2) }
          : p,
      ),
    }))
  }, [])

  const deleteProfile = useCallback((profileId: string) => {
    setState((prev) => ({
      ...prev,
      profiles: prev.profiles.filter((p) => p.id !== profileId),
      meId: prev.meId === profileId ? null : prev.meId,
      meetings: prev.meetings.map((m) => ({
        ...m,
        memberIds: m.memberIds.filter((id) => id !== profileId),
        participation: {
          ...normalizeParticipation(m.participation),
          memberIds: m.participation.memberIds.filter((id) => id !== profileId),
        },
      })),
    }))
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

  const addMemberToMeeting = useCallback(
    (meetingId: string, profileId: string) => {
      updateMeetings((meetings) =>
        meetings.map((m) =>
          m.id === meetingId && !m.memberIds.includes(profileId)
            ? { ...m, memberIds: [...m.memberIds, profileId] }
            : m,
        ),
      )
    },
    [updateMeetings],
  )

  const removeMemberFromMeeting = useCallback(
    (meetingId: string, profileId: string) => {
      updateMeetings((meetings) =>
        meetings.map((m) => {
          if (m.id !== meetingId) return m
          const participation = normalizeParticipation(m.participation)
          return {
            ...m,
            memberIds: m.memberIds.filter((id) => id !== profileId),
            participation: {
              ...participation,
              memberIds: participation.memberIds.filter((id) => id !== profileId),
            },
          }
        }),
      )
    },
    [updateMeetings],
  )

  const addGuestToMeeting = useCallback(
    (meetingId: string, name: string, drinks: string[]) => {
      const guest: Guest = {
        id: uid(),
        name: name.trim(),
        drinks: drinks.filter(Boolean).slice(0, 2),
      }
      updateMeetings((meetings) =>
        meetings.map((m) =>
          m.id === meetingId ? { ...m, guests: [...m.guests, guest] } : m,
        ),
      )
    },
    [updateMeetings],
  )

  const removeGuestFromMeeting = useCallback(
    (meetingId: string, guestId: string) => {
      updateMeetings((meetings) =>
        meetings.map((m) => {
          if (m.id !== meetingId) return m
          const participation = normalizeParticipation(m.participation)
          return {
            ...m,
            guests: m.guests.filter((g) => g.id !== guestId),
            participation: {
              ...participation,
              guestIds: participation.guestIds.filter((id) => id !== guestId),
            },
          }
        }),
      )
    },
    [updateMeetings],
  )

  const toggleMemberParticipation = useCallback((meetingId: string, memberId: string) => {
    updateMeetings((meetings) =>
      meetings.map((m) => {
        if (m.id !== meetingId) return m
        const participation = normalizeParticipation(m.participation)
        const isJoined = participation.memberIds.includes(memberId)
        return {
          ...m,
          participation: {
            ...participation,
            memberIds: isJoined
              ? participation.memberIds.filter((id) => id !== memberId)
              : [...participation.memberIds, memberId],
          },
        }
      }),
    )
  }, [updateMeetings])

  const toggleGuestParticipation = useCallback((meetingId: string, guestId: string) => {
    updateMeetings((meetings) =>
      meetings.map((m) => {
        if (m.id !== meetingId) return m
        const participation = normalizeParticipation(m.participation)
        const isJoined = participation.guestIds.includes(guestId)
        return {
          ...m,
          participation: {
            ...participation,
            guestIds: isJoined
              ? participation.guestIds.filter((id) => id !== guestId)
              : [...participation.guestIds, guestId],
          },
        }
      }),
    )
  }, [updateMeetings])

  const selectAllParticipation = useCallback((meetingId: string) => {
    updateMeetings((meetings) =>
      meetings.map((m) => {
        if (m.id !== meetingId) return m
        const participants = resolveMeetingParticipants(m, state.profiles)
        return {
          ...m,
          participation: {
            date: todayString(),
            memberIds: participants
              .filter((p) => p.kind === 'member' && p.preferredDrinks.length > 0)
              .map((p) => p.id),
            guestIds: participants
              .filter((p) => p.kind === 'guest' && p.preferredDrinks.length > 0)
              .map((p) => p.id),
          },
        }
      }),
    )
  }, [updateMeetings, state.profiles])

  const clearParticipation = useCallback(
    (meetingId: string) => {
      updateMeetings((meetings) =>
        meetings.map((m) => (m.id === meetingId ? { ...m, participation: freshParticipation() } : m)),
      )
    },
    [updateMeetings],
  )

  return {
    state,
    activeMeeting,
    meProfile,
    activeParticipants,
    setActiveView,
    createMeeting,
    selectMeeting,
    deleteMeeting,
    renameMeeting,
    addProfile,
    updateProfile,
    deleteProfile,
    updateMyPreferences,
    addMemberToMeeting,
    removeMemberFromMeeting,
    addGuestToMeeting,
    removeGuestFromMeeting,
    toggleMemberParticipation,
    toggleGuestParticipation,
    selectAllParticipation,
    clearParticipation,
  }
}
