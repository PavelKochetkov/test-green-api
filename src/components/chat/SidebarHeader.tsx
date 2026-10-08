import useAuthStore, { useLogout } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import default_avatar from '../../assets/default_avatar.png';

const SidebarHeader = (): React.ReactElement => {
  const { t } = useTranslation();
  const { account } = useAuthStore();
  const { avatar, username, phone } = account!;
  const logout = useLogout();
  return (
    <header className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-3 bg-slate-900 text-white">
      <img
        src={avatar ?? default_avatar}
        alt={username}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-semibold shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm md:text-base font-semibold truncate">{username}</p>
        <p className="text-xs text-slate-400 truncate">{phone}</p>
      </div>
      <button
        className="px-2 md:px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-red-500 hover:text-white transition-colors shrink-0"
        title={t('chatPage.sidebarHeader.logout')}
        onClick={() => logout()}
      >
        {t('chatPage.sidebarHeader.logout')}
      </button>
    </header>
  );
};

export default SidebarHeader;