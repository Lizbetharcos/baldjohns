import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    // Fetch all marine life entries
    const data = await sql`SELECT * FROM marine_life`;
    return Response.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json({ error: "Failed to fetch marine life" }, { status: 500 });
  }
}