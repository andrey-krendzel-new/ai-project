import { Message as MessageType } from "../../types/chat";
import Message from "./Message";

type Props = {
  messages: MessageType[];
};

export default function MessageList({
  messages,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}