import Header from "./header";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function Layout({ children }) {
  return (
    <div id="layout" className={`${quicksand.variable} font-sans bg-gray-200`}>
      <Header />
      <main className="gap-4 mt-8 pb-16 mx-1">{children}</main>
    </div>
  );
}
