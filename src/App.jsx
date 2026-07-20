import { Toaster } from 'sonner';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import { authService } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await authService.check();
        setUserInfo(res);
        setIsLoggedIn(true);
      } catch (err) {
        console.log('沒有token', err);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading)
    return <div className="flex justify-center w-full mt-15">載入中...</div>;

  return (
    <>
      <Toaster />
      <div className="max-w-screen-lg mx-auto py-5 px-3 text-lg">
        {isLoggedIn ? (
          <Dashboard userInfo={userInfo} />
        ) : (
          <AuthModal onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
