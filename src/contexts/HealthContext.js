import React, { createContext, useState } from 'react';

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [diagnostics, setDiagnostics] = useState({});

  return (
    <HealthContext.Provider value={{ diagnostics, setDiagnostics }}>
      {children}
    </HealthContext.Provider>
  );
};