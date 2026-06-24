import styles from './ResultPreviewSkeleton.module.css';

const PREVIEW_SECTIONS = [
  'Spec Health Score',
  '구현 리스크',
  '권장 Props',
  '개발 관점 가이드',
  '질문·QA',
];

const VALUE_PROPS = [
  {
    icon: '⚡',
    title: '개발 관점 선제 점검',
    desc: '말줄임, loading/disabled, Empty 등 개발자가 먼저 묻는 항목을 자동으로 찾아줍니다.',
  },
  {
    icon: '🔧',
    title: 'Props·변형 가이드',
    desc: '버튼, 텍스트, 리스트 등 UI 요소별로 구현에 필요한 속성을 제안합니다.',
  },
  {
    icon: '💬',
    title: '질문 먼저 정리',
    desc: '핸드오프 전에 확인 질문을 정리하고, 개발자에게 넘길 핸드오프 문서를 만듭니다.',
  },
];

export default function ResultPreviewSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <span className={styles.badge}>Design ↔ Dev Bridge</span>
        <h2>디자이너와 개발자 사이, AI가 먼저 대화를 시작합니다</h2>
        <p>
          디자인 파일을 올리면 개발자에게 넘기기 전에 확인해야 할 리스크·Props·질문·QA 항목을
          자동으로 생성합니다. 개발 지식이 없어도 핸드오프 품질을 높일 수 있습니다.
        </p>

        <div className={styles.valueGrid}>
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className={styles.valueCard}>
              <span className={styles.valueIcon} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewHeader}>
          <span className={styles.previewLabel}>분석 결과 미리보기</span>
          <span className={styles.previewHint}>업로드 후 아래 항목이 생성됩니다</span>
        </div>

        <div className={styles.skeletonStack}>
          <div className={`${styles.skeletonCard} ${styles.scoreCard}`}>
            <div className={styles.skeletonRow}>
              <div className={`${styles.skeletonLine} ${styles.short}`} />
              <div className={`${styles.skeletonPill}`} />
            </div>
            <div className={styles.scoreBody}>
              <div className={styles.skeletonRing} />
              <div className={styles.skeletonTextBlock}>
                <div className={`${styles.skeletonLine} ${styles.medium}`} />
                <div className={`${styles.skeletonLine} ${styles.long}`} />
                <div className={`${styles.skeletonLine} ${styles.long}`} />
              </div>
            </div>
            <span className={styles.sectionTag}>{PREVIEW_SECTIONS[0]}</span>
          </div>

          <div className={styles.skeletonCard}>
            <div className={`${styles.skeletonLine} ${styles.medium}`} />
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.riskItem}>
                <div className={`${styles.skeletonPill} ${styles.small}`} />
                <div className={`${styles.skeletonLine} ${styles.long}`} />
                <div className={`${styles.skeletonLine} ${styles.full}`} />
              </div>
            ))}
            <span className={styles.sectionTag}>{PREVIEW_SECTIONS[1]}</span>
          </div>

          <div className={styles.skeletonCard}>
            <div className={`${styles.skeletonLine} ${styles.medium}`} />
            {[1, 2].map((i) => (
              <div key={i} className={styles.propsItem}>
                <div className={`${styles.skeletonLine} ${styles.long}`} />
                <div className={styles.tagRow}>
                  {[1, 2, 3].map((j) => (
                    <div key={j} className={styles.skeletonTag} />
                  ))}
                </div>
              </div>
            ))}
            <span className={styles.sectionTag}>{PREVIEW_SECTIONS[2]}</span>
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.skeletonCard}>
              <div className={`${styles.skeletonLine} ${styles.medium}`} />
              {[1, 2].map((i) => (
                <div key={i} className={`${styles.skeletonLine} ${styles.full}`} />
              ))}
              <span className={styles.sectionTag}>{PREVIEW_SECTIONS[3]}</span>
            </div>
            <div className={styles.skeletonCard}>
              <div className={`${styles.skeletonLine} ${styles.medium}`} />
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.checkRow}>
                  <div className={styles.skeletonCheckbox} />
                  <div className={`${styles.skeletonLine} ${styles.full}`} />
                </div>
              ))}
              <span className={styles.sectionTag}>{PREVIEW_SECTIONS[4]}</span>
            </div>
          </div>
        </div>

        <div className={styles.blurOverlay} aria-hidden="true" />
      </div>
    </div>
  );
}
