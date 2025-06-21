# ---- Stage 1: Build the React application ----
# Use an official Node.js image as the builder environment
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build


# ---- Stage 2: Set up the Nginx server for production ----
# Use a lightweight Nginx image
FROM nginx:1.21.0-alpine

# Copy the build output from the 'build' stage
# from /app/build (in the builder) to /usr/share/nginx/html (in the Nginx image)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
# This will replace the default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]