import Link from "next/link";

function Sidebar({ children }) {
  return (
    <div className="flex gap-4">
      <div
        id="sidebar"
        className="bg-white rounded-2xl pt-11 px-16 pb-6 text-lg font-bold w-1/5 max-h-[834px] flex flex-col justify-between "
      >
        <ul className="flex flex-col gap-7">
          <li>
            <Link href="/a">
              A
            </Link>
          </li>
          <li>
            <Link href="/b">b</Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default Sidebar;
