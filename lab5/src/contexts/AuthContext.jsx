// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useCallback } from 'react';
import { initialAuthState, authReducer } from '../reducers/authReducer';
import { authApi } from '../api/authAPI';

const AuthStateContext = createContext(initialAuthState);
const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = useCallback(async (username, password) => {
    const acc = await authApi.login(username, password);
    if (acc) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: acc });
      return acc;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
