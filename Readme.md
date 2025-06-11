# MERN App Docker Guide

## About Docker Hub Images

This project’s backend and frontend Docker images are published on Docker Hub to simplify deployment and usage.

- **Backend Image:** `yourdockerhubusername/skillhub-backend`  
  Contains the Node.js/Express backend server ready to run.

- **Frontend Image:** `yourdockerhubusername/skillhub-frontend`  
  Contains the built React frontend served by a static server.

You can pull these images directly from Docker Hub without building locally:

```bash
docker pull yourdockerhubusername/skillhub-backend:latest
docker pull yourdockerhubusername/skillhub-frontend:latest
```

# Prerequisites

Docker installed: https://docs.docker.com/get-docker/

Docker Compose installed: https://docs.docker.com/compose/install/

Docker Hub account: https://hub.docker.com/

# How to Use My Docker Images with Docker Compose

# If you want to run the MERN app images I pushed to Docker Hub, just follow these steps:

# 1. Make sure Docker and Docker Compose are installed.

```bash
Docker install
Docker Compose install
```

# 2. Create a file named docker-compose.yml with this content

```bash
version: '3'

services:
  backend:
    image: yourdockerhubusername/skillhub-backend:latest
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/yourdbname
    depends_on:
      - mongo

  frontend:
    image: yourdockerhubusername/skillhub-frontend:latest
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
```

Replace yourdockerhubusername with my actual Docker Hub username

# 3. Run this command in the folder with docker-compose.yml:

```bash
docker-compose up
```

# 4. Access the app at:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

That’s it! Docker Compose will:

Pull the images from Docker Hub

Start MongoDB container

Start backend and frontend containers connected together

# ----PUSHING IMAGES ON DOCKER HUB GUIDE----

# Step 1: Build Docker images locally

Build the backend image:

```bash
docker build -t skillhub-backend ./backend
```

Build the frontend image:

```bash
docker build -t skillhub-frontend ./frontend
```

# Step 2: Tag images with your Docker Hub username

Replace yourdockerhubusername with your Docker Hub username.

```bash
docker tag skillhub-backend yourdockerhubusername/skillhub-backend:latest
docker tag skillhub-frontend yourdockerhubusername/skillhub-frontend:latest
```

# Step 3: Log in to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password when prompted.

# Step 4: Push images to Docker Hub

```bash
docker push yourdockerhubusername/skillhub-backend:latest
docker push yourdockerhubusername/skillhub-frontend:latest
```

# Step 5. Check Your DockerHub
