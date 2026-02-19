import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_NAMESPACE } from '@test2/core';
import { getThemeStyles } from './styles';

export interface ThemeConfig {
  namespace: string;
}

const ThemeContext = createContext<ThemeConfig | null>(null);

export function useTheme(): ThemeConfig {
  const ctx = useContext(ThemeContext);
  return ctx ?? { namespace: DEFAULT_NAMESPACE };
}

export interface ThemeProviderProps {
  namespace?: string;
  children: ReactNode;
}

/**
 * 기본 namespace(BUILD_PREFIX): 스타일은 사용 중인 컴포넌트 마운트 시 <head>에 지연 주입 (CSS import 불필요).
 * 커스텀 namespace: 여기서 해당 namespace 전체 스타일을 한 번에 주입.
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
