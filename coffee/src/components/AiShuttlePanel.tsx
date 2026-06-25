import { useEffect, useState } from 'react'
import { SendIcon } from './Icons'
import { AI_SUGGESTIONS } from '../utils/aiShuttle'

interface Props {
  onSubmit: (text: string) => void
  isThinking: boolean
  lastReply: string | null
}

export function AiShuttlePanel({ onSubmit, isThinking, lastReply }: Props) {
  const [input, setInput] = useState('')
  const [badgeWiggle, setBadgeWiggle] = useState(false)

  useEffect(() => {
    if (!isThinking) return
    setBadgeWiggle(true)
    const timer = window.setTimeout(() => setBadgeWiggle(false), 600)
    return () => window.clearTimeout(timer)
  }, [isThinking])

  const handleSubmit = () => {
    const text = input.trim()
    if (!text || isThinking) return
    onSubmit(text)
    setInput('')
  }

  return (
    <section className="ai-shuttle card">
      <div className="ai-shuttle__head">
        <span
          className={`ai-shuttle__badge${badgeWiggle ? ' is-wiggling' : ''}`}
          aria-hidden
        >
          ☕
        </span>
        <div>
          <p className="ai-shuttle__title">H9 커피 모여! ☕</p>
          <h2 className="ai-shuttle__question">오늘 누구와 커피 마실까요?</h2>
        </div>
      </div>

      <div className="ai-shuttle__input-wrap">
        <input
          className="ai-shuttle__input"
          placeholder="FE팀 주문 목록 만들어줘"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={isThinking}
        />
        <button
          type="button"
          className="btn btn--cta ai-shuttle__send"
          onClick={handleSubmit}
          disabled={!input.trim() || isThinking}
          aria-label="보내기"
        >
          <SendIcon size={18} />
        </button>
      </div>

      <ul className="ai-suggestions">
        {AI_SUGGESTIONS.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              className="ai-suggestion"
              onClick={() => onSubmit(suggestion)}
              disabled={isThinking}
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>

      {(isThinking || lastReply) && (
        <div className={`ai-shuttle__reply${isThinking ? ' is-thinking' : ''}`}>
          {isThinking ? (
            <>
              <span className="ai-shuttle__steam-cup" aria-hidden>
                ☕
                <span className="ai-shuttle__steam">
                  <span />
                  <span />
                  <span />
                </span>
              </span>
              주문 목록을 만들고 있어요…
            </>
          ) : (
            lastReply
          )}
        </div>
      )}
    </section>
  )
}
