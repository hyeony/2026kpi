import styles from './MissingStateList.module.css';

interface MissingStateListProps {
  states: string[];
}

export default function MissingStateList({ states }: MissingStateListProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>누락된 상태값</h3>
      <p className={styles.subtitle}>
        개발 시 반드시 필요하지만 디자인에 없는 UI 상태입니다
      </p>
      <div className={styles.tags}>
        {states.map((state) => (
          <span key={state} className={styles.tag}>
            {state}
          </span>
        ))}
      </div>
    </div>
  );
}
