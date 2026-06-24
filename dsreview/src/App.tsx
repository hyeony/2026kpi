import { useCallback, useMemo, useState } from 'react';
import FileUploader from './components/FileUploader';
import ScoreCard from './components/ScoreCard';
import RiskCard from './components/RiskCard';
import MissingStateList from './components/MissingStateList';
import QuestionList from './components/QuestionList';
import QAChecklist from './components/QAChecklist';
import ComponentSpecList from './components/ComponentSpecList';
import DevPerspectiveList from './components/DevPerspectiveList';
import HandoffProgress from './components/HandoffProgress';
import SectionNav, { type ResultSection } from './components/SectionNav';
import ResultPreviewSkeleton from './components/ResultPreviewSkeleton';
import AnalysisLoadingState, { ANALYSIS_DURATION_MS } from './components/AnalysisLoadingState';
import {
  mockReviewData,
  formatReviewAsText,
  calcHandoffProgress,
  type QuestionAnswer,
  type ReviewQuestion,
  type ReviewResult,
} from './data/mockReview';
import './App.css';

function initQuestionAnswers(questions: ReviewQuestion[]): Record<string, QuestionAnswer> {
  return Object.fromEntries(
    questions.map((q) => [q.id, { answer: '', status: 'open' as const }]),
  );
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [extraQuestions, setExtraQuestions] = useState<ReviewQuestion[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [qaChecked, setQaChecked] = useState<boolean[]>([]);
  const [activeSection, setActiveSection] = useState<ResultSection>('diagnosis');
  const [copyFeedback, setCopyFeedback] = useState('');

  const allQuestions = useMemo(
    () => (result ? [...result.questions, ...extraQuestions] : []),
    [result, extraQuestions],
  );

  const handoffProgress = useMemo(
    () => calcHandoffProgress(allQuestions, questionAnswers, qaChecked),
    [allQuestions, questionAnswers, qaChecked],
  );

  const resolvedCount = useMemo(
    () =>
      allQuestions.filter(
        (q) =>
          questionAnswers[q.id]?.status === 'resolved' ||
          questionAnswers[q.id]?.status === 'ask-dev',
      ).length,
    [allQuestions, questionAnswers],
  );

  const checkedQACount = useMemo(() => qaChecked.filter(Boolean).length, [qaChecked]);

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setResult(null);
    setExtraQuestions([]);
    setActiveSection('diagnosis');

    setTimeout(() => {
      setResult(mockReviewData);
      setQuestionAnswers(initQuestionAnswers(mockReviewData.questions));
      setQaChecked(mockReviewData.qaChecklist.map(() => false));
      setIsAnalyzing(false);
    }, ANALYSIS_DURATION_MS);
  }, []);

  const handleAnswerChange = (id: string, update: Partial<QuestionAnswer>) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...update },
    }));
  };

  const handleAddQuestion = (question: string) => {
    const id = `custom-${Date.now()}`;
    const newQ: ReviewQuestion = {
      id,
      category: 'interaction',
      question,
      hint: '직접 추가한 질문입니다.',
    };
    setExtraQuestions((prev) => [...prev, newQ]);
    setQuestionAnswers((prev) => ({
      ...prev,
      [id]: { answer: '', status: 'open' },
    }));
  };

  const handleQAToggle = (index: number) => {
    setQaChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        formatReviewAsText(result, questionAnswers, qaChecked),
      );
      setCopyFeedback('복사됨!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch {
      setCopyFeedback('복사 실패');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <div>
              <h1>AI Spec Reviewer</h1>
              <p>개발자에게 넘기기 전, 디자인 스펙을 함께 점검하는 핸드오프 어시스턴트</p>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <aside className="sidebar">
          <FileUploader
            file={file}
            onFileChange={setFile}
            onAnalyze={runAnalysis}
            onSampleAnalyze={runAnalysis}
            isAnalyzing={isAnalyzing}
          />
        </aside>

        <section className="results">
          {isAnalyzing && <AnalysisLoadingState isActive={isAnalyzing} />}

          {!isAnalyzing && !result && <ResultPreviewSkeleton />}

          {!isAnalyzing && result && (
            <div className="results-content">
              <div className="results-toolbar">
                <h2>분석 결과</h2>
                <button type="button" className="copy-btn" onClick={handleCopy}>
                  {copyFeedback || '핸드오프 문서 복사'}
                </button>
              </div>

              <HandoffProgress
                progress={handoffProgress}
                resolvedQuestions={resolvedCount}
                totalQuestions={allQuestions.length}
                checkedQA={checkedQACount}
                totalQA={qaChecked.length}
              />

              <SectionNav active={activeSection} onChange={setActiveSection} />

              {activeSection === 'diagnosis' && (
                <div className="section-panel">
                  <ScoreCard score={result.score} summary={result.summary} />
                  <RiskCard risks={result.risks} />
                  <MissingStateList states={result.missingStates} />
                </div>
              )}

              {activeSection === 'dev-spec' && (
                <div className="section-panel">
                  <ComponentSpecList specs={result.componentSpecs} />
                  <DevPerspectiveList perspectives={result.devPerspectives} />
                </div>
              )}

              {activeSection === 'handoff' && (
                <div className="section-panel">
                  <div className="grid-two">
                    <QuestionList
                      questions={allQuestions}
                      answers={questionAnswers}
                      onAnswerChange={handleAnswerChange}
                      onAddQuestion={handleAddQuestion}
                    />
                    <QAChecklist
                      items={result.qaChecklist}
                      checked={qaChecked}
                      onToggle={handleQAToggle}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>AI Spec Reviewer · Hackathon Prototype · Mock Data</p>
      </footer>
    </div>
  );
}
