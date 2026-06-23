import { memberColor, memberInitial } from '../utils/avatar'

interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = { sm: 32, md: 40, lg: 48 }

export function Avatar({ name, size = 'md' }: Props) {
  const px = SIZES[size]
  return (
    <span
      className={`avatar avatar--${size}`}
      style={{ background: memberColor(name), width: px, height: px }}
      aria-hidden
    >
      {memberInitial(name)}
    </span>
  )
}
