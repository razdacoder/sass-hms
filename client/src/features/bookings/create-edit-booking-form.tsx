import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getRoomsTypes } from "@/services/roomServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useCreateBooking from "./useCreateBooking";

const bookingSchema = z.object({
  check_in_date: z.date(),
  check_out_date: z.date(),
  number_of_guests: z.string(),
  booking_status: z.string(),
  room_type: z.string(),
  guest_email: z.string().email(),
  guest_name: z.string().min(2),
  isPaid: z.boolean(),
  special_requests: z.string(),
});

type CreateEditProps = {
  bookinToEdit?: Booking;
  setOpen: (value: boolean) => void;
};

export default function CreateEditBookingForm({ setOpen }: CreateEditProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["room_types"],
    queryFn: getRoomsTypes,
  });
  const { createBookingFn, creating } = useCreateBooking();
  const isWorking = creating;
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      check_in_date: new Date(),
      check_out_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      number_of_guests: "",
      booking_status: "",
      guest_email: "",
      guest_name: "",
      room_type: "",
      isPaid: false,
      special_requests: "",
    },
  });

  function parseBookingsValues(values: z.infer<typeof bookingSchema>) {
    return {
      check_in_date: values.check_in_date.toISOString().split("T")[0],
      check_out_date: values.check_out_date.toISOString().split("T")[0],
      number_of_guests: parseInt(values.number_of_guests),
      booking_status: values.booking_status,
      room_type: values.room_type,
      isPaid: values.isPaid,
      special_requests: values.special_requests,
      guest: {
        email: values.guest_email,
        fullName: values.guest_name,
      },
    };
  }

  const { isValid } = form.formState;

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    if (isValid) {
      const data = parseBookingsValues(values);
      createBookingFn(data);
    }
    form.reset();
    setOpen(false);
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 space-x-4 mt-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="check_in_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel>Check in date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date() ||
                            date < new Date("1900-01-01") ||
                            isWorking === "pending"
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="check_out_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel>Check out date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date() ||
                            date < new Date("1900-01-01") ||
                            isWorking === "pending"
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isWorking === "pending"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a room type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((roomType: { room_type: string }) => (
                        <SelectItem
                          key={roomType.room_type}
                          value={roomType.room_type}
                        >
                          {roomType.room_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guest_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Email</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="booking_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isWorking === "pending"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status on booking" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unconfirmed">Uncconfirmed</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_of_guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of guests</FormLabel>
                  <Input disabled={isWorking === "pending"} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guest_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Name</FormLabel>
                  <Input disabled={isWorking === "pending"} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <div className="mt-2 space-y-1">
                  <FormLabel>Payment</FormLabel>
                  <FormItem className="flex flex-row items-start mt-4 space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isWorking === "pending"}
                      />
                    </FormControl>
                    <div className=" leading-none">
                      <FormLabel>Has Paid</FormLabel>
                    </div>
                  </FormItem>
                </div>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="special_requests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Special Requests"
                  className="resize-none"
                  disabled={isWorking === "pending"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isWorking === "pending" ? <Spinner /> : "Create booking"}
        </Button>
      </form>
    </Form>
  );
}
