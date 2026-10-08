import { z } from 'zod';
import { apiClient } from './apiClient';

const CheckAccountSchema = z.object({
  exist: z.boolean(),
  chatId: z.string(),
  username: z.string().optional(),
  phoneNumber: z.number().optional(),
  fromCache: z.boolean().optional(),
});

export type CheckAccountResponse = z.infer<typeof CheckAccountSchema>

const check = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: number
): Promise<CheckAccountResponse> => {
  const response = await apiClient.post(
    `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    { phoneNumber }
  );

  return CheckAccountSchema.parse(response.data);
};

export default check;