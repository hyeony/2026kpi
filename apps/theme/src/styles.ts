import { getButtonStyles } from './Button/styles';
import { getPromptStyles } from './Prompt/styles';

/**
 * 컴포넌트별 스타일을 모아 한 번에 반환합니다.
 * ThemeProvider가 이 문자열을 <style>로 주입합니다.
 */
export function getThemeStyles(namespace: string): string {
  return [getButtonStyles(namespace), getPromptStyles(namespace)].join('\n\n');
}
