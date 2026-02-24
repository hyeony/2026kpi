// src/components/prompt/shared/utils/file.ts (또는 index.tsx 내부에 작성)
export const formatFileName = (name: string, maxLength: number = 20): string => {
    if (name.length <= maxLength) return name;

    const extensionIndex = name.lastIndexOf('.');
    // 확장자가 없는 경우
    if (extensionIndex === -1) {
        return name.slice(0, maxLength) + '...';
    }

    const extension = name.slice(extensionIndex); // .pdf
    const baseName = name.slice(0, extensionIndex); // 파일명부분

    // 앞부분을 자르고 확장자를 붙임
    // 예: "매우_길어서_무슨_파일인지_모를_보고서.pdf" -> "매우_길어서_무슨_...보고서.pdf"
    const charsToShow = maxLength - extension.length - 3; // '...' 공간 제외
    if (charsToShow <= 0) return '...' + extension;

    return baseName.slice(0, charsToShow) + '...' + extension;
};