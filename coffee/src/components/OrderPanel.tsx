import { useMemo, useState } from 'react'
import type { Member } from '../types'
import {
  aggregateDrinks,
  buildOrderItems,
  formatOrderMessage,
} from '../utils/order'
import { Avatar } from './Avatar'
import { CheckIcon, ClipboardIcon } from './Icons'

interface Props {
  projectName: string
  members: Member[]
  participantIds: string[]
  onToggle: (memberId: string) => void
  onSelectAll: () => void
  onClearAll: () => void
}

export function OrderPanel({
  projectName,
  members,
  participantIds,
  onToggle,
  onSelectAll,
  onClearAll,
}: Props) {
  const [copied, setCopied] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const orderItems = useMemo(
    () => buildOrderItems(members, participantIds),
    [members, participantIds],
  )
  const aggregated = useMemo(() => aggregateDrinks(orderItems), [orderItems])
  const orderMessage = useMemo(
    () => formatOrderMessage(projectName, orderItems, aggregated),
    [projectName, orderItems, aggregated],
  )
  const total = aggregated.reduce((sum, d) => sum + d.count, 0)
  const progress = members.length > 0 ? (participantIds.length / members.length) * 100 : 0

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
      <div className="section-head">
        <div>
          <h2 className="panel__title">오늘 주문</h2>
          <p className="panel__desc">{todayLabel}</p>
        </div>
        <div className="order-badge">
          <span className="order-badge__num">{total}</span>
          <span className="order-badge__label">잔</span>
        </div>
      </div>

      <div className="card card--accent">
        <div className="participation-header">
          <div>
            <span className="card-label">참여 현황</span>
            <p className="participation-count">
              <strong>{participantIds.length}</strong>
              <span> / {members.length}명</span>
            </p>
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn--ghost btn--sm" onClick={onSelectAll}>
              전체
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClearAll}>
              해제
            </button>
          </div>
        </div>

        <div className="progress-bar" aria-hidden>
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        {members.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">👥</span>
            <p>멤버를 먼저 등록해 주세요.</p>
          </div>
        ) : (
          <ul className="participation-list">
            {members.map((member) => {
              const joined = participantIds.includes(member.id)
              const hasDrinks = member.preferredDrinks.length > 0
              return (
                <li key={member.id}>
                  <button
                    type="button"
                    className={`participation-item${joined ? ' is-joined' : ''}${!hasDrinks ? ' is-disabled' : ''}`}
                    onClick={() => hasDrinks && onToggle(member.id)}
                    disabled={!hasDrinks}
                  >
                    <Avatar name={member.name} size="sm" />
                    <div className="participation-item__body">
                      <span className="participation-item__name">{member.name}</span>
                      {hasDrinks ? (
                        <span className="participation-item__drinks">
                          {member.preferredDrinks.join(' · ')}
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
          <span className="card-label">주문 리스트</span>
          {orderItems.length > 0 && (
            <span className="order-total-pill">{aggregated.length}종 · {total}잔</span>
          )}
        </div>

        {orderItems.length === 0 ? (
          <div className="empty-state empty-state--compact">
            <span className="empty-state__icon">☕</span>
            <p>참여 멤버를 선택하면<br />리스트가 자동 생성됩니다.</p>
          </div>
        ) : (
          <>
            <ul className="order-by-member">
              {orderItems.map((item) => (
                <li key={item.memberName} className="order-row">
                  <Avatar name={item.memberName} size="sm" />
                  <div>
                    <strong>{item.memberName}</strong>
                    <span>{item.drinks.join(', ')}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="aggregate-grid">
              {aggregated.map(({ drink, count }) => (
                <div key={drink} className="aggregate-chip">
                  <span className="aggregate-chip__name">{drink}</span>
                  <span className="aggregate-chip__count">×{count}</span>
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
              {showMessage ? '문구 숨기기' : '복사용 문구 보기'}
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
