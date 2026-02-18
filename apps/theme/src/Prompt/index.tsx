import type { ComponentProps } from 'react';
import { Prompt as CorePrompt } from '@test2/core';
import { useTheme } from '../ThemeContext';

export type PromptProps = ComponentProps<typeof CorePrompt>;

export function Prompt(props: PromptProps) {
  const { namespace } = useTheme();
  return <CorePrompt namespace={namespace} {...props} />;
}
