import { Toaster } from 'sonner';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import { authService } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await authService.check();
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
          <Dashboard />
        ) : (
          <AuthModal onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
