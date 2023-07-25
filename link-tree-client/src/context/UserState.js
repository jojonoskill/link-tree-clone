import React, { createContext, useState , useContext} from 'react';

const LoginContext = createContext();


export const LoginStateProvider = ({ children }) => {
  const [user , setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
      // Provide the state and setState function to all components within this context
      <LoginContext.Provider value={{ user, setUser }}>
        {children}
      </LoginContext.Provider>
  );
};

export const useLoginState = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
