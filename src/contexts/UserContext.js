import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({});

  return (
    <UserContext.Provider value={{ healthData, setHealthData }}>
      {children}
    </UserContext.Provider>
  );
};