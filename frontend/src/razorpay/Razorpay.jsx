import React from "react"
import productData from "./product.json"
import Product from "./Product";

export const Razorpay = () => {
  return (
    <div>
      <Product productData={productData} />
    </div>
  )
}