import { useState } from 'react'
import type { Meeting } from '../types'
import { countMeetingRoster } from '../utils/meeting'
import { ChevronIcon, EditIcon, FolderIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  meetings: Meeting[]
  activeMeetingId: string | null
  onSelect: (id: string) => void
  onCreate: (name: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
}

export function MeetingSelector({
  meetings,
  activeMeetingId,
  onSelect,
  onCreate,
  onDelete,
  onRename,
}: Props) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const active = meetings.find((m) => m.id === activeMeetingId)

  const handleCreate = () => {
    if (!newName.trim()) return
    onCreate(newName)
    setNewName('')
    setOpen(false)
  }

  const startEdit = (meeting: Meeting) => {
    setEditingId(meeting.id)
    setEditName(meeting.name)
  }

  const commitEdit = () => {
    if (editingId && editName.trim()) {
      onRename(editingId, editName)
    }
    setEditingId(null)
    setEditName('')
  }

  return (
    <div className="meeting-selector">
      <button
        type="button"
        className={`meeting-trigger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="meeting-trigger__icon">
          <FolderIcon size={18} />
        </span>
        <span className="meeting-trigger__text">
          <span className="meeting-trigger__label">모임</span>
          <span className="meeting-trigger__name">{active?.name ?? '모임을 선택하세요'}</span>
        </span>
        <ChevronIcon className={`meeting-trigger__chevron${open ? ' is-flipped' : ''}`} />
      </button>

      {open && (
        <>
          <div className="meeting-backdrop" onClick={() => setOpen(false)} />
          <div className="meeting-panel">
            {meetings.length === 0 ? (
              <p className="meeting-empty">아직 모임이 없어요</p>
            ) : (
              <ul className="meeting-list">
                {meetings.map((meeting) => (
                  <li key={meeting.id} className="meeting-item">
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
                      <>
                        <button
                          type="button"
                          className={`meeting-item__select${meeting.id === activeMeetingId ? ' is-active' : ''}`}
                          onClick={() => {
                            onSelect(meeting.id)
                            setOpen(false)
                          }}
                        >
                          <span className="meeting-item__name">{meeting.name}</span>
                          <span className="meeting-item__count">{countMeetingRoster(meeting)}명</span>
                        </button>
                        <div className="meeting-item__actions">
                          <button type="button" className="icon-btn" onClick={() => startEdit(meeting)} title="이름 변경">
                            <EditIcon size={15} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            onClick={() => {
                              if (confirm(`"${meeting.name}" 모임을 삭제할까요?`)) {
                                onDelete(meeting.id)
                              }
                            }}
                            title="삭제"
                          >
                            <TrashIcon size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="meeting-create">
              <input
                placeholder="새 모임 이름"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <button type="button" className="btn btn--cta" onClick={handleCreate}>
                <PlusIcon size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
