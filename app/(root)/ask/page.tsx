import { auth } from "@/auth";
import AskTextForm from "@/components/forms/AskTextForm";
import { redirect } from "next/navigation";

const AskTextQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-2xl flex-1 flex flex-col">
        {/* <h1 className="text-2xl font-semibold mb-4 text-center">
          EnterpAI Translator
        </h1> */}

        {session.user && <AskTextForm />}
      </div>
    </div>
  );
};

export default AskTextQuestion;
