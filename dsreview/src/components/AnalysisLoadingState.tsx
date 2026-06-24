import { useEffect, useState } from 'react';
import styles from './AnalysisLoadingState.module.css';

export const ANALYSIS_STEPS = [
  'Spec Health Score 분석',
  '구현 리스크·누락 상태 점검',
  '컴포넌트 Props 추론',
  '개발 관점 가이드 생성',
  '핸드오프 질문·QA 작성',
] as const;

const STEP_INTERVAL_MS = 1200;

interface AnalysisLoadingStateProps {
  isActive: boolean;
}

export default function AnalysisLoadingState({ isActive }: AnalysisLoadingStateProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setActiveStep(0);
      return;
    }

    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isActive]);

  const currentLabel = ANALYSIS_STEPS[activeStep];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.spinnerRing}>
          <div className={styles.spinner} />
        </div>
        <div className={styles.headerText}>
          <p className={styles.currentStep}>
            <span className={styles.stepPulse} aria-hidden="true" />
            {currentLabel} 진행 중...
          </p>
          <span className={styles.subHint}>
            개발 핸드오프에 필요한 항목을 순서대로 생성하고 있습니다
          </span>
        </div>
      </div>

      <ol className={styles.stepList}>
        {ANALYSIS_STEPS.map((step, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <li
              key={step}
              className={`${styles.stepItem} ${isDone ? styles.done : ''} ${isCurrent ? styles.current : ''}`}
            >
              <span className={styles.stepIcon} aria-hidden="true">
                {isDone ? '✓' : isCurrent ? '◉' : '○'}
              </span>
              <span className={styles.stepLabel}>{step}</span>
              {isCurrent && <span className={styles.stepStatus}>진행 중</span>}
              {isDone && <span className={styles.stepStatusDone}>완료</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const ANALYSIS_DURATION_MS = ANALYSIS_STEPS.length * STEP_INTERVAL_MS + 400;
