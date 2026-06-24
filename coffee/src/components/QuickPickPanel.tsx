import { useMemo, useState } from 'react'
import type { FavoriteGroup, HistorySnapshot } from '../utils/aiShuttle'
import {
  FAVORITE_GROUPS,
  HISTORY_PERIODS,
  ORDER_HISTORY,
  historyLabelForPeriod,
} from '../utils/aiShuttle'

type Tab = 'favorite' | 'history'
type HistoryPeriod = HistorySnapshot['period']

interface Props {
  onApplyMemberIds: (memberIds: string[], label: string) => void
}

export function QuickPickPanel({ onApplyMemberIds }: Props) {
  const [tab, setTab] = useState<Tab>('favorite')
  const [historyPeriod, setHistoryPeriod] = useState<HistoryPeriod>('today')

  const periodHistories = useMemo(
    () => ORDER_HISTORY.filter((h) => h.period === historyPeriod),
    [historyPeriod],
  )

  return (
    <section className="quick-pick">
      <h2 className="quick-pick__heading">바로 불러오기</h2>
      <div className="quick-pick__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'favorite'}
          className={`quick-pick__tab${tab === 'favorite' ? ' is-active is-sparkle' : ''}`}
          onClick={() => setTab('favorite')}
        >
          즐겨찾기
          {tab === 'favorite' && <span className="quick-pick__tab-spark" aria-hidden>⭐</span>}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'history'}
          className={`quick-pick__tab${tab === 'history' ? ' is-active' : ''}`}
          onClick={() => setTab('history')}
        >
          최근 주문
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
            {HISTORY_PERIODS.map((period) => (
              <button
                key={period}
                type="button"
                className={`history-period${historyPeriod === period ? ' is-active' : ''}`}
                onClick={() => setHistoryPeriod(period)}
              >
                {historyLabelForPeriod(period)}
              </button>
            ))}
          </div>
          <ul className="quick-pick__list">
            {periodHistories.map((history) => (
              <li key={history.id}>
                <button
                  type="button"
                  className="history-card"
                  onClick={() =>
                    onApplyMemberIds(history.memberIds, history.dateLabel)
                  }
                >
                  <div className="history-card__head">
                    <strong>{history.dateLabel}</strong>
                    <span>{history.memberIds.length}명</span>
                  </div>
                  <p className="history-card__summary">{history.summary}</p>
                </button>
              </li>
            ))}
          </ul>
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
    <button type="button" className="favorite-row favorite-row--tap" onClick={onSelect}>
      <div>
        <strong>{group.name}</strong>
        <span>{group.tag ?? `${group.memberIds.length}명`}</span>
      </div>
      <span className="favorite-row__action">선택</span>
    </button>
  )
}
