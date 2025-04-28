import { ReactNode } from "react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-full min-h-screen items-center justify-center">
      <div className="px-4 sm:px-6 lg:px-8 lg:py-0">
        <section className="min-w-full border border-gray-600 bg-neutral-700 rounded-2xl px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
          <div>
            <div className="text-2xl text-white">EnterpAI App</div>
            <div className="text-lg text-gray-400">
              Translate like native speakers
            </div>
          </div>
          {children}
          <SocialAuthForm />
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
