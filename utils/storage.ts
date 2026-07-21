import { Conversation } from "../types/chat";

const STORAGE_KEY = "ai-research-agent";

export function saveConversations(
  conversations: Conversation[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversations)
  );
}

export function loadConversations(): Conversation[] {
  const data =
    localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}