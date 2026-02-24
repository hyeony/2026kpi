import React from 'react';
import { PromptFile } from '../types/common';
import { formatFileName } from '../utils/file';

const FileTextIcon = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 00-8 8v48a8 8 0 008 8h384a8 8 0 008-8v-48a8 8 0 00-8-8H320zm0 136a8 8 0 00-8 8v48a8 8 0 008 8h384a8 8 0 008-8v-48a8 8 0 00-8-8H320zm0 136a8 8 0 00-8 8v48a8 8 0 008 8h184a8 8 0 008-8v-48a8 8 0 00-8-8H320z" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
    </svg>
);

const LoadingIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"
         style={{ animation: 'hnineds-bp-spin 1s linear infinite', ...style }}>
        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
    </svg>
);

interface FilePreviewListProps {
    files: PromptFile[];
    onFileDelete?: (id: string) => void;
    containerStyle?: React.CSSProperties;
    className?: string; // useStyles에서 정의한 fileList 클래스 연결용
}

export const FilePreviewList: React.FC<FilePreviewListProps> = ({
                                                                    files,
                                                                    onFileDelete,
                                                                    containerStyle,
                                                                    className
                                                                }) => {
    const isImageFile = (file: PromptFile) =>
        file.thumbUrl || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

    if (files.length === 0) return null;

    return (
        <div className={className} style={containerStyle}>
            {files.map((file) => {
                const isImg = isImageFile(file);
                const ext = file.name.split('.').pop()?.toUpperCase();

                if (isImg) {
                    return (
                        <div key={file.id} className="image-chip-custom">
                            {file.thumbUrl ? (
                                <img src={file.thumbUrl} alt="preview" />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#eee' }} />
                            )}
                            <div className="delete-overlay" onClick={() => onFileDelete?.(file.id)}>
                                <CloseIcon />
                            </div>
                            {file.status === 'loading' && (
                                <div className="loading-overlay">
                                    <LoadingIcon />
                                </div>
                            )}
                            {/*에러 상태 처리필요*/}
                            {file.status === 'error' && (
                                <div className="loading-overlay">
                                    <LoadingIcon />
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <div key={file.id} className="file-chip-custom">
                        <div className="file-top">
                            <FileTextIcon />
                            <span className="ext-text">{ext}</span>
                        </div>
                        <div className="file-name">{formatFileName(file.name, 22)}</div>
                        <div className="close-btn" onClick={() => onFileDelete?.(file.id)}>
                            <CloseIcon />
                        </div>
                        {file.status === 'loading' && (
                            <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
                                <LoadingIcon style={{ fontSize: 12 }} />
                            </div>
                        )}
                        {/*에러 상태 처리 필요*/}
                        {file.status === 'error' && (
                            <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
                                <LoadingIcon style={{ fontSize: 12 }} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};