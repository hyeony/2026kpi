import styles from './ScoreCard.module.css';

interface ScoreCardProps {
  score: number;
  summary: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'good';
  if (score >= 60) return 'fair';
  return 'poor';
}

export default function ScoreCard({ score, summary }: ScoreCardProps) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.label}>Spec Health Score</h3>
        <span className={`${styles.badge} ${styles[color]}`}>
          {score >= 80 ? '양호' : score >= 60 ? '보통' : '주의'}
        </span>
      </div>

      <div className={styles.scoreRow}>
        <div className={styles.ring}>
          <svg viewBox="0 0 120 120" className={styles.svg}>
            <circle cx="60" cy="60" r="54" className={styles.bg} />
            <circle
              cx="60"
              cy="60"
              r="54"
              className={`${styles.progress} ${styles[color]}`}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className={styles.scoreValue}>
            <span className={styles.number}>{score}</span>
            <span className={styles.unit}>/ 100</span>
          </div>
        </div>

        <div className={styles.summary}>
          <h4>구현 가능성 요약</h4>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
}
