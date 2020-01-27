FROM node:12
WORKDIR . /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.docker.example .env
EXPOSE 8080
CMD [ "npm", "start" ]