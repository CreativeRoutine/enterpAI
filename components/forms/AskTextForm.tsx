"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ROUTES from "@/constants/routes";

import { toast } from "sonner";
import { createTextQuestion } from "@/lib/actions/question.action";
import { AskTextQuestionSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Params {
  question?: Question;
  isEdit?: boolean;
  // userId: string;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AskTextQuestionSchema>>({
    resolver: zodResolver(AskTextQuestionSchema),
    defaultValues: {
      sourceText: question?.sourceText || "",
      sourceLang: question?.sourceLang || "ru",
      targetLang: question?.targetLang || "en",
    },
  });

  const handleCreateQuestion = async (
    data: z.infer<typeof AskTextQuestionSchema>
  ) => {
    console.log("Forma запустилась");
    startTransition(async () => {
      const result = await createTextQuestion(data);

      if (result.success) {
        toast("Success", {
          description: "Question created successfully",
          position: "bottom-right",
        });

        if (result.data && "_id" in result.data) {
          router.push(ROUTES.QUESTION + result.data._id);
        }
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
          position: "top-right",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10 bg-white text-black"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="sourceText"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-lime-400 w-fit !text-light-900 cursor-pointer"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />

                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask a Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
