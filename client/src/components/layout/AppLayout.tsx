import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import SideBar from "../ui/SideBar";

export default function AppLayout() {
  return (
    <div className="grid grid-cols-[26rem,1fr] h-screen grid-rows-[auto,1fr]">
      <Header />
      <SideBar />
      <main className="container flex flex-col gap-[3.2rem] px-[6.4rem] pt-[4rem] pb-[4.8rem]">
        <ScrollArea>
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
}
