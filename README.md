
# Motor Park API

  

This API provides different endpoints to manage a motor park, in includes CRUD and filter the elements depends on conditions.

# Endpoints

### Get Vehicles
- Returns a list of vehicles **without** filters
> GET http://API_host/vehicles

The response is a list of vehicles
> [{"vehicle_id":103,"year":2012,"model_id":23,"model_name":"A4","type_id":1,"type_name":"Sedan","make_id":3,"make_name":"Audi"},
{"vehicle_id":111,"year":2017,"model_id":25,"model_name":"A6","type_id":1,"type_name":"Sedan","make_id":3,"make_name":"Audi"}]

- Returns a list of vehicles **using** filters with Query string
> GET http://API_host/vehicles?make=1%2C4&year_since=2016&year_until=2018

The response is a list of vehicles
Parameters:
 make: [1,4], array of make's id, optional.
 type: [1,2], array of type's id, optional.
 model:[5,6], array of model's id, optional.
 year_since: 2016, number, optional.
 year_until: 2018, number, optional

> {make:[make_id1, make_id2], type[type_id1, type_id2]}

### Add Vehicle
Add a vehicle to the list
> POST http://API_host/vehicles

The payload must be
> { model:model_id, year: model_year}

### Edit Vehicle
Edit a vehicle depending of the ID
> PUT http://API_host/vehicles/:id

### Remove Vehicle
Remove a vehicle depending of the ID
> DELETE http://API_host/vehicles/:id

### Get Makes
Returns a list of vehicles' makes
> GET http://API_host/makes

The response is a list of makes
> [{"id":1,"name":"Kia"},{"id":2,"name":"Mazda"},{"id":3,"name":"Audi"},{"id":4,"name":"Ford"},{"id":5,"name":"Toyota"},{"id":6,"name":"Nissan"},{"id":7,"name":"Suzuki"}]

### Get Models
Returns a list of vehicles'  models
> GET http://API_host/models?make=1%2C4

Parameters:
> {make:[1, 4]}

The response is a list of models
> [{"id":3,"name":"Picanto","make_id":1,"type_id":2},{"id":4,"name":"Cerato","make_id":1,"type_id":1},{"id":19,"name":"Ranger","make_id":4,"type_id":4},{"id":20,"name":"Fiesta","make_id":4,"type_id":1}]

### Get Types
Returns a list of vehicles'  types
> GET http://API_host/types

The response is a list of types
> [{"id":1,"name":"Sedan"},{"id":2,"name":"Compact"},{"id":3,"name":"SUV"},{"id":4,"name":"Pickup"}]

# How to use it

  

Wit this API you are able to continue working on it, testing the existing endpoints or just execute them in local or production environment

## Setting database

You need to create a database called **motorpark** where the API interact with, but don't worry, it's piece of cake, execute the file **db/motorpark.sql** in your database(MySql). After that, you're going to be able to use the API

This is the Entity relationship diagram

![Entity relationship diagram](https://raw.githubusercontent.com/juanma0012/motorpark-api/master/db/erd.png)
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

>  **Note:** The data that you put there has to match with either the development or production environments that you have.

  

## Development

  

In the command line, go to the repository folder and execute:

> node main.js

  

The app will be available in http://localhost:3333/ (depends on you configuration)

## Production

  

Put the API app in your server, and execute into the app in the background:

> node main.js &

  

The app will be available in your server http://your_server:3333/

  

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

│ ├── motorpark.sql

│ └── tables.js

├── main.js

└── package-lock.json

````

I hope you enjoy working with this API.
