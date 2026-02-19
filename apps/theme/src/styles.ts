import { getButtonStyles } from './Button/styles';
import { getPromptStyles } from './Prompt/styles';
import { getBubbleMessageStyles } from './BubbleMessage/styles';

export function getThemeStyles(namespace: string): string {
  return [
    getButtonStyles(namespace),
    getPromptStyles(namespace),
    getBubbleMessageStyles(namespace),
  ].join('\n\n');
}
