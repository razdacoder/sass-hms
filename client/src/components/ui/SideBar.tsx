import MainNav from "./MainNav";
import Logo from "./logo";

export default function SideBar() {
  return (
    <aside className="py-4 px-3 border-r flex flex-col gap-y-6 row-[1/-1]">
      <div className="flex gap-x-3 items-center">
        <Logo />
        <span className="text-lg font-extrabold font-space">
          InnEase Manager
        </span>
      </div>
      <MainNav />
    </aside>
  );
}
