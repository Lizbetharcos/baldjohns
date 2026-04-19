import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // This takes the file Tania uploaded and sends it to Vercel Blob
  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}