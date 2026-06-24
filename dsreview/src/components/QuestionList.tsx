import { useState } from 'react';
import {
  categoryLabels,
  type QuestionAnswer,
  type QuestionStatus,
  type ReviewQuestion,
} from '../data/mockReview';
import styles from './QuestionList.module.css';

interface QuestionListProps {
  questions: ReviewQuestion[];
  answers: Record<string, QuestionAnswer>;
  onAnswerChange: (id: string, update: Partial<QuestionAnswer>) => void;
  onAddQuestion: (question: string) => void;
}

const statusOptions: { value: QuestionStatus; label: string }[] = [
  { value: 'open', label: '미정' },
  { value: 'resolved', label: '확정' },
  { value: 'ask-dev', label: '개발자에게 질문' },
];

export default function QuestionList({
  questions,
  answers,
  onAnswerChange,
  onAddQuestion,
}: QuestionListProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = () => {
    const trimmed = newQuestion.trim();
    if (!trimmed) return;
    onAddQuestion(trimmed);
    setNewQuestion('');
    setShowAddForm(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>개발자 확인 질문</h3>
        <p className={styles.subtitle}>
          핸드오프 전에 미리 정리해 두면 개발 단계에서 되묻는 횟수가 줄어듭니다
        </p>
      </div>

      <ol className={styles.list}>
        {questions.map((q) => {
          const answer = answers[q.id] ?? { answer: '', status: 'open' as const };

          return (
            <li key={q.id} className={styles.item}>
              <div className={styles.questionTop}>
                <span className={styles.category}>{categoryLabels[q.category]}</span>
                <p className={styles.question}>{q.question}</p>
                {q.hint && <p className={styles.hint}>{q.hint}</p>}
              </div>

              <div className={styles.controls}>
                <div className={styles.statusGroup} role="group" aria-label="질문 상태">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`${styles.statusBtn} ${answer.status === opt.value ? styles[opt.value] : ''}`}
                      onClick={() => onAnswerChange(q.id, { status: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <textarea
                  className={styles.answerInput}
                  placeholder="메모 또는 답변을 적어 두세요..."
                  value={answer.answer}
                  onChange={(e) => onAnswerChange(q.id, { answer: e.target.value })}
                  rows={2}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {showAddForm ? (
        <div className={styles.addForm}>
          <textarea
            className={styles.answerInput}
            placeholder="개발자에게 확인하고 싶은 질문을 입력하세요"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={2}
            autoFocus
          />
          <div className={styles.addActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowAddForm(false)}>
              취소
            </button>
            <button type="button" className={styles.addBtn} onClick={handleAdd}>
              질문 추가
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className={styles.addTrigger} onClick={() => setShowAddForm(true)}>
          + 직접 질문 추가
        </button>
      )}
    </div>
  );
}
