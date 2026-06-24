import styles from './HandoffProgress.module.css';

interface HandoffProgressProps {
  progress: number;
  resolvedQuestions: number;
  totalQuestions: number;
  checkedQA: number;
  totalQA: number;
}

export default function HandoffProgress({
  progress,
  resolvedQuestions,
  totalQuestions,
  checkedQA,
  totalQA,
}: HandoffProgressProps) {
  const isReady = progress >= 80;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>핸드오프 준비도</h3>
          <p className={styles.subtitle}>
            질문 정리와 QA 체크를 완료하면 개발자에게 넘기기 좋은 상태가 됩니다
          </p>
        </div>
        <div className={styles.scoreWrap}>
          <span className={`${styles.score} ${isReady ? styles.ready : ''}`}>{progress}%</span>
          {isReady && <span className={styles.badge}>핸드오프 가능</span>}
        </div>
      </div>

      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.stats}>
        <span>
          질문 정리 <strong>{resolvedQuestions}</strong> / {totalQuestions}
        </span>
        <span>
          QA 확인 <strong>{checkedQA}</strong> / {totalQA}
        </span>
      </div>
    </div>
  );
}
