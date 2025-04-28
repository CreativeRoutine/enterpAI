"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    // Auth user
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast("Success", {
        description:
          formType === "SIGN_IN"
            ? "Logged in successfully!"
            : "Signed up successfully!",
      });

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${result?.status}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-10 space-y-6 "
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="text-lg">
                    {field.name === "email"
                      ? "Email address"
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      className="bg-neutral-600 no-focus min-h-12 rounded-1.5 border border-neutral-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            disabled={form.formState.isSubmitting}
            className="min-h-12 text-lg font-semibold bg-neutral-500 text-white w-full px-4 py-3 cursor-pointer"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign In"
                ? "Signing In..."
                : "Signing Up..."
              : buttonText}
          </Button>
          {formType === "SIGN_IN" ? (
            <p>
              Do not have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="text-md">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="text-md">
                Sign in
              </Link>
            </p>
          )}
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
