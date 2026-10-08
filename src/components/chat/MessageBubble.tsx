import { useCurrentChatId, useMessageList } from '../../store/chatStore';

const MessageBubble = (): React.ReactElement => {
  const messages = useMessageList();
  const activeChatId = useCurrentChatId();
  const chatMessages = messages.filter((msg) => msg.chatId === activeChatId);

  if (chatMessages.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-8">Нет сообщений</p>;
  }

  const isOutgoing = (type?: string): boolean => type === 'outgoing';

  return (
    <>
      {chatMessages.map((msg) => (
        <div 
          key={msg.idMessage} 
          className={`flex ${isOutgoing(msg.type) ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] md:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
              isOutgoing(msg.type)
                ? 'bg-blue-200 rounded-br-none'
                : 'bg-white rounded-bl-none'
            }`}
          >
            <p className="text-sm text-slate-800 whitespace-pre-wrap">{msg.message}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageBubble;
