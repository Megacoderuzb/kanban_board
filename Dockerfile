FROM nginx:1.21.0-alpine

WORKDIR /usr/share/nginx/html

COPY dist/ .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
