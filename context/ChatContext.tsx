"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Conversation,
  Message,
} from "../types/chat";


type ChatContextType = {
  conversations: Conversation[];

  currentConversationId: string | null;

  currentConversation: Conversation | null;

  messages: Message[];

  input: string;

  isLoading: boolean;

  setInput: React.Dispatch<
    React.SetStateAction<string>
  >;

  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  createConversation: () => string;

  setCurrentConversationId: (
    id: string
  ) => void;

  updateMessages: (
  updater: (
    messages: Message[]
  ) => Message[]
) => void;
};

const ChatContext =
  createContext<ChatContextType | null>(
    null
  );

export function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    conversations,
    setConversations,
  ] = useState<Conversation[]>([]);

  const [
    currentConversationId,
    setCurrentConversationId,
  ] = useState<string | null>(null);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const currentConversation =
    useMemo(() => {
      return (
        conversations.find(
          conversation =>
            conversation.id ===
            currentConversationId
        ) ?? null
      );
    }, [
      conversations,
      currentConversationId,
    ]);

  const messages =
    currentConversation?.messages ??
    [];

    function updateMessages(
  updater: (messages: Message[]) => Message[]
) {
  setConversations((prev) =>
    prev.map((conversation) => {
      if (
        conversation.id !== currentConversationId
      ) {
        return conversation;
      }

      return {
        ...conversation,
        messages: updater(
          conversation.messages
        ),
      };
    })
  );
}

   function createConversation(): string {
  const id = crypto.randomUUID();

  const conversation: Conversation = {
    id,
    title: "New Chat",
    createdAt: Date.now(),
    messages: [],
  };

  setConversations((prev) => [
    conversation,
    ...prev,
  ]);

  setCurrentConversationId(id);

  return id;
}

    return (
    <ChatContext.Provider
      value={{
        conversations,

        currentConversationId,

        currentConversation,

        messages,

        input,

        isLoading,

        setInput,

        setIsLoading,

        createConversation,

        setCurrentConversationId,

        updateMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );

}

export function useChatContext() {
  const context =
    useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatProvider."
    );
  }

  return context;
}