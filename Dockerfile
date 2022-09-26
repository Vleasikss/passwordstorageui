FROM node:16
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY src src/
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]