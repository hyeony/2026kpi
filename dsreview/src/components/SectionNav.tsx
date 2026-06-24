import styles from './SectionNav.module.css';

export type ResultSection = 'diagnosis' | 'dev-spec' | 'handoff';

interface SectionNavProps {
  active: ResultSection;
  onChange: (section: ResultSection) => void;
}

const SECTIONS: { id: ResultSection; label: string; desc: string }[] = [
  { id: 'diagnosis', label: '진단', desc: '리스크·누락 상태' },
  { id: 'dev-spec', label: '개발 스펙', desc: 'Props·엣지 케이스' },
  { id: 'handoff', label: '핸드오프 준비', desc: '질문·QA' },
];

export default function SectionNav({ active, onChange }: SectionNavProps) {
  return (
    <nav className={styles.nav} aria-label="분석 결과 섹션">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`${styles.tab} ${active === section.id ? styles.active : ''}`}
          onClick={() => onChange(section.id)}
          aria-current={active === section.id ? 'page' : undefined}
        >
          <span className={styles.label}>{section.label}</span>
          <span className={styles.desc}>{section.desc}</span>
        </button>
      ))}
    </nav>
  );
}
