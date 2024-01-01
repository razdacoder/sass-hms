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
import { Heading3, Heading4, Paragraph } from "@/components/ui/typography";
import { RegisterType } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import useRegister from "./useRegister";

const formSchema = z.object({
  hotelName: z
    .string()
    .min(2, { message: "Hotel name must be at least 2 characters" }),
  address: z.string().min(8),
  phoneNumber: z.string().max(15),
  email: z.string().email(),
  name: z.string().min(5),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function RegisterForm() {
  const { mutate, status } = useRegister();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "",
      address: "",
      phoneNumber: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const processData = (values: z.infer<typeof formSchema>) => {
    return {
      name: values.name,
      email: values.email,
      password: values.password,
      hotel: {
        name: values.hotelName,
        address: values.address,
        phone_number: values.phoneNumber,
      },
    } satisfies RegisterType;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = processData(values);
    mutate(data);
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-4/6">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div>
          <div className="mb-3">
            <Heading3>Create an account.</Heading3>
            <Paragraph>
              Enter yours and hotel details to create an account.
            </Paragraph>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <Heading4>Hotel Information</Heading4>
                <FormField
                  control={form.control}
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Hotel name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Hotel address"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Hotel number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Heading4>Personal Information</Heading4>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          type="text"
                          placeholder="Fullname"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <Button
                  disabled={isSubmitting || !isValid}
                  className="w-full disabled:cursor-not-allowed"
                  type="submit"
                >
                  {status === "pending" ? <Spinner /> : "Create an account"}
                </Button>
              </div>
            </form>
          </Form>
          <Paragraph className="text-sm text-center mt-6">
            Already have an account?&nbsp;
            <Link to="/login" className="text-primary font-semibold text-sm">
              Login
            </Link>
          </Paragraph>
        </div>
      </div>
    </main>
  );
}
