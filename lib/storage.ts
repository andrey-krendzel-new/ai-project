import { Message } from "../types/chat";

const STORAGE_KEY = "ai-research-agent-messages";

export function saveMessages(
  messages: Message[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(messages)
  );
}

export function loadMessages(): Message[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}


export function clearMessages() {
  localStorage.removeItem(STORAGE_KEY);
}