import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    // 1. Initialize the connection using your Environment Variable
    const sql = neon(process.env.DATABASE_URL!);

    // 2. Fetch the trash items from your Neon table
    // Replace 'trash_catalog' with your actual table name from schema.sql
    const data = await sql`SELECT * FROM trash_catalog ORDER BY id ASC`;

    // 3. Return the data to your teammates
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trench data', details: error.message },
      { status: 500 }
    );
  }
}