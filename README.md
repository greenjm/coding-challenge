# Coding Challenge

## Build and Run

### Prerequisites
- Required:
    - Docker: https://docs.docker.com/engine/install/
    - Docker Compose: https://docs.docker.com/compose/install/
- Optional:
    - NodeJS (v14.17.3): https://nodejs.org
    - MongoDB (v4.4.6): https://www.mongodb.com/try/download/community

To build and run the project using Docker-compose, open a terminal and run:
```
$> git clone git@github.com:greenjm/coding-challenge.git
$> cd coding-challenge
$> docker-compose up -d
```

Docker compose will build and run a MongoDB database, as well as the Product API, exposed on port 3000, and the Product WebApp, exposed on port 4200.

Navigate to `http://localhost:4200` in your browser to use the web app.

## Run Tests
Server:
```
$> cd coding-challenge/ProductService
$> npm i ## If not done already
$> npm test
```

WebApp:
```
$> cd coding-challenge/ProductWebApp
$> npm i ## If not done already
$> npm test
```