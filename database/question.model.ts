import { Schema, model, models, Types, Document } from "mongoose";

export interface ITranslation {
  text: string; // Перевод на английский
  ipa: string; // Транскрипция
  meaning: string; // Краткое объяснение на исходном языке (не копия sourceText)
  note?: string; // Например: slang, formal и т.д.
}

export interface IQuestion {
  userId: Types.ObjectId;
  sourceText: string;
  sourceLang: string;
  targetLang: string;
  translations: ITranslation[];
  contextHints?: string[];
  isFavorite?: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestionDoc extends IQuestion, Document {}

const TranslationSchema = new Schema<ITranslation>(
  {
    text: { type: String, required: true },
    ipa: { type: String, required: true },
    meaning: { type: String, required: true },
    note: { type: String },
  },
  { _id: false }
);

delete models.Question;

const QuestionSchema = new Schema<IQuestion>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sourceText: { type: String, required: true },
    sourceLang: { type: String, required: true },
    targetLang: { type: String, required: true },

    translations: { type: [TranslationSchema], default: [] },
    contextHints: [{ type: String }],
    isFavorite: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

const Question = model<IQuestion>("Question", QuestionSchema);

export default Question;
