import { UserMessageBubble } from './components/UserMessageBubble'
import { SystemMessageBubble } from './components/SystemMessageBubble'
import { MessageSequence } from './components/MessageSequence'
import './styles/App.scss'

function App() {
  const userMessage = '사용자가 보낸 예시 메세지입니다.\n여러 줄도 이렇게 표시할 수 있어요.'
  const systemMessage = '시스템(AI Agent)이 보낸 응답 메시지입니다.\n이 메시지는 말풍선 형태가 아닌 일반 컨테이너 형태로 표시됩니다.'

  const handleCopyClick = (text: string) => {
    console.log('복사 버튼 클릭:', text)
  }

  const handleEditClick = (text: string) => {
    console.log('수정 버튼 클릭:', text)
  }

  const handleRefreshClick = (text: string) => {
    console.log('새로고침 버튼 클릭:', text)
  }

  const handleFeedbackClick = (type: 'like' | 'dislike', text: string) => {
    console.log(`피드백 버튼 클릭 (${type}):`, text)
  }

  const handleAgentCopyClick = (text: string) => {
    console.log('시스템 메시지 복사 버튼 클릭:', text)
  }

  const handleAgentSaveClick = (text: string) => {
    console.log('시스템 메시지 저장 버튼 클릭:', text)
  }

  return (
    <div className="app-root">
      <div className="app-chat-container">
        <MessageSequence>
          <SystemMessageBubble
            message={systemMessage}
            iconVariant="ai"
            actions={{
              refresh: { show: true, icon: '🔄', label: '새로고침' },
              like: { show: true, icon: '👍' },
              dislike: { show: true, icon: '👎' },
              copy: { show: true, icon: '📋', label: '복사' },
              save: { show: true, icon: '💾', label: '저장' },
            }}
            onRefreshClick={handleRefreshClick}
            onFeedbackClick={handleFeedbackClick}
            onAgentCopyClick={handleAgentCopyClick}
            onAgentSaveClick={handleAgentSaveClick}
          />
          <UserMessageBubble
            message={userMessage}
            onCopyClick={handleCopyClick}
            onEditClick={handleEditClick}
          />
        </MessageSequence>
      </div>
    </div>
  )
}

export default App
