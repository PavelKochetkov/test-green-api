import receiveNotification from '../api/notification';
import deleteNotification from '../api/delete-notification';
import useChatStore, { getCredentials, type IMessageList } from './chatStore';

let isPolling = false;
let pollingTimer: ReturnType<typeof setTimeout> | null = null;
let pollingGeneration = 0;

const addMessage = (message: IMessageList): void => {
  const { messageList } = useChatStore.getState();

  if (messageList.some((item) => item.idMessage === message.idMessage)) {
    return;
  }

  useChatStore.setState({
    messageList: [...messageList, message],
  });
};

const pollNotifications = async (): Promise<void> => {
  const currentGeneration = pollingGeneration;

  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const notification = await receiveNotification(idInstance, apiTokenInstance);

    if (notification) {
      await deleteNotification(idInstance, apiTokenInstance, notification.receiptId);

      const { body } = notification;
      const chatId = body.senderData?.chatId;
      const text = body.messageData?.textMessageData?.textMessage;

      if (body.typeWebhook === 'incomingMessageReceived' && chatId && text) {
        const { chatList } = useChatStore.getState();

        addMessage({
          idMessage: body.idMessage!,
          message: text,
          chatId,
          type: 'incoming',
        });

        useChatStore.setState({
          chatList: chatList.map((chat) =>
            chat.chatId === chatId ? { ...chat } : chat,
          ),
        });
      }
    }
  } catch (error) {
    useChatStore.setState({
      error: error instanceof Error ? error.message : 'Ошибка получения уведомления',
    });
  } finally {
    if (isPolling && currentGeneration === pollingGeneration) {
      pollingTimer = setTimeout(pollNotifications, 1000);
    }
  }
};

export const startPolling = (): void => {
  if (isPolling) {
    return;
  }

  isPolling = true;
  void pollNotifications();
};

export const stopPolling = (): void => {
  isPolling = false;
  pollingGeneration += 1;

  if (pollingTimer) {
    clearTimeout(pollingTimer);
    pollingTimer = null;
  }
};
