FROM nginx:stable-alpine

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY build/ /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
