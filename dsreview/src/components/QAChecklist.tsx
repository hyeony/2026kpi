import styles from './QAChecklist.module.css';

interface QAChecklistProps {
  items: string[];
}

export default function QAChecklist({ items }: QAChecklistProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>QA 체크리스트</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>
            <span className={styles.checkbox} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
