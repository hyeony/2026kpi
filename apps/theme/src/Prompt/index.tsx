import type { ComponentProps } from 'react';
import { Prompt as CorePrompt } from '@test2/core';
import { useTheme } from '../ThemeContext';
import { useInjectStyles } from '../injectStyles';
import { getPromptStyles } from './styles';

export type PromptProps = ComponentProps<typeof CorePrompt>;

export function Prompt(props: PromptProps) {
  const { namespace } = useTheme();
  useInjectStyles('Prompt', namespace, getPromptStyles);
  return <CorePrompt namespace={namespace} {...props} />;
}
