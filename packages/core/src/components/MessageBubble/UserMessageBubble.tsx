import React, { useContext } from "react";
import { UserMessageBubbleProps } from "./MessageBubble.types";
import { MessageBlock } from "./MessageBlock";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";
import { CopyIcon, EditIcon, BookmarkIcon } from "./MessageBubble.icons";

/** 1장일 때 single 이미지 타입: width/height 있으면 가로/세로/정사각, 없으면 정사각 fallback */
function getSingleImageType(img: { width?: number; height?: number }): "square" | "horizon" | "portrait" {
  const w = img.width;
  const h = img.height;
  if (w == null || h == null) return "square";
  if (w > h) return "horizon";
  if (h > w) return "portrait";
  return "square";
}

/**
 * 사용자 메시지: 항상 우측 정렬, 말풍선 스타일.
 * 이미지: 1장(정사각/250x200/200x250), 2장~ 120x120 그리드, 5장 시 위3 아래2.
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

  const imageBlock =
    images != null && images.length > 0 ? (
      <div className={imgWrapCls}>
        {images.length === 1 ? (
          <img
            src={images[0].src}
            alt={images[0].alt ?? ""}
            className={[
              imgSingleCls,
              getClass(prefix, p, "user-img-single", getSingleImageType(images[0])),
            ].join(" ")}
          />
        ) : (
          <div
            className={[
              imgGridCls,
              images.length === 2 && getClass(prefix, p, "user-img-grid-2"),
              images.length === 3 && getClass(prefix, p, "user-img-grid-3"),
              images.length === 4 && getClass(prefix, p, "user-img-grid-4"),
              images.length === 5 && getClass(prefix, p, "user-img-grid-5"),
              images.length >= 6 && getClass(prefix, p, "user-img-grid-6up"),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {images.map((item, i) => (
              <img key={i} src={item.src} alt={item.alt ?? ""} className={imgGridItemCls} />
            ))}
          </div>
        )}
      </div>
    ) : null;

  const userContent = (
    <div className={contentCls}>
      {imageBlock}
      {children}
    </div>
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
