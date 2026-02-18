import { Link } from 'react-router-dom';
import { Button } from '@test1/theme';

export function ButtonPage() {
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
      <h1 style={{ marginBottom: '0.5rem' }}>Button</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>
        theme의 Button 컴포넌트를 자유롭게 사용해 구성한 페이지입니다.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>기본</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => alert('클릭')}>버튼</Button>
          <Button onClick={() => alert('전송')}>전송</Button>
          <Button disabled>비활성</Button>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>다양한 액션</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => window.history.back()}>뒤로</Button>
          <Button onClick={() => window.location.reload()}>새로고침</Button>
        </div>
      </section>
    </div>
  );
}
