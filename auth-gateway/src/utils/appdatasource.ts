import { DataSource } from 'typeorm';
import entities from './typeorm';

export const Appdatasource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: entities,
});
