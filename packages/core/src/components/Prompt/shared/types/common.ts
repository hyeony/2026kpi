import { ReactNode } from 'react';

// 프롬프트 버튼의 상태 타입
export type PromptButtonStatus = 'default' | 'typing' | 'responding';

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