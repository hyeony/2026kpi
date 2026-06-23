import { useState } from 'react'
import type { Member } from '../types'
import { Avatar } from './Avatar'
import { EditIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  members: Member[]
  onAdd: (name: string, drinks: string[]) => void
  onUpdate: (memberId: string, name: string, drinks: string[]) => void
  onDelete: (memberId: string) => void
}

function DrinkInputs({
  drinks,
  onChange,
}: {
  drinks: string[]
  onChange: (drinks: string[]) => void
}) {
  const d0 = drinks[0] ?? ''
  const d1 = drinks[1] ?? ''

  return (
    <div className="drink-inputs">
      <label className="field">
        <span className="field__label">선호 음료 1</span>
        <input
          placeholder="예: 아메리카노 ICE"
          value={d0}
          onChange={(e) => onChange([e.target.value, d1])}
        />
      </label>
      <label className="field">
        <span className="field__label">선호 음료 2 <em>(선택)</em></span>
        <input
          placeholder="예: 카페라떼 HOT"
          value={d1}
          onChange={(e) => onChange([d0, e.target.value])}
        />
      </label>
    </div>
  )
}

export function MemberManager({ members, onAdd, onUpdate, onDelete }: Props) {
  const [name, setName] = useState('')
  const [drinks, setDrinks] = useState(['', ''])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDrinks, setEditDrinks] = useState(['', ''])
  const [formOpen, setFormOpen] = useState(members.length === 0)

  const resetForm = () => {
    setName('')
    setDrinks(['', ''])
  }

  const handleAdd = () => {
    if (!name.trim() || !drinks[0]?.trim()) return
    onAdd(name, drinks)
    resetForm()
    if (members.length > 0) setFormOpen(false)
  }

  const startEdit = (member: Member) => {
    setEditingId(member.id)
    setEditName(member.name)
    setEditDrinks([member.preferredDrinks[0] ?? '', member.preferredDrinks[1] ?? ''])
  }

  const commitEdit = () => {
    if (!editingId || !editName.trim() || !editDrinks[0]?.trim()) return
    onUpdate(editingId, editName, editDrinks)
    setEditingId(null)
  }

  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <h2 className="panel__title">멤버</h2>
          <p className="panel__desc">선호 음료 최대 2개 · 총 {members.length}명</p>
        </div>
        {members.length > 0 && (
          <button
            type="button"
            className="btn btn--icon-round"
            onClick={() => setFormOpen((v) => !v)}
            aria-label="멤버 추가"
          >
            <PlusIcon />
          </button>
        )}
      </div>

      {(formOpen || members.length === 0) && (
        <div className="card form-card">
          <span className="card-label">새 멤버</span>
          <label className="field">
            <span className="field__label">이름</span>
            <input
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </label>
          <DrinkInputs drinks={drinks} onChange={setDrinks} />
          <button type="button" className="btn btn--cta btn--block" onClick={handleAdd}>
            <PlusIcon size={16} />
            멤버 추가
          </button>
        </div>
      )}

      {members.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🧑‍🤝‍🧑</span>
          <p>첫 멤버를 등록해 보세요.</p>
          <p className="empty-state__sub">이름과 선호 음료를 입력하면 바로 추가됩니다.</p>
        </div>
      ) : (
        <ul className="member-list">
          {members.map((member, i) => (
            <li
              key={member.id}
              className="card member-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {editingId === member.id ? (
                <div className="member-edit">
                  <label className="field">
                    <span className="field__label">이름</span>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="이름"
                    />
                  </label>
                  <DrinkInputs drinks={editDrinks} onChange={setEditDrinks} />
                  <div className="btn-row">
                    <button type="button" className="btn btn--cta" onClick={commitEdit}>
                      저장
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => setEditingId(null)}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Avatar name={member.name} />
                  <div className="member-card__info">
                    <strong>{member.name}</strong>
                    <div className="drink-tags">
                      {member.preferredDrinks.map((drink) => (
                        <span key={drink} className="drink-tag">
                          {drink}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="member-card__actions">
                    <button type="button" className="icon-btn" onClick={() => startEdit(member)} title="수정">
                      <EditIcon size={16} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      onClick={() => {
                        if (confirm(`${member.name} 멤버를 삭제할까요?`)) {
                          onDelete(member.id)
                        }
                      }}
                      title="삭제"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
