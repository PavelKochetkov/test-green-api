import { useClearActiveChat, usePhoneNumber, useUsername } from '../../store/chatStore';
import { useTranslation } from 'react-i18next';

const ChatHeader = (): React.ReactElement => {
  const username = useUsername();
  const phoneNumber = usePhoneNumber();
  const clearActiveChat = useClearActiveChat();
  const { t } = useTranslation();

  return (
    <header className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-3 bg-white border-b border-slate-200 shrink-0">
      <button
        className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
        onClick={clearActiveChat}
        aria-label={t('chatPage.chatHeader.back')}
        title={t('chatPage.chatHeader.back')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label={t('chatPage.chatHeader.back')}
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-300 flex items-center justify-center font-semibold text-blue-700 shrink-0">
        {t('chatPage.chatHeader.icon')}
      </div>
      <p className="font-semibold truncate">{username || phoneNumber}</p>
    </header>
  );
};

export default ChatHeader;
