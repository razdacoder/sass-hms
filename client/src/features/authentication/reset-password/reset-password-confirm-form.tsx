import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import Spinner from "@/components/ui/spinner";
import { Heading3, Paragraph } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import * as z from "zod";
import useResetPasswordConfirm from "./useResetPasswordConfirm";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    re_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export default function ResetPasswordConfirmForm() {
  const { mutate, status } = useResetPasswordConfirm();
  const { token } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      re_password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      new_password: values.password,
      re_new_password: values.re_password,
      token: decodeURIComponent(token as string),
    };
    mutate(data);
  }
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div>
          <div className="mb-3">
            <Heading3>Reset your password</Heading3>
            <Paragraph>
              Enter your new password to reset your password.
            </Paragraph>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        disabled={status === "pending"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="re_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                        disabled={status === "pending"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <Button
                  disabled={isSubmitting || !isValid}
                  className="w-full disabled:cursor-not-allowed"
                  type="submit"
                >
                  {status === "pending" ? <Spinner /> : "Reset Password"}
                </Button>
              </div>
            </form>
          </Form>
          <Paragraph className="text-sm text-center mt-6">
            <Link to="/login" className="text-primary font-semibold text-sm">
              Back to login
            </Link>
          </Paragraph>
        </div>
      </div>
    </main>
  );
}
