import { NextResponse } from "next/server";

type Provider = "gemini" | "openai" | "anthropic" | "echo";

async function callOpenAI(prompt: string, model = "gpt-4o-mini") {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${t}`);
  }
  const j = await res.json();
  // Try both response shapes: chat/completions and responses
  const text = j.choices?.[0]?.message?.content ?? j.choices?.[0]?.text ?? j.output?.[0]?.content?.text ?? "";
  return String(text);
}

async function callAnthropic(prompt: string, model = "claude-2") {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY not configured");

  const res = await fetch("https://api.anthropic.com/v1/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      max_tokens_to_sample: 512,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic error: ${res.status} ${t}`);
  }
  const j = await res.json();
  return String(j.completion ?? j.output ?? "");
}

// Gemini (Google) via Generative Language REST API. Accepts an API key via ?key= or a Bearer token.
async function callGemini(prompt: string, model = "models/gemini-1.0") {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured");

  // Use the generate method
  const url = `https://generativelanguage.googleapis.com/v1/${model}:generate?key=${encodeURIComponent(
    key
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: { text: prompt },
      // optional settings could go here
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gemini error: ${res.status} ${t}`);
  }
  const j = await res.json();
  // Gemini/Generative Language API returns `candidates` or `output` depending on version
  const text = j.candidates?.[0]?.content ?? j.output?.[0]?.content ?? j.candidate ?? "";
  // if nested object
  if (typeof text === "object") return JSON.stringify(text);
  return String(text ?? "");
}

export async function POST(request: Request) {
  const body = await request.json();
  const prompt: string = body.prompt ?? "";
  const requestedProvider: Provider | undefined = body.provider;
  const model: string | undefined = body.model;

  // Determine provider by explicit request or available env vars
  let provider: Provider = "echo";
  if (requestedProvider) provider = requestedProvider;
  else if (process.env.GEMINI_API_KEY) provider = "gemini";
  else if (process.env.OPENAI_API_KEY) provider = "openai";
  else if (process.env.ANTHROPIC_API_KEY) provider = "anthropic";

  try {
    let text = "";
    if (provider === "gemini") {
      text = await callGemini(prompt, model ?? "models/gemini-1.0");
    } else if (provider === "openai") {
      text = await callOpenAI(prompt, model ?? "gpt-4o-mini");
    } else if (provider === "anthropic") {
      text = await callAnthropic(prompt, model ?? "claude-2");
    } else {
      text = `Echo fallback for prompt: "${prompt}"`;
    }

    return NextResponse.json({ provider, text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
