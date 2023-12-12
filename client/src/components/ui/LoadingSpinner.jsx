function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <div className="loading loading-spinner loading-lg" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
