import type { ComponentProps } from 'react';
import { Button as CoreButton } from '@test2/core';
import { useTheme } from '../ThemeContext';
import { useInjectStyles } from '../injectStyles';
import { getButtonStyles } from './styles';

export type ButtonProps = ComponentProps<typeof CoreButton>;

export function Button(props: ButtonProps) {
  const { namespace } = useTheme();
  useInjectStyles('Button', namespace, getButtonStyles);
  return <CoreButton namespace={namespace} {...props} />;
}
