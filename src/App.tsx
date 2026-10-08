import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getPageRoute } from './utils/routes';
import Login from './page/Login';
import ChatPage from './page/Chat';
import NotFoundPage from './page/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { startPolling, stopPolling } from './store/notificationPolling';
import { useEffect } from 'react';
import { useIsAuth } from './store/authStore';

const App = (): React.JSX.Element => {
  const isAuth = useIsAuth();
  useEffect(() => {
    if (isAuth) {
      startPolling();
    }

    return (): void => {
      stopPolling();
    };
  }, [isAuth]);
 
  return (
    <div className="flex flex-col justify-center items-center h-dvh bg-slate-100 text-slate-900 font-sans antialiased">
      <BrowserRouter>
        <Routes>
          <Route path={getPageRoute('PAGE_LOGIN')} element={<Login />} />
          <Route path={getPageRoute('PAGE_CHAT')} element={<PrivateRoute element={ChatPage} />} />
          <Route path={getPageRoute('PAGE_NOT_FOUND')} element={<NotFoundPage />} />
          <Route/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
