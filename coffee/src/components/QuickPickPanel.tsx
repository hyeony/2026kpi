import { useState } from 'react'
import type { FavoriteGroup, HistorySnapshot } from '../utils/aiShuttle'
import { ORDER_HISTORY, FAVORITE_GROUPS } from '../utils/aiShuttle'

type Tab = 'favorite' | 'history'
type HistoryPeriod = HistorySnapshot['period']

interface Props {
  onApplyMemberIds: (memberIds: string[], label: string) => void
}

export function QuickPickPanel({ onApplyMemberIds }: Props) {
  const [tab, setTab] = useState<Tab>('favorite')
  const [historyPeriod, setHistoryPeriod] = useState<HistoryPeriod>('today')

  const activeHistory = ORDER_HISTORY.find((h) => h.period === historyPeriod) ?? ORDER_HISTORY[0]

  return (
    <section className="quick-pick">
      <div className="quick-pick__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'favorite'}
          className={`quick-pick__tab${tab === 'favorite' ? ' is-active' : ''}`}
          onClick={() => setTab('favorite')}
        >
          ⭐ Favorite Group
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'history'}
          className={`quick-pick__tab${tab === 'history' ? ' is-active' : ''}`}
          onClick={() => setTab('history')}
        >
          History
        </button>
      </div>

      {tab === 'favorite' ? (
        <ul className="quick-pick__list">
          {FAVORITE_GROUPS.map((group) => (
            <li key={group.id}>
              <FavoriteRow
                group={group}
                onSelect={() => onApplyMemberIds(group.memberIds, group.name)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="history-periods">
            {ORDER_HISTORY.map((h) => (
              <button
                key={h.period}
                type="button"
                className={`history-period${historyPeriod === h.period ? ' is-active' : ''}`}
                onClick={() => setHistoryPeriod(h.period)}
              >
                {h.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="history-card card"
            onClick={() => onApplyMemberIds(activeHistory.memberIds, activeHistory.label)}
          >
            <div className="history-card__head">
              <strong>{activeHistory.dateLabel}</strong>
              <span>{activeHistory.memberIds.length}명</span>
            </div>
            <p className="history-card__summary">{activeHistory.summary}</p>
          </button>
        </>
      )}
    </section>
  )
}

function FavoriteRow({
  group,
  onSelect,
}: {
  group: FavoriteGroup
  onSelect: () => void
}) {
  return (
    <button type="button" className="favorite-row card" onClick={onSelect}>
      <div>
        <strong>{group.name}</strong>
        <span>{group.tag ?? `${group.memberIds.length}명`}</span>
      </div>
      <span className="favorite-row__action">불러오기</span>
    </button>
  )
}
