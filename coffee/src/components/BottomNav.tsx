import type { ViewId } from '../types'
import { CoffeeIcon, UsersIcon } from './Icons'

interface Props {
  active: ViewId
  onChange: (view: ViewId) => void
}

const NAV: { id: ViewId; label: string; Icon: typeof CoffeeIcon }[] = [
  { id: 'home', label: '홈', Icon: CoffeeIcon },
  { id: 'members', label: '구성원', Icon: UsersIcon },
]

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="bottom-nav" aria-label="메인 메뉴">
      <ul className="bottom-nav__list">
        {NAV.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id} className="bottom-nav__item-wrap">
              <button
                type="button"
                className={`bottom-nav__item${isActive ? ' is-active' : ''}`}
                onClick={() => onChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.Icon size={22} />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
