import type { Profile } from '../types'
import { MemberCard } from './MemberCard'

interface Props {
  companyName: string
  profiles: Profile[]
  meId: string | null
}

export function MemberManager({ companyName, profiles, meId }: Props) {
  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <h2 className="panel__title">구성원</h2>
          <p className="panel__desc">{companyName} · {profiles.length}명 · 팀원 취향 한눈에 보기</p>
        </div>
      </div>

      <ul className="member-list member-list--cards">
        {profiles.map((profile, i) => (
          <li key={profile.id} style={{ animationDelay: `${i * 30}ms` }}>
            <MemberCard profile={profile} isMe={profile.id === meId} />
          </li>
        ))}
      </ul>
    </section>
  )
}
