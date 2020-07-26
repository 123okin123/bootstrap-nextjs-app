import { createContext, useContext, useState, useEffect, ReactElement } from 'react';
import React from 'react';
import Cookies from 'js-cookie';

import Router from 'next/router';
import { removeBearerToken, addBearerToken } from '../services/httpClient';

interface Auth {
  user: { email: string } | null;
  setToken: ({ token }: { token: string }) => void;
  isAuthenticated: boolean;
  logout: () => void;
}
interface Props {
  children: ReactElement;
}
const AuthContext = createContext({} as Auth);

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setToken({ token });
    }
  }, []);

  //   const updateUser = async () => {
  //     await api
  //       .get(routes.me)
  //       .then(({ data: me }) => {
  //         console.log(me);
  //         setUser(me);
  //       })
  //       .catch((error: any) => {
  //         console.error(error);
  //         logout();
  //       });
  //   };

  const logout = (): void => {
    Cookies.remove('token');
    setUser(null);
    removeBearerToken();
    redirectAfterLogout();
  };

  const setToken = async ({ token }: { token: string }): Promise<void> => {
    Cookies.set('token', token);
    addBearerToken(token);
    // await updateUser();
    redirectAfterLogin();
  };

  const redirectAfterLogin = (): void => {
    Router.push('/');
  };
  const redirectAfterLogout = (): void => {
    Router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ setToken, user, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): Auth => {
  const authContext = useContext(AuthContext);
  return authContext;
};
