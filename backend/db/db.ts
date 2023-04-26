import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "restaurant_db",
    password: "marksho127",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
