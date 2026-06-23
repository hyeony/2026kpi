import type { TabId } from '../types'
import { CoffeeIcon, UsersIcon } from './Icons'

interface Props {
  active: TabId
  onChange: (tab: TabId) => void
  memberCount?: number
  participantCount?: number
}

const TABS: { id: TabId; label: string; Icon: typeof UsersIcon }[] = [
  { id: 'members', label: '멤버', Icon: UsersIcon },
  { id: 'order', label: '주문', Icon: CoffeeIcon },
]

export function TabBar({ active, onChange, memberCount, participantCount }: Props) {
  return (
    <nav className="tab-bar" aria-label="메인 탭">
      <div className="tab-bar__inner">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          const badge =
            tab.id === 'members'
              ? memberCount
              : tab.id === 'order' && participantCount
                ? participantCount
                : undefined

          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-bar__item${isActive ? ' is-active' : ''}`}
              onClick={() => onChange(tab.id)}
            >
              <span className="tab-bar__icon-wrap">
                <tab.Icon size={20} />
                {badge != null && badge > 0 && (
                  <span className="tab-bar__badge">{badge}</span>
                )}
              </span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
