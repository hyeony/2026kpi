import { useCallback, useEffect, useMemo, useState } from 'react'
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
      setLastReply(`⭐ ${label} 구성을 불러왔어요.`)
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
    <div className="home-view">
      <AiShuttlePanel
        onSubmit={handleAiSubmit}
        isThinking={isThinking}
        lastReply={lastReply}
      />

      <QuickPickPanel onApplyMemberIds={handleQuickPick} />

      {insight && selectedCount > 0 && (
        <AiInsightCard insight={insight} groupLabel={groupLabel} />
      )}

      {selectedCount > 0 && (
        <div className="selected-strip card">
          <span className="card-label">선택된 그룹 · {selectedCount}명</span>
          <div className="selected-strip__avatars">
            {selectedProfiles.map((p) => (
              <div key={p.id} className="selected-strip__person" title={p.name}>
                <Avatar name={p.name} size="sm" />
                <span>{p.name}</span>
              </div>
            ))}
            {guests.map((g) => (
              <div key={g.id} className="selected-strip__person" title={g.name}>
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
          <span className="manual-section__hint">조직도에서 수정</span>
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
          <p className="order-dock__empty">AI에게 말하거나 Favorite에서 불러오세요</p>
        )}
      </div>
    </div>
  )
}
