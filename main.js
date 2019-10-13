'use strict';

/**
 * Module Dependencies
 */
const { api_port, api_host } = require('./config'),
    restify = require('restify'),
    connectDbService = require('./connectDb'),
    dotenv = require('dotenv'),
    corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    origins: ['*']
});


dotenv.config();;

/**
 * Initialize Server
 */

const server = restify.createServer({
    url: api_host
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const connection = new connectDbService();

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

// Get all results from models
server.get('/models', function (req, res, next) {
    let make = req.query.make;
    if (make) {
        connection.getModels(make).then(results => {
            res.send(results);
            return next();
        }, error => {
            return next(new Error(error));
        });
    } else {
        res.send({});
        return next();
    }
});

// Remove the element selected
server.del('/vehicles/:id', function (req, res, next) {
    connection.removeVehicle(req.params.id).then(results => {
        res.send(true);
        return next();
    }, error => {
        return next(new Error(error));
    });
});

server.post('/vehicles', function (req, res, next) {
    let payload = req.body;
    connection.addVehicle(payload).then(results => {
        res.send(true);
        return next();
    }, error => {
        return next(new Error(error));
    });
});

server.put('/vehicles/:id', function (req, res, next) {
    let payload = req.body;
    connection.editVehicle(req.params.id, payload).then(results => {
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
