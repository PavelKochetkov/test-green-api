import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChatId, useSendMessage } from '../../store/chatStore';  
import { useTranslation } from 'react-i18next';

const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, { message: 'Сообщение не может быть пустым' })
    .max(4096, { message: 'Слишком длинное сообщение' }),
});

type MessageFormData = z.infer<typeof messageSchema>;


const SendMessageForm = (): React.ReactElement => {
  const { handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: '' }
  });
  const { t } = useTranslation();
  
  const sendMessage = useSendMessage();
  const chatId = useChatId();

  const onSubmit = async (data: MessageFormData): Promise<void> => {
    const { message } = data;

    if (!chatId) {
      return;
    }

    await sendMessage(chatId, message);
    reset();
  };

  return (
    <form
      className="flex flex-wrap items-end gap-2 p-2 md:p-3 bg-white border-t border-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="flex-1 min-w-0 resize-none max-h-32 px-4 py-3 bg-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder={t('forms.sendMessageForm.input.enterMessage')}
        name="message"
        // eslint-disable-next-line react-hooks/incompatible-library
        value={watch('message')}
        onChange={(event) => setValue('message', event.target.value)}
      />
      <button
        className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shrink-0"
        type="submit"
        aria-label={t('forms.sendMessageForm.button.send')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
      {errors.message && <p className="w-full order-last text-xs text-red-600">{errors.message.message}</p>}
    </form>
  );
};

export default SendMessageForm;