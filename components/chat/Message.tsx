import { Message as MessageType } from "../../types/chat";
import ReactMarkdown from "react-markdown";

type Props = {
  message: MessageType;
};

export default function Message({
  message,
}: Props) {
  if (message.role === "user") {
    return (
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Question
        </p>

        <h2 className="mt-2 text-2xl font-bold text-zinc-900">
          {message.content}
        </h2>
      </div>
    );
  }

  return (
    <article className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}