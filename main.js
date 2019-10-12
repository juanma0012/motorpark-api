'use strict';

/**
 * Module Dependencies
 */
const { api_port, api_host } = require('./config'),
    restify = require('restify'),
    connectDbService = require('./connectDb'),
    dotenv = require('dotenv');

dotenv.config();;

/**
 * Initialize Server
 */

const server = restify.createServer({
    url: api_host
});

const connection = new connectDbService();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Get all results from vehicles
server.get('/vehicles', function (req, res, next) {
    let filters = req.query;
    connection.getVehicles(filters).then(results => {
        res.send(results);
        return next();
    }, error => {
        return next(new Error(error));
    });
});

// Get all results from makes
server.get('/makes', function (req, res, next) {
    connection.getMakes().then(results => {
        res.send(results);
        return next();
    }, error => {
        return next(new Error(error));
    });
});

// Get all results from types
server.get('/types', function (req, res, next) {
    connection.getTypes().then(results => {
        res.send(results);
        return next();
    }, error => {
        return next(new Error(error));
    });
});

server.get('/', function (req, res, next) {
    res.send({ message: 'Get data related with motor park', created: { by: 'Juan Sanchez', date: 'October 12, 2019' } });
    return next();
});

server.listen(api_port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
