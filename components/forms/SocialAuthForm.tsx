"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "bg-neutral-800 text-white flex-1 min-h-12 px-4 py-3 body-medium cursor-pointer hover:bg-neutral-900";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log("THIS IS ERROR ===>", error);

      toast(<div className="text-2xl bg-red-500">Sign-In failed!</div>);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github-white.svg"
          alt="Github logo"
          width={20}
          height={20}
          className=" object-contain"
        />
        <span>Log in with Github</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/chrome-white.svg"
          alt="Chrome logo"
          width={20}
          height={20}
          className=" object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
