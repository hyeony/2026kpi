import { createPrefixCls } from '@test1/core';
import { tokens } from '../tokens';

export function getButtonStyles(namespace: string): string {
  const btn = createPrefixCls(namespace)('Button');

  return `
.${btn} {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid ${tokens.colorBorder};
  border-radius: ${tokens.radiusSm};
  background-color: ${tokens.colorBg};
  color: ${tokens.colorText};
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}
.${btn}:hover {
  background-color: ${tokens.colorBgHover};
  border-color: ${tokens.colorBorderHover};
}
.${btn}:active {
  background-color: ${tokens.colorBgMuted};
}
.${btn}:focus-visible {
  outline: 2px solid ${tokens.colorPrimary};
  outline-offset: 2px;
}
`.trim();
}
