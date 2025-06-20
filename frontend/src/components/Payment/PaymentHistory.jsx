import React, { useEffect, useState } from 'react';
import axiosInstance from '@/Axios/AxiosInstance';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {


        const { data } = await axiosInstance.get('paymentHistory')
        console.log(data);

        if (data.success) {
          setPaymentHistory(data.paymentHistory);
        } else {
          setError('Failed to fetch payment history.');
        }
      } catch (err) {
        setError('Error fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">All Payment History</h2>

      {paymentHistory.length === 0 ? (
        <p className="text-gray-500 text-center">No payment records found.</p>
      ) : (
        <div className="space-y-6">
          {paymentHistory.map((payment) => (
            <div
              key={payment._id}
              className={`p-6 rounded-md shadow-md bg-white border-l-4 ${payment.status === 'success' ? 'border-green-500' : 'border-yellow-500'
                }`}
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  {payment.course.title} — ₹{payment.course.price}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${payment.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  {payment.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><span className="font-medium">User:</span> {payment.user.username}</p>
                  <p><span className="font-medium">Email:</span> {payment.user.email}</p>
                </div>
                <div>
                  <p><span className="font-medium">Order ID:</span> {payment.razorpay_order_id}</p>
                  <p><span className="font-medium">Amount Paid:</span> ₹{payment.amount}</p>
                  <p><span className="font-medium">Date:</span> {new Date(payment.createdAt).toLocaleString()}</p>
                </div>

                {payment.status === 'success' && (
                  <>
                    <div>
                      <p><span className="font-medium">Payment ID:</span> {payment.razorpay_payment_id}</p>
                      <p><span className="font-medium">Signature:</span> {payment.razorpay_signature}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Confirmed At:</span> {new Date(payment.purchaseConfirmedAt).toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
