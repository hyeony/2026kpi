import { useMemo, useState } from 'react'
import type { ResolvedParticipant } from '../types'
import {
  aggregateDrinks,
  buildOrderItems,
  formatOrderMessage,
} from '../utils/order'
import { Avatar } from './Avatar'
import { CheckIcon, ClipboardIcon } from './Icons'

interface Props {
  meetingName: string
  companyName: string
  participants: ResolvedParticipant[]
  participantMemberIds: string[]
  participantGuestIds: string[]
  onToggleMember: (memberId: string) => void
  onToggleGuest: (guestId: string) => void
  onSelectAll: () => void
  onClearAll: () => void
}

export function OrderPanel({
  meetingName,
  companyName,
  participants,
  participantMemberIds,
  participantGuestIds,
  onToggleMember,
  onToggleGuest,
  onSelectAll,
  onClearAll,
}: Props) {
  const [copied, setCopied] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const orderItems = useMemo(
    () => buildOrderItems(participants, participantMemberIds, participantGuestIds),
    [participants, participantMemberIds, participantGuestIds],
  )
  const aggregated = useMemo(() => aggregateDrinks(orderItems), [orderItems])
  const orderMessage = useMemo(
    () => formatOrderMessage(meetingName, companyName, orderItems, aggregated),
    [meetingName, companyName, orderItems, aggregated],
  )
  const total = aggregated.reduce((sum, d) => sum + d.count, 0)
  const joinedCount = participantMemberIds.length + participantGuestIds.length

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

  const todayLabel = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return (
    <section className="panel">
      <div className="section-head section-head--compact">
        <div>
          <h2 className="panel__title">오늘 주문</h2>
          <p className="panel__desc">{todayLabel}</p>
        </div>
      </div>

      <div className="card">
        <div className="participation-toolbar">
          <span className="participation-toolbar__label">
            참여자 선택
            {joinedCount > 0 && (
              <span className="participation-toolbar__count">{joinedCount}명</span>
            )}
          </span>
          <div className="btn-row">
            <button type="button" className="btn btn--ghost btn--sm" onClick={onSelectAll}>
              전체
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClearAll}>
              해제
            </button>
          </div>
        </div>

        {participants.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">👥</span>
            <p>모임에 구성원을 추가해 주세요.</p>
            <p className="empty-state__sub">모임 탭에서 구성원·게스트를 관리할 수 있어요.</p>
          </div>
        ) : (
          <ul className="participation-list">
            {participants.map((participant) => {
              const joined =
                participant.kind === 'member'
                  ? participantMemberIds.includes(participant.id)
                  : participantGuestIds.includes(participant.id)
              const hasDrinks = participant.preferredDrinks.length > 0

              return (
                <li key={participant.id}>
                  <button
                    type="button"
                    className={`participation-item${joined ? ' is-joined' : ''}${!hasDrinks ? ' is-disabled' : ''}`}
                    onClick={() => {
                      if (!hasDrinks) return
                      if (participant.kind === 'member') onToggleMember(participant.id)
                      else onToggleGuest(participant.id)
                    }}
                    disabled={!hasDrinks}
                  >
                    <Avatar name={participant.name} size="sm" />
                    <div className="participation-item__body">
                      <span className="participation-item__name">
                        {participant.name}
                        {participant.kind === 'guest' && (
                          <span className="guest-badge">게스트</span>
                        )}
                      </span>
                      {hasDrinks ? (
                        <span className="participation-item__drinks">
                          {participant.preferredDrinks.join(' · ')}
                        </span>
                      ) : (
                        <span className="participation-item__warn">선호 음료 미등록</span>
                      )}
                    </div>
                    <span className={`check-circle${joined ? ' is-checked' : ''}`}>
                      {joined && <CheckIcon size={14} />}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="card order-preview">
        <div className="order-preview__header">
          <span className="card-label">주문 요약</span>
          {orderItems.length > 0 && (
            <span className="order-total-pill">{total}잔</span>
          )}
        </div>

        {orderItems.length === 0 ? (
          <div className="empty-state empty-state--compact">
            <span className="empty-state__icon">☕</span>
            <p>참여자를 선택하면<br />리스트가 자동 생성됩니다.</p>
          </div>
        ) : (
          <>
            <ul className="order-by-member">
              {orderItems.map((item) => (
                <li key={item.memberName} className="order-row">
                  <Avatar name={item.memberName} size="sm" />
                  <div>
                    <strong>
                      {item.memberName}
                      {item.isGuest && <span className="guest-badge">게스트</span>}
                    </strong>
                    <span>{item.drinks.join(', ')}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="aggregate-grid">
              {aggregated.map(({ drink, count, names }) => (
                <div key={drink} className="aggregate-chip">
                  <span className="aggregate-chip__name">{drink}</span>
                  <span className="aggregate-chip__count">×{count}</span>
                  <span className="aggregate-chip__names">{names.join(', ')}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {orderItems.length > 0 && (
          <>
            <button
              type="button"
              className="message-toggle"
              onClick={() => setShowMessage((v) => !v)}
            >
              {showMessage ? '문구 숨기기' : '매장용 문구 보기'}
            </button>
            {showMessage && <pre className="order-message">{orderMessage}</pre>}
          </>
        )}

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
      </div>
    </section>
  )
}
