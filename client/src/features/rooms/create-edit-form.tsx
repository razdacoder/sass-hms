import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { roomSchema } from "./room-page";
import useCreateRoom from "./useCreateRoom";

type CreateEditProps = {
  roomToEdit?: Room;
  setOpen: (value: boolean) => void;
};

export default function CreateEditForm({
  roomToEdit,
  setOpen,
}: CreateEditProps) {
  const { createNewRoom, status } = useCreateRoom();

  const isEditMode = Boolean(roomToEdit);

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: isEditMode
      ? {
          room_number: roomToEdit?.room_number as string,
          room_type: roomToEdit?.room_type as string,
          max_capacity: roomToEdit?.max_capacity.toString(),
          price: roomToEdit?.price.toString(),
          discount_price: roomToEdit?.discount_price.toString(),
        }
      : {
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
    if (isValid) {
      createNewRoom(parseValues(values));
    }
    form.reset();
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  );
}
