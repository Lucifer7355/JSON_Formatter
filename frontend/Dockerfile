# Stage 1: Build the frontend using Node.js
FROM node:14 as build

WORKDIR /app

# Initialize npm and install necessary dependencies
RUN npm init -y
RUN npm install --save-dev webpack webpack-cli dotenv

COPY . .

RUN npm install -g http-server

# Build the frontend assets using webpack
RUN npx webpack --config webpack.config.js

# Stage 2: Serve the frontend using http-server
FROM node:14-alpine

WORKDIR /app

# Copy the built files from the previous build stage
COPY --from=build /app/dist /app

# Install http-server globally to serve the static files
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Serve the frontend on port 8080
CMD ["http-server", "-p", "8080"]
