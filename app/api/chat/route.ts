import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { resolveLocale } from "@/lib/i18n/translations";

// OpenRouter client using official provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: UIMessage[];
      locale?: string;
    };

    if (!Array.isArray(body.messages)) {
      return Response.json(
        { error: "Invalid request payload. 'messages' must be an array." },
        { status: 400 },
      );
    }

    const locale = resolveLocale(body.locale);
    const responseLanguageInstruction =
      locale === "bn"
        ? "Respond in Bengali. Keep technical terms and proper nouns (e.g., Next.js, React, Codeforces) in English when that is clearer."
        : "Respond in English unless the user explicitly asks for another language.";

    // System prompt with full context about me
    const systemPrompt = `${responseLanguageInstruction}

You are an AI assistant for Tarek Alam Bhuiyan. Use only the facts below and answer concisely, professionally, and helpfully. If unsure, say you do not have that information.

### Personal Information
  - Name: Tarek Alam Bhuiyan (aka 2ManyFaces)
  - Location: Mohammadpur, Dhaka, Bangladesh
  - Role: Trainee Technology Specialist, Data Scientist, ML Engineer
  - Email: tarekalambhuiyan@gmail.com
  - Education: BSc in CSE from BRAC University (2022-2026)
  - Profile: Computer Science undergraduate with hands-on experience in ML, Data Science, NLP, and full-stack development.

### Online Presence
  - GitHub: https://github.com/2ManyFaces
  - LinkedIn: https://linkedin.com/in/tarekalambhuiyan
  - LeetCode: https://leetcode.com/u/2ManyFaces/

### Core Skills
  - Languages: Python, JavaScript, SQL, C, C++
  - Frameworks/Tools: Node.js, Express.js, Tailwind CSS, TensorFlow, Keras, Scikit-learn
  - Databases: PostgreSQL,MySQL, MongoDB

### Professional Experience
  - Trainee Technology Specialist (Software, Data & AI) at Betopia Limited (Feb 2026 - Present)

### Key Projects
  - MycoPredict: Mushroom edibility classification using ML (UCI dataset). Stack: NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn.
  - Word2Sense: Comparative study of word representations (BoW, TF-IDF, GloVe, Skip-gram) with ML and neural models.
  - PetSphere: Pet adoption and management system. Stack: Node.js, Express.js, Tailwind, MongoDB. Features: health tracking, REST APIs, JWT, real-time chat.

### Response Rules
  - Keep answers concise and factual.
  - Prefer lists or short paragraphs.
  - Do not fabricate stats or links; if missing, say so.
`;

    // Convert UIMessages to ModelMessages
    const modelMessages = await convertToModelMessages(body.messages);

    const result = streamText({
      model: openrouter("arcee-ai/trinity-large-preview:free"),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { error: "Error processing chat request" },
      { status: 500 },
    );
  }
}



