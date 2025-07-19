const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-[8rem] font-extrabold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page Not Found</p>
      <a
        href="/"
        className="text-blue-600 hover:underline text-lg font-semibold"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
