import type { ComponentProps } from 'react';
import { Prompt as CorePrompt } from '@test1/core';
import { useTheme } from '../ThemeContext';

export type PromptProps = ComponentProps<typeof CorePrompt>;

/** theme namespace를 자동으로 넘기는 Prompt */
export function Prompt(props: PromptProps) {
  const { namespace } = useTheme();
  return <CorePrompt namespace={namespace} {...props} />;
}
