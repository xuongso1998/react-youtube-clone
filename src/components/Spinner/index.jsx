const Spinner = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-10 h-10 border-4 border-t-red-500 animate-spin rounded-full mx-auto"></div>
    </div>
  );
};

export default Spinner;
