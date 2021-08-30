## Fretello code assesment

### Getting started
To run Fretello server, ensure that you have Node.js >= v10 installed in your machine.

### Installation
To setup the server, open your terminal. Make sure you're in the root of the directory of the project, then run the following commands:

``` ~$ npm install ```

Before you start the server, first setup your environment variables to avoid errors. check ``` .env.example ``` to create your env files.

 - To run the server in development, use

    ``` ~$ npm run dev ```

 - To run in production, first run build using:

    ``` ~$ npm run build ```

    Then run

    ``` ~$ npm run start ```
  - To run tests

    ``` ~$ npm run test ```

## Setting up database
> The free version of mongoDB cloud is used because of its high availability and speed. To setup the database, add the ``` DB_DEV_URL ``` to the environment file for dev environment and ``` DB_PRODUCTION_URL ``` for production environment. 
NOTE: to avoid error, do not use special characters when setting your db password.

 ## Impreovement
 To improve the query speed, Caching can be done using Redis or MemCache. computation will done once for each song and then cached. this way, future requests will be faster and more optimized.
