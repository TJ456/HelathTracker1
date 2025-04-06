export const getMoodAnalysis = async (text) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ mood: 'Happy', confidence: 90 });
    }, 1000);
  });
};