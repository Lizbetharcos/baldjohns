import { neon } from '@neondatabase/serverless';

// This pulls the URL you put in your .env file
const sql = neon(process.env.DATABASE_URL);

export default sql;