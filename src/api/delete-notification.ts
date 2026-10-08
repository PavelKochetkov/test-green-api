import { apiClient } from './apiClient';

const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
): Promise<void> => {
  await apiClient.delete(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );
};

export default deleteNotification;