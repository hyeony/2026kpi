import { useState, useCallback } from 'react';
import { PromptFile } from '../types/common';

export const useFileUpload = (initialFiles: PromptFile[] = []) => {
    const [files, setFiles] = useState<PromptFile[]>(initialFiles);

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
    }, []);

    const addFile = useCallback((file: PromptFile) => {
        setFiles((prev) => [...prev, file]);
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    return {
        files,
        setFiles,
        removeFile,
        addFile,
        clearFiles
    };
};