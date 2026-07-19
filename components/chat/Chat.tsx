"use client";

import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import MessageList from "./MessageList";

import { Message } from "../../types/chat";

export default function Chat() {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  async function handleSend() {
  const question = input.trim();

  if (!question || isLoading) return;

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

  setMessages((prev) => [
    ...prev,
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
      throw new Error("Request failed");
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let streamedText = "";

    while (true) {
      const { value, done } =
        await reader.read();

      if (done) break;

      streamedText += decoder.decode(value, {
        stream: true,
      });

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: streamedText,
              }
            : message
        )
      );
    }
  } catch (error) {
    console.error(error);

    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId
          ? {
              ...message,
              content:
                "Something went wrong.",
            }
          : message
      )
    );
  } finally {
    setIsLoading(false);
  }
}

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <MessageList
              messages={messages}
            />

            <div ref={bottomRef} />
          </>
        )}
      </div>

<ChatInput
  input={input}
  onInputChange={setInput}
  onSend={handleSend}
  isLoading={isLoading}
/>
    </section>
  );
}