import { Link } from 'react-router-dom';

const components = [
  { path: '/button', name: 'Button', description: '버튼 컴포넌트' },
  { path: '/prompt', name: 'Prompt', description: 'AI 프롬프트 입력 (input + 파일추가 + 복사)' },
];

export function IndexPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '480px' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Design System Playground</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9375rem' }}>
        컴포넌트를 클릭하면 해당 페이지로 이동합니다.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {components.map(({ path, name, description }) => (
          <li key={path} style={{ marginBottom: '0.75rem' }}>
            <Link
              to={path}
              style={{
                display: 'block',
                padding: '1rem 1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#fff',
                color: '#111827',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              <span style={{ display: 'block', marginBottom: '0.25rem' }}>{name}</span>
              <span style={{ fontSize: '0.8125rem', color: '#6b7280', fontWeight: 400 }}>
                {description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
