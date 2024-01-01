import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import Spinner from "@/components/ui/spinner";
import { Heading3, Heading4, Paragraph } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
import * as z from "zod";
import useActivation from "./useActivation";

const formSchema = z.object({
  otp: z.string().max(6),
});

export default function ActivateForm() {
  const { mutate, status } = useActivation();
  const { token } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      activation_code: values.otp,
      activation_token: decodeURIComponent(token as string),
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
            <Heading3>Activate your account.</Heading3>
            <Paragraph>
              Enter the OTP sent to your email to activate your account.
            </Paragraph>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Heading4>Enter OTP</Heading4>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <OtpInput
                        {...field}
                        numInputs={6}
                        containerStyle="flex justify-between items-center"
                        inputStyle="inputStyle"
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => (
                          <Input {...props} disabled={isSubmitting} />
                        )}
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
                  {status === "pending" ? <Spinner /> : "Activate your account"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
