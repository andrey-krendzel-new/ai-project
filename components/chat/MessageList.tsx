import Message from "./Message";
import { Message as MessageType } from "../..//types/chat";

type MessageListProps = {
  messages: MessageType[];
};

const messages: MessageType[] = [
  {
    id: "1",
    role: "user",
    content: "Research React",
  },
  {
    id: "2",
    role: "assistant",
    content: "Sure!",
  },
];

export default function MessageList({
  messages,
}: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}