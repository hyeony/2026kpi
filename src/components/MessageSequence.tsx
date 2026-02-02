import type { ReactNode } from 'react'
import '../styles/MessageSequence.scss'

// 16. Container: 메시지를 시간순으로 상→하 배치
export function layoutMessageSequence(children: ReactNode[]) {
  return <div className="message-sequence">{children}</div>
}

// UI에서 바로 쓰기 좋은 래퍼 컴포넌트
export function MessageSequence({ children }: { children: ReactNode }) {
  return <div className="message-sequence">{children}</div>
}
