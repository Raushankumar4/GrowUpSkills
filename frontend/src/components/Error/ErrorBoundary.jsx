import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h2>
            <p className="text-gray-700 mb-4">
              An unexpected error occurred. Below are the technical details:
            </p>

            <details className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap break-words max-h-96 overflow-auto">
              <summary className="cursor-pointer font-semibold text-blue-600 mb-2">
                View error details
              </summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

}

export default ErrorBoundary;
