FROM node:12.0.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

ENV PORT=8080

ENV HOST=0.0.0.0

CMD ["npm", "run", "serve:ssr"]