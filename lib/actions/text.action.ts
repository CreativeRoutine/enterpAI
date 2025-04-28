"use server";

import OpenAI from "openai";

const openai = new OpenAI();

export async function textRequest(formData: FormData) {
  try {
    const textus = formData.get("text");

    if (!textus || typeof textus !== "string") {
      return {
        success: false,
        message: "No text provided in formData",
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      store: true,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content:
            "Translate the following Russian phrase into idiomatic English. Provide:\n- a core translation,\n- 2–3 alternative ways to say it,\n- and the IPA (International Phonetic Alphabet) transcription for each.\n\nReturn in the format:\n- 'translation' — [IPA] — 'original Russian phrase'",
        },
        {
          role: "user",
          content: textus,
        },
      ],
    });

    if (!completion) {
      console.log("ERROR! - No completion");
    }

    const response = completion.choices[0].message.content;

    console.log(completion);
    console.log(response);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("An error occurred during translation:", error);
    return {
      success: false,
      message: "An error occurred while processing the translation",
    };
  }
}

export async function textTest(formData: FormData) {
  console.log("SERVER ACTION WORKS ====>", formData);
}
