import React, { useContext } from "react";
import { MessageBlockProps } from "./MessageBubble.types";
import { getMessageBubbleStyles, getMessageBubbleStyleId } from "./MessageBubble.style";
import { useComponentStyle } from "../../hooks/useComponentStyle";
import { getClass } from "../../prefix";
import { cn } from "../../utils/cn";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";

/**
 * 공통 레이아웃만: content + 아래 액션 + align(left/right).
 * content 시각(말풍선·블록)은 User/Agent에서 wrapper 클래스로 처리.
 */
export function MessageBlock({
  content,
  actions,
  align,
  className,
}: MessageBlockProps) {
  const { prefix } = useContext(HnineDSContext);

  useComponentStyle({
    componentId: COMPONENT_NAMES.MessageBubble,
    styleFn: getMessageBubbleStyles,
    getStyleId: getMessageBubbleStyleId,
  });

  const p = COMPONENT_NAMES.MessageBubble;
  const cls = (modifier?: string) => getClass(prefix, p, modifier);

  return (
    <div className={cn(cls("root"), cls(`root-${align}`), className)}>
      {content}
      {actions != null && <div className={cn(cls("actions"), align === "right" && cls("actions-right"))}>{actions}</div>}
    </div>
  );
}
