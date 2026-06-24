import { useState } from 'react'
import { SendIcon } from './Icons'
import { AI_SUGGESTIONS } from '../utils/aiShuttle'

interface Props {
  onSubmit: (text: string) => void
  isThinking: boolean
  lastReply: string | null
}

export function AiShuttlePanel({ onSubmit, isThinking, lastReply }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    const text = input.trim()
    if (!text || isThinking) return
    onSubmit(text)
    setInput('')
  }

  return (
    <section className="ai-shuttle card">
      <div className="ai-shuttle__head">
        <span className="ai-shuttle__badge" aria-hidden>
          ☕
        </span>
        <div>
          <p className="ai-shuttle__title">AI가 그룹을 골라줘요</p>
          <h2 className="ai-shuttle__question">누구랑 커피 마실까?</h2>
        </div>
      </div>

      <div className="ai-shuttle__input-wrap">
        <input
          className="ai-shuttle__input"
          placeholder="오늘 FE팀 주문 만들어줘"
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
              <span className="ai-shuttle__dots" aria-hidden>
                <span />
                <span />
                <span />
              </span>
              주문 그룹을 구성하고 있어요…
            </>
          ) : (
            lastReply
          )}
        </div>
      )}
    </section>
  )
}
