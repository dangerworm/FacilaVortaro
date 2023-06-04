import jwtDecode from "jwt-decode";
import React, { useMemo } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext(null);

export const AuthenticationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState({ id: "", email: "", name: "", picture: "" });

  const browserCacheTokenName = 'facila-vortaro-token';

  const authenticateUser = useCallback(async (credential) => {
    if (!credential) {
      return;
    }

    setToken(credential);

    const decodedToken = jwtDecode(credential);
    setUser(_ => ({
      id: decodedToken.sub,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    }));

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem(browserCacheTokenName);
    setToken(undefined);
  }

  useEffect(() => {
    if (!token) {
      setUser(undefined);
      return;
    }

    localStorage.setItem(browserCacheTokenName, token);
  }, [token])

  useEffect(() => {
    if (!user) {
      const credential = localStorage.getItem(browserCacheTokenName);
      if (credential) {
        authenticateUser(credential);
      }
    }
  }, [user, authenticateUser])

  const admins = useMemo(() => [
    'dangerworm@gmail.com',
  ], []);

  const userIsAdmin = useMemo(() =>
    user && admins.includes(user.email)
  , [admins, user]);

return (
  <AuthenticationContext.Provider
    value={{
      loading,
      authenticateUser,
      user,
      userIsAdmin,
      logout
    }}
  >
    {children}
  </AuthenticationContext.Provider>
);
}

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (context) return context;

  throw Error("Authentication context was not registered");
};
