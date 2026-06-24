import { useState } from 'react'
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
          🤖
        </span>
        <div>
          <h2 className="ai-shuttle__title">AI Shuttle</h2>
          <p className="ai-shuttle__question">누구랑 커피 마실래?</p>
        </div>
      </div>

      <p className="ai-shuttle__prompt">무엇을 도와드릴까요?</p>

      <div className="ai-shuttle__input-wrap">
        <input
          className="ai-shuttle__input"
          placeholder="예: 오늘 FE팀 주문 만들어줘"
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
        >
          {isThinking ? '…' : '실행'}
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
              <span className="ai-suggestion__check" aria-hidden>
                ✔
              </span>
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
