import { useEffect, RefObject } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    handler: () => void
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // ref가 없거나, 클릭된 대상이 ref의 자식 요소라면 무시
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};