import { useForm } from 'react-hook-form';
import { useCreateChat, useExist } from '../../store/chatStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

const chatCreateSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: 'Номер телефона должен содержать не менее 10 цифр' })
    .regex(/^\d+$/, { message: 'Номер телефона должен содержать только цифры' })
});

type PhoneNumberFormData = z.infer<typeof chatCreateSchema>;

const CreateChatForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const { handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PhoneNumberFormData>({
    resolver: zodResolver(chatCreateSchema),
    defaultValues: { phoneNumber: '' }
  });

  const createChat = useCreateChat();
  const exist = useExist();

  const onSubmit = async (data: PhoneNumberFormData): Promise<void> => {
    await createChat(Number(data.phoneNumber));
    reset({ phoneNumber: '' });
  };

  return (
    <form 
      className="p-2 md:p-3 border-b border-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 min-w-0">
        <input
          className="flex-1 min-w-0 px-3 py-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder={t('forms.createChatForm.input.phoneNumber')}
          name="phoneNumber"
          // eslint-disable-next-line react-hooks/incompatible-library
          value={watch('phoneNumber')}
          onChange={(event) => setValue('phoneNumber', event.target.value)}
        />
        <button
          type="submit"
          className="px-3 shrink-0 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold"
          title={t('forms.createChatForm.button.createChat')}
        >
          {t('forms.createChatForm.button.icon')}
        </button>
      </div>
      {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>}
      {!exist && <p className="text-xs text-red-600">{t('forms.createChatForm.error.message')}</p>}
    </form>
  );
};

export default CreateChatForm;