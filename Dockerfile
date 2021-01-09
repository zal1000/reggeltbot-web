FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]