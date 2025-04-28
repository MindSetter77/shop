# 1. Etap: budowanie frontendu
FROM node:20 AS frontend-build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=5173

EXPOSE 5173

CMD ["npm", "start"]
