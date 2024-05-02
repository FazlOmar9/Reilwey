import { useState } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  return isLoggedIn ? (
    <Main onLogout={() => setIsLoggedIn(false)} userId={userId}/>
  ) : (
      <Login
        onLogin={(id: number) => {
          setIsLoggedIn(true);
          setUserId(id);
        }}
      />
  );
};

export default App;