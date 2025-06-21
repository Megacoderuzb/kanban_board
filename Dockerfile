FROM nginx:1.21.0-alpine

# The 'dist' folder now comes directly from your Git repository.
# This command copies your pre-built 'dist' folder from the project
# into the default web server directory inside the container.
COPY dist/ .

# Copy your custom Nginx configuration to configure the server.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 so the container can receive traffic.
EXPOSE 80

# The default command to start the Nginx server.
CMD ["nginx", "-g", "daemon off;"]
