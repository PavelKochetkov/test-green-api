import { type ReactElement } from 'react';
import i18next, { type i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import resources from './locales/index';

const init = async (): Promise<ReactElement> => {
  const i18nextInstance: i18n = i18next.createInstance();
  await i18nextInstance.init({
    debug: false,
    lng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <I18nextProvider i18n={i18nextInstance}>
      <App />
    </I18nextProvider>
  );
};

export default init;
