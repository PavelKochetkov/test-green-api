import { apiClient } from './apiClient';
import { z } from 'zod';

const GreenApiAccountSchema = z.object({
  avatar: z.string()
    .transform((value) => value === '' ? null : value)
    .optional(),
  chatId: z.string(),
  historySyncProgress: z.number(),
  logoutProcess: z.boolean(),
  phone: z.string(),
  stateInstance: z.enum(['notAuthorized', 'authorized', 'blocked', 'suspended', 'starting', 'pendingPassword']),
  username: z.string().optional(),
});

export type GreenApiAccountData = z.infer<typeof GreenApiAccountSchema>;

const fetchGreenApiAccountInfo = async (idInstance: string, apiTokenInstance: string): Promise<GreenApiAccountData> => {
  const responce = await apiClient.get(`/waInstance${idInstance}/getAccountSettings/${apiTokenInstance}`);

  return GreenApiAccountSchema.parse(responce.data);
};

export default fetchGreenApiAccountInfo;