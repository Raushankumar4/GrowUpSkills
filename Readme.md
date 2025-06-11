# MERN Stack – Dockerized App (Local Development)

This project uses Docker Compose to run a **MERN stack** (MongoDB, Express, React, Node.js) application locally. It builds the frontend and backend from source and loads environment variables from `.env`.

---

## 📦 Services

- **frontend** – React app built with Vite
- **backend** – Node.js/Express API
- **MongoDB** – (you can link one manually or via another service if required)

---

## 🛠 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- `.env` file in the `backend/` folder

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory with the following content:

```env
PORT=8080
DB=mongodb://<your-mongo-uri>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
FRONTEND=http://localhost:3000
NODE_ENV=development
RAZORPAY_SECRET_KEY=your-razorpay-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET_API_KEY=your-cloudinary-secret
```
