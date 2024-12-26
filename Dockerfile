FROM node:22-alpine
RUN apk add --no-cache bash
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build


EXPOSE ${PORT}
CMD [  "npm", "run", "start:migrate:prod" ]