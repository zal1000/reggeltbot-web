FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]