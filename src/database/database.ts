import {createConnection} from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export function dbConnect() {
  const con = createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: 'IDEABLOCKS',
  });

  return con;
}
