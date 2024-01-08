import { clsx, type ClassValue } from "clsx";
import { format, formatDistance, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPriceToNaira = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const dateFormat = "do MMM, yyyy";
  const formattedDate = format(date, dateFormat);

  return formattedDate;
};

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
