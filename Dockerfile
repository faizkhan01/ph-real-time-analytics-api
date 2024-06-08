FROM node:lts-slim as builder

# Latest npm regardless of node version.
RUN npm i npm@latest -g

# just for development purpose (for ps command)
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

RUN chmod 777 .

COPY package*.json ./

RUN npm install

COPY . /app/

CMD ["npm", "run", "dev"]

# CMD ["npm", "./dist/apps/main.js"]

RUN echo '🐳 Docker build success'