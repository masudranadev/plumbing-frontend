import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl mt-4">
          Sorry, the page youre looking for doesnt exist.
        </p>
        <Link href="/">
          <span className="text-xl mt-8 underline">Go back to the homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
