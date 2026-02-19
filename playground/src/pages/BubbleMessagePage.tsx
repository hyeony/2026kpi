import { Link } from 'react-router-dom';
import { BubbleMessage, AgentMessage, UserMessage } from '@test2/theme';

export function BubbleMessagePage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#3b82f6',
          textDecoration: 'none',
        }}
      >
        ← 목록으로
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>BubbleMessage</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>
        Agent(좌) / User(우) 말풍선. Agent 컨텐츠는 텍스트·버튼·멀티셀렉트·Todo·Process 등 어떤 형태든 children으로 넣으면 됨.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'stretch',
        }}
      >
        {/* Agent 메시지: 컨텐츠는 children으로 자유 구성, 하단에 복사/좋아요/싫어요/새로고침(구성 변경 가능) */}
        <BubbleMessage variant="agent">
          <AgentMessage
            actions={[
              { id: 'copy', label: '복사', onClick: () => alert('복사') },
              { id: 'like', label: '좋아요', onClick: () => alert('좋아요') },
              { id: 'dislike', label: '싫어요', onClick: () => alert('싫어요') },
              { id: 'refresh', label: '새로고침', onClick: () => alert('새로고침') },
            ]}
          >
            <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.6 }}>
              안녕하세요. 무엇을 도와드릴까요? 컨텐츠는 텍스트, 버튼, 멀티셀렉트, Todo, Process 정보 등
              필요한 형태로 자유롭게 채우면 됩니다.
            </p>
          </AgentMessage>
        </BubbleMessage>

        {/* User 텍스트 (하단: 복사/수정) */}
        <BubbleMessage variant="user">
          <UserMessage
            content={{ type: 'text', value: '이미지 없이 텍스트만 보내는 경우입니다.' }}
            actions={[
              { id: 'copy', label: '복사', onClick: () => alert('복사') },
              { id: 'edit', label: '수정', onClick: () => alert('수정') },
            ]}
          />
        </BubbleMessage>

        {/* User 이미지 1장 */}
        <BubbleMessage variant="user">
          <UserMessage
            content={{
              type: 'image',
              urls: ['https://picsum.photos/seed/1/320/240'],
            }}
            onImageClick={(url) => window.open(url)}
          />
        </BubbleMessage>

        {/* User 이미지 2장 */}
        <BubbleMessage variant="user">
          <UserMessage
            content={{
              type: 'image',
              urls: [
                'https://picsum.photos/seed/2/160/120',
                'https://picsum.photos/seed/3/160/120',
              ],
            }}
          />
        </BubbleMessage>

        {/* User 이미지 3장 */}
        <BubbleMessage variant="user">
          <UserMessage
            content={{
              type: 'image',
              urls: [
                'https://picsum.photos/seed/4/120/120',
                'https://picsum.photos/seed/5/120/120',
                'https://picsum.photos/seed/6/120/120',
              ],
            }}
          />
        </BubbleMessage>

        {/* User 이미지 여러 장 */}
        <BubbleMessage variant="user">
          <UserMessage
            content={{
              type: 'image',
              urls: [
                'https://picsum.photos/seed/7/160/120',
                'https://picsum.photos/seed/8/160/120',
                'https://picsum.photos/seed/9/160/120',
                'https://picsum.photos/seed/10/160/120',
              ],
            }}
          />
        </BubbleMessage>
      </div>
    </div>
  );
}
