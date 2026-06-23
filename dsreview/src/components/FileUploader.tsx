import { useCallback, useRef, useState } from 'react';
import styles from './FileUploader.module.css';

interface FileUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  onSampleAnalyze: () => void;
  isAnalyzing: boolean;
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'];

function isAcceptedFile(file: File): boolean {
  return ACCEPTED_TYPES.includes(file.type) || /\.(png|jpe?g|webp|gif|pdf)$/i.test(file.name);
}

export default function FileUploader({
  file,
  onFileChange,
  onAnalyze,
  onSampleAnalyze,
  isAnalyzing,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = useCallback(
    (selected: File | null) => {
      if (!selected) return;
      if (!isAcceptedFile(selected)) {
        setError('PNG, JPG, WEBP, GIF, PDF 파일만 업로드할 수 있습니다.');
        return;
      }
      setError('');
      onFileChange(selected);
    },
    [onFileChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const clearFile = () => {
    onFileChange(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>디자인 파일 업로드</h2>
      <p className={styles.subtitle}>이미지 또는 PDF를 드래그하거나 선택하세요</p>

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className={styles.hiddenInput}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>{file.type.includes('pdf') ? '📄' : '🖼️'}</span>
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.fileSize}>
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.uploadIcon}>↑</span>
            <span>파일을 여기에 놓거나 클릭하여 선택</span>
            <span className={styles.hint}>PNG, JPG, WEBP, GIF, PDF</span>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        {file && (
          <button type="button" className={styles.secondaryBtn} onClick={clearFile}>
            파일 제거
          </button>
        )}
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={onAnalyze}
          disabled={!file || isAnalyzing}
        >
          {isAnalyzing ? '분석 중...' : '분석하기'}
        </button>
      </div>

      <div className={styles.divider}>
        <span>또는</span>
      </div>

      <button
        type="button"
        className={styles.sampleBtn}
        onClick={onSampleAnalyze}
        disabled={isAnalyzing}
      >
        샘플 분석 보기
      </button>
    </div>
  );
}
