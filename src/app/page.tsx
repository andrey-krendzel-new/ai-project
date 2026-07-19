import Chat from "../../components/chat/Chat";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <Chat />
    </div>
  );
}