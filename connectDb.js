'use strict';

/**
 * Module Dependencies
 */
const mysql = require("mysql");
const { db_host, db_user, db_password } = require('./config');
const { makeTable, typeTable, modelTable, vehicleTable } = require('./db/tables');

/**
 * Service to interact with the db. 
 */
module.exports = class connectDbService {
    constructor() {
        this.pool = mysql.createPool({
            host: db_host,
            user: db_user,
            password: db_password,
            database: 'motorpark'
        });
    }

    async getMakes() {
        let sql = `SELECT ${makeTable.fields.id}, ${makeTable.fields.name} 
            FROM ${makeTable.table};`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async getTypes() {
        let sql = `SELECT ${typeTable.fields.id}, ${typeTable.fields.name} 
            FROM ${typeTable.table};`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async getModels(makeIds) {
        let sql = `SELECT ${modelTable.fields.id}, ${modelTable.fields.name}, ${modelTable.fields.make}, ${modelTable.fields.type} 
            FROM ${modelTable.table}
            WHERE ${modelTable.fields.make} IN (${makeIds.join()});`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async getVehicles(filters = null) {
        // Fields from the tables that are going to be shown
        let vehicleId = `${vehicleTable.table}.${vehicleTable.fields.id} as vehicle_id`;
        let modelYear = `${vehicleTable.table}.${vehicleTable.fields.year} as year`;
        let modelId = `${modelTable.table}.${modelTable.fields.id} as model_id`;
        let modelName = `${modelTable.table}.${modelTable.fields.name} as model_name`;
        let typeId = `${typeTable.table}.${typeTable.fields.id} as type_id`;
        let typeName = `${typeTable.table}.${typeTable.fields.name} as type_name`;
        let makeId = `${makeTable.table}.${makeTable.fields.id} as make_id`;
        let makeName = `${makeTable.table}.${makeTable.fields.name} as make_name`;

        // Select all the fields for the query
        let select = `SELECT ${vehicleId}, ${modelYear}, ${modelId}, ${modelName}, ${typeId}, ${typeName}, ${makeId}, ${makeName} `;
        // Create the relationship between the tables for the query
        let joinModel = `INNER JOIN ${modelTable.table} ON ${vehicleTable.table}.${vehicleTable.fields.model} = ${modelTable.table}.${modelTable.fields.id}`;
        let joinMake = `INNER JOIN ${makeTable.table} ON ${modelTable.table}.${modelTable.fields.make} = ${makeTable.table}.${makeTable.fields.id}`;
        let joinType = `INNER JOIN ${typeTable.table} ON ${modelTable.table}.${modelTable.fields.type} = ${typeTable.table}.${typeTable.fields.id}`;

        let where = '';
        // Adding conditions to the query if they exits
        if (filters) {
            if (filters.model) {
                joinModel += ` AND ${modelTable.table}.${modelTable.fields.id} IN (${filters.model.join()})`;
            } else {
                if (filters.make) {
                    joinMake += ` AND ${makeTable.table}.${makeTable.fields.id} IN (${filters.make.join()})`;
                }
                if (filters.type) {
                    joinType += ` AND ${typeTable.table}.${typeTable.fields.id} IN (${filters.type.join()})`;
                }
            }
            if (filters.year) {
                where += ` WHERE `;
                let whereWithData = false;
                if (filters.year.since) {
                    where += ` ${vehicleTable.table}.${vehicleTable.fields.year} >= ${filters.year.since} `;
                    whereWithData = true;
                }
                if (filters.year.until) {
                    if (whereWithData) {
                        where += ` AND `;
                    }
                    where += ` ${vehicleTable.table}.${vehicleTable.fields.year} <= ${filters.year.until} `;
                }
            }
        }
        // Ordering the results for the query
        let orderBy = `ORDER BY  ${makeTable.table}.${makeTable.fields.name}, ${modelTable.table}.${modelTable.fields.name}, ${typeTable.table}.${typeTable.fields.name}`;
        // Whole query
        let sql = `${select} FROM ${vehicleTable.table} ${joinModel} ${joinMake} ${joinType} ${where} ${orderBy}`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async removeVehicle(vehicleId) {
        let sql = `DELETE FROM  ${vehicleTable.table} WHERE ${vehicleTable.fields.id} = ${vehicleId};`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async addVehicle(payload) {
        let sql = `INSERT INTO ${vehicleTable.table} (${vehicleTable.fields.model}, ${vehicleTable.fields.year}) VALUES (${payload.model}, ${payload.year});`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async editVehicle(vehicleId, payload) {
        let sql = `UPDATE ${vehicleTable.table} SET ${vehicleTable.fields.model} = ${payload.model}, ${vehicleTable.fields.year} = ${payload.year} WHERE ${vehicleTable.fields.id} = ${vehicleId} ;`;
        try {
            return await this.runQuery(sql);
        } catch (error) {
            throw error;
        }
    }

    async runQuery(query) {
        let promise = new Promise((resolve, reject) => {
            this.pool.query(query,
                (error, results, fields) => {
                    if (error) {
                        reject(error.message);
                    }
                    resolve(JSON.parse(JSON.stringify(results)));
                });
        });
        try {
            return await promise;
        } catch (error) {
            throw error;
        }
    }
}
