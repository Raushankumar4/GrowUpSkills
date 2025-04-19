import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axiosInstance from '../Axios/AxiosInstance';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QmIa0RXM5mjvSWAWJrCIwCDNhE0IDqAAN7579jezFu34Y0B2xPKqcNK8L50OuivfvtBThjN5xinw84fiYJoj2KB003ZfsXNn2');

const CoursePaymentForm = ({ userId, course, onClose }) => {

  const { getCourses, fetchProfile } = useUserContext()

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { data } = await axiosInstance.post('buy-course', {
        amount: course.price * 100, // ₹ → cents
        currency: 'usd',
        courseId: course?._id,
        userId,
      });

      const { clientSecret } = data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await axiosInstance.post('confirm-payment', {
          paymentIntentId: paymentIntent.id,
          userId,
          courseId: course?._id,
        });
        console.log()
        alert("✅ Course purchased successfully!");
        fetchProfile()
        getCourses()
        navigate('/purchase-success', { state: { course } })
        onClose();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Buy: {course?.title}</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <CardElement className="p-2 border rounded" />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Processing..." : `Pay ₹${course?.price}`}
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

const BuyCourseModal = ({ userId, course, onClose }) => {
  return (
    <Elements stripe={stripePromise}>
      <CoursePaymentForm userId={userId} course={course} onClose={onClose} />
    </Elements>
  );
};

export default BuyCourseModal;
