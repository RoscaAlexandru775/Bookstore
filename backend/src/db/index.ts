import path from 'path'
import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg'
import { migrate } from 'postgres-migrations'
require('dotenv').config();

const poolConfig = {
	database: process.env.DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	max: Number(process.env.DB_POOL_SIZE),
	idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
	connectionTimeoutMillis: Number(
		process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT
	),
}

class Database {
	pool: Pool

	constructor() {
		this.pool = new Pool(poolConfig)
	}

	runMigrations = async (): Promise<void> => {
		const client = await this.pool.connect()
		try {
			await migrate({ client }, path.resolve(__dirname, 'migrations/sql'))
			// logger.info('Migrations run succesfully');
		} catch (err: any) {
			console.error('migation failes', err)
		} finally {
			client.release()
		}
	}
	insertLog = async(values: Array<String>): Promise<QueryResult> => {
		const text = 'INSERT INTO logs(action_type, user_id, ip, timestamp, payload) values ($1, $2, $3, $4, $5) RETURNING *;'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, values);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};	
	registerUser = async(name: string, email: string, password: string): Promise<QueryResult> => {
		const text = 'INSERT INTO users(name, email, password) values ($1, $2, $3) RETURNING *;'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [name, email, password]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};	
	loginUser = async(email: string): Promise<QueryResult> => {
		const text = 'SELECT * FROM users WHERE email = ($1)'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [email]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};	
	getNewestBooks = async(numberOfBooks: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM books ORDER BY created_at DESC LIMIT ($1)'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [numberOfBooks]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};	
	getTopRatedBooks = async(numberOfBooks: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM books ORDER BY rating DESC LIMIT ($1)'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [numberOfBooks]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};	
	getFilteredBooks = async(page: number, categories: string[], lowerRating: number, upperRating: number, lowerNumberOfRatings: number, upperNumberOfRatings: number, offset: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM books WHERE book_genre = ANY($1) AND rating >= $2 AND rating <= $3 AND number_of_ratings >= $4 AND number_of_ratings <= $5 ORDER BY created_at DESC LIMIT $6 OFFSET $7'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings, 9, offset]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	};
	getTotalNumberOfFilteredBooks = async(categories: string[], lowerRating: number, upperRating: number, lowerNumberOfRatings: number, upperNumberOfRatings: number): Promise<QueryResult> => {
		const text = 'SELECT COUNT(*) FROM books WHERE book_genre = ANY($1) AND rating >= $2 AND rating <= $3 AND number_of_ratings >= $4 AND number_of_ratings <= $5'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	}
	searchBooks = async(search: string): Promise<QueryResult> => {
		const text = 'SELECT * FROM books WHERE name ILIKE $1 OR author ILIKE $1'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [search]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	}
	addToCart = async(userId: number, bookId: number): Promise<QueryResult> => {
	
		const text = 'INSERT INTO cart(user_id, book_id) values ($1, $2)  RETURNING *;'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [userId, bookId]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	}
	checkIfBookIsInCart = async(userId: number, bookId: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM cart WHERE user_id = $1 AND book_id = $2'
		const client = await this.pool.connect();
		
		try {
			return await client.query(text, [userId, bookId]);
		}
		catch(e) {
			throw 'Something went wrong';
		}
		finally {
			client.release();
		}
	}
	removeFromCart = async(cartId: number): Promise<QueryResult> => {
		const text = 'DELETE FROM cart WHERE cart_id = $1'
		const client = await this.pool.connect();
	
		try {
			return await client.query(text, [cartId]);
		} catch(e) {
			throw 'Something went wrong';
		} finally {
			client.release();
		}
	}
	getUserCart = async(userId: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM cart WHERE user_id = $1'
		const client = await this.pool.connect();

		try {
			return await client.query(text, [userId]);
		} catch(e) {
			throw 'Something went wrong';
		}
		finally {
			client.release();
		}
	}
	getBookById = async(bookId: number): Promise<QueryResult> => {
		const text = 'SELECT * FROM books WHERE book_id = $1'
		const client = await this.pool.connect();

		try {
			return await client.query(text, [bookId]);
		} catch(e) {
			throw 'Something went wrong';
		}
		finally {
			client.release();
		}
	}

}
const db = new Database()

export default db