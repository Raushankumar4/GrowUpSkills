import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

function RouterError() {
  const error = useRouteError();
  console.error('Router Error:', error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Oops!</h1>
        <p className="text-gray-700 mb-4">Sorry, an unexpected error has occurred.</p>

        <p className="text-sm text-gray-500 mb-4 italic">
          {"Route" + " " + error.statusText || error.message}
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default RouterError;
