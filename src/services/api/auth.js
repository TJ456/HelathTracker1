export const login = async (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'fake-token', user: { name: 'John Doe', email: credentials.email } });
      }, 1000);
    });
  };
  
  export const signup = async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'fake-token', user: userData });
      }, 1000);
    });
  };