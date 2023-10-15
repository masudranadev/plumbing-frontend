const LoadingButton = ({ children, classes, handler, disabled }: any) => {
  return (
    <button
      onClick={handler}
      disabled={disabled ? true : false}
      className={`hover:text-gray-100 btn btn-accent text-white ${classes}`}
    >
      {children}
    </button>
  );
};

export default LoadingButton;
