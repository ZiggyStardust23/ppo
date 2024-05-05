import { User } from "./UserModel"
import { Pool } from 'pg';
import * as conf from '../../config'


interface IUserRepository{
    create(user: User): Promise<User>
	update(user: User): Promise<User | null>
	authenticate(login: string, password: string): Promise<User | null>
	getByEmail(email: string): Promise<User | null>
	getById(id: string): Promise<User | null>
	delete(id: string): Promise<boolean>
}

export class PostgresUserRepository implements IUserRepository {
    private pool: Pool;

	constructor() {
        this.pool = new Pool({
            user: conf.user,
            password: conf.password,
            host: conf.host,
            port: conf.port,
            database: conf.database
        });
    }

	async initialize(): Promise<void> {
        await this.ensureTableExists();
    }

	async ensureTableExists(): Promise<void> {
        const client = await this.pool.connect();
        try {
            // Проверяем, существует ли таблица
            const result = await client.query(
                `SELECT to_regclass('public.users')`
            );

            if (!result.rows[0].to_regclass) {
                // Если таблица не существует, создаем ее
                await client.query(
                    `CREATE TABLE users (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        password TEXT NOT NULL,
                        phone_number VARCHAR(30) NOT NULL,
                        role INT NOT NULL CHECK (role >= 0 AND role <= 2),
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                    )`
                );
                console.log('Таблица пользователей создана');
            } else {
                console.log('Таблица пользователей уже существует');
            }
        } catch (error: any) {
            console.error('Ошибка при проверке таблицы пользователей:', error.message);
        } finally {
            client.release();
        }
    }

    async create(user: User): Promise<User> {
            const client = await this.pool.connect();
            const result = await client.query<User>(
                `INSERT INTO users (name, email, password, phone_number, role) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [user.name, user.email, user.password, user.phone_number, user.role]
            );

            client.release();

            let toParse = result.rows[0];
            let userCreated = new User(
                toParse.id, 
                toParse.name,
                toParse.email,
                toParse.password,
                toParse.phone_number,
                toParse.role
            )
            return userCreated;
    }

    async update(user: User): Promise<User | null> {
        try {
            // Проверка, что пользователь существует
            if (!user.id) {
                throw new Error('ID пользователя не указан');
            }

            const client = await this.pool.connect();
            const result = await client.query<User>(
                `UPDATE users SET name = $1, email = $2, password = $3, phone_number = $4, role = $5, updated_at = CURRENT_TIMESTAMP 
                WHERE id = $6 RETURNING *`,
                [user.name, user.email, user.password, user.phone_number, user.role, user.id]
            );

            client.release();

            if (result.rows.length === 0) {
                throw new Error('Пользователь не найден');
            }

            let toParse = result.rows[0];
            let userUpdated = new User(
                toParse.id, 
                toParse.name,
                toParse.email,
                toParse.password,
                toParse.phone_number,
                toParse.role
            )
            return userUpdated;
        } catch (error: any) {
            console.error('Ошибка при обновлении пользователя:', error.message);
            return null;
        }
    }

    async authenticate(login: string, password: string): Promise<User | null> {
        try {
            // Валидация входных данных
            if (!login || !password) {
                throw new Error('Не указан email или пароль');
            }

            const client = await this.pool.connect();
            const result = await client.query<User>(
                `SELECT * FROM users WHERE email = $1`,
                [login]
            );

            client.release();

            const user = result.rows[0];

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            // Дополнительная проверка пароля
            if (user.password !== password) {
                throw new Error('Неверный пароль');
            }

            return user;
        } catch (error: any) {
            console.error('Ошибка аутентификации:', error.message);
            return null;
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        try {
            // Валидация входных данных
            if (!email) {
                throw new Error('Email не указан');
            }

            const client = await this.pool.connect();
            const result = await client.query<User>(
                `SELECT * FROM users WHERE email = $1`,
                [email]
            );

            client.release();

            if (result.rows.length === 0) {
                throw new Error('Пользователь с указанным email не найден');
            }

            let toParse = result.rows[0];
            let userGetted = new User(
                toParse.id, 
                toParse.name,
                toParse.email,
                toParse.password,
                toParse.phone_number,
                toParse.role
            )
            return userGetted;
        } catch (error: any) {
            console.error('Ошибка при поиске пользователя по email:', error.message);
            return null;
        }
    }

    async getById(id: string): Promise<User | null> {
        try {
            // Валидация входных данных
            if (!id) {
                throw new Error('ID пользователя не указан');
            }

            const client = await this.pool.connect();
            const result = await client.query<User>(
                `SELECT * FROM users WHERE id = $1`,
                [parseInt(id)]
            );

            client.release();

            if (result.rows.length === 0) {
                throw new Error('Пользователь с указанным ID не найден');
            }

            let toParse = result.rows[0];
            let userGetted = new User(
                toParse.id, 
                toParse.name,
                toParse.email,
                toParse.password,
                toParse.phone_number,
                toParse.role
            )
            return userGetted;
        } catch (error: any) {
            console.error('Ошибка при поиске пользователя по ID:', error.message);
            return null;
        }
    }
	async delete(id: string): Promise<boolean> {
        try {
            // Проверка, что ID пользователя указан
            if (!id) {
                throw new Error('ID пользователя не указан');
            }

            const client = await this.pool.connect();
            await client.query(
                `DELETE FROM users WHERE id = $1`,
                [id]
            );

            client.release();

            return true;
        } catch (error: any) {
            console.error('Ошибка при удалении пользователя:', error.message);
            return false;
        }
    }
}




export { IUserRepository }