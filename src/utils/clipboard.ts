export async function copyMessageToClipboard(text: string) {
  if (!navigator.clipboard) {
    // fallback
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(textarea)
    }
    return
  }

  await navigator.clipboard.writeText(text)
}

// 14. Utility: 시스템 메시지 텍스트 클립보드 복사 처리
export async function copyAgentMessage(text: string) {
  return copyMessageToClipboard(text)
}
