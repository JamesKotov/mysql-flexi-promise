const DatabaseConnection = require('./DatabaseConnection');


describe('Testing getConnectionPool functon', () => {
    it('returns a connection pool for correct config', () => {
        const config = {
            "name": "dev",
            "host": "104.211.216.91",
            "user": "policy_user",
            "password": "Fre@mW3Rl@123",
            "database": "los_dev_db1",
            "multipleStatements": true,
            "connectionLimit": 100
        };
        const db = new DatabaseConnection(config);
    });

    it('throws an error on incorrect config', () => {

    });

});
