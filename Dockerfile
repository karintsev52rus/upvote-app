FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE ${PORT}
CMD ["npm", "run", "start"]