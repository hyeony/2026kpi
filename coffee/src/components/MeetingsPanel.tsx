import { useState } from 'react'
import type { Meeting, Profile } from '../types'
import { countMeetingRoster, resolveMeetingParticipants } from '../utils/meeting'
import { Avatar } from './Avatar'
import { EditIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  companyName: string
  meetings: Meeting[]
  profiles: Profile[]
  activeMeetingId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
  onAddMember: (meetingId: string, profileId: string) => void
  onRemoveMember: (meetingId: string, profileId: string) => void
  onAddGuest: (meetingId: string, name: string, drinks: string[]) => void
  onRemoveGuest: (meetingId: string, guestId: string) => void
}

export function MeetingsPanel({
  companyName,
  meetings,
  profiles,
  activeMeetingId,
  onSelect,
  onCreate,
  onDelete,
  onRename,
  onAddMember,
  onRemoveMember,
  onAddGuest,
  onRemoveGuest,
}: Props) {
  const [newName, setNewName] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(activeMeetingId)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestDrink, setGuestDrink] = useState('')

  const handleCreate = () => {
    if (!newName.trim()) return
    onCreate(newName)
    setNewName('')
  }

  const commitEdit = () => {
    if (editingId && editName.trim()) onRename(editingId, editName)
    setEditingId(null)
  }

  const handleAddGuest = (meetingId: string) => {
    if (!guestName.trim() || !guestDrink.trim()) return
    onAddGuest(meetingId, guestName, [guestDrink])
    setGuestName('')
    setGuestDrink('')
  }

  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <h2 className="panel__title">모임</h2>
          <p className="panel__desc">{companyName} · 프로젝트·웰컴티 등 주문 그룹</p>
        </div>
      </div>

      <div className="card form-card">
        <span className="card-label">새 모임</span>
        <div className="meeting-create meeting-create--inline">
          <input
            placeholder="예: AI 서비스 개발, 웰컴티 6/24"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <button type="button" className="btn btn--cta" onClick={handleCreate}>
            <PlusIcon size={16} />
          </button>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">📁</span>
          <p>모임을 만들어 주문 그룹을 관리하세요.</p>
        </div>
      ) : (
        <ul className="meeting-cards">
          {meetings.map((meeting) => {
            const expanded = expandedId === meeting.id
            const participants = resolveMeetingParticipants(meeting, profiles)
            const availableProfiles = profiles.filter((p) => !meeting.memberIds.includes(p.id))
            const todayCount = meeting.participation.memberIds.length + meeting.participation.guestIds.length

            return (
              <li key={meeting.id} className={`card meeting-card${meeting.id === activeMeetingId ? ' is-active' : ''}`}>
                {editingId === meeting.id ? (
                  <div className="inline-edit">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                      autoFocus
                    />
                    <button type="button" className="btn btn--sm btn--cta" onClick={commitEdit}>
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="meeting-card__head">
                    <button
                      type="button"
                      className="meeting-card__title"
                      onClick={() => setExpandedId(expanded ? null : meeting.id)}
                    >
                      <strong>{meeting.name}</strong>
                      <span>{countMeetingRoster(meeting)}명 · 오늘 {todayCount}명 참여</span>
                    </button>
                    <div className="meeting-card__actions">
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => onSelect(meeting.id)}
                      >
                        주문
                      </button>
                      <button type="button" className="icon-btn" onClick={() => { setEditingId(meeting.id); setEditName(meeting.name) }} title="이름 변경">
                        <EditIcon size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        onClick={() => {
                          if (confirm(`"${meeting.name}" 모임을 삭제할까요?`)) onDelete(meeting.id)
                        }}
                        title="삭제"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {expanded && (
                  <div className="meeting-roster">
                    <span className="card-label">모임 구성원</span>
                    <ul className="member-list member-list--compact">
                      {participants.map((p) => (
                        <li key={p.id} className="roster-row">
                          <Avatar name={p.name} size="sm" />
                          <div className="roster-row__info">
                            <strong>
                              {p.name}
                              {p.kind === 'guest' && <span className="guest-badge">게스트</span>}
                            </strong>
                            <span>{p.preferredDrinks.join(' · ') || '음료 미등록'}</span>
                          </div>
                          <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            onClick={() =>
                              p.kind === 'member'
                                ? onRemoveMember(meeting.id, p.id)
                                : onRemoveGuest(meeting.id, p.id)
                            }
                            title="제거"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>

                    {availableProfiles.length > 0 && (
                      <div className="roster-add">
                        <span className="field__label">구성원에서 추가</span>
                        <div className="chip-picker">
                          {availableProfiles.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              className="chip-picker__item"
                              onClick={() => onAddMember(meeting.id, p.id)}
                            >
                              <PlusIcon size={12} />
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="roster-add roster-add--guest">
                      <span className="field__label">게스트 추가 (1회)</span>
                      <div className="guest-form">
                        <input
                          placeholder="이름"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                        />
                        <input
                          placeholder="음료"
                          value={guestDrink}
                          onChange={(e) => setGuestDrink(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddGuest(meeting.id)}
                        />
                        <button type="button" className="btn btn--sm btn--cta" onClick={() => handleAddGuest(meeting.id)}>
                          추가
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
