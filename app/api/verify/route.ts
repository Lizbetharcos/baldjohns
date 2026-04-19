import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON from your test_api.http
    const body = await req.json();
    const { image, trashId } = body;


    console.log(`🔍 Guardian: Processing file upload for [${trashId}]`);


    // 2. Validate API Key
    const apiKey = process.env.HUMAN_DELTA_API_KEY;
    if (!apiKey) {
      console.error("❌ Key Missing in .env.local");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }


    // 3. THE FIX: Convert Base64 string to a File Blob
    // This removes the "data:image/png;base64," prefix if it exists
    const base64Content = image.includes(",") ? image.split(",")[1] : image;
    const buffer = Buffer.from(base64Content, "base64");
    const imageBlob = new Blob([buffer], { type: "image/png" });


    // 4. Create Multipart Form Data
    const formData = new FormData();
    formData.append("file", imageBlob, "capture.png"); // The API expects the key 'file'
    formData.append("task", `Verify photo of ${trashId}`);


    // 5. The Fetch (Notice: No 'Content-Type' header here!)
    const response = await fetch("https://api.humandelta.ai/v1/documents", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: formData,
    });


    // 6. Handle Response
    const contentType = response.headers.get("content-type");


    if (response.ok && contentType?.includes("application/json")) {
      const data = await response.json();
      console.log("✅ VERIFICATION COMPLETE:", data);
      return NextResponse.json(data);
    } else {
      const errorText = await response.text();
      console.error(`⚠️ API REJECTION (${response.status}):`, errorText.slice(0, 500));
     
      return NextResponse.json({
        error: `API returned ${response.status}`,
        details: errorText
      }, { status: response.status });
    }


  } catch (err: any) {
    console.error("🚨 SERVER CRASH:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
