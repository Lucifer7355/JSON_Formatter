# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on (for example, 3000)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
