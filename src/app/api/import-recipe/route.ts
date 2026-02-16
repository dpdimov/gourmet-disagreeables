import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Anthropic API key not configured" },
      { status: 500 },
    );
  }

  // Fetch the webpage
  let html: string;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RecipeImporter/1.0)",
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 400 },
      );
    }
    html = await response.text();
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch URL" },
      { status: 400 },
    );
  }

  // Truncate to 30k chars
  const truncated = html.slice(0, 30000);

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Extract the recipe from this webpage HTML and return it as JSON with exactly these fields:
- title (string): the recipe name
- shortDescription (string): a one-line summary
- category (string): one of "starter", "side", "main", or "dessert"
- ingredients (string): each ingredient on its own line, including quantities
- method (string): numbered steps, each on its own line
- comments (string): any tips, notes, or serving suggestions

Return ONLY valid JSON, no markdown formatting or code blocks.

HTML content:
${truncated}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Try to parse the JSON response
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const recipe = JSON.parse(cleaned);

    return NextResponse.json(recipe);
  } catch {
    return NextResponse.json(
      { error: "Failed to extract recipe from page" },
      { status: 500 },
    );
  }
}
