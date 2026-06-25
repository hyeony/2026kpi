export const SEED_VERSION = 6
export const ME_PROFILE_ID = 'profile-jihyun'

/** 프로필별 AI 메모·취향 태그 시드 */
export const PROFILE_AI_SEED: Record<
  string,
  { aiNotes: string; tasteTags?: string[] }
> = {
  [ME_PROFILE_ID]: {
    tasteTags: ['디카페인', '산미 선호', '얼음 적게'],
    aiNotes:
      '산미 있는 아메리카노를 좋아해요. 카페인은 오후 3시 이후엔 피해요. 라떼도 좋아하지만 우유는 적게 넣어주세요.',
  },
  'profile-minsu': {
    tasteTags: ['샷 추가', 'ICE'],
    aiNotes: '아이스 아메리카노에 샷 하나 추가해 주세요. 당도 낮은 음료만 마셔요.',
  },
  'profile-soyeon': {
    tasteTags: ['오트 우유', '라떼'],
    aiNotes: '카페라떼는 오트 우유로 부탁해요. 시럽은 넣지 않아요.',
  },
  'profile-junho': {
    tasteTags: ['HOT', '진하게'],
    aiNotes: '따뜻한 아메리카노를 진하게 마셔요. 아이스는 잘 안 마십니다.',
  },
  'profile-doyoon-k': {
    tasteTags: ['디카페인'],
    aiNotes: '디카페인 아메리카노만 마셔요. 카페인 민감해서 오후 주문은 피해 주세요.',
  },
  'profile-chaerin-y': {
    tasteTags: ['저카페인', '라떼'],
    aiNotes: '바닐라 라떼 좋아해요. 휘핑은 빼 주시면 좋아요.',
  },
  'profile-seokjin-h': {
    tasteTags: ['ICE', '콜드브루'],
    aiNotes: '콜드브루 선호해요. 너무 단 음료는 싫어해요.',
  },
  'profile-kyungho-m': {
    tasteTags: ['HOT', '에스프레소'],
    aiNotes: '에스프레소나 아메리카노 HOT 위주예요. 라떼는 가끔만 마셔요.',
  },
  'profile-areum-s': {
    tasteTags: ['플랫 화이트', 'ICE'],
    aiNotes: '플랫 화이트를 자주 마셔요. 우유 거품 많은 음료 좋아해요.',
  },
  'profile-seoyeon-k': {
    tasteTags: ['저당', 'ICE'],
    aiNotes: '아이스 아메리카노 기본이에요. 시럽·당 추가는 안 해 주세요.',
  },
  'profile-junhyuk-l': {
    tasteTags: ['HOT', '라떼'],
    aiNotes: '카페라떼 HOT을 주로 마셔요. 두유 음료는 잘 안 마십니다.',
  },
  'profile-yejun-s': {
    tasteTags: ['ICE', '티'],
    aiNotes: '아이스 티나 콜드브루를 선호해요. 카페인 많은 음료는 오후에 피해요.',
  },
  'profile-narae-k': {
    tasteTags: ['라떼', 'ICE'],
    aiNotes: '바닐라 라떼 ICE 좋아해요. 디카페인 가능하면 디카페인으로 부탁해요.',
  },
  'profile-taeyoung-k': {
    tasteTags: ['HOT', '아메리카노'],
    aiNotes: '회의 전엔 아메리카노 HOT 한 잔이에요. 샷 추가는 가끔만 해요.',
  },
  'profile-sungmin-r': {
    tasteTags: ['ICE', '콜드브루'],
    aiNotes: '콜드브루나 아이스 아메리카노 위주예요. 달달한 음료는 잘 안 마셔요.',
  },
  'profile-hyunwoo-k': {
    tasteTags: ['에스프레소', 'HOT'],
    aiNotes: '에스프레소 쇼트 선호해요. 라떼류는 거의 안 마십니다.',
  },
  'profile-jieun-l': {
    tasteTags: ['라떼', '저당'],
    aiNotes: '카페라떼나 돌체 라떼를 좋아해요. 시럽은 반 펌프만 넣어 주세요.',
  },
  'profile-woojin-c': {
    tasteTags: ['ICE', '샷 추가'],
    aiNotes: '아이스 아메리카노에 샷 추가가 기본이에요. HOT은 잘 안 마셔요.',
  },
}
const DRINK_POOL = [
  '아이스 아메리카노',
  '아메리카노 HOT',
  '바닐라 라떼',
  '카페라떼 HOT',
  '카페라떼 ICE',
  '콜드브루',
  '에스프레소',
  '카라멜 마키아또',
  '녹차 라떼',
  '플랫 화이트',
  '돌체 라떼',
  '아이스 티',
] as const

interface MemberSeed {
  id: string
  name: string
  drinkIndex: number
  secondDrink?: boolean
}

interface GroupSeed {
  id: string
  name: string
  members: MemberSeed[]
}

function m(id: string, name: string, drinkIndex: number, secondDrink = false): MemberSeed {
  return { id, name, drinkIndex, secondDrink }
}

export const GROUP_SEEDS: GroupSeed[] = [
  {
    id: 'meeting-strategy',
    name: 'Strategy',
    members: [
      m('profile-seoyeon-k', '김서연', 0),
      m('profile-junhyuk-l', '이준혁', 1, true),
      m('profile-jiwon-p', '박지원', 2),
      m('profile-minjae-c', '최민재', 3),
      m('profile-haneul-j', '정하늘', 4, true),
      m('profile-sohee-h', '한소희', 5),
      m('profile-taeyang-o', '오태양', 6),
      m('profile-dain-y', '유다인', 7),
      m('profile-yerin-k', '강예린', 8),
    ],
  },
  {
    id: 'meeting-development',
    name: 'Development',
    members: [
      m(ME_PROFILE_ID, '지현', 0, true),
      m('profile-minsu', '민수', 3),
      m('profile-soyeon', '소연', 5),
      m('profile-junho', '준호', 0, true),
      m('profile-yuna', '유나', 2),
      m('profile-doyoon-k', '김도윤', 1),
      m('profile-seojun-l', '이서준', 4),
      m('profile-haeun-p', '박하은', 6),
      m('profile-woojin-c', '최우진', 7, true),
      m('profile-sua-j', '정수아', 8),
      m('profile-jihoon-h', '한지훈', 9),
      m('profile-minji-o', '오민지', 10),
    ],
  },
  {
    id: 'meeting-interaction',
    name: 'Interaction',
    members: [
      m('profile-yejun-s', '신예준', 2),
      m('profile-narae-k', '권나래', 4, true),
      m('profile-sungho-b', '배성호', 1),
      m('profile-mirae-s', '송미래', 3),
      m('profile-chaewon-i', '임채원', 5),
      m('profile-geonwoo-n', '노건우', 6),
      m('profile-byulha-m', '문별하', 7),
      m('profile-daeun-p', '표다은', 8, true),
    ],
  },
  {
    id: 'meeting-ux',
    name: 'UX',
    members: [
      m('profile-chaerin-y', '윤채린', 0),
      m('profile-seokjin-h', '홍석진', 2, true),
      m('profile-min-n', '남궁민', 4),
      m('profile-yujin-s', '서유진', 1),
      m('profile-dohyun-k', '곽도현', 3),
      m('profile-eunwoo-c', '차은우', 5),
      m('profile-jiwoo-p', '편지우', 6, true),
      m('profile-seoyeon-t', '탁서연', 7),
      m('profile-hajun-g', '길하준', 9),
    ],
  },
  {
    id: 'meeting-visual',
    name: 'Visual',
    members: [
      m('profile-kyungho-m', '민경호', 1),
      m('profile-areum-s', '설아름', 3, true),
      m('profile-siu-b', '변시우', 0),
      m('profile-yeeun-d', '도예은', 2),
      m('profile-junyoung-s', '석준영', 4),
      m('profile-sora-j', '진소라', 5),
      m('profile-minsu-c', '채민수', 6),
      m('profile-yula-h', '하율아', 8, true),
      m('profile-jeongin-p', '표정인', 10),
    ],
  },
  {
    id: 'meeting-pmo',
    name: 'PMO Group',
    members: [
      m('profile-taeyoung-k', '권태영', 1),
      m('profile-dahey-n', '남다혜', 3),
      m('profile-sungmin-r', '류성민', 0, true),
      m('profile-yuri-m', '모유리', 2),
      m('profile-jihwan-b', '백지환', 4),
      m('profile-hyun-s', '사공현', 5),
      m('profile-seoyoon-a', '안서윤', 6),
      m('profile-junseo-y', '양준서', 7),
    ],
  },
  {
    id: 'meeting-clevel',
    name: 'C level',
    members: [
      m('profile-hyunwoo-k', '김현우', 6),
      m('profile-seojun-p', '박서준', 0, true),
      m('profile-jieun-l', '이지은', 2),
      m('profile-donghun-c', '최동훈', 1),
      m('profile-mina-j', '정민아', 4),
    ],
  },
]

export function drinksForMember(member: MemberSeed): string[] {
  const primary = DRINK_POOL[member.drinkIndex % DRINK_POOL.length]
  if (!member.secondDrink) return [primary]
  const secondary = DRINK_POOL[(member.drinkIndex + 3) % DRINK_POOL.length]
  return primary === secondary ? [primary] : [primary, secondary]
}

export function allMemberSeeds(): MemberSeed[] {
  return GROUP_SEEDS.flatMap((g) => g.members)
}
