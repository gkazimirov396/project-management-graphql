export const useErrorBoundary = () => {
  const showBoundary = error => {
    if (!error) return;

    throw error;
  };

  return { showBoundary };
};
