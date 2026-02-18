import type { ComponentProps } from 'react';
import { Button as CoreButton } from '@test2/core';
import { useTheme } from '../ThemeContext';

export type ButtonProps = ComponentProps<typeof CoreButton>;

export function Button(props: ButtonProps) {
  const { namespace } = useTheme();
  return <CoreButton namespace={namespace} {...props} />;
}
