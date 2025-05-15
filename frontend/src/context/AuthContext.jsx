import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"))
  const [authType, setAuthType] = useState(localStorage.getItem("authType"))

  return (
    <AuthContext.Provider value={{ authToken, authType, setAuthToken, setAuthType }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  return useContext(AuthContext);
};
