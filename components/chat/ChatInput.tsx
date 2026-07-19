"use client";

import { KeyboardEvent } from "react";

type Props = {
  input: string;
  onInputChange: (
    value: string
  ) => void;
  onSend: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  onInputChange,
  onSend,
  isLoading,
}: Props) {
  function handleKeyDown(
    e: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      onSend();
    }
  }

  return (
    <footer className="border-t p-6">
      <div className="mx-auto flex max-w-4xl gap-3">
        <textarea
          rows={2}
          value={input}
          onChange={(e) =>
            onInputChange(
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1 resize-none rounded-xl border p-4 outline-none"
        />

<button
  onClick={onSend}
  disabled={isLoading}
  className="rounded-xl bg-black px-6 text-white disabled:opacity-50"
>
  {isLoading ? "Thinking..." : "Send"}
</button>
      </div>
    </footer>
  );
}