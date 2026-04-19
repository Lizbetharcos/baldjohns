import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image, trashId } = await req.json();

    // Safety check for your environment variable
    if (!process.env.HUMAN_DELTA_API_KEY) {
      return NextResponse.json({ error: "AI API Key missing on server" }, { status: 500 });
    }

    const response = await fetch('https://api.humandelta.com/v1/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUMAN_DELTA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_url: image, 
        task: `Verify if this is a real photo of ${trashId}`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Service Error: ${errorText}`);
    }

    const data = await response.json();

    // Send a clean response back to your game frontend
    return NextResponse.json({ 
      success: true, 
      verified: data.verified, // AI result
      raw: data 
    });

  } catch (error: any) {
    console.error('Verification Route Error:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}