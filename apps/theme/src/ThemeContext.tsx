import { createContext, useContext, type ReactNode } from 'react';
import { getThemeStyles } from './styles';

export interface ThemeConfig {
  /** 컴포넌트·스타일 선택자에 쓰일 prefix (예: 'ds', 'myapp') */
  namespace: string;
}

const ThemeContext = createContext<ThemeConfig | null>(null);

const DEFAULT_NAMESPACE = 'ds';

export function useTheme(): ThemeConfig {
  const ctx = useContext(ThemeContext);
  return ctx ?? { namespace: DEFAULT_NAMESPACE };
}

export interface ThemeProviderProps {
  /** 커스텀 prefix. 스타일 선택자와 컴포넌트 클래스가 이 값으로 생성됩니다. */
  namespace?: string;
  children: ReactNode;
}

/**
 * namespace를 하위에 제공하고, 해당 prefix로 생성한 CSS를 주입합니다.
 * 스타일을 렌더 단계에서 <style>로 넣어서, 첫 페인트 전에 적용되어 깜빡임(FOUC)을 줄입니다.
 */
export function ThemeProvider({ namespace = DEFAULT_NAMESPACE, children }: ThemeProviderProps) {
  const css = getThemeStyles(namespace);

  return (
    <ThemeContext.Provider value={{ namespace }}>
      <style data-theme-namespace={namespace} dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </ThemeContext.Provider>
  );
}
