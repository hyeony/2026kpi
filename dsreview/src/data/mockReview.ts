export type RiskLevel = 'critical' | 'warning' | 'info';

export interface Risk {
  level: RiskLevel;
  title: string;
  description: string;
}

export interface ReviewResult {
  score: number;
  summary: string;
  risks: Risk[];
  missingStates: string[];
  questions: string[];
  qaChecklist: string[];
}

export const mockReviewData: ReviewResult = {
  score: 78,
  summary:
    '전반적인 화면 구조는 명확하지만 예외 상태와 입력 제한 조건 정의가 부족합니다.',
  risks: [
    {
      level: 'critical',
      title: 'Error 상태 정의 없음',
      description:
        'API 실패 또는 네트워크 오류 발생 시 사용자에게 보여줄 UI가 필요합니다.',
    },
    {
      level: 'warning',
      title: '긴 텍스트 대응 필요',
      description:
        '타이틀/버튼/리스트 항목의 최대 길이와 줄바꿈 기준이 필요합니다.',
    },
    {
      level: 'info',
      title: 'Loading 상태 추가 권장',
      description: '데이터 조회 또는 제출 중 사용자 피드백이 필요합니다.',
    },
  ],
  missingStates: ['Loading', 'Error', 'Empty', 'Disabled', 'Long Text'],
  questions: [
    '데이터가 없을 때 Empty 화면은 어떻게 표시하나요?',
    'API 실패 시 재시도 버튼이 필요한가요?',
    '버튼 클릭 후 중복 제출 방지는 필요한가요?',
    '모바일에서 긴 텍스트는 몇 줄까지 노출하나요?',
  ],
  qaChecklist: [
    '네트워크 오류 상황 테스트',
    '데이터 0건일 때 화면 확인',
    '긴 텍스트 입력 시 레이아웃 깨짐 확인',
    '버튼 연속 클릭 시 중복 요청 여부 확인',
    '모바일 360px 화면 확인',
  ],
};

export function formatReviewAsText(result: ReviewResult): string {
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
    '## 개발자 확인 질문',
    ...result.questions.map((q, i) => `${i + 1}. ${q}`),
    '',
    '## QA 체크리스트',
    ...result.qaChecklist.map((item) => `- [ ] ${item}`),
  ];
  return lines.join('\n');
}
