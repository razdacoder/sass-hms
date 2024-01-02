import MainNav from "./MainNav";
import Logo from "./logo";

export default function SideBar() {
  return (
    <aside className="py-[3.2rem] px-[2.4rem] border-r flex flex-col gap-[3.2rem] row-[1/-1]">
      <div className="h-24">
        <Logo />
      </div>
      <MainNav />
    </aside>
  );
}
