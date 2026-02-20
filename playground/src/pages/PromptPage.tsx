import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Prompt } from '@test2/theme';
import { PromptBase } from '@test2/core';

const sectionStyle = { marginBottom: '2.5rem' };
const labelStyle = { fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 500 };

export function PromptPage() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>
        ← 목록으로
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>Prompt</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>AI 프롬프트 입력</p>

      <section style={sectionStyle}>
        <div style={labelStyle}>기능 적용 (theme + 이벤트)</div>
        <Prompt
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          placeholder="메시지를 입력하세요..."
          fileTriggerLabel="파일 추가"
          copyLabel="복사"
          onFileAdd={(files: FileList | null) => { if (files?.length) alert(`파일 ${files.length}개`); }}
          onCopy={(v: string) => { if (v) { navigator.clipboard.writeText(v); alert('복사됨'); } }}
        />
      </section>

      <section style={sectionStyle}>
        <div style={labelStyle}>퍼블 base (마크업·스타일만, 기능 없음)</div>
        <PromptBase
          fileTriggerLabel="파일 추가"
          copyLabel="복사"
          placeholder="메시지를 입력하세요..."
        />
      </section>
    </div>
  );
}
