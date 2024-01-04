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
      <ul className="flex flex-col gap-y-3">
        <li>
          <Button
            size="lg"
            className={cn(
              "w-full flex bg-transparen justify-start pl-3 hover:text-white hover:bg-primary",
              pathname === "/dashboard" && "text-white bg-primary"
            )}
            asChild
          >
            <NavLink
              className="flex items-center gap-[1.2rem] "
              to="/dashboard"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-base font-semibold">Home</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex bg-transparen justify-start pl-3 hover:text-white hover:bg-primary",
              pathname === "/bookings" && "text-white bg-primary"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/bookings">
              <CalendarDaysIcon className="w-6 h-6" />
              <span className="text-base font-semibold">Bookings</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex bg-transparen justify-start pl-3 hover:text-white hover:bg-primary",
              pathname === "/rooms" && "text-white bg-primary"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/rooms">
              <BedSingleIcon className="w-6 h-6" />
              <span className="text-base font-semibold">Rooms</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex bg-transparen justify-start pl-3 hover:text-white hover:bg-primary",
              pathname === "/manage-users" && "text-white bg-primary"
            )}
            asChild
          >
            <NavLink
              className="flex items-center gap-[1.2rem]"
              to="/manage-users"
            >
              <UsersRound className="w-6 h-6" />
              <span className="text-base font-semibold">Manege Users</span>
            </NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "w-full flex bg-transparen justify-start pl-3 hover:text-white hover:bg-primary",
              pathname === "/settings" && "text-white bg-primary"
            )}
            asChild
          >
            <NavLink className="flex items-center gap-[1.2rem]" to="/settings">
              <SettingsIcon className="w-6 h-6" />
              <span className="text-base font-semibold">Settings</span>
            </NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
