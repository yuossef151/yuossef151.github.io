import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // اقرأ البيانات فورًا عند init state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("contactData");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data) => {
    localStorage.setItem("contactData", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("contactData");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
