const DEFAULT_NAMESPACE = 'ds';

/**
 * 컴포넌트 루트에 붙일 클래스 접두사를 만듭니다.
 * theme에서 `${prefixCls('Button')}` 형태로 스타일 셀렉터에 사용할 수 있습니다.
 *
 * @param componentName - 컴포넌트 이름 (예: 'Button', 'Input')
 * @param namespace - 선택적 네임스페이스 (기본: 'ds')
 * @returns 예: 'ds-button'
 */
export function prefixCls(
  componentName: string,
  namespace: string = DEFAULT_NAMESPACE
): string {
  const kebab = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  return `${namespace}-${kebab}`;
}

export function createPrefixCls(namespace: string = DEFAULT_NAMESPACE) {
  return (componentName: string) => prefixCls(componentName, namespace);
}
