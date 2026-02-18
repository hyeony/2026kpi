import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react';
import { useRef } from 'react';
import { prefixCls, createPrefixCls } from '../prefixCls';
import { Button } from '../Button';

export interface PromptProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onCopy'> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileAdd?: (files: FileList | null) => void;
  onCopy?: (value: string) => void;
  fileTriggerLabel?: string;
  copyLabel?: string;
  className?: string;
  namespace?: string;
}

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
