export default function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">
        AI Research Agent
      </h1>

      <button
        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        New Chat
      </button>
    </header>
  );
}