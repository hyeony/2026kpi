import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Prompt } from '@test2/theme';

export function PromptPage() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>
        ← 목록으로
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>Prompt</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>AI 프롬프트 입력</p>
      <Prompt
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="메시지를 입력하세요..."
        fileTriggerLabel="파일 추가"
        copyLabel="복사"
        onFileAdd={(files: FileList | null) => { if (files?.length) alert(`파일 ${files.length}개`); }}
        onCopy={(v: string) => { if (v) { navigator.clipboard.writeText(v); alert('복사됨'); } }}
      />
    </div>
  );
}
