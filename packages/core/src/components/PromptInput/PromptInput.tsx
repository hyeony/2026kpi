import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { PromptInputProps } from "./PromptInput.types";
import { getPromptInputStyles, getPromptInputStyleId } from "./PromptInput.style";
import { useComponentStyle } from "../../hooks/useComponentStyle";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";

/** 기본 전송 아이콘 (화살표) */
function DefaultSubmitIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 13V3M8 3L4 7M8 3L12 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 로딩 스피너 (CSS animation, 클래스명 주입) */
function LoadingSpinner({ spinnerCls }: { spinnerCls: string }) {
  return <span className={spinnerCls} aria-label="전송 중" />;
}

export function PromptInput({
  size = "md",
  placeholder = "메시지를 입력하세요...",
  value,
  onValueChange,
  onSubmit,
  submitOnEnter = true,
  loading = false,
  disabled = false,
  maxRows = 200,
  actions,
  submitIcon,
  maxLength,
  className,
  ...htmlProps
}: PromptInputProps) {
  const { prefix } = useContext(HnineDSContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = React.useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // on-demand 스타일 주입
  useComponentStyle({
    componentId: COMPONENT_NAMES.PromptInput,
    styleFn: getPromptInputStyles,
    getStyleId: getPromptInputStyleId,
  });

  const p = COMPONENT_NAMES.PromptInput;
  // className은 내부 클래스명 뒤에 공백으로 붙임
  const rootCls = [
    getClass(prefix, p),
    getClass(prefix, p, size),
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const textareaCls = getClass(prefix, p, "textarea");
  const footerCls = getClass(prefix, p, "footer");
  const actionsCls = getClass(prefix, p, "actions");
  const submitCls = getClass(prefix, p, "submit");
  const spinnerCls = getClass(prefix, p, "submit-loading");

  // 글자수 카운터 클래스
  const overRatio = maxLength ? currentValue.length / maxLength : 0;
  const countCls = [
    getClass(prefix, p, "count"),
    overRatio >= 1
      ? getClass(prefix, p, "count-over")
      : overRatio >= 0.9
      ? getClass(prefix, p, "count-warn")
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  // textarea 자동 높이 조절
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxRows)}px`;
  }, [maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

  // 값 변경 핸들러
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newVal = e.target.value;
      if (!isControlled) setInternalValue(newVal);
      onValueChange?.(newVal);
    },
    [isControlled, onValueChange]
  );

  // 전송 처리
  const handleSubmit = useCallback(() => {
    const trimmed = currentValue.trim();
    if (!trimmed || loading || disabled) return;
    onSubmit?.(trimmed);
    if (!isControlled) {
      setInternalValue("");
      // 높이 초기화
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      });
    }
  }, [currentValue, loading, disabled, onSubmit, isControlled]);

  // Enter 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (submitOnEnter && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [submitOnEnter, handleSubmit]
  );

  const isSubmitDisabled =
    disabled || loading || currentValue.trim().length === 0;

  return (
    <div className={rootCls}>
      {/* textarea */}
      <textarea
        ref={textareaRef}
        className={textareaCls}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
        {...htmlProps}
      />

      {/* 하단 바 */}
      <div className={footerCls}>
        {/* 좌측 액션 슬롯 */}
        {actions && <div className={actionsCls}>{actions}</div>}

        {/* 글자수 카운터 */}
        {maxLength && (
          <span className={countCls}>
            {currentValue.length} / {maxLength}
          </span>
        )}

        {/* 전송 버튼 */}
        <button
          type="button"
          className={submitCls}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          aria-label="전송"
        >
          {loading ? (
            <LoadingSpinner spinnerCls={spinnerCls} />
          ) : (
            submitIcon ?? <DefaultSubmitIcon />
          )}
        </button>
      </div>
    </div>
  );
}
