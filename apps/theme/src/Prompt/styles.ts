import { createPrefixCls } from '@test2/core';
import { tokens } from '../tokens';

export function getPromptStyles(namespace: string): string {
  const p = createPrefixCls(namespace);
  const prompt = p('Prompt');
  const btn = p('Button');

  return `
.${prompt} {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  width: 100%;
  max-width: 640px;
}
.${prompt}-inner {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  background-color: ${tokens.colorBg};
  border: 1px solid ${tokens.colorBorder};
  border-radius: ${tokens.radiusMd};
  transition: border-color 0.15s, box-shadow 0.15s;
}
.${prompt}-inner:focus-within {
  border-color: ${tokens.colorPrimary};
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
.${prompt}-file-trigger.${btn} {
  flex-shrink: 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: none;
  border-radius: ${tokens.radiusSm};
  background-color: ${tokens.colorBgMuted};
  color: ${tokens.colorTextMuted};
  cursor: pointer;
}
.${prompt}-file-trigger.${btn}:hover {
  background-color: ${tokens.colorBorderHover};
}
.${prompt}-file-trigger.${btn}:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.${prompt}-input {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${tokens.colorText};
  background: transparent;
  border: none;
  outline: none;
}
.${prompt}-input::placeholder {
  color: ${tokens.colorPlaceholder};
}
.${prompt}-input:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
.${prompt}-copy.${btn} {
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid ${tokens.colorBorder};
  border-radius: ${tokens.radiusMd};
  background-color: ${tokens.colorBg};
  color: ${tokens.colorTextMuted};
  cursor: pointer;
}
.${prompt}-copy.${btn}:hover {
  background-color: ${tokens.colorBgHover};
  border-color: ${tokens.colorBorderHover};
}
.${prompt}-copy.${btn}:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`.trim();
}
