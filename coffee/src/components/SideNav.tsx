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
