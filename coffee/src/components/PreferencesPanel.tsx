import { useMemo, useState } from 'react'
import type { Profile } from '../types'
import {
  AI_NOTES_PLACEHOLDER,
  TASTE_TAGS,
  extractSuggestedTags,
} from '../utils/tasteExtract'

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

export interface ProfilePreferences {
  preferredDrinks: string[]
  tasteTags: string[]
  aiNotes: string
}

interface Props {
  profile: Profile
  onSave: (data: ProfilePreferences) => void
}

export function PreferencesPanel({ profile, onSave }: Props) {
  const [drinks, setDrinks] = useState(profile.preferredDrinks)
  const [tasteTags, setTasteTags] = useState<string[]>(profile.tasteTags)
  const [aiNotes, setAiNotes] = useState(profile.aiNotes)
  const [customDrink, setCustomDrink] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [saved, setSaved] = useState(false)

  const suggestedTags = useMemo(() => extractSuggestedTags(aiNotes), [aiNotes])
  const unappliedSuggestions = suggestedTags.filter((t) => !tasteTags.includes(t))

  const toggleDrink = (drink: string) => {
    setDrinks((prev) => {
      if (prev.includes(drink)) return prev.filter((d) => d !== drink)
      if (prev.length < 2) return [...prev, drink]
      return [prev[0], drink]
    })
    setSaved(false)
  }

  const toggleTag = (tag: string) => {
    setTasteTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
    setSaved(false)
  }

  const addCustomDrink = () => {
    const value = customDrink.trim()
    if (!value) return
    setDrinks((prev) => {
      if (prev.includes(value)) return prev
      if (prev.length < 2) return [...prev, value]
      return [prev[0], value]
    })
    setCustomDrink('')
    setShowCustom(false)
    setSaved(false)
  }

  const applySuggestion = (tag: string) => {
    if (!tasteTags.includes(tag)) {
      setTasteTags((prev) => [...prev, tag])
      setSaved(false)
    }
  }

  const handleSave = () => {
    if (drinks.length === 0 || !drinks[0]?.trim()) return
    onSave({
      preferredDrinks: drinks.filter(Boolean).slice(0, 2),
      tasteTags,
      aiNotes,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <section className="pref-panel">
      {/* 1. 선호 음료 */}
      <div className="pref-section card">
        <div className="pref-section__head">
          <h3 className="pref-section__title">선호 음료</h3>
          <span className="pref-section__hint">최대 2개 · 무엇을 마시는지</span>
        </div>

        {drinks.length > 0 && (
          <div className="pref-selected-row">
            {drinks.map((drink) => (
              <button
                key={drink}
                type="button"
                className="pref-chip pref-chip--drink is-active"
                onClick={() => toggleDrink(drink)}
                title="탭하여 제거"
              >
                {drink}
                <span className="pref-chip__x" aria-hidden>
                  ×
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="pref-drink-grid">
          {DRINK_PRESETS.map((drink) => {
            const active = drinks.includes(drink)
            const disabled = !active && drinks.length >= 2
            return (
              <button
                key={drink}
                type="button"
                className={`pref-drink-btn${active ? ' is-active' : ''}`}
                onClick={() => toggleDrink(drink)}
                disabled={disabled}
              >
                {drink}
              </button>
            )
          })}
        </div>

        {!showCustom ? (
          <button type="button" className="pref-link-btn" onClick={() => setShowCustom(true)}>
            + 직접 입력
          </button>
        ) : (
          <div className="pref-custom-row">
            <input
              placeholder="음료 이름"
              value={customDrink}
              onChange={(e) => setCustomDrink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomDrink()}
            />
            <button type="button" className="btn btn--sm" onClick={addCustomDrink}>
              추가
            </button>
          </div>
        )}
      </div>

      {/* 2. 취향 태그 */}
      <div className="pref-section card">
        <div className="pref-section__head">
          <h3 className="pref-section__title">취향 태그</h3>
          <span className="pref-section__hint">어떻게 마시는지</span>
        </div>
        <div className="pref-tag-grid">
          {TASTE_TAGS.map((tag) => {
            const active = tasteTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                className={`pref-chip pref-chip--tag${active ? ' is-active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. AI 메모 */}
      <div className="pref-section card">
        <div className="pref-section__head">
          <h3 className="pref-section__title">AI에게 추가로 알려줄 내용</h3>
          <span className="pref-section__hint">나를 소개해 주세요</span>
        </div>

        <textarea
          className="pref-notes"
          rows={5}
          placeholder={AI_NOTES_PLACEHOLDER}
          value={aiNotes}
          onChange={(e) => {
            setAiNotes(e.target.value)
            setSaved(false)
          }}
        />

        {unappliedSuggestions.length > 0 && (
          <div className="pref-suggestions">
            <p className="pref-suggestions__label">✨ AI가 이런 취향을 감지했어요</p>
            <div className="pref-suggestions__chips">
              {unappliedSuggestions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="pref-chip pref-chip--suggest"
                  onClick={() => applySuggestion(tag)}
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="pref-ai-note">
          AI Shuttle이 주문 문구에 취향 태그와 메모를 반영해요.
        </p>
      </div>

      <button
        type="button"
        className={`btn btn--dark btn--block${saved ? ' is-success' : ''}`}
        onClick={handleSave}
        disabled={drinks.length === 0}
      >
        {saved ? '저장됨!' : '프로필 저장'}
      </button>
    </section>
  )
}
