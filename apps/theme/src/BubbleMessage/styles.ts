import { createPrefixCls } from '@test2/core';
import { tokens } from '../tokens';

export function getBubbleMessageStyles(namespace: string): string {
  const p = createPrefixCls(namespace);
  const bubble = p('BubbleMessage');
  const agentMsg = p('AgentMessage');
  const userMsg = p('UserMessage');

  return `
.${bubble} {
  max-width: 85%;
  padding: 0.75rem 1rem;
  border-radius: ${tokens.radiusMd};
  word-break: break-word;
}
.${bubble}--agent {
  align-self: flex-start;
  background-color: ${tokens.colorBgMuted};
  border: 1px solid ${tokens.colorBorder};
}
.${bubble}--user {
  align-self: flex-end;
  background-color: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.25);
}
.${agentMsg} {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.${agentMsg}-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${tokens.colorBorder};
}
.${agentMsg}-action {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${tokens.colorTextMuted};
  background: transparent;
  border: none;
  border-radius: ${tokens.radiusSm};
  cursor: pointer;
}
.${agentMsg}-action:hover {
  color: ${tokens.colorText};
  background-color: ${tokens.colorBgHover};
}
.${userMsg}-text {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${tokens.colorText};
}
.${userMsg}-images {
  display: grid;
  gap: 0.375rem;
  border-radius: ${tokens.radiusSm};
  overflow: hidden;
}
.${userMsg}-images--single {
  grid-template-columns: 1fr;
  max-width: 280px;
}
.${userMsg}-images--double {
  grid-template-columns: 1fr 1fr;
  max-width: 320px;
}
.${userMsg}-images--triple {
  grid-template-columns: repeat(3, 1fr);
  max-width: 360px;
}
.${userMsg}-images--multi {
  grid-template-columns: repeat(2, 1fr);
  max-width: 360px;
}
.${userMsg}-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  cursor: pointer;
  border-radius: ${tokens.radiusSm};
}
.${userMsg}-image:hover {
  opacity: 0.95;
}
.${userMsg}-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
}
.${userMsg}-action {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${tokens.colorTextMuted};
  background: transparent;
  border: none;
  border-radius: ${tokens.radiusSm};
  cursor: pointer;
}
.${userMsg}-action:hover {
  color: ${tokens.colorPrimary};
  background-color: rgba(59, 130, 246, 0.1);
}
`.trim();
}
