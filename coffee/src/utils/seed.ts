import type { AppState, Meeting, Profile } from '../types'
import { todayString } from './date'
import {
  GROUP_SEEDS,
  ME_PROFILE_ID,
  SEED_VERSION,
  allMemberSeeds,
  drinksForMember,
} from './seedData'

export { SEED_VERSION } from './seedData'

export function createSeedState(): AppState {
  const today = todayString()
  const seen = new Set<string>()
  const profiles: Profile[] = []

  for (const member of allMemberSeeds()) {
    if (seen.has(member.id)) continue
    seen.add(member.id)
    profiles.push({
      id: member.id,
      name: member.name,
      preferredDrinks: drinksForMember(member),
    })
  }

  const meetings: Meeting[] = GROUP_SEEDS.map((group) => {
    const memberIds = group.members.map((m) => m.id)
    const isDevelopment = group.id === 'meeting-development'

    return {
      id: group.id,
      name: group.name,
      memberIds,
      guests: [],
      participation: {
        date: today,
        memberIds: isDevelopment
          ? ['profile-jihyun', 'profile-minsu', 'profile-soyeon', 'profile-junho', 'profile-doyoon-k']
          : [],
        guestIds: [],
      },
    }
  })

  return {
    companyName: 'H9',
    meId: ME_PROFILE_ID,
    profiles,
    meetings,
    activeMeetingId: 'meeting-development',
    activeView: 'order',
    seedVersion: SEED_VERSION,
  }
}
