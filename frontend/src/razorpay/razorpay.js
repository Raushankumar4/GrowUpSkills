import axiosInstance from "@/Axios/AxiosInstance";

export const handlePay = async (amount, courseId, userId, userData) => {
  try {
    const { data: keyData } = await axiosInstance.get("razorpaykey");
    const { key } = keyData;

    const { data } = await axiosInstance.post("razorpay", {
      amount,
      courseId,
      userId,
    });

    const { order } = data;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Skill Bridge",
      description: "Course Payment",
      order_id: order.id,
      callback_url: `${import.meta.env.VITE_SERVER}/api/v1/paymentVerification`,
      prefill: {
        name: userData?.name || "Student",
        email: userData?.email || "student@example.com",
        contact: userData?.phone || "",
      },
      theme: {
        color: "#4F46E5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
};
