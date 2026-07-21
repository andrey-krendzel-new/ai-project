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

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
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
        <div className="mx-auto max-w-4xl px-6 py-8">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={bottomRef} />
          </>
        )}
      </div>
      </div>s

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </section>
  );
}