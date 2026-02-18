import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react';
import { useRef } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';
import { Button } from '../Button';

export interface PromptProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onCopy'> {
  /** 입력값 (제어 컴포넌트) */
  value?: string;
  /** 입력 변경 시 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** 파일 추가 클릭 시 (내부 input[type=file] change 이벤트) */
  onFileAdd?: (files: FileList | null) => void;
  /** 복사 버튼 클릭 시 (현재 입력값이 인자로 전달됨) */
  onCopy?: (value: string) => void;
  /** 파일 추가 버튼에 사용할 라벨/접근성용 */
  fileTriggerLabel?: string;
  /** 복사 버튼에 사용할 라벨/접근성용 */
  copyLabel?: string;
  /** 추가 루트 className */
  className?: string;
  /** 커스텀 prefix 사용 시 theme와 동일한 namespace 전달 */
  namespace?: string;
}

/**
 * AI 사이트용 프롬프트 입력. input + 왼쪽 파일추가 버튼 + 바깥쪽 복사 버튼.
 * namespace를 주면 해당 prefix로 클래스를 붙이며, theme 스타일과 동일한 선택자 사용.
 */
export function Prompt({
  value,
  onChange,
  onFileAdd,
  onCopy,
  fileTriggerLabel = '파일 추가',
  copyLabel = '복사',
  className,
  placeholder,
  disabled,
  namespace,
  style: inputPropsStyle,
  ...restInputProps
}: PromptProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const p = namespace != null ? createPrefixCls(namespace) : (name: string) => prefixCls(name);
  const ROOT_CLS = p('Prompt');
  const innerCls = `${ROOT_CLS}-inner`;
  const fileTriggerCls = `${ROOT_CLS}-file-trigger`;
  const inputCls = `${ROOT_CLS}-input`;
  const copyCls = `${ROOT_CLS}-copy`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFileAdd?.(e.target.files ?? null);
    e.target.value = '';
  };

  const handleCopy = () => {
    if (value != null) onCopy?.(value);
  };

  /* 기능에 필요한 최소 구조 스타일만 인라인. 디자인(색·테두리 등)은 theme에서. */
  const rootStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    gap: '0.5rem',
  };
  const innerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  };
  const inputStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    ...inputPropsStyle,
  };

  return (
    <div className={[ROOT_CLS, className].filter(Boolean).join(' ')} style={rootStyle}>
      <div className={innerCls} style={innerStyle}>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          aria-hidden="true"
          tabIndex={-1}
          onChange={handleFileChange}
        />
        <Button
          type="button"
          className={fileTriggerCls}
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          aria-label={fileTriggerLabel}
          title={fileTriggerLabel}
          namespace={namespace}
        >
          {fileTriggerLabel}
        </Button>
        <input
          type="text"
          className={inputCls}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="프롬프트 입력"
          style={inputStyle}
          {...restInputProps}
        />
      </div>
      <Button
        type="button"
        className={copyCls}
        onClick={handleCopy}
        disabled={disabled}
        aria-label={copyLabel}
        title={copyLabel}
        namespace={namespace}
      >
        {copyLabel}
      </Button>
    </div>
  );
}
