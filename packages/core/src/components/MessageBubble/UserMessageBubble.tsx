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
  const btnCls = getClass(prefix, p, "action-btn");
  const imgWrapCls = getClass(prefix, p, "user-img-wrap");
  const imgSingleCls = getClass(prefix, p, "user-img-single");
  const imgGridCls = getClass(prefix, p, "user-img-grid");
  const imgGridItemCls = getClass(prefix, p, "user-img-grid-item");
  const fileItemCls = getClass(prefix, p, "user-file-item");
  const fileIconCls = getClass(prefix, p, "user-file-icon");
  const fileBodyCls = getClass(prefix, p, "user-file-body");
  const fileNameCls = getClass(prefix, p, "user-file-name");
  const fileTypeCls = getClass(prefix, p, "user-file-type");

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
    const contentUserEditingCls = getClass(prefix, p, "content-user-editing");
    const editTextWrapCls = getClass(prefix, p, "edit-text-wrap");
    const editTextareaCls = getClass(prefix, p, "edit-textarea");
    const editActionsCls = getClass(prefix, p, "edit-actions");
    const editBtnCancelCls = getClass(prefix, p, "edit-btn-cancel");
    const editBtnConfirmCls = getClass(prefix, p, "edit-btn-confirm");
    const fileEditWrapCls = getClass(prefix, p, "user-file-edit-wrap");
    const imgEditWrapCls = getClass(prefix, p, "user-img-edit-item-wrap");
    const imgSingleSquareWrapCls = getClass(prefix, p, "user-img-single-square-wrap");
    const imgDeleteBtnCls = getClass(prefix, p, "user-img-delete-btn");
    const contentClsBase = [getClass(prefix, p, "content"), getClass(prefix, p, "content", "user"), contentUserEditingCls].join(" ");

    const imageBlockEditing = hasImages ? (
      <div className={imgWrapCls}>
        {validImages.length === 1 ? (
          <div className={[imgEditWrapCls, imgSingleSquareWrapCls].join(" ")}>
            <img
              src={validImages[0].src}
              alt={validImages[0].alt ?? ""}
              className={[imgSingleCls, getClass(prefix, p, "user-img-single-square")].join(" ")}
            />
            <button
              type="button"
              className={imgDeleteBtnCls}
              onClick={() => onDeleteImage?.(0)}
              aria-label="이미지 삭제"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <div
            className={[
              imgGridCls,
              validImages.length === 2 && getClass(prefix, p, "user-img-grid-2"),
              validImages.length === 4 && getClass(prefix, p, "user-img-grid-4"),
              (validImages.length === 3 || validImages.length >= 5) && getClass(prefix, p, "user-img-grid-3col"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {validImages.map((item, i) => (
              <div key={i} className={imgEditWrapCls}>
                <img src={item.src} alt={item.alt ?? ""} className={imgGridItemCls} />
                <button
                  type="button"
                  className={imgDeleteBtnCls}
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
          <div key={i} className={fileEditWrapCls}>
            <div className={fileItemCls}>
              <span className={fileIconCls}>
                <FileIcon />
              </span>
              <div className={fileBodyCls}>
                <div className={fileNameCls}>{String(file.fileName ?? "").trim() || "—"}</div>
                {file.fileType != null && file.fileType !== "" && (
                  <div className={fileTypeCls}>{file.fileType}</div>
                )}
              </div>
            </div>
            <button
              type="button"
              className={imgDeleteBtnCls}
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
      <div className={editTextWrapCls} style={hasImages || hasFiles ? { marginTop: 8 } : undefined}>
        <textarea
          className={editTextareaCls}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="메시지를 입력하세요"
          aria-label="메시지 수정"
        />
      </div>
    );

    const editActions = (
      <div className={editActionsCls}>
        <button type="button" className={[getClass(prefix, p, "edit-btn"), editBtnCancelCls].join(" ")} onClick={onCancelEdit}>
          취소
        </button>
        <button type="button" className={[getClass(prefix, p, "edit-btn"), editBtnConfirmCls].join(" ")} onClick={() => onConfirmEdit?.(draftText)}>
          확인
        </button>
      </div>
    );

    const editingContent = (
      <div className={contentClsBase}>
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
        <button type="button" className={btnCls} onClick={onCopy ?? (() => {})} aria-label="복사">
          <CopyIcon />
        </button>
      )}
      {showEdit && (
        <button type="button" className={btnCls} onClick={onEdit ?? (() => {})} aria-label="편집">
          <EditIcon />
        </button>
      )}
      {showBookmark && (
        <button type="button" className={btnCls} onClick={onBookmark ?? (() => {})} aria-label="북마크">
          <BookmarkIcon />
        </button>
      )}
    </>
  );

  const hasActions = showCopy || showEdit || showBookmark;

  const contentCls = [getClass(prefix, p, "content"), getClass(prefix, p, "content", "user")].join(" ");

  const imageBlock =
    hasImages ? (
      <div className={imgWrapCls}>
        {validImages.length === 1 ? (
          <img
            src={validImages[0].src}
            alt={validImages[0].alt ?? ""}
            className={[imgSingleCls, getClass(prefix, p, "user-img-single-square")].join(" ")}
          />
        ) : (
          <div
            className={[
              imgGridCls,
              validImages.length === 2 && getClass(prefix, p, "user-img-grid-2"),
              validImages.length === 4 && getClass(prefix, p, "user-img-grid-4"),
              (validImages.length === 3 || validImages.length >= 5) && getClass(prefix, p, "user-img-grid-3col"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {validImages.map((item, i) => (
              <img key={i} src={item.src} alt={item.alt ?? ""} className={imgGridItemCls} />
            ))}
          </div>
        )}
      </div>
    ) : null;

  const contentUserNextCls = getClass(prefix, p, "content-user-next");
  const contentUserFileCls = getClass(prefix, p, "content-user-file");

  type SegmentType = "image" | "file" | "text";
  const segments: { type: SegmentType; node: React.ReactNode }[] = [];
  if (hasImages) segments.push({ type: "image", node: imageBlock });
  if (hasFiles) {
    validFiles.forEach((file, i) => {
      segments.push({
        type: "file",
        node: (
          <div key={`file-${i}`} className={fileItemCls}>
            <span className={fileIconCls}>
              <FileIcon />
            </span>
            <div className={fileBodyCls}>
              <div className={fileNameCls}>{String(file.fileName ?? "").trim() || "—"}</div>
              {file.fileType != null && file.fileType !== "" && (
                <div className={fileTypeCls}>{file.fileType}</div>
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
              contentCls,
              seg.type === "file" ? contentUserFileCls : "",
              i > 0 ? contentUserNextCls : "",
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