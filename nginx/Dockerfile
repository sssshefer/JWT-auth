FROM nginx:1.10.1-alpine
COPY index.html /usr/share/nginx/html
COPY default.conf /etc/nginx/sites-enabled/default
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]