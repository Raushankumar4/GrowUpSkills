import axios from "axios";
import React, { useEffect } from "react";

const Product = ({ productData }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = async (amount) => {
    try {
      const { data: keyData } = await axios.get("http://localhost:4000/api/v1/razorpaykey");
      const { key } = keyData;


      const { data } = await axios.post("http://localhost:4000/api/v1/razorpay", {
        amount,
      });
      const { order } = data;

      console.log(order.amount);

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'Skill Bridge',
        description: 'Razorpay Integration',
        order_id: order.id,
        callback_url: "http://localhost:4000/api/v1/paymentVerification",
        prefill: {
          name: 'Raushan Kumar',
          email: 'raushankumar@gmail.com',
          contact: '9852188653'
        },
        theme: {
          color: '#F38254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {productData.products.map((product, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          <button
            onClick={() => handlePay(product.price.toFixed(2))}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Pay {`${product.currency} ${product.price.toFixed(2)}`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
