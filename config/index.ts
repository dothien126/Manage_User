import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
    // connect to db
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
}
