# Dockerfile

FROM node:18.16.0-alpine3.17
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "pm2"]