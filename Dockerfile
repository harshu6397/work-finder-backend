FROM --platform=arm64 node:lts-alpine3.13

WORKDIR /app

COPY package*.json /app/

RUN npm install 

COPY . /app/

EXPOSE 3000 

CMD npm run dev