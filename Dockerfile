# FROM nginx:1.21.0-alpine

# WORKDIR /usr/share/nginx/html

# COPY dist/ .

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]
FROM nginx:1.21.0-alpine

# Set working dir to Nginx's default static folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy Vite build output
COPY dist/ .

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
