import type { ComponentSpec } from '../data/mockReview';
import styles from './ComponentSpecList.module.css';

interface ComponentSpecListProps {
  specs: ComponentSpec[];
}

export default function ComponentSpecList({ specs }: ComponentSpecListProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>컴포넌트별 권장 Props</h3>
        <p className={styles.subtitle}>
          개발자가 구현할 때 필요한 속성·변형을 미리 정의해 두면 핸드오프가 빨라집니다
        </p>
      </div>

      <div className={styles.list}>
        {specs.map((spec) => (
          <article key={`${spec.element}-${spec.location}`} className={styles.item}>
            <div className={styles.itemTop}>
              <div>
                <h4 className={styles.element}>{spec.element}</h4>
                <span className={styles.location}>{spec.location}</span>
              </div>
            </div>

            <div className={styles.props}>
              {spec.suggestedProps.map((prop) => (
                <code key={prop} className={styles.prop}>
                  {prop}
                </code>
              ))}
            </div>

            <p className={styles.note}>{spec.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
