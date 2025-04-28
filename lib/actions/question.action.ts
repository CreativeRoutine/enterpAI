"use server";
import mongoose from "mongoose";

import OpenAI from "openai";
import Question, { IQuestion } from "@/database/question.model";
import { AskTextQuestionSchema, GetQuestionSchema } from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import action from "@/lib/handlers/action";

export async function createTextQuestion(
  params: AskTextQuestionParams
): Promise<ActionResponse<IQuestion>> {
  const validationResult = await action({
    params,
    schema: AskTextQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse;

  const { sourceLang, targetLang, sourceText } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  let question;

  try {
    [question] = await Question.create(
      [{ sourceText, sourceLang, targetLang, userId }],
      { session }
    );

    if (!question) throw new Error("Failed to create question");

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }

  // OpenAI
  try {
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: `The user will input either a casual conversational phrase or a common idiomatic expression or proverb in Russian.
Your task is to translate it into 2–5 natural English equivalents.

For each, provide:
- the English phrase (in quotes),
- its IPA transcription in square brackets [ ],
- a natural Russian equivalent (not a literal translation, but how the phrase would be naturally said in Russian),
- and optionally, a short comment in parentheses, such as (idiom), (formal), (slang), (saying), etc.

Examples:
"English translation" — [IPA] — Natural Russian equivalent (optional note)`,
        },
        {
          role: "user",
          content: sourceText,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    console.log("GPT Output:\n", content);

    if (content) {
      const translations = content
        .split("\n")
        .map((line) => {
          const match = line.match(
            /^["“]?(.+?)["”]?\s*—\s*\[([^\]]+)\]\s*—\s*(.+?)(?:\s*\((.+?)\))?$/
          );
          if (match) {
            const [, text, ipa, meaning, note] = match;
            return { text, ipa, meaning, note };
          }
          return null;
        })
        .filter(Boolean);

      if (translations.length > 0) {
        await Question.findByIdAndUpdate(question._id, { translations });
      }
    }
  } catch (error) {
    console.error("OpenAI or update error:", error);
  }

  return { success: true, data: JSON.parse(JSON.stringify(question)) };
}

// DONT'T FORGET TO CHANGE THE FUNCTION
export async function editTextQuestion(
  params: AskTextQuestionParams
  // Promise -- this is meaning what will be returned -> promise
): Promise<ActionResponse<IQuestion>> {
  const validationResult = await action({
    params,
    schema: AskTextQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse;

  const { sourceLang, targetLang, sourceText } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [question] = await Question.create(
      [{ sourceText, sourceLang, targetLang, author: userId }],
      { session }
    );

    if (!question) {
      throw new Error("Failed to create question");
    }

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getQuestion(
  params: GetQuestionParams
): Promise<ActionResponse<IQuestion>> {
  const validationResult = await action({
    params,
    schema: GetQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
