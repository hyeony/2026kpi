import type { AppState, Profile } from '../types'
import { todayString } from './date'
import {
  GROUP_SEEDS,
  ME_PROFILE_ID,
  SEED_VERSION,
  allMemberSeeds,
  drinksForMember,
} from './seedData'

export { SEED_VERSION } from './seedData'

const DEPT_BY_MEMBER = new Map<string, string>()
for (const group of GROUP_SEEDS) {
  for (const member of group.members) {
    DEPT_BY_MEMBER.set(member.id, group.name)
  }
}

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
      department: DEPT_BY_MEMBER.get(member.id) ?? 'Development',
      preferredDrinks: drinksForMember(member),
    })
  }

  return {
    companyName: 'H9',
    meId: ME_PROFILE_ID,
    profiles,
    orderSelection: {
      date: today,
      memberIds: [],
      guests: [],
    },
    activeView: 'home',
    seedVersion: SEED_VERSION,
  }
}
