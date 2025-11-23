import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  // In a real app, you'd call an AI model here.
  // For now, we'll just return a simple response.
  const aiResponse = `This is an AI-generated response to your prompt: "${prompt}"`;

  return NextResponse.json({ text: aiResponse });
}
