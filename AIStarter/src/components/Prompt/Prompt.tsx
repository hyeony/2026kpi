import type { KeyboardEvent, TextareaHTMLAttributes } from 'react';
import { FabButton, SendIcon } from '../FabButton';
import './Prompt.css';

export interface PromptProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onSubmit'> {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  submitLabel?: string;
}

export function Prompt({
  value,
  onChange,
  onSubmit,
  placeholder = '메시지를 입력하세요...',
  submitLabel = '전송',
  disabled = false,
  className = '',
  ...rest
}: PromptProps) {
  const canSubmit = value.trim().length > 0 && !disabled;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSubmit) onSubmit();
    }
  };

  return (
    <div className={`prompt ${className}`.trim()}>
      <textarea
        className="prompt__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        aria-label="프롬프트 입력"
        {...rest}
      />
      <FabButton
        className="prompt__submit"
        aria-label={submitLabel}
        icon={<SendIcon />}
        disabled={!canSubmit}
        onClick={onSubmit}
      />
    </div>
  );
}
