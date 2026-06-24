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
      tasteTags: [],
      aiNotes: '',
    })
  }

  const profilesWithMe = profiles.map((p) =>
    p.id === ME_PROFILE_ID
      ? {
          ...p,
          tasteTags: ['디카페인', '산미 선호', '얼음 적게'],
          aiNotes:
            '산미 있는 아메리카노를 좋아해요. 디카페인만 마시고, 카페인은 오후 3시 이후엔 피해요. 라떼도 좋아하지만 우유는 적게 넣어주세요.',
        }
      : p,
  )

  return {
    companyName: 'H9',
    meId: ME_PROFILE_ID,
    profiles: profilesWithMe,
    orderSelection: {
      date: today,
      memberIds: [],
      guests: [],
    },
    activeView: 'home',
    seedVersion: SEED_VERSION,
  }
}
