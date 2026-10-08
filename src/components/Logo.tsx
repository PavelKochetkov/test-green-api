import { useTranslation } from 'react-i18next';

const Logo = (): React.JSX.Element => {
  const { t } = useTranslation();
  
  return (
    <>
      <div className="text-4xl font-bold text-green-600">{t('loginPage.greenAPI')}</div>
      <div className="text-2xl font-bold">{t('loginPage.separator')}</div>
      <div className="text-4xl font-bold text-sky-500">{t('loginPage.telegram')}</div>
    </>
  );
};

export default Logo;