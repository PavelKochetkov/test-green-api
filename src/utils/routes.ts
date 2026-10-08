interface IRoutes {
  [key: string]: string;
};

const PAGE_ROUTES: IRoutes = {
  PAGE_CHAT: '/',
  PAGE_LOGIN: '/login',
  PAGE_NOT_FOUND: '*',
};

export const getPageRoute = (route: string):string => PAGE_ROUTES[route];