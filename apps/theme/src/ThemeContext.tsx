import { createContext, useContext, type ReactNode } from 'react';
import { getThemeStyles } from './styles';

export interface ThemeConfig {
  namespace: string;
}

const ThemeContext = createContext<ThemeConfig | null>(null);

const DEFAULT_NAMESPACE = 'ds';

export function useTheme(): ThemeConfig {
  const ctx = useContext(ThemeContext);
  return ctx ?? { namespace: DEFAULT_NAMESPACE };
}

export interface ThemeProviderProps {
  namespace?: string;
  children: ReactNode;
}

/**
 * namespace='ds': 빌드타임 CSS(theme.css) 사용. import '@test2/theme/theme.css' 필수.
 * 커스텀 namespace: 런타임 주입 (깜빡임 가능).
 */
export function ThemeProvider({ namespace = DEFAULT_NAMESPACE, children }: ThemeProviderProps) {
  const isDefaultNs = namespace === DEFAULT_NAMESPACE;

  return (
    <ThemeContext.Provider value={{ namespace }}>
      {!isDefaultNs && (
        <style data-theme-namespace={namespace} dangerouslySetInnerHTML={{ __html: getThemeStyles(namespace) }} />
      )}
      {children}
    </ThemeContext.Provider>
  );
}
