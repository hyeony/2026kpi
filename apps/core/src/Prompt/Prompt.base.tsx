/**
 * Prompt 퍼블용 base 마크업.
 * 구조·클래스명·간단한 스타일만 포함. 기능(이벤트·ref)은 프론트에서 Prompt.tsx에 연결.
 *
 * 사용: 퍼블은 이 파일 기준으로 마크업/스타일 조정 후, 동일 구조를 Prompt.tsx에 반영.
 */
const styles = {
  root: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '640px',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    padding: '0.25rem 0.25rem 0.25rem 0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
  },
  fileTrigger: {
    flexShrink: 0,
    padding: '0.375rem 0.75rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    border: 'none',
    borderRadius: '0.375rem',
    background: '#f3f4f6',
    color: '#374151',
    cursor: 'pointer',
  },
  input: {
    flex: 1,
    minWidth: 0,
    margin: 0,
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: '#111827',
    background: 'transparent',
    border: 'none',
    outline: 'none',
  },
  copy: {
    flexShrink: 0,
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    background: '#fff',
    color: '#374151',
    cursor: 'pointer',
  },
} as const;

export interface PromptBaseProps {
  className?: string;
  fileTriggerLabel?: string;
  copyLabel?: string;
  placeholder?: string;
}

export function PromptBase({
  className = '',
  fileTriggerLabel = '파일 추가',
  copyLabel = '복사',
  placeholder = '메시지를 입력하세요...',
}: PromptBaseProps) {
  return (
    <div className={`prompt-base ${className}`.trim()} style={styles.root} data-prompt-base>
      <div className="prompt-base__inner" style={styles.inner}>
        <input type="file" hidden multiple aria-hidden tabIndex={-1} readOnly />
        <button type="button" className="prompt-base__file-trigger" style={styles.fileTrigger}>
          {fileTriggerLabel}
        </button>
        <input
          type="text"
          className="prompt-base__input"
          style={styles.input}
          placeholder={placeholder}
          readOnly
          aria-label="프롬프트 입력"
        />
      </div>
      <button type="button" className="prompt-base__copy" style={styles.copy}>
        {copyLabel}
      </button>
    </div>
  );
}
