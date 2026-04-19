import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Use a LEFT JOIN to pull in animal data for each trash item
    const data = await sql`
      SELECT 
        t.*, 
        m.common_name as animal_name, 
        m.scientific_name, 
        m.image_url as animal_image_url
      FROM trash_catalog t
      LEFT JOIN marine_life m ON t.id = m.trash_id
      ORDER BY t.required_unlock_depth ASC
    `;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trench data', details: (error as Error).message },
      { status: 500 }
    );
  }
}