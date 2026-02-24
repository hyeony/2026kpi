import { ReactNode } from 'react';
import { PromptFile, PromptListItem, PromptButtonStatus } from '../shared/types/common';

export interface TopPromptIcons {
    plus?: ReactNode;         // 파일 첨부 버튼 (+ 아이콘)
    send?: ReactNode;         // 전송 버튼 아이콘
    loading?: ReactNode;      // 응답 중 로딩 아이콘
    bulb?: ReactNode;         // 추천 아이템 아이콘
    arrowUpRight?: ReactNode; // 검색결과 적용 아이콘
    fileText?: ReactNode;     // 파일 업로드 메뉴 아이콘
    picture?: ReactNode;      // 이미지 업로드 메뉴 아이콘
}

export interface TopPromptProps {
    // 메세지 관련
    value?: string;
    onChange?: (value: string) => void;
    onSend?: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    status?: PromptButtonStatus; // 'default' | 'typing' | 'responding'

    // 로고 및 툴팁
    logoIcon?: ReactNode;
    logoTooltip?: string;
    isSearching?: boolean; // 로고 테두리 회전 애니메이션 제어

    // 검색 결과 및 추천 목록 (하향 전개)
    searchResults?: PromptListItem[];
    onSearchResultClick?: (item: PromptListItem) => void;

    recommendations?: PromptListItem[];
    onRecommendationClick?: (item: PromptListItem) => void;

    // 커스텀 아이템 렌더러 (하이라이트 등 적용을 위해)
    renderItem?: (item: PromptListItem) => ReactNode;

    // 파일 관련
    files?: PromptFile[];
    onFileDelete?: (fileId: string) => void;
    onFileUpload?: (files: FileList) => void;

    // 크기 제어
    maxHeight?: number | string;

    // 추가 옵션
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

    icons?: TopPromptIcons; // 커스텀 아이콘 교체
}

export type { PromptFile, PromptListItem };
