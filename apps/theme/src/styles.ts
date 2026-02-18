import { getButtonStyles } from './Button/styles';
import { getPromptStyles } from './Prompt/styles';

export function getThemeStyles(namespace: string): string {
  return [getButtonStyles(namespace), getPromptStyles(namespace)].join('\n\n');
}
