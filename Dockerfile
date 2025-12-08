FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build với base path cho local deployment (có thể override bằng --build-arg)
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN npm run build

#stage 2: get result from stage1 builder

FROM nginx:alpine

# Copy build result từ builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config để handle base path
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]