// This file initializes a Sequelize instance to connect to a relational database and load the UserModel.

// logger: A utility for logging database queries (likely custom logging logic).
import logger from '@/utils/logger';
// import { config } from 'dotenv';
import Sequelize from 'sequelize';
import userModel from './models/user.model';
import {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
    NODE_ENV,
} from '@/config';

// Create the sequelize instance
const sequelize = new Sequelize.Sequelize(
    // Database Credentials:
    DB_NAME as string,
    DB_USERNAME as string,
    DB_PASSWORD,
    {
        // dialect: Specifies the type of database used, such as PostgreSQL, MySQL, etc. (PostgreSQL by default)
        dialect: (DB_DIALECT as Sequelize.Dialect) || 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT as string, 10),
        // timezone: Ensures that dates/timestamps are handled in the correct timezone.
        timezone: '+09:00',
        define: {
            // charset & collate: Ensures support for UTF-8 characters, including emojis
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            // underscored: true: The database converts camelCase field names to snake_case.
            underscored: true,
            // freezeTableName: true: Prevents Sequelize from pluralizing table names
            freezeTableName: true,
        },
        // pool: Controls how many connections Sequelize maintains:
        pool: {
            // min: 0 means no connections are kept alive when idle.
            min: 0,
            // max: 5 indicates that no more than five connections can be used at the same time.
            max: 5,
        },
        // logQueryParameters: Enables logging of query parameters in development mode.
        logQueryParameters: NODE_ENV === 'development',
        logging: (query, time) => {
            logger.info(time + 'ms' + ' ' + query);
        },
        // benchmark: true: Include the execution time (in milliseconds) in query logs.
        benchmark: true,
    },
);

// Authentication the database connection,  This function tests the connection by attempting to connect to the database using the provided credentials.
sequelize.authenticate();

export const DB = {
    Users: userModel(sequelize),
    sequelize, // connection instance (RAW queries)
    Sequelize, // library
};
