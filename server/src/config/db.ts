import Knex from "knex";

const config = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "0", 10),
};

const connection = Knex({
    client: "mysql",
    connection: config,
});

export default connection;
