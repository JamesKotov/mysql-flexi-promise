# mysql-flexi-promise
### Author : Suraj Kumar Jha

This is a wrapper on top of nodejs mysql package. It is a promisified version of the mysql library.
Please note that this library creates a singleton pool connection to mysql (for now).

### Installation
npm i mysql-flexi-promise

### Requirements
depends on mysql npm package. Supports mysql 5.x. doesn't support mysql 8.0

### Code Example

```javascript
const DatabaseConnection = require('mysql-flexi-promise');


const config = {
    name: 'dev',
    host: 'localhost',
    user: 'root',
    password: '#1234567890',
    database: 'test',
    multipleStatements: true,
    connectionLimit: 10,
};

(async () => {
    const db = DatabaseConnection.getInstance(config);
    const query = 'select * from users';
    const result = await db.executeQuery(query, {});
    console.log(result);
})();
console.log(cleaned);
```

### Unit Tests
Run command : npm test

Please do the following pre requisites before running the unit tests
Please setup mysql 5.x and create a database named test. Also create a table users.

### Contributors
Suraj Kumar Jha

### License
MIT License
