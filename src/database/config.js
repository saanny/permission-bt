// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${__dirname}/../../.env`,
});

module.exports = {
  development: {
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    dialect: 'postgres',
  },
  stage: {
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
  },
  local: {
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    dialect: 'postgres',
  },
};
