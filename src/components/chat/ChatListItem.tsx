import { useChatList, useCurrentChatId, useSetActiveChat } from '../../store/chatStore';
import default_avatar from '../../assets/default_avatar.png';
import { useTranslation } from 'react-i18next';

const ChatListItem = (): React.ReactElement => {
  const chatList = useChatList();
  const currentChat = useCurrentChatId();
  const setActiveChat = useSetActiveChat();
  const { t } = useTranslation();

  return (
    <>
      {chatList.map((chat) => (
        <button
          key={chat.chatId}
          className={`w-full text-left px-2 md:px-4 py-3 flex gap-2 md:gap-3 transition-colors ${
            chat.chatId === currentChat ? 'bg-slate-200' : 'hover:bg-slate-50'
          }`}
          onClick={() => setActiveChat(chat.chatId)}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-slate-600 shrink-0">
            <img
              src={default_avatar}
              alt={t('chatPage.chatListItem.avatar.defAvatar')}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{chat.username?.length ? chat.username : 'user'}</p>
            <p className="text-xs text-slate-500 truncate">{chat.phoneNumber}</p>
          </div>
        </button>
      ))}
    </>
  );
};

export default ChatListItem;