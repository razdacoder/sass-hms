import { formatPriceToNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Minus } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const roomColumns: ColumnDef<Room>[] = [
  {
    accessorKey: "room_number",
    header: "Room Number",
  },
  {
    accessorKey: "room_type",
    header: "Room Type",
  },
  {
    accessorKey: "max_capacity",
    header: "Max Capacity",
    cell: ({ row }) => {
      const max_capacity = parseFloat(row.getValue("max_capacity"));

      return <span>{max_capacity} persons</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price (per night)",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return <span>{formatPriceToNaira(price)}</span>;
    },
  },
  {
    accessorKey: "discount_price",
    header: "Discount",
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount_price"));

      return (
        <>
          {discount == 0 ? (
            <Minus className="w-4 h-4" />
          ) : (
            <span className="text-green-500">
              +{formatPriceToNaira(discount)}
            </span>
          )}
        </>
      );
    },
  },
];
