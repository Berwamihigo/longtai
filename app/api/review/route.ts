import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return new Response('GET method received');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return new Response(JSON.stringify({ message: 'POST method received', body }));
}
