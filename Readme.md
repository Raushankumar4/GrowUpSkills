# 📦 How to Run This MERN App with Docker (For Collaborators & Users)

This app uses Docker to simplify setup — no need to install Node.js, npm, or MongoDB on your system.

Just follow these steps and the entire project will run on your machine using containers.

---

## ✅ What You Need

- **Docker**: Install it here → https://docs.docker.com/get-docker/
- **Docker Compose**: Comes with Docker Desktop (just make sure it works by running `docker-compose -v`)

---

## 🚀 Getting Started

### 1. **Clone the project**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Create a .env file inside the backend/ folder
This file is needed to store API keys, database URI, and other secrets.
```env
PORT=8080
DB=mongodb://your-mongo-uri
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-key
FRONTEND=http://localhost:3000
NODE_ENV=development
RAZORPAY_SECRET_KEY=your-razorpay-secret
RAZORPAY_KEY_ID=your-razorpay-id
EMAIL_USER=your-email
EMAIL_PASS=your-password
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_API_KEY=your-secret-key
```
Don't share this file publicly. It contains private information.

3. Start the app using Docker Compose
In the root folder (where docker-compose.yml is), run:
```bash
docker-compose up --build
```
This command:

Builds the backend from ./backend

Builds the frontend from ./frontend

Starts everything using the mern Docker network

🔗 Access the App
Frontend: http://localhost:3000

Backend API: http://localhost:8080

🛑 Stopping the App
When you're done, press Ctrl + C in the terminal, or run:
```bash
docker-compose down
```
To clean up completely (including volumes):
# 🧠 Extra Notes
MongoDB is not included — this app connects to a remote MongoDB (e.g., MongoDB Atlas).

You can edit code in backend/ and it will auto-reload (if using nodemon).

You don’t need to install Node, npm, or MongoDB — Docker handles everything.

---

## 📌 Docker Hub Images

You can directly use the published Docker images from Docker Hub without building anything locally.

- **Frontend:** [`raushangupta/skillhub-frontend`](https://hub.docker.com/r/raushangupta/skillhub-frontend)
- **Backend:** [`raushangupta/skillhub-backend`](https://hub.docker.com/r/raushangupta/skillhub-backend)

---

## 🔥  Run Using Docker Hub Images

Create a file called `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  frontend:
    image: raushangupta/skillhub-frontend:latest
    container_name: skillhub-frontend
    ports:
      - "3000:3000"
    networks:
      - mern
    depends_on:
      - backend

  backend:
    image: raushangupta/skillhub-backend:latest
    container_name: skillhub-backend
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - DB=your-mongodb-uri
      - JWT_SECRET=your-secret
      - FRONTEND=http://localhost:3000
      # Add all other required variables
    networks:
      - mern

networks:
  mern:
    driver: bridge
```

Then run:
```bash
docker-compose -f docker-compose.prod.yml up
```
 You’re done! Visit:

Frontend: http://localhost:3000

Backend: http://localhost:8080



