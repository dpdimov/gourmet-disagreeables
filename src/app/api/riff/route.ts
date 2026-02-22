import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Anthropic API key not configured" },
      { status: 500 },
    );
  }

  const { recipe, axes, constraints } = await request.json();

  if (!recipe || !axes) {
    return NextResponse.json(
      { error: "Recipe and axes are required" },
      { status: 400 },
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are a creative culinary guide helping curious home cooks explore recipe variations.

Given this recipe, suggest a variation that substitutes ingredients in these dimensions: ${axes}.
${constraints ? `Additional guidance from the cook: ${constraints}` : ""}

The variation should feel like a coherent, cookable dish — preserving the structure, technique, and spirit of the original. Don't change what isn't being varied.

Recipe:
${recipe}

Respond ONLY with a valid JSON object. No markdown, no backticks, no explanation outside the JSON. Use exactly this structure:
{
  "variationName": "a short evocative name for this variation (5 words max)",
  "tagline": "one sentence on what makes this variation interesting",
  "substitutions": [
    {
      "dimension": "which dimension this covers",
      "original": "what was there before",
      "replacement": "what replaces it",
      "quantity": "quantity or amount if relevant, else empty string",
      "note": "one short practical or flavour note for the cook"
    }
  ],
  "adjustments": "any small technique or timing adjustments the cook should know about (2-3 sentences max)",
  "curiosity": "one interesting thing about why this combination works — a small piece of food knowledge"
}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);

    if (
      !parsed.variationName ||
      !parsed.substitutions?.length ||
      !parsed.tagline
    ) {
      return NextResponse.json(
        { error: "Generated variation was malformed" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate variation" },
      { status: 500 },
    );
  }
}
