FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

#stage 2: get result from stage1 builder

FROM nginx:alpine

# Copy build result từ builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf
# nếu không dùng nginx thì phải tự chạy với serve 
# CMD ["serve", "-s", "dist", "-l", "3000"] nhưng nginx tối ưu hơn

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]