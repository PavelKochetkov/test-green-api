import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useCurrentChatId } from '../store/chatStore';

const ChatPage = (): React.ReactElement => {
  const activeChatId = useCurrentChatId();

  return (
    <div className="flex h-dvh w-full bg-slate-100">
      <div
        className={`flex-col w-full md:w-80 md:shrink-0 min-h-0 ${
          activeChatId ? 'hidden md:flex' : 'flex'
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`flex-col flex-1 min-w-0 min-h-0 ${
          activeChatId ? 'flex' : 'hidden md:flex'
        }`}
      >
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
