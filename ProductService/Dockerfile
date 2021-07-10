FROM node:14.17.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY ProductService/ .

EXPOSE 8080
CMD [ "node", "app.js" ]