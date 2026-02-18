import type { ComponentProps } from 'react';
import { Button as CoreButton } from '@test1/core';
import { useTheme } from '../ThemeContext';

export type ButtonProps = ComponentProps<typeof CoreButton>;

/** theme namespace를 자동으로 넘기는 Button */
export function Button(props: ButtonProps) {
  const { namespace } = useTheme();
  return <CoreButton namespace={namespace} {...props} />;
}
