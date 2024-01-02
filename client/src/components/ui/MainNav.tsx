import { cn } from "@/lib/utils";
import {
  BedSingleIcon,
  CalendarDaysIcon,
  HomeIcon,
  SettingsIcon,
  UsersRound,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./button";

export default function MainNav() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex justify-start px-0 hover:text-primary hover:bg-transparent",
              pathname === "/dashboard" && "text-primary bg-transparent"
            )}
            asChild
          >
            <NavLink
              className="flex items-center gap-[1.2rem] "
              to="/dashboard"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-base font-medium">Home</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex justify-start px-0 hover:text-primary hover:bg-transparent",
              pathname === "/bookings" && "text-primary bg-transparent"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/bookings">
              <CalendarDaysIcon className="w-6 h-6" />
              <span className="text-base font-medium">Bookings</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex justify-start px-0 hover:text-primary hover:bg-transparent",
              pathname === "/rooms" && "text-primary bg-transparent"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/rooms">
              <BedSingleIcon className="w-6 h-6" />
              <span className="text-base font-medium">Rooms</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex justify-start px-0 hover:text-primary hover:bg-transparent",
              pathname === "/manage-users" && "text-primary bg-transparent"
            )}
            asChild
          >
            <NavLink
              className="flex items-center gap-[1.2rem]"
              to="/manage-users"
            >
              <UsersRound className="w-6 h-6" />
              <span className="text-base font-medium">Manege Users</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex justify-start px-0 hover:text-primary hover:bg-transparent",
              pathname === "/settings" && "text-primary bg-transparent"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/settings">
              <SettingsIcon className="w-6 h-6" />
              <span className="text-base font-medium">Settings</span>
            </NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
