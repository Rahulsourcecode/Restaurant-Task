import mysql from 'mysql2'
import { configDotenv } from 'dotenv';
configDotenv()


const user = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const database = process.env.DBNAME;


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user,
    password,
    database,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to Db:', err);
        return;
    }
    console.log('Database Connection established');
    connection.release();
});

export const connection = pool.promise();

