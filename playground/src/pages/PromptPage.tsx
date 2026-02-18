import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Prompt } from '@test1/theme';

export function PromptPage() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
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
      <h1 style={{ marginBottom: '0.5rem' }}>Prompt</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>
        AI 프롬프트 입력 컴포넌트. input + 파일추가 버튼 + 복사 버튼으로 구성됩니다.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>기본 사용</h2>
        <Prompt
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="메시지를 입력하세요..."
          fileTriggerLabel="파일 추가"
          copyLabel="복사"
          onFileAdd={(files) => {
            if (files?.length) alert(`파일 ${files.length}개 선택됨`);
          }}
          onCopy={(v) => {
            if (v) {
              navigator.clipboard.writeText(v);
              alert('클립보드에 복사되었습니다.');
            } else {
              alert('복사할 내용이 없습니다.');
            }
          }}
        />
      </section>

      {value && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            입력 미리보기
          </h2>
          <p
            style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {value}
          </p>
        </section>
      )}
    </div>
  );
}
