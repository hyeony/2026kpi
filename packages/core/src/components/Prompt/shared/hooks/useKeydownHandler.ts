import { KeyboardEvent } from 'react';

interface UseKeydownHandlerProps {
    onSend: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export const useKeydownHandler = ({
                                      onSend,
                                      disabled,
                                      loading
                                  }: UseKeydownHandlerProps) => {

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // 한글 입력 시 엔터 중복 이벤트 방지 (Native property)
        if (e.nativeEvent.isComposing) return;

        if (e.key === 'Enter') {
            // Shift + Enter는 줄바꿈이므로 아무것도 하지 않음 (기본 동작 허용)
            if (e.shiftKey) return;

            // Enter만 누른 경우 전송
            e.preventDefault();

            if (!disabled && !loading) {
                onSend();
            }
        }
    };

    return { handleKeyDown };
};