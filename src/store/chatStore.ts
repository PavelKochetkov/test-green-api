import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useAuthStore from './authStore';
import check, { type CheckAccountResponse } from '../api/check-account';
import send from '../api/sendMessage';
import { AxiosError } from 'axios';

interface IChatItem {
  chatId: string;
  phoneNumber: number;
  username?: string;
}

type MessageType = 'outgoing' | 'incoming';

export interface IMessageList {
  idMessage: string,
  message: string,
  chatId: string,
  type: MessageType
}

interface IChatState {
  account: CheckAccountResponse | null;
  chatList: IChatItem[];
  messageList: IMessageList[];
  activeChatId: string | null;
  error: number | string | null;
  isCheckingAccount: boolean;
  checkAccount: (phoneNumber: number, idInstance?: string, apiTokenInstance?: string) => Promise<void>;
  createChat: (phoneNumber: number) => Promise<void>;
  sendMessage: (chatId: string, message: string) => Promise<void>,
  setActiveChat: (chatId: string) => void;
  clearActiveChat: () => void;
}

type CreateChat = IChatState['createChat'];
type SendMessage = IChatState['sendMessage'];
type ChatList = IChatState['chatList'];
type MessageList = IChatState['messageList'];
type Error = IChatState['error'];
type CurrentChatId = IChatState['activeChatId'];
type SetActiveChat = IChatState['setActiveChat'];
type ClearActiveChat = IChatState['clearActiveChat'];

export const getCredentials = (): { idInstance: string, apiTokenInstance: string } => {
  const { idInstance, apiTokenInstance } = useAuthStore.getState();

  if (!idInstance || !apiTokenInstance) {
    throw new Error('Не удалось получить учетные данные');
  }

  return { idInstance, apiTokenInstance };
};

const CHAT_STORAGE_KEY = 'chat-storage';

const useChatStore = create<IChatState>()(
  persist(
    (set, get) => ({
      account: null,
      chatList: [],
      messageList: [],
      activeChatId: null,
      error: null,
      isCheckingAccount: false,

      checkAccount: async (phoneNumber): Promise<void> => {
        set({ isCheckingAccount: true, error: null });

        try {
          const { idInstance, apiTokenInstance } = getCredentials();
          const account = await check(idInstance, apiTokenInstance, phoneNumber);

          if (account.exist) {
            set({ account, isCheckingAccount: false });
          } else {
            set({ account: null, isCheckingAccount: false });
          }
          
        } catch (error) {
          set({
            error: error instanceof AxiosError ? error.status : 'Ошибка проверки аккаунта',
            isCheckingAccount: false,
            account: null,
          });
        }
      },
      
      createChat: async (phoneNumber): Promise<void> => {
        await get().checkAccount(phoneNumber);

        const { account, chatList } = get();
    
        if (!account?.exist || !account.chatId) {
          return;
        }

        if (!chatList.some((chat) => chat.chatId === account.chatId)) {
          set({
            chatList: [
              { chatId: account.chatId, phoneNumber, username: account.username },
              ...chatList,
            ],
          });
        }
        set({ activeChatId: account.chatId });
      },
      
      sendMessage: async (chatId, message): Promise<void> => {
        try {
          const { idInstance, apiTokenInstance } = getCredentials();
          const { messageList, chatList } = get();
          const { idMessage } = await send(idInstance, apiTokenInstance, chatId, message);

          set({
            messageList: [
              ...messageList,
              { idMessage, message, chatId, type: 'outgoing' },
            ],
            chatList: chatList.map((chat) =>
              chat.chatId === chatId ? { ...chat } : chat,
            ),
          });
        } catch (error) {
          set({
            error: error instanceof AxiosError ? error.status : 'Ошибка отправки сообщения',
          });
        }
      },
      
      setActiveChat: (chatId: string): void => {
        const { chatList } = get();
        const chat = chatList.find((item) => item.chatId === chatId);

        if (!chat) {
          return;
        }

        set({
          activeChatId: chatId,
          account: {
            exist: true,
            chatId: chat.chatId,
            username: chat.username,
            phoneNumber: chat.phoneNumber,
          },
        });
      },

      clearActiveChat: (): void => {
        set({ activeChatId: null });
      },
    }),
    {
      name: CHAT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        account: state.account,
        chatList: state.chatList,
        activeChatId: state.activeChatId,
        messageList: state.messageList,
      }),
    },
  )
);

export default useChatStore;

export const useChatList = (): ChatList => useChatStore((state) => state.chatList);
export const useMessageList = (): MessageList => useChatStore((state) => state.messageList);
export const useCurrentChatId = (): CurrentChatId => useChatStore((state) => state.activeChatId);
export const useChatId = (): string | undefined => useChatStore((state) => state.account?.chatId);
export const useExist = (): boolean | undefined => useChatStore((state) => state.account?.exist);
export const useError = (): Error => useChatStore((state) => state.error);
export const useUsername = (): string | undefined => useChatStore((state) => state.account?.username);
export const usePhoneNumber = (): number | undefined => useChatStore((state) => state.account?.phoneNumber);
export const useCreateChat = (): CreateChat => useChatStore((state) => state.createChat);
export const useSendMessage = (): SendMessage => useChatStore((state) => state.sendMessage);
export const useSetActiveChat = (): SetActiveChat => useChatStore((state) => state.setActiveChat);
export const useClearActiveChat = (): ClearActiveChat => useChatStore((state) => state.clearActiveChat);


