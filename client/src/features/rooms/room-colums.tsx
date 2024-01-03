import { formatPriceToNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Minus, MoreVertical, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-x-3 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Edit className="w-4 h-4" />
              Edit room
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-x-3 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Trash2Icon className="w-4 h-4" />
              Delete room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
