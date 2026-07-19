import { Message as MessageType } from "../../types/chat";
import Markdown from "./Markdown";

type Props = {
  message: MessageType;
};

export default function Message({
  message,
}: Props) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-black text-white"
            : "bg-zinc-100"
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <Markdown
            content={message.content}
          />
        )}
      </div>
    </div>
  );
}