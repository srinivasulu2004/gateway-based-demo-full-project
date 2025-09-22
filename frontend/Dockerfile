FROM node:18-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

#stage:2
FROM alpine:latest
VOLUME /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
