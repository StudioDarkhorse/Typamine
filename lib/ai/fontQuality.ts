import { SchemaType } from "@google/generative-ai";
import { z } from "zod";
import { generateWithKeyFallback } from "@/lib/ai/geminiKeyPool";

// Giudizio soggettivo/qualitativo su un font: rating + tag. Separato da
// fontIdentity.ts (autore + licenza, lookup fattuale) — due domini diversi,
// due prompt dedicati invece di uno solo che li mischia (vedi discussione
// in chat: rating/tag = "com'e' fatto e che stile ha", autore/licenza =
// "chi l'ha fatto e con che diritti").
function buildFontQualityResponseSchema(availableTagNames: string[]): any {
  const schema: any = {
    type: SchemaType.OBJECT,
    properties: {
      fontFamily: { type: SchemaType.STRING },
      rating: { type: SchemaType.NUMBER },
    },
    required: ["fontFamily", "rating"],
  };

  if (availableTagNames.length > 0) {
    schema.properties.tagNames = {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING, enum: availableTagNames },
    };
    schema.required.push("tagNames");
  }

  return schema;
}

const fontQualitySchema = z.object({
  fontFamily: z.string().min(1),
  rating: z.number(),
  tagNames: z.array(z.string()).optional(),
});

export interface FontQualityResult {
  rating: number; // 6.0 - 10.0, step 0.2
  tagNames: string[];
}

function clampRating(value: number): number {
  const stepped = Math.round(value / 0.2) * 0.2;
  const clamped = Math.min(10, Math.max(6, stepped));
  return Math.round(clamped * 10) / 10;
}

export async function generateFontQualityWithGemini(
  rawFontFamily: string,
  availableTagNames: string[] = [],
  authorName?: string
): Promise<FontQualityResult> {
  // Stessa convenzione DB di fontIdentity.ts: il nome e' salvato con
  // underscore al posto degli spazi, Gemini deve giudicare il nome vero.
  const fontFamily = rawFontFamily.replace(/_/g, " ").trim();

  const tagInstruction = availableTagNames.length > 0
    ? `
2. From this exact list of tags: ${JSON.stringify(availableTagNames)}
   Pick ONLY the ones that accurately describe this typeface (style, mood, use case, era, etc.). Pick as many as genuinely fit, or none at all if nothing in the list applies well — do not force a match. Never invent a tag that isn't in the list.`
    : "";

  // Passato dal chiamante solo quando il font ha gia' un autore reale (non un
  // placeholder d'import/AI "unknown") — vedi rateFontQualityWithAI in
  // lib/actions/font.ts. Conoscere designer/fonderia aiuta Gemini a giudicare
  // con piu' contesto (stile riconoscibile, reputazione, periodo) invece di
  // valutare il font isolato dal solo nome.
  const authorLine = authorName ? `\nDesigner / Foundry: "${authorName}"` : "";

  const prompt = `
You are a typography expert with deep knowledge of type design history and the type design community.

Font family: "${fontFamily}"${authorLine}

Tasks:
1. Rate this typeface from 6.0 to 10.0, using steps of 0.2 (e.g. 6.0, 6.2, 6.4, 6.6, ... 10.0), based on how expert graphic/type designers and the broader typography community generally perceive it (craftsmanship, versatility, legibility, popularity, influence).
${tagInstruction}

Respond ONLY with JSON matching exactly this shape, no extra commentary:
{"fontFamily": "${fontFamily}", "rating": <number>${availableTagNames.length > 0 ? ', "tagNames": ["<tag from the list>", ...]' : ""}}
`;

  const responseText = await generateWithKeyFallback(
    (genAI) =>
      genAI.getGenerativeModel(
        {
          model: "gemini-3.1-flash-lite",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: buildFontQualityResponseSchema(availableTagNames),
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        },
        { apiVersion: "v1beta" }
      ),
    prompt
  );

  let parsed: unknown;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`Gemini ha risposto con un JSON non valido per "${fontFamily}".`);
  }

  const validated = fontQualitySchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`Risposta Gemini per "${fontFamily}" fuori schema atteso.`);
  }

  const availableTagNamesSet = new Set(availableTagNames);
  const tagNames = (validated.data.tagNames || []).filter((t) => availableTagNamesSet.has(t));

  return {
    rating: clampRating(validated.data.rating),
    tagNames,
  };
}
