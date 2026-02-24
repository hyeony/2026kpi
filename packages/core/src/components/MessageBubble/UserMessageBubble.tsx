import React, { useContext, useMemo, useState, useEffect } from "react";
import { UserMessageBubbleProps } from "./MessageBubble.types";
import type { UserMessageImage, UserMessageFile } from "./MessageBubble.types";
import { MessageBlock } from "./MessageBlock";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";
import { CopyIcon, EditIcon, BookmarkIcon, FileIcon, CloseIcon } from "./MessageBubble.icons";

/** React가 아무것도 렌더하지 않는 값(null, undefined, false, true). 0·"" 등은 콘텐츠로 간주 */
function hasRenderableContent(node: React.ReactNode): boolean {
  return node != null && node !== false && node !== true;
}

/** 유효한 이미지만 (src 있는 항목). 런타임 가드 */
function filterValidImages(list: UserMessageImage[] | undefined): UserMessageImage[] {
  if (list == null) return [];
  return list.filter((img) => img != null && img.src != null && String(img.src).trim() !== "");
}

/** fileName이 있는 파일만. 빈 이름은 렌더 스킵 */
function filterValidFiles(list: UserMessageFile[] | undefined): UserMessageFile[] {
  if (list == null) return [];
  return list.filter(
    (f) => f != null && f.fileName != null && String(f.fileName).trim() !== ""
  );
}

/**
 * 사용자 메시지: 항상 우측 정렬, 말풍선 스타일.
 * 이미지: 1장=정사각(200×200), 2장~=120×120 그리드. 파일: 블록으로 세로 쌓임.
 * 액션: showX로 표시 여부, onX로 동작(없으면 noop 또는 추후 내부 기본 동작).
 */
export function UserMessageBubble({
  children,
  images,
  files,
  showCopy = true,
  onCopy,
  showEdit = true,
  onEdit,
  showBookmark = true,
  onBookmark,
  isEditing = false,
  editInitialText = "",
  onCancelEdit,
  onConfirmEdit,
  onDeleteImage,
  onDeleteFile,
  className,
}: UserMessageBubbleProps) {
  const { prefix } = useContext(HnineDSContext);
  const p = COMPONENT_NAMES.MessageBubble;
  const cls = (modifier?: string) => getClass(prefix, p, modifier);

  const validImages = useMemo(() => filterValidImages(images), [images]);
  const validFiles = useMemo(() => filterValidFiles(files), [files]);
  const hasImages = validImages.length > 0;
  const hasFiles = validFiles.length > 0;
  const hasTextContent = hasRenderableContent(children);

  const [draftText, setDraftText] = useState(editInitialText);
  useEffect(() => {
    if (isEditing) setDraftText(editInitialText);
  }, [isEditing, editInitialText]);

  /** 텍스트·이미지·파일 모두 없으면 빈 버블 금지 (편집 모드가 아닐 때) */
  if (!isEditing && !hasImages && !hasFiles && !hasTextContent) {
    return null;
  }

  /** 편집 모드: wrapper 배경 변경 + 취소/확인 + 텍스트 textarea + 파일 삭제 버튼 */
  if (isEditing) {
    const imageBlockEditing = hasImages ? (
      <div className={cls("user-img-wrap")}>
        {validImages.length === 1 ? (
          <div className={[cls("user-img-edit-item-wrap"), cls("user-img-single-square-wrap")].join(" ")}>
            <img
              src={validImages[0].src}
              alt={validImages[0].alt ?? ""}
              className={cls("user-img-single-square")}
            />
            <button
              type="button"
              className={cls("user-img-delete-btn")}
              onClick={() => onDeleteImage?.(0)}
              aria-label="이미지 삭제"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <div
            className={[
              cls("user-img-grid"),
              validImages.length === 2 && cls("user-img-grid-2"),
              validImages.length === 4 && cls("user-img-grid-4"),
              (validImages.length === 3 || validImages.length >= 5) && cls("user-img-grid-3col"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {validImages.map((item, i) => (
              <div key={i} className={cls("user-img-edit-item-wrap")}>
                <img src={item.src} alt={item.alt ?? ""} className={cls("user-img-grid-item")} />
                <button
                  type="button"
                  className={cls("user-img-delete-btn")}
                  onClick={() => onDeleteImage?.(i)}
                  aria-label="이미지 삭제"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null;

    const fileListWithDelete = hasFiles ? (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: hasImages ? 8 : 0 }}>
        {validFiles.map((file, i) => (
          <div key={i} className={cls("user-file-edit-wrap")}>
            <div className={cls("user-file-item")}>
              <span className={cls("user-file-icon")}>
                <FileIcon />
              </span>
              <div className={cls("user-file-body")}>
                <div className={cls("user-file-name")}>{String(file.fileName ?? "").trim() || "—"}</div>
                {file.fileType != null && file.fileType !== "" && (
                  <div className={cls("user-file-type")}>{file.fileType}</div>
                )}
              </div>
            </div>
            <button
              type="button"
              className={cls("user-img-delete-btn")}
              onClick={() => onDeleteFile?.(i)}
              aria-label="파일 삭제"
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    ) : null;

    const textArea = (
      <div className={cls("edit-text-wrap")} style={hasImages || hasFiles ? { marginTop: 8 } : undefined}>
        <textarea
          className={cls("edit-textarea")}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="메시지를 입력하세요"
          aria-label="메시지 수정"
        />
      </div>
    );

    const editActions = (
      <div className={cls("edit-actions")}>
        <button type="button" className={[cls("edit-btn"), cls("edit-btn-cancel")].join(" ")} onClick={onCancelEdit}>
          취소
        </button>
        <button type="button" className={[cls("edit-btn"), cls("edit-btn-confirm")].join(" ")} onClick={() => onConfirmEdit?.(draftText)}>
          확인
        </button>
      </div>
    );

    const editingContent = (
      <div className={cls("content-user-editing")}>
        {imageBlockEditing}
        {fileListWithDelete}
        {textArea}
        {editActions}
      </div>
    );

    return (
      <MessageBlock content={editingContent} align="right" className={className} />
    );
  }

  const actions = (
    <>
      {showCopy && (
        <button type="button" className={cls("action-btn")} onClick={onCopy ?? (() => {})} aria-label="복사">
          <CopyIcon />
        </button>
      )}
      {showEdit && (
        <button type="button" className={cls("action-btn")} onClick={onEdit ?? (() => {})} aria-label="편집">
          <EditIcon />
        </button>
      )}
      {showBookmark && (
        <button type="button" className={cls("action-btn")} onClick={onBookmark ?? (() => {})} aria-label="북마크">
          <BookmarkIcon />
        </button>
      )}
    </>
  );

  const hasActions = showCopy || showEdit || showBookmark;

  const contentCls = cls("content-user");

  const imageBlock =
    hasImages ? (
      <div className={cls("user-img-wrap")}>
        {validImages.length === 1 ? (
          <img
            src={validImages[0].src}
            alt={validImages[0].alt ?? ""}
            className={cls("user-img-single-square")}
          />
        ) : (
          <div
            className={[
              cls("user-img-grid"),
              validImages.length === 2 && cls("user-img-grid-2"),
              validImages.length === 4 && cls("user-img-grid-4"),
              (validImages.length === 3 || validImages.length >= 5) && cls("user-img-grid-3col"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {validImages.map((item, i) => (
              <img key={i} src={item.src} alt={item.alt ?? ""} className={cls("user-img-grid-item")} />
            ))}
          </div>
        )}
      </div>
    ) : null;

  type SegmentType = "image" | "file" | "text";
  const segments: { type: SegmentType; node: React.ReactNode }[] = [];
  if (hasImages) segments.push({ type: "image", node: imageBlock });
  if (hasFiles) {
    validFiles.forEach((file, i) => {
      segments.push({
        type: "file",
        node: (
          <div key={`file-${i}`} className={cls("user-file-item")}>
            <span className={cls("user-file-icon")}>
              <FileIcon />
            </span>
            <div className={cls("user-file-body")}>
              <div className={cls("user-file-name")}>{String(file.fileName ?? "").trim() || "—"}</div>
              {file.fileType != null && file.fileType !== "" && (
                <div className={cls("user-file-type")}>{file.fileType}</div>
              )}
            </div>
          </div>
        ),
      });
    });
  }
  if (hasTextContent) segments.push({ type: "text", node: children });

  const userContent =
    segments.length === 0 ? (
      <div className={contentCls}>{children}</div>
    ) : (
      <>
        {segments.map((seg, i) => (
          <div
            key={i}
            className={[
              seg.type === "file" ? cls("content-user-file") : cls("content-user"),
              i > 0 ? cls("content-user-next") : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {seg.node}
          </div>
        ))}
      </>
    );

  return (
    <MessageBlock
      content={userContent}
      actions={hasActions ? actions : undefined}
      align="right"
      className={className}
    />
  );
}