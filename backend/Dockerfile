# Use Node.js base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package.json files first (for caching)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the backend port
EXPOSE 8080

# Start the development server (you can change to "start" for production)
CMD ["npm", "run", "dev"]
