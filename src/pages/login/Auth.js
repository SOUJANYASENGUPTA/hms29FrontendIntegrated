import { useState } from 'react';
const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
};

export default useAuth;
