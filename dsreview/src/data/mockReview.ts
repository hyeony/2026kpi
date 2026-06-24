export type RiskLevel = 'critical' | 'warning' | 'info';

export type QuestionCategory = 'layout' | 'interaction' | 'data' | 'accessibility';
export type QuestionStatus = 'open' | 'resolved' | 'ask-dev';

export interface Risk {
  level: RiskLevel;
  title: string;
  description: string;
}

export interface ComponentSpec {
  element: string;
  location: string;
  suggestedProps: string[];
  note: string;
}

export interface DevPerspective {
  topic: string;
  designGap: string;
  devExpectation: string;
  example: string;
}

export interface ReviewQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  hint: string;
}

export interface ReviewResult {
  score: number;
  summary: string;
  risks: Risk[];
  missingStates: string[];
  componentSpecs: ComponentSpec[];
  devPerspectives: DevPerspective[];
  questions: ReviewQuestion[];
  qaChecklist: string[];
}

export const categoryLabels: Record<QuestionCategory, string> = {
  layout: '레이아웃',
  interaction: '인터랙션',
  data: '데이터',
  accessibility: '접근성',
};

export const mockReviewData: ReviewResult = {
  score: 78,
  summary:
    '화면 구조는 명확하지만, 예외 상태·텍스트 오버플로·컴포넌트 props 정의가 부족합니다. 개발 핸드오프 전 질문 4건을 정리하면 구현 리스크를 크게 줄일 수 있습니다.',
  risks: [
    {
      level: 'critical',
      title: 'Error 상태 정의 없음',
      description:
        'API 실패·네트워크 오류 시 사용자에게 보여줄 UI가 없습니다. 재시도 버튼 포함 여부도 함께 정의해 주세요.',
    },
    {
      level: 'warning',
      title: '텍스트 말줄임(ellipsis) 규칙 미정',
      description:
        '카드 타이틀·리스트 항목·버튼 라벨의 최대 줄 수, 말줄임 후 툴팁 노출 여부가 정의되지 않았습니다.',
    },
    {
      level: 'warning',
      title: '버튼 상태 변형 누락',
      description:
        'Primary 버튼의 loading·disabled 상태가 디자인에 없습니다. 제출 중 중복 클릭 방지에 필수입니다.',
    },
    {
      level: 'info',
      title: 'Loading 상태 추가 권장',
      description: '데이터 조회·제출 중 스켈레톤 또는 스피너 등 사용자 피드백이 필요합니다.',
    },
  ],
  missingStates: ['Loading', 'Error', 'Empty', 'Disabled', 'Hover', 'Long Text'],
  componentSpecs: [
    {
      element: 'Primary Button',
      location: '하단 CTA',
      suggestedProps: ['loading', 'disabled', 'size', 'fullWidth'],
      note: '제출 중 loading=true, 유효성 오류 시 disabled 처리 필요',
    },
    {
      element: 'Card Title',
      location: '리스트 카드',
      suggestedProps: ['maxLines', 'truncate', 'tooltipOnEllipsis'],
      note: '2줄 초과 시 말줄임 + hover 시 전체 텍스트 툴팁 권장',
    },
    {
      element: 'List Item',
      location: '메인 리스트',
      suggestedProps: ['emptyState', 'loadingState', 'errorState', 'onRetry'],
      note: '0건·로딩·에러 각각 별도 UI 또는 공통 Empty 컴포넌트 사용',
    },
    {
      element: 'Input Field',
      location: '검색/필터',
      suggestedProps: ['maxLength', 'errorMessage', 'clearable', 'disabled'],
      note: '최대 글자 수·에러 메시지 위치·지우기 버튼 여부 정의 필요',
    },
  ],
  devPerspectives: [
    {
      topic: '텍스트 말줄임',
      designGap: '긴 타이틀이 카드 레이아웃을 깨뜨릴 수 있는 케이스가 정의되지 않음',
      devExpectation:
        'maxLines(예: 2)와 truncate 방식을 정하고, 말줄임 시 툴팁·전체 보기 중 하나를 선택해 주세요.',
      example: 'title이 40자 초과 → 2줄 말줄임 + hover 툴팁',
    },
    {
      topic: '버튼 중복 제출',
      designGap: '제출 버튼의 loading/disabled 상태 디자인 없음',
      devExpectation:
        'API 요청 중 버튼을 비활성화하거나 스피너를 표시합니다. 두 상태 모두 디자인이 있으면 구현이 일관됩니다.',
      example: 'onClick → loading 2초 → success/error',
    },
    {
      topic: 'Empty State',
      designGap: '데이터 0건일 때 화면이 없음',
      devExpectation:
        '빈 목록은 의도된 상태입니다. 일러스트·안내 문구·다음 액션(CTA) 버튼을 포함한 Empty UI를 추가해 주세요.',
      example: '검색 결과 0건 → "조건을 변경해 보세요" + 필터 초기화 버튼',
    },
  ],
  questions: [
    {
      id: 'q1',
      category: 'data',
      question: '데이터가 없을 때 Empty 화면은 어떻게 표시하나요?',
      hint: '일러스트, 안내 문구, CTA 버튼 유무를 함께 정리하면 좋습니다.',
    },
    {
      id: 'q2',
      category: 'interaction',
      question: 'API 실패 시 재시도 버튼이 필요한가요?',
      hint: '에러 메시지 문구와 버튼 위치(인라인 vs 토스트)도 함께 결정해 주세요.',
    },
    {
      id: 'q3',
      category: 'interaction',
      question: '버튼 클릭 후 중복 제출 방지 UI가 필요한가요?',
      hint: 'loading 스피너 vs disabled 상태 중 선호하는 방식을 알려주세요.',
    },
    {
      id: 'q4',
      category: 'layout',
      question: '긴 텍스트는 몇 줄까지 노출하고, 말줄임 후 툴팁을 보여주나요?',
      hint: '모바일(360px)과 데스크톱에서 줄 수가 다를 수 있습니다.',
    },
    {
      id: 'q5',
      category: 'accessibility',
      question: '키보드만으로 모든 인터랙션이 가능해야 하나요?',
      hint: '포커스 링, Tab 순서, Enter/Space 동작 여부를 확인해 주세요.',
    },
  ],
  qaChecklist: [
    '네트워크 오류 상황 테스트',
    '데이터 0건일 때 Empty 화면 확인',
    '긴 텍스트(40자+) 입력 시 레이아웃·말줄임 확인',
    '버튼 연속 클릭 시 중복 요청 여부 확인',
    '버튼 loading/disabled 상태 시각 확인',
    '모바일 360px 화면 확인',
  ],
};

export interface QuestionAnswer {
  answer: string;
  status: QuestionStatus;
}

export function formatReviewAsText(
  result: ReviewResult,
  questionAnswers?: Record<string, QuestionAnswer>,
  qaChecked?: boolean[],
): string {
  const lines: string[] = [
    `Spec Health Score: ${result.score}/100`,
    '',
    '## 구현 가능성 요약',
    result.summary,
    '',
    '## 우선순위별 이슈',
    ...result.risks.map(
      (r) => `[${r.level.toUpperCase()}] ${r.title}\n${r.description}`,
    ),
    '',
    '## 누락된 상태값',
    ...result.missingStates.map((s) => `- ${s}`),
    '',
    '## 컴포넌트별 권장 Props',
    ...result.componentSpecs.map(
      (c) =>
        `### ${c.element} (${c.location})\nProps: ${c.suggestedProps.join(', ')}\n${c.note}`,
    ),
    '',
    '## 개발 관점 가이드',
    ...result.devPerspectives.map(
      (d) =>
        `### ${d.topic}\n- 디자인 갭: ${d.designGap}\n- 개발 기대: ${d.devExpectation}\n- 예시: ${d.example}`,
    ),
    '',
    '## 개발자 확인 질문',
    ...result.questions.map((q, i) => {
      const ans = questionAnswers?.[q.id];
      const statusLabel =
        ans?.status === 'resolved'
          ? ' [확정]'
          : ans?.status === 'ask-dev'
            ? ' [개발자에게 질문]'
            : '';
      const answerText = ans?.answer ? `\n   답변: ${ans.answer}` : '';
      return `${i + 1}. [${categoryLabels[q.category]}] ${q.question}${statusLabel}${answerText}`;
    }),
    '',
    '## QA 체크리스트',
    ...result.qaChecklist.map((item, i) => {
      const checked = qaChecked?.[i] ? 'x' : ' ';
      return `- [${checked}] ${item}`;
    }),
  ];
  return lines.join('\n');
}

export function calcHandoffProgress(
  questions: ReviewQuestion[],
  questionAnswers: Record<string, QuestionAnswer>,
  qaChecked: boolean[],
): number {
  if (questions.length === 0 && qaChecked.length === 0) return 0;

  const resolvedCount = questions.filter(
    (q) =>
      questionAnswers[q.id]?.status === 'resolved' ||
      questionAnswers[q.id]?.status === 'ask-dev',
  ).length;
  const questionProgress =
    questions.length > 0 ? (resolvedCount / questions.length) * 50 : 0;

  const checkedCount = qaChecked.filter(Boolean).length;
  const qaProgress =
    qaChecked.length > 0 ? (checkedCount / qaChecked.length) * 50 : 0;

  return Math.round(questionProgress + qaProgress);
}
