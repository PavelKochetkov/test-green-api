import { apiClient } from './apiClient';
import { z } from 'zod';

const SendMessageResponseSchema = z.object({
  idMessage: z.string(),
});

export type SendMessageResponse = z.infer<typeof SendMessageResponseSchema>;

const send = async (
  idInstance: string, 
  apiTokenInstance: string, 
  chatId: string, 
  message: string
): Promise<SendMessageResponse> => {
  const responce = await apiClient.post(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      chatId, 
      message,
    }
  );

  return SendMessageResponseSchema.parse(responce.data);
};

export default send;