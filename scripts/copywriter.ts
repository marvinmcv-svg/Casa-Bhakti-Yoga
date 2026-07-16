import ZAI from "z-ai-web-dev-sdk";
import { writeFileSync } from "fs";
import { SITE_CONTENT } from "../src/lib/default-content";

async function main() {
  const zai = await ZAI.create();

  const systemPrompt = `You are a world-class copywriter hired by Casa Bhakti, a Yoga & Vedanta temple in Santa Cruz de la Sierra, Bolivia.

ABOUT THE CLIENT:
- Founded 2018 by Kalyani Dasi (Bolivian, Sivananda-certified, 11+ years practice)
- Co-guide: Pablo Narayana (Mexican, founder of @sadhananow)
- Visiting teacher: Swami Kashi Muktananda (20+ years in Himalayas)
- Tradition: Swami Sivananda lineage, the 4 paths of yoga (Karma, Bhakti, Raja, Jnana), Advaita Vedanta
- Sunday community day: 8:15 Meditación, 9:00 Yoga, 10:30 Vedanta, 18:30 Kirtan
- Offerings: Hatha Yoga, Vinyasa, Meditation, Kirtan (mantra chanting), Vedanta philosophy, 200h teacher training
- Prices: 50 Bs single class, 450 Bs/month
- Location: Santa Cruz de la Sierra, Bolivia
- Instagram: @casabhakti.scz
- Audience: Bolivian locals + foreign visitors (bilingual ES/EN)

YOUR TASK:
Rewrite ALL the website copy to be world-class. The copy must be:

1. EVOCATIVE & POETIC but grounded — never cheesy, never corporate, never generic yoga-marketing-speak. Draw from the real spiritual depth of the tradition.
2. WARM & HUMAN — write like a wise friend, not a brochure. Use the second person ("tú" / "you").
3. CONCISE — especially the hero. The mobile hero has a beautiful video as the main visual, so the hero copy must be SHORT and let the video breathe. Every word must earn its place.
4. SALES-AWARE — every section should gently, naturally guide the reader toward booking a class or coming to a session. Not pushy, but there's always a next step.
5. BOLIVIAN PRIDE — Santa Cruz, Bolivia is home. Let that warmth and place show. Spanish should feel naturally Bolivian (cálido, cercano), not generic Latin American.
6. BILINGUAL — Spanish is primary (it's a Bolivian company), English for foreign visitors. Both must be equally beautiful, not translations of each other. Adapt idioms and rhythm to each language.
7. AUTHENTIC — never claim things that aren't true. Stay faithful to the real identity above.

STYLE NOTES:
- Hero: 3 short words/lines max for the title. Subtitle should be ONE evocative sentence (max ~15 words).
- Section intros: punchy, 1-2 sentences. Don't over-explain.
- Philosophy paths: 1-2 sentences each, capturing the essence.
- Quote attribution stays as "Swami Sivananda".
- Keep the chapter numbers (001, 002, etc.) in eyebrows.

OUTPUT FORMAT:
Return ONLY a valid JSON object. No markdown, no commentary, no code fences.
The object must have the exact same keys as the input, each with {en, es} values.
Keep every key. Do not rename or add keys.

Here is the current copy as JSON:
${JSON.stringify(SITE_CONTENT, null, 2)}

Return the improved JSON now.`;

  console.log("Requesting improved copy from LLM...");

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: systemPrompt },
      { role: "user", content: "Please rewrite all the copy now. Return only the JSON object." },
    ],
    thinking: { type: "disabled" },
  });

  const content = completion.choices[0]?.message?.content ?? "";

  // Extract JSON from response (in case there's any wrapper)
  let jsonStr = content.trim();
  // Strip markdown code fences if present
  jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  // Find the JSON object
  const start = jsonStr.indexOf("{");
  const end = jsonStr.lastIndexOf("}");
  if (start === -1 || end === -1) {
    console.error("No JSON found in response. Raw:");
    console.error(content);
    process.exit(1);
  }
  jsonStr = jsonStr.slice(start, end + 1);

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON. Raw:");
    console.error(jsonStr);
    process.exit(1);
  }

  // Validate: all keys present
  const originalKeys = Object.keys(SITE_CONTENT);
  const newKeys = Object.keys(parsed);
  const missing = originalKeys.filter((k) => !newKeys.includes(k));
  if (missing.length > 0) {
    console.error("Missing keys:", missing);
    process.exit(1);
  }

  // Validate: each has en + es strings
  for (const k of originalKeys) {
    const v = parsed[k];
    if (!v || typeof v.en !== "string" || typeof v.es !== "string") {
      console.error(`Invalid value for ${k}:`, v);
      process.exit(1);
    }
  }

  writeFileSync("/home/z/my-project/improved-copy.json", JSON.stringify(parsed, null, 2));
  console.log(`✓ Improved copy written to improved-copy.json (${originalKeys.length} fields)`);
  console.log("\nSample — hero.subtitle:");
  console.log("  ES:", parsed["hero.subtitle"].es);
  console.log("  EN:", parsed["hero.subtitle"].en);
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
