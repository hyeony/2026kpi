import { PreferencesPanel } from './PreferencesPanel'
import { Avatar } from './Avatar'
import type { Profile } from '../types'

interface Props {
  profile: Profile
  companyName: string
  onSave: (drinks: string[]) => void
}

export function MyPage({ profile, companyName, onSave }: Props) {
  return (
    <div className="mypage">
      <section className="mypage-hero card">
        <Avatar name={profile.name} size="lg" />
        <div>
          <h2 className="panel__title">{profile.name}</h2>
          <p className="panel__desc">
            {companyName} · {profile.department}
          </p>
          <div className="drink-tags" style={{ marginTop: '0.5rem' }}>
            {profile.preferredDrinks.map((drink) => (
              <span key={drink} className="drink-tag">
                {drink}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PreferencesPanel profile={profile} onSave={onSave} compact />
    </div>
  )
}
