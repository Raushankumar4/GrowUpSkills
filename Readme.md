# MERN App - Run with Docker (Beginner Friendly)

This is a full stack MERN (MongoDB, Express, React, Node.js) project. You can run it easily using Docker without installing Node, npm, or MongoDB manually.

---

## ✅ What You Need First

1. **Install Docker**: [Get Docker](https://docs.docker.com/get-docker/)
2. **Install Docker Compose** (usually comes with Docker Desktop)

---

## 📁 Folder Setup

This project has:

- `frontend/` — React app
- `backend/` — Node.js/Express app
- `docker-compose.yml` — file that runs everything together

---
## Steps to Run the App
## ⚙️ Step 1: Setup Environment File

Create a file named `.env` inside the `backend/` folder and paste this (fill in your own values):

```env
PORT=8080
DB=mongodb://your-mongo-uri
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=your-stripe-key
FRONTEND=http://localhost:3000
NODE_ENV=development
RAZORPAY_SECRET_KEY=your-razorpay-secret
RAZORPAY_KEY_ID=your-razorpay-id
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_API_KEY=your-secret-key
```
⚠️ Don't share your .env file — it contains secrets.

.

###  Create a file named `docker-compose.yml` with the following content:

```yaml
version: '3'

services:
  backend:
    image: raushangupta/skillhub-backend:latest
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/yourdbname
    depends_on:
      - mongo

  frontend:
    image: raushangupta/skillhub-frontend:latest
    ports:
      - "3000:3000"
    depends_on:
      - backend

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```bash
docker-compose up --build
```
🧪 Step 2: Run the App
Open your terminal in the project folder (where docker-compose.yml is), and run:

This will:

Build and start the frontend on http://localhost:3000

Build and start the backend on http://localhost:8080

🛑 Stop the App
Press Ctrl + C in the terminal, or run:
```bash
docker-compose down
```
🧠 Notes
This setup does not include MongoDB inside Docker. You must connect to a cloud DB (like MongoDB Atlas).

Frontend uses Vite and will auto-refresh.

Backend uses file sharing — you can edit code and restart backend.





