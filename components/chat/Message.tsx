import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
<div
  className={`
    max-w-3xl
    rounded-xl
    px-4
    py-3
    ${isUser ? "bg-blue-600 text-white" : "bg-gray-100"}
  `}
>
  {isUser ? (
    content
  ) : (
    <MarkdownRenderer content={content} />
  )}
</div>
  );
}