import { useCallback, useState } from 'react';
import FileUploader from './components/FileUploader';
import ScoreCard from './components/ScoreCard';
import RiskCard from './components/RiskCard';
import MissingStateList from './components/MissingStateList';
import QuestionList from './components/QuestionList';
import QAChecklist from './components/QAChecklist';
import {
  mockReviewData,
  formatReviewAsText,
  type ReviewResult,
} from './data/mockReview';
import './App.css';

const ANALYZE_DELAY_MS = 1500;

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setResult(mockReviewData);
      setIsAnalyzing(false);
    }, ANALYZE_DELAY_MS);
  }, []);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatReviewAsText(result));
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
              <p>디자인 스펙을 프론트엔드 개발자 관점에서 리뷰합니다</p>
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
          {isAnalyzing && (
            <div className="loading-state">
              <div className="spinner" />
              <p>스펙을 분석하고 있습니다...</p>
              <span className="loading-hint">구현 리스크와 누락 상태를 점검 중</span>
            </div>
          )}

          {!isAnalyzing && !result && (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <h2>분석 결과가 여기에 표시됩니다</h2>
              <p>디자인 파일을 업로드하고 분석하기를 누르거나, 샘플 분석을 실행해보세요.</p>
            </div>
          )}

          {!isAnalyzing && result && (
            <div className="results-content">
              <div className="results-toolbar">
                <h2>분석 결과</h2>
                <button type="button" className="copy-btn" onClick={handleCopy}>
                  {copyFeedback || '결과 복사'}
                </button>
              </div>

              <ScoreCard score={result.score} summary={result.summary} />
              <RiskCard risks={result.risks} />

              <div className="grid-two">
                <MissingStateList states={result.missingStates} />
                <QuestionList questions={result.questions} />
              </div>

              <QAChecklist items={result.qaChecklist} />
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
