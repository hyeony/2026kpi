import { useState } from 'react'
import type { Profile } from '../types'
import { Avatar } from './Avatar'
import { EditIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  companyName: string
  profiles: Profile[]
  meId: string | null
  onAdd: (name: string, drinks: string[]) => void
  onUpdate: (profileId: string, name: string, drinks: string[]) => void
  onDelete: (profileId: string) => void
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

export function MemberManager({ companyName, profiles, meId, onAdd, onUpdate, onDelete }: Props) {
  const [name, setName] = useState('')
  const [drinks, setDrinks] = useState(['', ''])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDrinks, setEditDrinks] = useState(['', ''])
  const [formOpen, setFormOpen] = useState(profiles.length === 0)

  const resetForm = () => {
    setName('')
    setDrinks(['', ''])
  }

  const handleAdd = () => {
    if (!name.trim() || !drinks[0]?.trim()) return
    onAdd(name, drinks)
    resetForm()
    if (profiles.length > 0) setFormOpen(false)
  }

  const startEdit = (profile: Profile) => {
    setEditingId(profile.id)
    setEditName(profile.name)
    setEditDrinks([profile.preferredDrinks[0] ?? '', profile.preferredDrinks[1] ?? ''])
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
          <h2 className="panel__title">멤버 관리</h2>
          <p className="panel__desc">{companyName} 구성원 · 선호 음료 최대 2개 · 총 {profiles.length}명</p>
        </div>
        {profiles.length > 0 && (
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

      {(formOpen || profiles.length === 0) && (
        <div className="card form-card">
          <span className="card-label">새 구성원</span>
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
            구성원 추가
          </button>
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🧑‍🤝‍🧑</span>
          <p>첫 구성원을 등록해 보세요.</p>
          <p className="empty-state__sub">회사 전체 디렉토리에 등록되며, 모임에 추가해 주문할 수 있어요.</p>
        </div>
      ) : (
        <ul className="member-list">
          {profiles.map((profile, i) => (
            <li
              key={profile.id}
              className="card member-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {editingId === profile.id ? (
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
                  <Avatar name={profile.name} />
                  <div className="member-card__info">
                    <strong>
                      {profile.name}
                      {profile.id === meId && <span className="me-badge">나</span>}
                    </strong>
                    <div className="drink-tags">
                      {profile.preferredDrinks.map((drink) => (
                        <span key={drink} className="drink-tag">
                          {drink}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="member-card__actions">
                    <button type="button" className="icon-btn" onClick={() => startEdit(profile)} title="수정">
                      <EditIcon size={16} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      onClick={() => {
                        if (profile.id === meId) {
                          alert('내 프로필은 삭제할 수 없어요. 취향 탭에서 수정하세요.')
                          return
                        }
                        if (confirm(`${profile.name} 구성원을 삭제할까요?`)) {
                          onDelete(profile.id)
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
