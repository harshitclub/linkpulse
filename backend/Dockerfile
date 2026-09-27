# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first to take advantage of Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all backend source files into the container
COPY . .

# Expose port 5000 (the port Express listens on)
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
