import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Anthropic API key not configured" },
      { status: 500 },
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Generate a personality quiz on a random cultural topic. Pick ONE topic from this list (choose randomly, not always the first): cooking, world cuisines, cocktails, coffee, cheese, literature, poetry, film, TV, music, albums, theatre, dance, architecture, photography, fashion, design, travel, cities, art, museums, history, philosophy, languages, board games, video games, sports.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:

{
  "id": "kebab-case-id",
  "title": "What's Your [Topic] [Noun]?",
  "subtitle": "A one-line invitation to take the quiz.",
  "items": [
    { "id": 1, "name": "Item Name", "detail": "Short, witty detail", "tags": ["tag1", "tag2", "tag3"] }
  ],
  "profiles": {
    "profileKey": {
      "title": "The [Archetype]",
      "description": "A vivid 2-3 sentence personality description. Written with wit and warmth.",
      "traits": ["Trait one", "Trait two", "Trait three", "Trait four"],
      "matchTags": ["tag1", "tag2", "tag3"]
    }
  }
}

Requirements:
- Exactly 20 items, each with exactly 3 tags
- Exactly 5 profiles, each with 3 matchTags and 4 traits
- Tags should be reused across items so the scoring works well
- Each profile's matchTags should appear on at least 4-5 items
- Details should be brief, witty, and specific (max 8 words)
- Descriptions should be warm, opinionated, and British in tone
- The quiz should feel fun and reveal something genuinely interesting about the person`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const quiz = JSON.parse(cleaned);

    // Basic validation
    if (!quiz.id || !quiz.title || !quiz.items?.length || !quiz.profiles) {
      return NextResponse.json(
        { error: "Generated quiz was malformed" },
        { status: 500 },
      );
    }

    return NextResponse.json(quiz);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 },
    );
  }
}
