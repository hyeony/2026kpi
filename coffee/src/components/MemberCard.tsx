import type { Profile } from '../types'
import { Avatar } from './Avatar'

const MAX_TAGS = 3

interface Props {
  profile: Profile
  isMe?: boolean
}

export function MemberCard({ profile, isMe }: Props) {
  const visibleTags = profile.tasteTags.slice(0, MAX_TAGS)
  const extraTags = profile.tasteTags.length - MAX_TAGS
  const hasAiNotes = profile.aiNotes.trim().length > 0
  const hasTaste = visibleTags.length > 0 || extraTags > 0
  const hasDetails =
    profile.preferredDrinks.length > 0 || hasTaste || hasAiNotes

  const tasteText = [
    ...visibleTags,
    ...(extraTags > 0 ? [`+${extraTags}`] : []),
  ].join(' · ')

  return (
    <article className="member-card-v2 card">
      <div className="member-card-v2__top">
        <Avatar name={profile.name} />
        <div className="member-card-v2__identity">
          <h3 className="member-card-v2__name">
            {profile.name}
            {isMe && <span className="me-badge me-badge--soft">나</span>}
          </h3>
          <span className="member-card-v2__dept">{profile.department}</span>
        </div>
      </div>

      {hasDetails && (
        <div className="member-card-v2__details">
          {profile.preferredDrinks.length > 0 && (
            <p className="member-card-v2__drinks">
              {profile.preferredDrinks.map((drink) => (
                <span key={drink} className="member-drink-tag">
                  <span className="member-drink-tag__icon" aria-hidden>
                    ☕
                  </span>
                  {drink}
                </span>
              ))}
            </p>
          )}

          {hasTaste && (
            <p className="member-card-v2__taste">{tasteText}</p>
          )}

          {hasAiNotes && (
            <p className="member-card-v2__ai" title={profile.aiNotes}>
              AI 메모 있음
            </p>
          )}
        </div>
      )}
    </article>
  )
}
