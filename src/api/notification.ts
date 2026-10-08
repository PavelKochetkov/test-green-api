import { apiClient } from './apiClient';
import { z } from 'zod';

const NotificationBodySchema = z.object({
  typeWebhook: z.string(),
  idMessage: z.string().optional(),
  timestamp: z.number().optional(),
  senderData: z.object({
    chatId: z.string(),
    senderName: z.string().optional(),
  }).optional(),
  messageData: z.object({
    typeMessage: z.string(),
    textMessageData: z.object({
      textMessage: z.string(),
    }).optional(),
  }).optional(),
});

const NotificationSchema = z.object({
  receiptId: z.number(),
  body: NotificationBodySchema,
});

export type Notification = z.infer<typeof NotificationSchema>;

const RECEIVE_TIMEOUT_SECONDS = 5;

const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string,
): Promise<Notification | null> => {
  const response = await apiClient.get(
    `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    { params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS } },
  );

  if (!response.data) {
    return null;
  }

  return NotificationSchema.parse(response.data);
};

export default receiveNotification;