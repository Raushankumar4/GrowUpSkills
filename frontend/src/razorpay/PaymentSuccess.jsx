import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/Axios/AxiosInstance";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [receipt, setReceipt] = useState(null);
  const paymentId = searchParams.get("reference");

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const { data } = await axiosInstance.get(`receipt/${paymentId}`);
        setReceipt(data);
      } catch (error) {
        console.error("Failed to fetch receipt", error);
      }
    };
    if (paymentId) fetchReceipt();
  }, [paymentId]);

  const handlePrint = () => {
    window.print();
  };

  if (!receipt)
    return (
      <p className="text-center text-gray-600 mt-10">Loading receipt...</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 print:bg-white">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-2xl border print:shadow-none print:border print:border-gray-300">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          🎉 Payment Successful
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Thank you for your purchase, <strong>{receipt.user.name}</strong>!
        </p>

        {/* Receipt Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-sm text-left">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold w-1/3">Receipt Number</td>
                <td className="p-2">{receipt.receiptNumber || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Payment ID</td>
                <td className="p-2">{receipt.paymentId}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Course Title</td>
                <td className="p-2">{receipt.course.title}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Course Description</td>
                <td className="p-2">{receipt.course.description}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">User Name</td>
                <td className="p-2">{receipt.displayName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">User Email</td>
                <td className="p-2">{receipt.user.email}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Purchase Date</td>
                <td className="p-2">
                  {new Date(receipt.purchaseDate).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print Button */}
        <div className="flex justify-center mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
          >
            🖨️ Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
