import React, { useContext } from "react";
import { UserMessageBubbleProps } from "./MessageBubble.types";
import { MessageBlock } from "./MessageBlock";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";
import { CopyIcon, EditIcon, BookmarkIcon } from "./MessageBubble.icons";

/**
 * 사용자 메시지: 항상 우측 정렬, 말풍선 스타일.
 * 이미지: 1장=정사각(200×200), 2장~=120×120 그리드. 크기는 말풍선에서 강제.
 * 액션: showX로 표시 여부, onX로 동작(없으면 noop 또는 추후 내부 기본 동작).
 */
export function UserMessageBubble({
  children,
  images,
  showCopy = true,
  onCopy,
  showEdit = true,
  onEdit,
  showBookmark = true,
  onBookmark,
  className,
}: UserMessageBubbleProps) {
  const { prefix } = useContext(HnineDSContext);
  const p = COMPONENT_NAMES.MessageBubble;
  const btnCls = getClass(prefix, p, "action-btn");
  const imgWrapCls = getClass(prefix, p, "user-img-wrap");
  const imgSingleCls = getClass(prefix, p, "user-img-single");
  const imgGridCls = getClass(prefix, p, "user-img-grid");
  const imgGridItemCls = getClass(prefix, p, "user-img-grid-item");

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

  const hasImages = images != null && images.length > 0;
  const hasTextContent = Boolean(children);

  const imageBlock =
    hasImages ? (
      <div className={imgWrapCls}>
        {images!.length === 1 ? (
          <img
            src={images![0].src}
            alt={images![0].alt ?? ""}
            className={[imgSingleCls, getClass(prefix, p, "user-img-single-square")].join(" ")}
          />
        ) : (
          <div
            className={[
              imgGridCls,
              images!.length === 2 && getClass(prefix, p, "user-img-grid-2"),
              images!.length === 4 && getClass(prefix, p, "user-img-grid-4"),
              (images!.length === 3 || images!.length >= 5) && getClass(prefix, p, "user-img-grid-3col"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {images!.map((item, i) => (
              <img key={i} src={item.src} alt={item.alt ?? ""} className={imgGridItemCls} />
            ))}
          </div>
        )}
      </div>
    ) : null;

  const contentUserNextCls = getClass(prefix, p, "content-user-next");

  const userContent =
    hasImages && hasTextContent ? (
      <>
        <div className={contentCls}>{imageBlock}</div>
        <div className={[contentCls, contentUserNextCls].join(" ")}>{children}</div>
      </>
    ) : hasImages ? (
      <div className={contentCls}>{imageBlock}</div>
    ) : hasTextContent ? (
      <div className={contentCls}>{children}</div>
    ) : (
      <div className={contentCls}>{children}</div>
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