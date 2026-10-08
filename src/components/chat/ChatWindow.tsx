import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import SendMessageForm from '../forms/SendMessageForm';

const ChatWindow = (): React.ReactElement => {
  return (
    <main className="flex-1 flex flex-col min-w-0">
      <ChatHeader />
      <MessageList />
      <SendMessageForm />
    </main>
  );
};

export default ChatWindow;