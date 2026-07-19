

type ChatInputProps = {
  input: string;
  setInput: React.Dispatch<
    React.SetStateAction<string>
  >;
  onSend: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  setInput,
  onSend,
  isLoading
}: ChatInputProps) {
  return (
    <form
      className="border-t p-4 flex gap-3"
  onSubmit={(e) => {
    e.preventDefault();

    if (!isLoading) {
      onSend();
    }
  }}
    >

<textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (
        e.key === "Enter" &&
        !e.shiftKey
    ) {
        e.preventDefault();
        onSend();
    }
}}    
/>

<button
  type="submit"
  disabled={isLoading || !input.trim()}
  className="
    rounded-lg
    bg-black
    px-6
    text-white
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {isLoading ? "Thinking..." : "Send"}
</button>

    </form>
  );
}