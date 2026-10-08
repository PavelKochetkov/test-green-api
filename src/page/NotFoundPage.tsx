import { useNavigate } from 'react-router-dom';
import { getPageRoute } from '../utils/routes';
import { useTranslation } from 'react-i18next';

const NotFoundPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-100 text-slate-900">
      <div className="max-w-md w-full text-center px-6">
        <div className="text-6xl font-bold mb-4 text-slate-300 select-none">{t('notFoundPage.error')}</div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">{t('notFoundPage.title')}</h1>
        <p className="text-slate-500 mb-8">{t('notFoundPage.description')}</p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate(getPageRoute('PAGE_CHAT'))}
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            {t('notFoundPage.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;