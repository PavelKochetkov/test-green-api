import type { TFunction } from 'i18next';

const handleError = (error: unknown, t: TFunction): string => {

  switch (error) {
  case 400:
    return t('errors.instance');
  case 401:
    return t('errors.unauthorized');
  default:
    return t('errors.unknownError');
  }
};

export default handleError;
