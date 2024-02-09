import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function Header(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="bg-white rounded-2xl h-[123px] w-full flex justify-between px-12 items-center">
      <div>
        <Link href="/">
          Logo
        </Link>
      </div>

      <nav id="menu" className="">
        <ul className="flex divide-x gap-6 font-bold text-lg">
          <li className="pl-6">
            <Link href="/questions">Pricing</Link>
          </li>
          <li className="pl-6">
            <Link href="/about">About Us</Link>
          </li>
          <li className="pl-6">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="pl-6">
            <Link href="/faq">FAQ</Link>
          </li>
          <li className="pl-6">
            {status === "authenticated" ? (
              <Link href="/logout" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
