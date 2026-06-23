import type { Risk, RiskLevel } from '../data/mockReview';
import styles from './RiskCard.module.css';

interface RiskCardProps {
  risks: Risk[];
}

const levelLabels: Record<RiskLevel, string> = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
};

export default function RiskCard({ risks }: RiskCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>우선순위별 이슈</h3>
      <div className={styles.list}>
        {risks.map((risk) => (
          <article key={risk.title} className={`${styles.item} ${styles[risk.level]}`}>
            <div className={styles.itemHeader}>
              <span className={`${styles.tag} ${styles[risk.level]}`}>
                {levelLabels[risk.level]}
              </span>
              <h4>{risk.title}</h4>
            </div>
            <p>{risk.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
