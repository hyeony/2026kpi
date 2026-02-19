import { useEffect } from 'react';
import { DEFAULT_NAMESPACE } from '@test2/core';

const STYLE_ID_PREFIX = 'test2-styles';

/**
 * 기본 namespace(BUILD_PREFIX)일 때만 해당 컴포넌트 스타일을 <head>에 한 번만 주입.
 * 커스텀 namespace는 ThemeProvider에서 일괄 주입하므로 여기서는 스킵.
 */
export function useInjectStyles(
  componentName: string,
  namespace: string,
  getStyles: (ns: string) => string
): void {
  useEffect(() => {
    if (namespace !== DEFAULT_NAMESPACE) return;

    const id = `${STYLE_ID_PREFIX}-${componentName}-${namespace}`;
    if (document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.setAttribute('data-test2-component', componentName);
    style.setAttribute('data-test2-namespace', namespace);
    style.textContent = getStyles(namespace);
    document.head.appendChild(style);
  }, [componentName, namespace, getStyles]);
}
