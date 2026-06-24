import { useMemo, useState } from 'react'
import type { OrderGuest, Profile } from '../types'
import { groupProfilesByDepartment } from '../utils/org'
import {
  aggregateDrinks,
  buildOrderItems,
  formatOrderMessage,
} from '../utils/order'
import { Avatar } from './Avatar'
import { CheckIcon, ChevronIcon, ClipboardIcon, PlusIcon, TrashIcon } from './Icons'

interface Props {
  companyName: string
  profiles: Profile[]
  meId: string | null
  selectedMemberIds: string[]
  guests: OrderGuest[]
  onToggleMember: (profileId: string) => void
  onSelectDepartment: (department: string) => void
  onClearDepartment: (department: string) => void
  onClearAll: () => void
  onAddGuest: (name: string, drinks: string[]) => void
  onRemoveGuest: (guestId: string) => void
}

export function OrgOrderBuilder({
  companyName,
  profiles,
  meId,
  selectedMemberIds,
  guests,
  onToggleMember,
  onSelectDepartment,
  onClearDepartment,
  onClearAll,
  onAddGuest,
  onRemoveGuest,
}: Props) {
  const [openDepts, setOpenDepts] = useState<Set<string>>(() => new Set(['Development']))
  const [copied, setCopied] = useState(false)
  const [guestOpen, setGuestOpen] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestDrink, setGuestDrink] = useState('')

  const departments = useMemo(() => groupProfilesByDepartment(profiles), [profiles])
  const selectedSet = useMemo(() => new Set(selectedMemberIds), [selectedMemberIds])

  const orderItems = useMemo(
    () => buildOrderItems(profiles, guests, selectedMemberIds),
    [profiles, guests, selectedMemberIds],
  )
  const aggregated = useMemo(() => aggregateDrinks(orderItems), [orderItems])
  const orderMessage = useMemo(
    () => formatOrderMessage(companyName, orderItems, aggregated),
    [companyName, orderItems, aggregated],
  )
  const total = aggregated.reduce((sum, d) => sum + d.count, 0)
  const selectedCount = selectedMemberIds.length + guests.length

  const toggleDept = (department: string) => {
    setOpenDepts((prev) => {
      const next = new Set(prev)
      if (next.has(department)) next.delete(department)
      else next.add(department)
      return next
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = orderMessage
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleAddGuest = () => {
    if (!guestName.trim() || !guestDrink.trim()) return
    onAddGuest(guestName, [guestDrink])
    setGuestName('')
    setGuestDrink('')
    setGuestOpen(false)
  }

  return (
    <div className="org-order">
      <div className="org-order__intro">
        <h2 className="panel__title">누구랑 시킬까요?</h2>
        <p className="panel__desc">팀 조직도에서 선택하면 주문 그룹이 만들어져요</p>
      </div>

      <div className="org-tree">
        {departments.map(({ department, members }) => {
          const open = openDepts.has(department)
          const selectedInDept = members.filter((m) => selectedSet.has(m.id)).length
          const allSelected = selectedInDept === members.length && members.length > 0

          return (
            <section key={department} className="org-dept">
              <button
                type="button"
                className={`org-dept__head${open ? ' is-open' : ''}`}
                onClick={() => toggleDept(department)}
              >
                <span className="org-dept__title">
                  <strong>{department}</strong>
                  <span className="org-dept__meta">
                    {selectedInDept > 0 ? `${selectedInDept}명 선택` : `${members.length}명`}
                  </span>
                </span>
                <ChevronIcon className={`org-dept__chevron${open ? ' is-flipped' : ''}`} />
              </button>

              {open && (
                <div className="org-dept__body">
                  <div className="org-dept__actions">
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() =>
                        allSelected ? onClearDepartment(department) : onSelectDepartment(department)
                      }
                    >
                      {allSelected ? '팀 해제' : '팀 전체'}
                    </button>
                  </div>
                  <ul className="org-member-list">
                    {members.map((member) => {
                      const selected = selectedSet.has(member.id)
                      const hasDrinks = member.preferredDrinks.length > 0
                      return (
                        <li key={member.id}>
                          <button
                            type="button"
                            className={`org-member${selected ? ' is-selected' : ''}${!hasDrinks ? ' is-disabled' : ''}`}
                            onClick={() => hasDrinks && onToggleMember(member.id)}
                            disabled={!hasDrinks}
                          >
                            <Avatar name={member.name} size="sm" />
                            <div className="org-member__info">
                              <span className="org-member__name">
                                {member.name}
                                {member.id === meId && <span className="me-badge">나</span>}
                              </span>
                              <span className="org-member__drink">
                                {hasDrinks
                                  ? member.preferredDrinks.join(' · ')
                                  : '음료 미등록'}
                              </span>
                            </div>
                            <span className={`check-circle${selected ? ' is-checked' : ''}`}>
                              {selected && <CheckIcon size={14} />}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </section>
          )
        })}
      </div>

      {guests.length > 0 && (
        <div className="card guest-list-card">
          <span className="card-label">게스트</span>
          <ul className="guest-list">
            {guests.map((guest) => (
              <li key={guest.id} className="guest-list__item">
                <div>
                  <strong>{guest.name}</strong>
                  <span>{guest.drinks.join(', ')}</span>
                </div>
                <button
                  type="button"
                  className="icon-btn icon-btn--danger"
                  onClick={() => onRemoveGuest(guest.id)}
                  title="제거"
                >
                  <TrashIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!guestOpen ? (
        <button type="button" className="guest-add-trigger" onClick={() => setGuestOpen(true)}>
          <PlusIcon size={14} />
          게스트 추가 (1회)
        </button>
      ) : (
        <div className="card guest-form-card">
          <span className="card-label">게스트</span>
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
              onKeyDown={(e) => e.key === 'Enter' && handleAddGuest()}
            />
            <button type="button" className="btn btn--sm btn--cta" onClick={handleAddGuest}>
              추가
            </button>
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => setGuestOpen(false)}>
              취소
            </button>
          </div>
        </div>
      )}

      <div className={`order-dock${selectedCount > 0 ? ' is-visible' : ''}`}>
        {selectedCount > 0 ? (
          <>
            <div className="order-dock__summary">
              <div className="order-dock__head">
                <strong>{selectedCount}명 · {total}잔</strong>
                <button type="button" className="btn btn--ghost btn--sm" onClick={onClearAll}>
                  초기화
                </button>
              </div>
              {aggregated.length > 0 && (
                <div className="order-dock__drinks">
                  {aggregated.map(({ drink, count }) => (
                    <span key={drink} className="dock-chip">
                      {drink} ×{count}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className={`btn btn--cta btn--block${copied ? ' is-success' : ''}`}
              onClick={handleCopy}
              disabled={orderItems.length === 0}
            >
              {copied ? (
                <>
                  <CheckIcon size={18} />
                  복사 완료!
                </>
              ) : (
                <>
                  <ClipboardIcon size={18} />
                  주문 문구 복사
                </>
              )}
            </button>
          </>
        ) : (
          <p className="order-dock__empty">팀에서 사람을 선택해 주세요</p>
        )}
      </div>
    </div>
  )
}
