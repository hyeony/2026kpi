import { useRef, useEffect, useCallback } from 'react';

export const usePromptFocus = (autoFocus?: boolean) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const focus = useCallback(() => {
        const el = inputRef.current;
        if (el) {
            el.focus();

            // 커서를 텍스트의 끝으로 이동시키는 로직 (Native 방식)
            const length = el.value.length;
            el.setSelectionRange(length, length);
        }
    }, []);

    useEffect(() => {
        if (autoFocus) {
            const timer = setTimeout(() => focus(), 0);
            return () => clearTimeout(timer);
        }
    }, [autoFocus, focus]);

    return { inputRef, focus };
};