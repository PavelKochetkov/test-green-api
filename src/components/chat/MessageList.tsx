import { useEffect, useRef } from 'react';
import { useCurrentChatId, useMessageList } from '../../store/chatStore';
import MessageBubble from './MessageBubble';

const MessageList = (): React.ReactElement => {
  const messages = useMessageList();
  const activeChatId = useCurrentChatId();
  const chatMessages = messages.filter((msg) => msg.chatId === activeChatId);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatMessages.length, activeChatId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-100">
      <MessageBubble />
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
