import styles from './QAChecklist.module.css';

interface QAChecklistProps {
  items: string[];
  checked: boolean[];
  onToggle: (index: number) => void;
}

export default function QAChecklist({ items, checked, onToggle }: QAChecklistProps) {
  const doneCount = checked.filter(Boolean).length;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>QA 체크리스트</h3>
        <span className={styles.counter}>
          {doneCount} / {items.length} 완료
        </span>
      </div>
      <p className={styles.subtitle}>
        디자인 검수 시 개발자가 실제로 테스트할 시나리오입니다. 직접 확인해 보세요.
      </p>

      <ul className={styles.list}>
        {items.map((item, index) => {
          const isChecked = checked[index] ?? false;

          return (
            <li key={item}>
              <button
                type="button"
                className={`${styles.checkBtn} ${isChecked ? styles.checked : ''}`}
                onClick={() => onToggle(index)}
                aria-pressed={isChecked}
              >
                <span className={styles.checkbox} aria-hidden="true">
                  {isChecked && '✓'}
                </span>
                <span className={isChecked ? styles.checkedText : undefined}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
