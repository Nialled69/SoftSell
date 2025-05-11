import axios from "axios"
import { NextResponse } from "next/server"

type APIError = {
  response?: {
    status: number;
  };
};

function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { status?: unknown } }).response?.status === "number"
  );
}

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const apiKey = process.env.OPENROUTER_API_KEY
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "SoftSell"

  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenRouter API key." }, { status: 500 })
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content:
              "You are SoftBot, a 24x7 AI assistant working for SoftSell — a platform that helps users convert their unused software licenses and digital copyrights into real money. Your job is to answer questions clearly and confidently. Always keep answers short and solid. Speak like a real company representative. If you are asked anything out of context, say 'I cannot help you with that.'",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteURL,
          "X-Title": siteTitle,
          "Content-Type": "application/json",
        },
      }
    )

    const answer = response.data.choices?.[0]?.message?.content
    return NextResponse.json({ answer })
  } catch (error: unknown) {
    if (isAPIError(error)) {
      const status = error.response!.status;
  
      if (status === 401 || status === 403) {
        return NextResponse.json(
          { error: "Invalid or unauthorized OpenRouter API key." },
          { status }
        );
      }
    }
    console.error("Response generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate response ig." },
      { status: 500 }
    );
  }
}
