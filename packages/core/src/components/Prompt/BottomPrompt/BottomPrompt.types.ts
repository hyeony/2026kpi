import { ReactNode } from 'react';

export type PromptButtonStatus = 'default' | 'typing' | 'responding';

export interface BottomPromptIcons {
    plus?: ReactNode;         // 파일 첨부 버튼 (+ 아이콘)
    send?: ReactNode;         // 전송 버튼 아이콘
    loading?: ReactNode;      // 응답 중 로딩 아이콘
    starOutlined?: ReactNode; // 북마크 비활성 아이콘
    starFilled?: ReactNode;   // 북마크 활성 아이콘
    fileText?: ReactNode;     // 파일 업로드 메뉴 아이콘
    picture?: ReactNode;      // 이미지 업로드 메뉴 아이콘
}

// 업로드된 파일의 상태 타입
export type FileStatus = 'normal' | 'error' | 'loading';

// 파일 정보 인터페이스
export interface PromptFile {
    id: string;
    name: string;
    url?: string;
    thumbUrl?: string;
    status: FileStatus;
    size?: number;
}

// 북마크 아이콘 상태
export type BookmarkStatus = 'normal' | 'hover' | 'selected';

// 공통 리스트 아이템 타입 (히스토리, 검색결과, 추천목록 등)
export interface PromptListItem {
    id: string;
    content: string;
    subContent?: string;
    icon?: ReactNode;
    timestamp?: number;
    metadata?: any;
}

// 공통 콜백 및 아이콘 설정
export interface AdditionalAction {
    icon: ReactNode;
    onClick: () => void;
    tooltip?: string;
    label?: string;
}

export interface BottomPromptProps {
    // 메세지 관련
    value?: string;
    onChange?: (value: string) => void;
    onSend?: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    status?: PromptButtonStatus; // default | typing | responding

    // 파일 관련
    files?: PromptFile[];
    onFileDelete?: (fileId: string) => void;
    onFileUpload?: (files: FileList) => void;
    showFileUpload?: boolean;

    // 히스토리 관련
    historyList?: PromptListItem[];
    isHistoryOpen?: boolean;
    onHistoryToggle?: (open: boolean) => void;
    historyMaxHeight?: number | string;

    // 북마크 관련
    bookmarkList?: PromptListItem[];
    isBookmarkOpen?: boolean;
    onBookmarkToggle?: (open: boolean) => void;
    showBookmark?: boolean;
    onBookmarkClick?: (item: PromptListItem) => void;

    // 추가 기능
    topTags?: ReactNode[]; // 인풋 상단 태그들
    additionalActions?: AdditionalAction[]; // 추가 아이콘 버튼들
    className?: string;

    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

    maxHeight?: number | string; // 인풋창이 늘어날 수 있는 최대 크기 (예: 200, '200px')

    icons?: BottomPromptIcons; // 커스텀 아이콘 교체
}