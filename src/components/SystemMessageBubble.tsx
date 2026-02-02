import type { MouseEvent, ReactNode } from 'react'
import { copyMessageToClipboard } from '../utils/clipboard'
import '../styles/SystemMessageBubble.scss'

type ActionConfig = {
  show?: boolean
  icon?: ReactNode | string
  label?: string
}

type ActionsConfig = {
  refresh?: ActionConfig
  like?: ActionConfig
  dislike?: ActionConfig
  copy?: ActionConfig
  save?: ActionConfig
}

type SystemMessageBubbleProps = {
  message: string
  iconVariant?: 'default' | 'ai' | 'bot'
  actions?: ActionsConfig
  onRefreshClick?: (message: string, event: MouseEvent<HTMLButtonElement>) => void
  onFeedbackClick?: (type: 'like' | 'dislike', message: string, event: MouseEvent<HTMLButtonElement>) => void
  onAgentCopyClick?: (message: string, event: MouseEvent<HTMLButtonElement>) => void
  onAgentSaveClick?: (message: string, event: MouseEvent<HTMLButtonElement>) => void
}

// 8. Container: 시스템 발신 메시지 렌더링 (말풍선 미사용)
export function renderAgentMessage(props: SystemMessageBubbleProps) {
  const {
    message,
    iconVariant = 'default',
    actions = {},
    onRefreshClick,
    onFeedbackClick,
    onAgentCopyClick,
    onAgentSaveClick,
  } = props

  // 기본 액션 설정 (show가 명시되지 않으면 true, 아이콘/라벨도 기본값 사용)
  const defaultActions: Required<ActionsConfig> = {
    refresh: { show: true, icon: '🔄', label: '새로고침' },
    like: { show: true, icon: '👍', label: '좋아요' },
    dislike: { show: true, icon: '👎', label: '싫어요' },
    copy: { show: true, icon: undefined, label: '복사' },
    save: { show: true, icon: undefined, label: '저장' },
  }

  // 사용자 설정과 기본값 병합
  const mergedActions = {
    refresh: { ...defaultActions.refresh, ...actions.refresh },
    like: { ...defaultActions.like, ...actions.like },
    dislike: { ...defaultActions.dislike, ...actions.dislike },
    copy: { ...defaultActions.copy, ...actions.copy },
    save: { ...defaultActions.save, ...actions.save },
  }

  const handleRefreshClick = (event: MouseEvent<HTMLButtonElement>) => {
    // 11. Button: 새로고침 버튼 클릭 트리거
    onRefreshClick?.(message, event)
  }

  const handleFeedbackClick = (type: 'like' | 'dislike') => (event: MouseEvent<HTMLButtonElement>) => {
    // 12. Button: 좋아요/싫어요 버튼 클릭 이벤트
    onFeedbackClick?.(type, message, event)
  }

  const handleAgentCopyClick = async (event: MouseEvent<HTMLButtonElement>) => {
    // 13. Button: 시스템 메시지 복사 버튼 클릭
    onAgentCopyClick?.(message, event)
    // 14. Utility: 시스템 메시지 텍스트 클립보드 복사 처리
    await copyMessageToClipboard(message)
  }

  const handleAgentSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
    // 15. Button: 시스템 메시지 저장 버튼 클릭
    onAgentSaveClick?.(message, event)
  }

  return (
    <div className="agent-message-row">
      <div className="agent-message-container">
        <div className="agent-message-content">
          {renderAgentIcon(iconVariant)}
          {renderAgentMessageText(message)}

          <div className="agent-message__actions">
            {mergedActions.refresh.show && (
              <button
                type="button"
                onClick={handleRefreshClick}
                className="agent-message__button agent-message__button--refresh"
                title={mergedActions.refresh.label}
              >
                {mergedActions.refresh.icon && <span>{mergedActions.refresh.icon}</span>}
                {mergedActions.refresh.label}
              </button>
            )}
            {mergedActions.like.show && (
              <button
                type="button"
                onClick={handleFeedbackClick('like')}
                className="agent-message__button agent-message__button--like"
                title={mergedActions.like.label}
              >
                {mergedActions.like.icon && <span>{mergedActions.like.icon}</span>}
                {mergedActions.like.label && !mergedActions.like.icon && mergedActions.like.label}
              </button>
            )}
            {mergedActions.dislike.show && (
              <button
                type="button"
                onClick={handleFeedbackClick('dislike')}
                className="agent-message__button agent-message__button--dislike"
                title={mergedActions.dislike.label}
              >
                {mergedActions.dislike.icon && <span>{mergedActions.dislike.icon}</span>}
                {mergedActions.dislike.label && !mergedActions.dislike.icon && mergedActions.dislike.label}
              </button>
            )}
            {mergedActions.copy.show && (
              <button
                type="button"
                onClick={handleAgentCopyClick}
                className="agent-message__button agent-message__button--copy"
                title={mergedActions.copy.label}
              >
                {mergedActions.copy.icon && <span>{mergedActions.copy.icon}</span>}
                {mergedActions.copy.label}
              </button>
            )}
            {mergedActions.save.show && (
              <button
                type="button"
                onClick={handleAgentSaveClick}
                className="agent-message__button agent-message__button--save"
                title={mergedActions.save.label}
              >
                {mergedActions.save.icon && <span>{mergedActions.save.icon}</span>}
                {mergedActions.save.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 9. Icon: AI agent 응답 식별 아이콘 표시 (variant 가능)
export function renderAgentIcon(variant: 'default' | 'ai' | 'bot' = 'default') {
  const iconMap = {
    default: '🤖',
    ai: '✨',
    bot: '💬',
  }

  return (
    <div className={`agent-message__icon agent-message__icon--${variant}`}>
      {iconMap[variant]}
    </div>
  )
}

// 10. Text: 시스템 발신 메시지 텍스트 렌더링
export function renderAgentMessageText(message: string) {
  return <div className="agent-message__text">{message}</div>
}

// UI에서 바로 쓰기 좋은 래퍼 컴포넌트
export function SystemMessageBubble(props: SystemMessageBubbleProps) {
  return renderAgentMessage(props)
}
