import axios from "axios"
import { NextResponse } from "next/server"

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
  } catch (error: any) {
    console.error("LLM Error:", error.response?.data || error.message)
    return NextResponse.json(
      { error: "Something went wrong while fetching from OpenRouter." },
      { status: 500 }
    )
  }
}
