/**
 * 빌드 시점에 고정되는 prefix (환경변수 BUILD_PREFIX).
 * tsup define으로 치환되며, 미설정 시 'ds'.
 */
export const DEFAULT_NAMESPACE = process.env.BUILD_PREFIX ?? 'ds';

/**
 * 컴포넌트 루트에 붙일 클래스 접두사를 만듭니다.
 * theme에서 `${prefixCls('Button')}` 형태로 스타일 셀렉터에 사용할 수 있습니다.
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
