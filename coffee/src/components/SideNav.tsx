import type { ViewId } from '../types'
import { CoffeeIcon, FolderIcon, HeartIcon, UsersIcon } from './Icons'

interface Props {
  active: ViewId
  onChange: (view: ViewId) => void
}

const NAV: { id: ViewId; label: string; Icon: typeof CoffeeIcon }[] = [
  { id: 'order', label: '오늘 주문', Icon: CoffeeIcon },
  { id: 'meetings', label: '모임', Icon: FolderIcon },
  { id: 'members', label: '멤버', Icon: UsersIcon },
  { id: 'preferences', label: '취향', Icon: HeartIcon },
]

export function SideNav({ active, onChange }: Props) {
  return (
    <nav className="side-nav" aria-label="메인 메뉴">
      <div className="side-nav__brand" aria-hidden>
        <CoffeeIcon size={22} />
      </div>
      <ul className="side-nav__list">
        {NAV.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`side-nav__item${isActive ? ' is-active' : ''}`}
                onClick={() => onChange(item.id)}
                title={item.label}
              >
                <item.Icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
