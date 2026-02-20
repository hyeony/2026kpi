import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 유형 @default "primary" */
  variant?: ButtonVariant;
  /** 버튼 크기 @default "md" */
  size?: ButtonSize;
  /** 좌측 아이콘 */
  startIcon?: React.ReactNode;
  /** 우측 아이콘 */
  endIcon?: React.ReactNode;
}
