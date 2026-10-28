export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  messages: ChatMessage[];
  draft: string;
}

export const MAX_MESSAGE_LENGTH = 8000;
export const MAX_HISTORY = 30;

export function isChatMessage(value: unknown): value is ChatMessage {
  return (
    typeof value === 'object' && value !== null &&
    'role' in value && (value.role === 'user' || value.role === 'assistant') &&
    'content' in value && typeof value.content === 'string' &&
    value.content.trim().length > 0 && value.content.length <= MAX_MESSAGE_LENGTH
  );
}
