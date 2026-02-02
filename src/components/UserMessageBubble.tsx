import type { MouseEvent } from 'react'
import { copyMessageToClipboard } from '../utils/clipboard'
import '../styles/UserMessageBubble.scss'

type UserMessageBubbleProps = {
  message: string
  onCopyClick?: (message: string, event: MouseEvent<HTMLButtonElement>) => void
  onEditClick?: (message: string, event: MouseEvent<HTMLButtonElement>) => void
}

// 1. Container: 사용자 발신 메시지 버블 렌더링
export function renderUserMessage(props: UserMessageBubbleProps) {
  const { message, onCopyClick, onEditClick } = props

  const handleCopyClick = async (event: MouseEvent<HTMLButtonElement>) => {
    onCopyClick?.(message, event)
    await copyMessageToClipboard(message)
  }

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    // 현재는 콜백만 트리거 (실제 수정 로직은 상위에서 구현)
    onEditClick?.(message, event)
  }

  return (
    <div className="user-message-row">
      <div className="user-message-bubble">
        {renderUserMessageText(message)}

        <div className="user-message-bubble__actions">
          <button
            type="button"
            onClick={handleCopyClick}
            className="user-message-bubble__button user-message-bubble__button--copy"
          >
            복사
          </button>
          <button
            type="button"
            onClick={handleEditClick}
            className="user-message-bubble__button user-message-bubble__button--edit"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  )
}

// 2. Text: 메시지 텍스트 렌더링 (포맷 자유)
export function renderUserMessageText(message: string) {
  return <span className="user-message-bubble__text">{message}</span>
}

// 3. UI에서 바로 쓰기 좋은 래퍼 컴포넌트
export function UserMessageBubble(props: UserMessageBubbleProps) {
  return renderUserMessage(props)
}
