import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore, { useError, useLoading, useLogin } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getPageRoute } from '../../utils/routes';

const loginSchema = z.object({
  idInstance: z.string().min(1, { message: 'ID инстанса не может быть пустым' }),
  apiTokenInstance: z.string().min(1, { message: 'API токен инстанса не может быть пустым' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  
  const login = useLogin();
  const loading = useLoading();
  const error = useError();

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    const { idInstance, apiTokenInstance } = data; 
    await login(idInstance, apiTokenInstance);
    if (useAuthStore.getState().isAuth) {
      void navigate(getPageRoute('PAGE_CHAT'));
      reset();
    }
  };

  return(
    <form
      className="max-w-xs mx-auto bg-white rounded-2xl p-6 mt-10 shadow-sm border border-slate-200 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800 placeholder-slate-400 transition-all" 
        placeholder={t('forms.loginForm.idInstance')}
        {...register('idInstance')}
      />
      {errors.idInstance && <p className="text-xs text-red-600">{errors.idInstance.message}</p>}

      <input
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800 placeholder-slate-400 transition-all"
        placeholder={t('forms.loginForm.apiTokenInstance')}
        {...register('apiTokenInstance')}
      />
      {errors.apiTokenInstance && <p className="text-xs text-red-600">{errors.apiTokenInstance.message}</p>} 

      <button
        type='submit'
        className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-colors shadow-md hover:shadow-lg"
      >
        {loading ? t('forms.loginForm.button.checking') : t('forms.loginForm.button.enter')}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
};

export default LoginForm;