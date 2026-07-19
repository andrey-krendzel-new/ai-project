"use client";

import { useChatContext } from "../../context/ChatContext";

export default function Sidebar() {
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
  } = useChatContext();

  return (
    <aside className="flex w-72 flex-col border-r bg-zinc-50">
      <div className="border-b p-4">
        <button
          onClick={createConversation}
          className="w-full rounded-lg bg-black p-3 text-white"
        >
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 && (
          <p className="p-3 text-sm text-zinc-500">
            No conversations yet.
          </p>
        )}

        {conversations.map(
          conversation => (
            <button
              key={conversation.id}
              onClick={() =>
                setCurrentConversationId(
                  conversation.id
                )
              }
              className={`mb-2 w-full rounded-lg p-3 text-left ${
                currentConversationId ===
                conversation.id
                  ? "bg-zinc-200"
                  : "hover:bg-zinc-100"
              }`}
            >
              {conversation.title}
            </button>
          )
        )}
      </div>
    </aside>
  );
}