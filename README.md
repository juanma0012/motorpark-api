# Motor Park API

This API provides different endpoints to manage a motor park, in includes CRUD and filter the elements depends on conditions.

# How to use

Wit this API you are able to continue working on it, testing the existing endpoints or just execute them in local or production environment
## Setting database
You need to create a database called **motorpark** where the API interact with, but don't worry, it's piece of cake, execute the file **db/motorpark.sql** in your database(MySql). After that, you're going to be able to use the API
## Install
- Install the dependencies
  > npm i
- Create the file **.env** in the main directory of the app. This file contains the environment variables where the app will get the data to connect the database and other settings:
```
API_PORT=3333
API_HOST= where_the_api_host_is // Example: 'localhost' for development environment
DB_HOST= where_the_db_host_is // Example: 'localhost' for development environment
DB_USER= user_to_connect_to_db
DB_PASSWORD= *******
```
> **Note:** The data that you put there has to match with either the development or production environments that you have.

## Development

In the command line, go to the repository folder and execute:
> node main.js

The app  will be available in  http://localhost:3333/  (depends on you configuration)
## Production

All your files are listed in the file explorer. You can switch from one to another by clicking a file in the list.

# General Information

This API is built with **Restify** framework for NodeJs. The database runs with Mysql.
These is the general tree of the repository
````
.
├── LICENSE
├── README.md
├── config.js
├── connectDb.js
├── db
│   ├── motorpark.sql
│   └── tables.js
├── main.js
└── package-lock.json
````

I hope you enjoy working with this API.
