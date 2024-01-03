import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Heading2 } from "@/components/ui/typography";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DataTable } from "../../components/ui/data-table";
import { roomColumns } from "./room-colums";
import useCreateRoom from "./useCreateRoom";
import { useRooms } from "./useRooms";

export const roomSchema = z.object({
  room_number: z
    .string()
    .min(3, { message: "Room number should be at least 3 characters" }),
  room_type: z.string().min(1, { message: "Room type must not be empty" }),
  max_capacity: z.string().max(2),
  price: z.string(),
  discount_price: z.string(),
});

export default function RoomPage() {
  const { isLoading, rooms } = useRooms();
  const { createNewRoom, status } = useCreateRoom();

  if (isLoading) {
    return <Spinner />;
  }

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      room_number: "",
      room_type: "",
      max_capacity: "",
      price: "",
      discount_price: "",
    },
  });

  const { isValid } = form.formState;

  const parseValues = (values: z.infer<typeof roomSchema>) => {
    return {
      ...values,
      max_capacity: parseInt(values.max_capacity),
      price: parseFloat(values.price),
      discount_price: parseFloat(values.discount_price),
    };
  };

  function onSubmit(values: z.infer<typeof roomSchema>) {
    console.log(values);
    if (isValid) {
      createNewRoom(parseValues(values));
    }
    form.reset();
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading2>All rooms</Heading2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-x-3 font-medium items-center">
              <Plus className="w-4 h-4" />
              Add room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add room</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="room_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room number</FormLabel>
                      <FormControl>
                        <Input disabled={status === "pending"} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="room_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room type</FormLabel>
                      <FormControl>
                        <Input disabled={status === "pending"} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max capacity</FormLabel>
                      <FormControl>
                        <Input disabled={status === "pending"} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input disabled={status === "pending"} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount price</FormLabel>
                      <FormControl>
                        <Input disabled={status === "pending"} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button disabled={status === "pending"} type="submit">
                    {status === "pending" ? <Spinner /> : "Add room"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <DataTable columns={roomColumns} data={rooms} />
      </div>
    </>
  );
}
