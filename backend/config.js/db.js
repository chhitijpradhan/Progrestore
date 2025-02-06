import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const { PGHOST, PGPASSWORD, PGDATABASE, PGUSER } = process.env;

// creates a sql connection using our variables
export const sql = neon(
    //postgresql://neondb_owner:npg_JnX0T3GODEsv@ep-dry-lake-a15h5d8x-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
