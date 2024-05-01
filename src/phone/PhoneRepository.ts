import { Phone } from "./PhoneModel";
import { phoneFullDTO, phoneSearchDTO } from "./PhoneDTO";
import { QueryResult, Pool } from 'pg';

import * as conf from '../../config'

export interface IPhoneRepository {
    getById(id: string): Promise<Phone | null>;
    paginate(props: Partial<phoneFullDTO>, pageNumber: number, pageSize: number): Promise<Phone[]>;
    create(phone: Phone): Promise<Phone>;
    update(phone: Phone): Promise<Phone | null>;
}

export class PostgresPhoneRepository implements IPhoneRepository {
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
                `SELECT to_regclass('public.phones')`
            );

            if (!result.rows[0].to_regclass) {
                // Если таблица не существует, создаем ее
                await client.query(
                    `CREATE TABLE phones (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        producername VARCHAR(255),
                        osname VARCHAR(255),
                        ramsize INT NOT NULL CHECK (ramsize >= 0),
                        memsize INT NOT NULL CHECK (memsize >= 0),
                        camres INT NOT NULL CHECK (camres >= 0),
                        price INT NOT NULL CHECK (price >= 0),
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                    )`
                );
                console.log('Таблица телефонов создана');
            } else {
                console.log('Таблица телефонов уже существует');
            }
        } catch (error: any) {
            console.error('Ошибка при проверке таблицы телефонов:', error.message);
        } finally {
            client.release();
        }
    }

    async create(phone: Phone): Promise<Phone> {
            const client = await this.pool.connect();
            const result = await client.query<Phone>(
                `INSERT INTO phones (name, producername, osname, ramsize, memsize, camres, price) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [phone.name, phone.producername, phone.osname, phone.ramsize, phone.memsize, phone.camres, phone.price]
            );

            client.release();

            let toParse = result.rows[0];
            let phoneCreated = new Phone(
                toParse.id,
                toParse.name,
                toParse.producername,
                toParse.osname,
                toParse.ramsize,
                toParse.memsize,
                toParse.camres,
                toParse.price
            )
            return phoneCreated;
    }

    async update(phone: Phone): Promise<Phone | null> {
        try {
            // Проверка, что пользователь существует
            if (!phone.id) {
                throw new Error('ID телефона не указан');
            }

            const client = await this.pool.connect();
            const result = await client.query<Phone>(
                `UPDATE phones SET name = $1, producername = $2, osname = $3, ramsize = $4, memsize = $5, camres = $6, price = $7, updated_at = CURRENT_TIMESTAMP 
                WHERE id = $8 RETURNING *`,
                [phone.name, phone.producername, phone.osname, phone.ramsize, phone.memsize, phone.camres, phone.price, phone.id]
            );

            client.release();

            if (result.rows.length === 0) {
                throw new Error('Телефон не найден');
            }

            let toParse = result.rows[0];
            let phoneUpdated = new Phone(
                toParse.id,
                toParse.name,
                toParse.producername,
                toParse.osname,
                toParse.ramsize,
                toParse.memsize,
                toParse.camres,
                toParse.price
            )
            console.log(toParse);
            console.log(phoneUpdated);
            return phoneUpdated;
        } catch (error: any) {
            console.error('Ошибка при обновлении телефона:', error.message);
            return null;
        }
    }

    async getById(id: string): Promise<Phone | null> {
        try {
            // Валидация входных данных
            if (!id) {
                throw new Error('ID телефона не указан');
            }

            const client = await this.pool.connect();
            const result = await client.query<Phone>(
                `SELECT * FROM phones WHERE id = $1`,
                [parseInt(id)]
            );

            client.release();

            if (result.rows.length === 0) {
                throw new Error('Телефон с указанным ID не найден');
            }

            let toParse = result.rows[0];
            let phoneGetted = new Phone(
                toParse.id,
                toParse.name,
                toParse.producername,
                toParse.osname,
                toParse.ramsize,
                toParse.memsize,
                toParse.camres,
                toParse.price
            )
            return phoneGetted;
        } catch (error: any) {
            console.error('Ошибка при поиске телефона по ID:', error.message);
            return null;
        }
    }
	async paginate(props: phoneSearchDTO, pageNumber: number, pageSize: number): Promise<Phone[]> {
        const offset = (pageNumber - 1) * pageSize;
    
        let query = `SELECT * FROM phones`;
    
        const conditions: string[] = [];
        const values: any[] = [];
    
        if (props.name) {
            conditions.push(`name ILIKE $${values.length + 1}`);
            values.push(`%${props.name}%`);
        }
    
        if (props.producername) {
            conditions.push(`producer_name ILIKE $${values.length + 1}`);
            values.push(`%${props.producername}%`);
        }
    
        if (props.osname) {
            conditions.push(`os_name ILIKE $${values.length + 1}`);
            values.push(`%${props.osname}%`);
        }
    
        if (props.minramsize != undefined) {
            conditions.push(`ram_size >= $${values.length + 1}`);
            values.push(props.minramsize);
        }
    
        if (props.maxramsize != undefined) {
            conditions.push(`ram_size <= $${values.length + 1}`);
            values.push(props.maxramsize);
        }
    
        if (props.minmemsize != undefined) {
            conditions.push(`mem_size >= $${values.length + 1}`);
            values.push(props.minmemsize);
        }
    
        if (props.maxmemsize != undefined) {
            conditions.push(`mem_size <= $${values.length + 1}`);
            values.push(props.maxmemsize);
        }
    
        if (props.mincamres != undefined) {
            conditions.push(`cam_res >= $${values.length + 1}`);
            values.push(props.mincamres);
        }
    
        if (props.maxcamres != undefined) {
            conditions.push(`cam_res <= $${values.length + 1}`);
            values.push(props.maxcamres);
        }
    
        if (props.minPrice != undefined) {
            conditions.push(`price >= $${values.length + 1}`);
            values.push(props.minPrice);
        }
    
        if (props.maxPrice != undefined) {
            conditions.push(`price <= $${values.length + 1}`);
            values.push(props.maxPrice);
        }
    
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }
    
        if (offset != 0){
            query += ` ORDER BY id OFFSET $${values.length + 1} LIMIT $${values.length + 2}`;
            values.push(offset, pageSize);
        }
    
        const client = await this.pool.connect();
        try {
            const result: QueryResult<Phone> = await client.query(query, values);
            return result.rows;
        } catch (error: any) {
            console.error('Ошибка при поиске телефонов:', error.message);
            return [];
        } finally {
            client.release();
        }
    }
}