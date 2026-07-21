export type Role =
  | "user"
  | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
};