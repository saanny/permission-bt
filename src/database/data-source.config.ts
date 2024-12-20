import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
  path: `${__dirname}/../../.env`,
});

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  ssl: false,
  useUTC: true,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  entities: ['./dist/**/*.entity{.js}'],
  migrations: ['./dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
});
