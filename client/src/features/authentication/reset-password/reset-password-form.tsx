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
import { Link } from "react-router-dom";
import * as z from "zod";
import useResetPassword from "./useResetPassword";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ResetPasswordForm() {
  const { mutate, status } = useResetPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
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
              Enter your email to receive a password reset link.
            </Paragraph>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
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
