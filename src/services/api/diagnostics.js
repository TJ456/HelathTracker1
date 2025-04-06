export const getSkinAnalysis = async (image) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: 'No issues detected', confidence: 95 });
    }, 1000);
  });
};