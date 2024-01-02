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
import useLogin from "./useLogin";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm() {
  const { mutate, status } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
            <Heading3>Login into your account</Heading3>
            <Paragraph>
              Enter your account details to login into your account.
            </Paragraph>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
              <div className="flex justify-end ">
                <Link
                  className="text-sm text-primary font-medium"
                  to="/reset-password"
                >
                  Forgot Password?
                </Link>
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
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

              <div className="mt-4">
                <Button
                  disabled={isSubmitting || !isValid}
                  className="w-full disabled:cursor-not-allowed"
                  type="submit"
                >
                  {status === "pending" ? <Spinner /> : "Login"}
                </Button>
              </div>
            </form>
          </Form>
          <Paragraph className="text-sm text-center mt-6">
            Don't have an account? &nbsp;
            <Link to="/register" className="text-primary font-semibold text-sm">
              Create an account
            </Link>
          </Paragraph>
        </div>
      </div>
    </main>
  );
}
