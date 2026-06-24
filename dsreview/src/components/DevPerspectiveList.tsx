import type { DevPerspective } from '../data/mockReview';
import styles from './DevPerspectiveList.module.css';

interface DevPerspectiveListProps {
  perspectives: DevPerspective[];
}

export default function DevPerspectiveList({ perspectives }: DevPerspectiveListProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>개발 관점 가이드</h3>
        <p className={styles.subtitle}>
          디자이너가 놓치기 쉬운 엣지 케이스를 개발자 시각으로 설명합니다
        </p>
      </div>

      <div className={styles.list}>
        {perspectives.map((item) => (
          <article key={item.topic} className={styles.item}>
            <h4 className={styles.topic}>{item.topic}</h4>

            <div className={styles.row}>
              <span className={styles.label}>디자인 갭</span>
              <p>{item.designGap}</p>
            </div>

            <div className={styles.row}>
              <span className={`${styles.label} ${styles.dev}`}>개발 기대</span>
              <p>{item.devExpectation}</p>
            </div>

            <div className={styles.example}>
              <span className={styles.exampleLabel}>예시</span>
              <code>{item.example}</code>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
