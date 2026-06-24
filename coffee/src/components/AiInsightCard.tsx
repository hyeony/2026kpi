interface Props {
  insight: string
  groupLabel?: string | null
}

export function AiInsightCard({ insight, groupLabel }: Props) {
  return (
    <div className="ai-insight card ai-insight--enter">
      <div className="ai-insight__head">
        <span className="ai-insight__icon" aria-hidden>
          ✨
        </span>
        <div>
          <strong>AI 분석</strong>
          {groupLabel && <span className="ai-insight__tag">{groupLabel}</span>}
        </div>
      </div>
      <p className="ai-insight__text">{insight}</p>
    </div>
  )
}
