import type { Meeting, Profile, ResolvedParticipant } from '../types'

export function resolveMeetingParticipants(
  meeting: Meeting,
  profiles: Profile[],
): ResolvedParticipant[] {
  const profileMap = new Map(profiles.map((p) => [p.id, p]))
  const members: ResolvedParticipant[] = meeting.memberIds
    .map((id) => profileMap.get(id))
    .filter((p): p is Profile => p != null)
    .map((p) => ({
      id: p.id,
      name: p.name,
      preferredDrinks: p.preferredDrinks,
      kind: 'member' as const,
    }))

  const guests: ResolvedParticipant[] = meeting.guests.map((g) => ({
    id: g.id,
    name: g.name,
    preferredDrinks: g.drinks,
    kind: 'guest' as const,
  }))

  return [...members, ...guests]
}

export function countMeetingRoster(meeting: Meeting): number {
  return meeting.memberIds.length + meeting.guests.length
}
