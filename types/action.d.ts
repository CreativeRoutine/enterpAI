interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
}
interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AskTextQuestionParams {
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  // author: string;
}

interface EditAskTextQuestionParams extends AskTextQuestionParams {
  questionId: string;
}

interface GetQuestionParams {
  questionId: string;
}
