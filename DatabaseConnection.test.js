const DatabaseConnection = require('./DatabaseConnection');

describe('Testing correct query', () => {
	it('executes query on correct config and query', async () => {
		const config = {
			name: 'dev',
			host: 'localhost',
			user: 'root',
			password: '#1234567890',
			database: 'test',
			multipleStatements: true,
			connectionLimit: 10,
		};

		const db = DatabaseConnection.getInstance(config);
		const query = 'select * from users';
		const result = await db.executeQuery(query, {});
		expect(result).not.toBe(null);
		expect(typeof result).toBe('object');
	});

	it('throws an error for incorrect config', async () => {
		const config = {
			name: 'dev',
			host: 'localhost',
			user: '',
			password: '#1234567',
			database: 'test',
			multipleStatements: true,
			connectionLimit: 10,
		};

		const db = DatabaseConnection.getInstance(config);
		db.closePool();
		db.config = config;
		db.createConnectionPool();
		const query = 'select * from users';
		try {
			await db.executeQuery(query, {});
		} catch (e) {
		 expect(e.message).toEqual("ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: YES)");
		}
	});
});

