FROM nginx:latest

#将本地dist复制到nginx-docker的share文件夹中
COPY dist /usr/share/nginx/html
#覆盖默认配置文件
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
