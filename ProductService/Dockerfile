FROM node:14.17.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ProductService/package*.json ./

RUN npm install

# Bundle app source
COPY ProductService/ .

CMD [ "node", "app.js" ]