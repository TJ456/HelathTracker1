export const getDoctors = async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 1, name: 'Dr. Smith', specialty: 'Cardiology' }]);
      }, 1000);
    });
  };