export async function POST(req: Request) {
  const { image, trashId } = await req.json();

  // Direct API call without the SDK
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

  const data = await response.json();
  return Response.json(data);
}