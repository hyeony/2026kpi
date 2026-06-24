import { useState } from 'react'
import type { Profile } from '../types'
import { Avatar } from './Avatar'

const DRINK_PRESETS = [
  '아이스 아메리카노',
  '아메리카노 HOT',
  '바닐라 라떼',
  '카페라떼 HOT',
  '카페라떼 ICE',
  '콜드브루',
  '에스프레소',
  '캐모마일 티',
]

interface Props {
  profile: Profile
  onSave: (drinks: string[]) => void
  compact?: boolean
}

export function PreferencesPanel({ profile, onSave, compact = false }: Props) {
  const [drinks, setDrinks] = useState([
    profile.preferredDrinks[0] ?? '',
    profile.preferredDrinks[1] ?? '',
  ])
  const [saved, setSaved] = useState(false)

  const togglePreset = (drink: string) => {
    setDrinks((prev) => {
      if (prev.includes(drink)) {
        return prev.map((d) => (d === drink ? '' : d))
      }
      if (!prev[0]) return [drink, prev[1]]
      if (!prev[1]) return [prev[0], drink]
      return [prev[0], drink]
    })
    setSaved(false)
  }

  const handleSave = () => {
    if (!drinks[0]?.trim()) return
    onSave(drinks)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selected = drinks.filter(Boolean)

  return (
    <section className="panel">
      {!compact && (
        <div className="section-head">
          <div>
            <h2 className="panel__title">나의 취향</h2>
            <p className="panel__desc">선호 음료 최대 2개 · 주문 시 자동 반영</p>
          </div>
        </div>
      )}

      <div className="card preferences-card">
        {!compact && (
          <div className="preferences-profile">
            <Avatar name={profile.name} size="lg" />
            <div>
              <strong>{profile.name}</strong>
              <p>프로필이 설정된 상태입니다</p>
            </div>
          </div>
        )}

        <span className="card-label">{compact ? '취향 수정' : '자주 마시는 음료'}</span>
        <div className="drink-grid">
          {DRINK_PRESETS.map((drink) => {
            const active = selected.includes(drink)
            return (
              <button
                key={drink}
                type="button"
                className={`drink-grid__item${active ? ' is-active' : ''}`}
                onClick={() => togglePreset(drink)}
              >
                {drink}
              </button>
            )
          })}
        </div>

        <div className="drink-inputs">
          <label className="field">
            <span className="field__label">선호 음료 1</span>
            <input
              placeholder="직접 입력"
              value={drinks[0]}
              onChange={(e) => { setDrinks([e.target.value, drinks[1]]); setSaved(false) }}
            />
          </label>
          <label className="field">
            <span className="field__label">선호 음료 2 <em>(선택)</em></span>
            <input
              placeholder="직접 입력"
              value={drinks[1]}
              onChange={(e) => { setDrinks([drinks[0], e.target.value]); setSaved(false) }}
            />
          </label>
        </div>

        <button
          type="button"
          className={`btn btn--dark btn--block${saved ? ' is-success' : ''}`}
          onClick={handleSave}
          disabled={!drinks[0]?.trim()}
        >
          {saved ? '저장됨!' : '취향 저장'}
        </button>

        <p className="preferences-note">
          저장된 취향은 모임 주문 시 자동으로 반영됩니다.
        </p>
      </div>
    </section>
  )
}
