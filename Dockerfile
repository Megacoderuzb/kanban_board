FROM nginx:alpine

# Copy the pre-built React app from the local repository to Nginx's default web root
COPY ./dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]