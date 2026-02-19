import type { ComponentProps } from 'react';
import {
  BubbleMessage as CoreBubbleMessage,
  AgentMessage as CoreAgentMessage,
  UserMessage as CoreUserMessage,
} from '@test2/core';
import { useTheme } from '../ThemeContext';
import { useInjectStyles } from '../injectStyles';
import { getBubbleMessageStyles } from './styles';

export type BubbleMessageProps = ComponentProps<typeof CoreBubbleMessage>;
export function BubbleMessage(props: BubbleMessageProps) {
  const { namespace } = useTheme();
  useInjectStyles('BubbleMessage', namespace, getBubbleMessageStyles);
  return <CoreBubbleMessage namespace={namespace} {...props} />;
}

export type AgentMessageProps = ComponentProps<typeof CoreAgentMessage>;
export function AgentMessage(props: AgentMessageProps) {
  const { namespace } = useTheme();
  return <CoreAgentMessage namespace={namespace} {...props} />;
}

export type UserMessageProps = ComponentProps<typeof CoreUserMessage>;
export function UserMessage(props: UserMessageProps) {
  const { namespace } = useTheme();
  return <CoreUserMessage namespace={namespace} {...props} />;
}

export type {
  BubbleMessageVariant,
  UserMessageContent,
  BubbleActionItem,
} from '@test2/core';
