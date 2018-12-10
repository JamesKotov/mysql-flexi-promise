const mysql = require('mysql');
const _ = require('lodash');

let pool;
/**
 * @class DatabaseConnection This class creates a singleton connection to
 * the database and returns a pool, and not a single connection
 * @param config {object} config containing db credentials
 */
class DatabaseConnection {
    constructor(config) {
        if (_.isNull(config) || !_.isObject(config)) {
            throw new Error('Database Connection class needs the database config');
        }
        console.log(config);
        if (!config.host || !config.user || !config.password || !config.database) {
            throw new InvalidConfigException('Either host | username | pwd | database is missing from the config');
        }
        this.config = config;
        pool = this.getConnectionPool();
    }

    /**
     * @methodOf DatabaseConnection.getConnectionPool method creates a singleton pool connection
     * to the database mentioned on the config
     * @returns {object} connection_pool
     */
    getConnectionPool() {
        if (pool) return pool;
        pool = mysql.createPool({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
        });
        return pool;
    }

    /**
     * @methodOf DatabaseConnection.executeQuery method executes a mysql query and takes as param the query
     * and related options
     * @returns {object} query result (rows)
     */
    executeQuery(query, options) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { return reject(err); }
                connection.query(query, options, (err, rows) => {
                    connection.release();
                    if (err) { return reject(err); }
                    return resolve(rows);
                });
            });
        });
    }

    /**
     * @methodOf DatabaseConnection.closePool destroys the pool and all its connections
     * @returns {boolean} result
     */
    closePool() {
        return new Promise((resolve, reject) => {
            try {
                pool.end();
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = DatabaseConnection;
