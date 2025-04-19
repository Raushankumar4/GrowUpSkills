import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const [reference, setReference] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('reference');
    setReference(ref);
  }, [location.search]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full print:border print:border-gray-300">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">🎉 Payment Successful!</h1>
        <p className="text-gray-700 mb-2 text-center">Thank you for your purchase.</p>
        <div className="text-sm text-gray-600 text-center mb-6">
          <span className="font-medium">Reference ID:</span> {reference}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
