import React, { useContext } from "react";
import { ButtonProps } from "./Button.types";
import { getButtonStyles, getButtonStyleId } from "./Button.style";
import { useComponentStyle } from "../../hooks/useComponentStyle";
import { getClass } from "../../prefix";
import { COMPONENT_NAMES } from "../../componentNames";
import { HnineDSContext } from "../../context/HnineDSContext";

export function Button({
  variant = "primary",
  size = "md",
  className,
  startIcon,
  endIcon,
  children,
  ...htmlProps
}: ButtonProps) {
  const { prefix } = useContext(HnineDSContext);

  // on-demand 스타일 주입 (globalStyleRegistry에 override 없을 때만 core 스타일 주입)
  useComponentStyle({
    componentId: COMPONENT_NAMES.Button,
    styleFn: getButtonStyles,
    getStyleId: getButtonStyleId,
  });

  // prefix 기반 클래스명 생성 (모두 - 로 연결)
  const rootCls = getClass(prefix, COMPONENT_NAMES.Button);
  const variantCls = getClass(prefix, COMPONENT_NAMES.Button, variant);
  const sizeCls = getClass(prefix, COMPONENT_NAMES.Button, size);
  const iconCls = getClass(prefix, COMPONENT_NAMES.Button, "icon");
  const labelCls = getClass(prefix, COMPONENT_NAMES.Button, "label");

  // className은 내부 클래스명 뒤에 공백으로 붙임
  const mergedClassName = [rootCls, variantCls, sizeCls, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...htmlProps} className={mergedClassName}>
      {startIcon && (
        <span className={iconCls}>{startIcon}</span>
      )}
      {children && (
        <span className={labelCls}>{children}</span>
      )}
      {endIcon && (
        <span className={iconCls}>{endIcon}</span>
      )}
    </button>
  );
}
