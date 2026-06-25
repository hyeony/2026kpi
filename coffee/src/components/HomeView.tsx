import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { OrderGuest, Profile } from '../types'
import {
  analyzeSelection,
  processAiCommand,
} from '../utils/aiShuttle'
import {
  aggregateDrinks,
  buildOrderItems,
  formatOrderMessage,
} from '../utils/order'
import { AiInsightCard } from './AiInsightCard'
import { AiShuttlePanel } from './AiShuttlePanel'
import { Avatar } from './Avatar'
import { CheckIcon, ClipboardIcon } from './Icons'
import { OrgOrderBuilder } from './OrgOrderBuilder'
import { QuickPickPanel } from './QuickPickPanel'

interface Props {
  companyName: string
  profiles: Profile[]
  meId: string | null
  selectedMemberIds: string[]
  guests: OrderGuest[]
  onApplySelection: (memberIds: string[], label?: string) => void
  onToggleMember: (profileId: string) => void
  onSelectDepartment: (department: string) => void
  onClearDepartment: (department: string) => void
  onClearAll: () => void
  onAddGuest: (name: string, drinks: string[]) => void
  onRemoveGuest: (guestId: string) => void
}

export function HomeView({
  companyName,
  profiles,
  meId,
  selectedMemberIds,
  guests,
  onApplySelection,
  onToggleMember,
  onSelectDepartment,
  onClearDepartment,
  onClearAll,
  onAddGuest,
  onRemoveGuest,
}: Props) {
  const [isThinking, setIsThinking] = useState(false)
  const [lastReply, setLastReply] = useState<string | null>(null)
  const [groupLabel, setGroupLabel] = useState<string | null>(null)
  const [insight, setInsight] = useState<string | null>(null)
  const [manualOpen, setManualOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [dockBump, setDockBump] = useState(false)

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
  const prevTotal = useRef(total)

  const selectedProfiles = useMemo(
    () =>
      selectedMemberIds
        .map((id) => profiles.find((p) => p.id === id))
        .filter((p): p is Profile => p != null),
    [profiles, selectedMemberIds],
  )

  useEffect(() => {
    if (selectedMemberIds.length === 0) {
      setInsight(null)
      return
    }
    setInsight(analyzeSelection(profiles, selectedMemberIds))
  }, [profiles, selectedMemberIds])

  useEffect(() => {
    if (prevTotal.current === total) return
    prevTotal.current = total
    if (total === 0) return
    setDockBump(true)
    const timer = window.setTimeout(() => setDockBump(false), 450)
    return () => window.clearTimeout(timer)
  }, [total])

  const handleAiSubmit = useCallback(
    async (text: string) => {
      setIsThinking(true)
      setLastReply(null)
      try {
        const result = await processAiCommand(text, profiles)
        onApplySelection(result.memberIds, result.groupLabel)
        setGroupLabel(result.groupLabel)
        setLastReply(result.reply)
        setInsight(result.insight)
      } finally {
        setIsThinking(false)
      }
    },
    [profiles, onApplySelection],
  )

  const handleQuickPick = useCallback(
    (memberIds: string[], label: string) => {
      onApplySelection(memberIds, label)
      setGroupLabel(label)
      setLastReply(`⭐ ${label} 주문 목록을 불러왔어요.`)
      setInsight(analyzeSelection(profiles, memberIds))
    },
    [onApplySelection, profiles],
  )

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

  return (
    <div className={`home-view${selectedCount > 0 ? ' home-view--has-dock' : ''}`}>
      <AiShuttlePanel
        onSubmit={handleAiSubmit}
        isThinking={isThinking}
        lastReply={lastReply}
      />

      <QuickPickPanel onApplyMemberIds={handleQuickPick} />

      {selectedCount === 0 && (
        <div className="welcome card">
          <div className="welcome__visual">
            <span className="welcome__steam" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <span className="welcome__cup" aria-hidden>
              ☕
            </span>
          </div>
          <h2>취향은 기억하고, 주문은 자동으로.</h2>
          <p>구성원별 음료 취향을 저장해 두고, 주문할 사람만 선택하면 주문 문구가 자동으로 완성돼요.</p>
          <ol className="welcome__steps">
            <li>
              <span>1</span> 주문할 사람 선택
            </li>
            <li>
              <span>2</span> 저장된 취향으로 음료 자동 채우기
            </li>
            <li>
              <span>3</span> 복사해서 전달
            </li>
          </ol>
        </div>
      )}

      {insight && selectedCount > 0 && (
        <AiInsightCard insight={insight} groupLabel={groupLabel} />
      )}

      {selectedCount > 0 && (
        <div className="selected-strip card">
          <span className="card-label">이번 주문 · {selectedCount}명</span>
          <div className="selected-strip__avatars">
            {selectedProfiles.map((p, i) => (
              <div
                key={p.id}
                className="selected-strip__person"
                title={p.name}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <Avatar name={p.name} size="sm" />
                <span>{p.name}</span>
              </div>
            ))}
            {guests.map((g, i) => (
              <div
                key={g.id}
                className="selected-strip__person"
                title={g.name}
                style={{ animationDelay: `${(selectedProfiles.length + i) * 55}ms` }}
              >
                <Avatar name={g.name} size="sm" />
                <span>{g.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="manual-section">
        <button
          type="button"
          className="manual-section__toggle"
          onClick={() => setManualOpen((v) => !v)}
          aria-expanded={manualOpen}
        >
          {manualOpen ? '직접 선택 접기' : '직접 선택하기'}
          <span className="manual-section__hint">조직도에서 고르기</span>
        </button>
        {manualOpen && (
          <OrgOrderBuilder
            profiles={profiles}
            meId={meId}
            selectedMemberIds={selectedMemberIds}
            guests={guests}
            onToggleMember={onToggleMember}
            onSelectDepartment={onSelectDepartment}
            onClearDepartment={onClearDepartment}
            onAddGuest={onAddGuest}
            onRemoveGuest={onRemoveGuest}
            embedded
          />
        )}
      </div>

      {selectedCount > 0 && (
        <div className="order-dock is-visible">
          <div className="order-dock__inner">
            <div className="order-dock__top">
              <div
                className={[
                  'order-dock__meta',
                  dockBump ? 'is-bump' : '',
                  total >= 5 ? 'is-crowded' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <strong>
                  {selectedCount}명 · {total}잔
                  {total >= 5 && (
                    <span className="order-dock__crowd-badge" aria-hidden>
                      ☕
                    </span>
                  )}
                </strong>
                {aggregated.length > 0 && (
                  <p className="order-dock__drinks">
                    {aggregated
                      .map(({ drink, count }) =>
                        count > 1 ? `${drink} ×${count}` : drink,
                      )
                      .join(' · ')}
                  </p>
                )}
              </div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={onClearAll}>
                초기화
              </button>
            </div>

            <button
              type="button"
              className="message-toggle"
              onClick={() => setShowMessage((v) => !v)}
            >
              {showMessage ? '주문 문구 접기' : '주문 문구 미리보기'}
            </button>
            {showMessage && (
              <p className="order-message order-message--dock">{orderMessage}</p>
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
        </div>
      )}
    </div>
  )
}
