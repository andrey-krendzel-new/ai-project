"use client";

import { useState } from "react";

import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import MessageList from "./MessageList";

import { Message, Conversation } from "../../types/chat";
import { useChat } from "@ai-sdk/react";
import { useChatContext } from "../../context/ChatContext";


export default function Chat() {

  const {
  messages,
  input,
  setInput,
  isLoading,
  setIsLoading,
} = useChatContext();

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [currentConversationId, setCurrentConversationId] =
    useState<string | null>(null);

const currentConversation =
    conversations.find(
        conversation =>
            conversation.id === currentConversationId
    );

function updateMessages(
    updater: (messages: Message[]) => Message[]
) {
    setConversations(prev =>
        prev.map(conversation => {
            if (
                conversation.id !==
                currentConversationId
            )
                return conversation;

            return {
                ...conversation,
                messages: updater(
                    conversation.messages
                ),
            };
        })
    );
}


function createConversation() {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: Date.now(),
      messages: [],
    };

    setConversations((prev) => [
      conversation,
      ...prev,
    ]);

    setCurrentConversationId(conversation.id);
  }

  async function handleSend() {
  if (!input.trim() || isLoading) return;

  const question = input;

  setInput("");
  setIsLoading(true);

  const userMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: question,
  };

  const assistantId = crypto.randomUUID();

  const assistantMessage = {
    id: assistantId,
    role: "assistant",
    content: "",
  };

  updateMessages((messages) => [
    ...messages,
    userMessage,
    assistantMessage,
  ]);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI response.");
    }

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("No response stream.");
    }

    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } =
        await reader.read();

      done = doneReading;

      if (!value) continue;

      const chunk = decoder.decode(value, {
        stream: !doneReading,
      });

      updateMessages((messages) =>
        messages.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: message.content + chunk,
              }
            : message
        )
      );
    }
  } catch (error) {
    console.error(error);

    updateMessages((messages) =>
      messages.map((message) =>
        message.id === assistantId
          ? {
              ...message,
              content: "Something went wrong.",
            }
          : message
      )
    );
  } finally {
    setIsLoading(false);
  }
}

/*   async function handleSend() {
    if (!input.trim() || isLoading) return;

    const question = input;

    setInput("");
    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    const assistantId = crypto.randomUUID();

    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

updateMessages((messages) => [
  ...messages,
  userMessage,
  assistantMessage,
]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No response stream.");
      }

      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();

        done = doneReading;

        if (!value) continue;

        const chunk = decoder.decode(value, {
          stream: !doneReading,
        });

      
      }
    } catch (error) {
      console.error(error);

    
    } finally {
      setIsLoading(false);
    }
  } */

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </main>
  );
}