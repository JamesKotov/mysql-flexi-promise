const mysql = require('mysql');

let instance;

/**
 * @class DatabaseConnection class exposes methods to work with mysql and returns query execution
 * results as promise
 */
class DatabaseConnection {
	/**
	 * @methodOf DatabaseConnection.getInstance method creates a singleton object of this class
     * @param config
     * @returns {*}
     */
	static getInstance(config) {
		if (instance) return instance;
		instance = new DatabaseConnection();
		instance.config = config;
		try {
			instance.createConnectionPool();
			return instance;
		} catch (e) {
		    console.log(e);
		    throw new Error('could not create pool');
		}
	}
	/**
     * @methodOf DatabaseConnection.getConnectionPool method creates a singleton pool connection
     * to the database mentioned on the config
     * @returns {object} connection_pool
     */
	createConnectionPool() {
		if (this.pool) return this.pool;
		this.pool = mysql.createPool({
			host: this.config.host,
			user: this.config.user,
			password: this.config.password,
			database: this.config.database,
		});
	}

	/**
     * @methodOf DatabaseConnection.executeQuery method executes a mysql query and takes as param the query
     * and related options
     * @returns {object} query result (rows)
     */
	executeQuery(query, options) {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) { return reject(err); }
				connection.query(query, options, (err, rows) => {
					connection.destroy();
					if (err) { return reject(err); }
					return resolve(rows);
				});
			});
		});
	}

	/**
     * @methodOf DatabaseConnection.closePool destroys the pool and all its connections
     * @returns {Promise<any>} result
     */
	closePool() {
		return new Promise((resolve, reject) => {
			try {
				this.pool.end();
				delete this.pool;
				return resolve(true);
			} catch (e) {
				return reject(e);
			}
		});
	}
}

module.exports = DatabaseConnection;
