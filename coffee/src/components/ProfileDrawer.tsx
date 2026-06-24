import { useEffect } from 'react'
import type { Profile } from '../types'
import type { ProfilePreferences } from './PreferencesPanel'
import { PreferencesPanel } from './PreferencesPanel'
import { Avatar } from './Avatar'

interface Props {
  profile: Profile | null
  onClose: () => void
  onSave: (profileId: string, data: ProfilePreferences) => void
}

export function ProfileDrawer({ profile, onClose, onSave }: Props) {
  useEffect(() => {
    if (!profile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [profile])

  if (!profile) return null

  return (
    <div className="drawer-root" role="presentation">
      <button type="button" className="drawer-backdrop" onClick={onClose} aria-label="닫기" />
      <div className="drawer-sheet" role="dialog" aria-modal="true" aria-label={`${profile.name} 취향 수정`}>
        <div className="drawer-sheet__handle" aria-hidden />
        <div className="drawer-sheet__head">
          <div className="drawer-sheet__profile">
            <span className="drawer-sheet__avatar">
              <Avatar name={profile.name} size="sm" />
            </span>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.department}</span>
            </div>
          </div>
          <button type="button" className="drawer-sheet__close" onClick={onClose}>
            닫기
          </button>
        </div>
        <div className="drawer-sheet__body">
          <PreferencesPanel
            key={profile.id}
            profile={profile}
            onSave={(data) => onSave(profile.id, data)}
          />
        </div>
      </div>
    </div>
  )
}
