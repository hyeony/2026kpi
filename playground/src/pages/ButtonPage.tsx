import { Link } from 'react-router-dom';
import { Button } from '@test2/theme';

export function ButtonPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>
        ← 목록으로
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>Button</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>theme Button</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button onClick={() => alert('클릭')}>버튼</Button>
        <Button disabled>비활성</Button>
      </div>
    </div>
  );
}
