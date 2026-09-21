const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/70">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default ScreenLoader;
