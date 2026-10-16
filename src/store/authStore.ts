import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import fetchGreenApiAccountInfo, { type GreenApiAccountData } from '../api/auth';
import { AxiosError } from 'axios';

interface IAuthState {
  account: GreenApiAccountData | null;
  loading: boolean;
  error: number | string | null;
  isAuth: boolean;
  idInstance: string;
  apiTokenInstance: string;
  login: (idInstance: string, apiTokenInstance: string) => Promise<void>;
  logout: () => void;
}

type LoginAction = IAuthState['login'];
type LogoutAction = IAuthState['logout'];
type LoadingState = IAuthState['loading'];
type IsAuthState = IAuthState['isAuth'];
type IdInstanceState = IAuthState['idInstance'];
type ApiTokenInstanceState = IAuthState['apiTokenInstance'];
type ErrorState = IAuthState['error'];
type StateInstance = GreenApiAccountData['stateInstance'] | undefined;

const AUTH_STORAGE_KEY = 'auth-storage';

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      account: null,
      loading: false,
      error: null,
      isAuth: false,
      idInstance: '',
      apiTokenInstance: '',

      login: async (idInstance, apiTokenInstance): Promise<void> => {
        set({
          loading: true,
          error: null,
          isAuth: false,
        });

        try {
          const account = await fetchGreenApiAccountInfo(idInstance, apiTokenInstance);

          set({
            account,
            isAuth: account.stateInstance === 'authorized',
            idInstance,
            apiTokenInstance,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof AxiosError ? error.status : 'Не удалось проверить статус учётной записи Green API',
          });
        }
      },

      logout: (): void => {
        set({
          account: null,
          isAuth: false,
          loading: false,
          error: null,
          idInstance: '',
          apiTokenInstance: '',
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ account: state.account, isAuth: state.isAuth, idInstance: state.idInstance,
        apiTokenInstance: state.apiTokenInstance, }),
    },
  ),
);

export default useAuthStore;
export const useLoading = (): LoadingState => useAuthStore((state) => state.loading);
export const useIsAuth = (): IsAuthState => useAuthStore((state) => state.isAuth);
export const useError = (): ErrorState => useAuthStore((state) => state.error);
export const useLogin = (): LoginAction => useAuthStore((state) => state.login);
export const useLogout = (): LogoutAction => useAuthStore((state) => state.logout);
export const useIdInstance = (): IdInstanceState => useAuthStore((state) => state.idInstance);
export const useApiTokenInstance = (): ApiTokenInstanceState => useAuthStore((state) => state.apiTokenInstance);
export const useStateInstance = (): StateInstance => useAuthStore((state) => state.account?.stateInstance);