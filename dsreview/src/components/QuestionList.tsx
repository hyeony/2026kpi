import styles from './QuestionList.module.css';

interface QuestionListProps {
  questions: string[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>개발자 확인 질문</h3>
      <ol className={styles.list}>
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
    </div>
  );
}
