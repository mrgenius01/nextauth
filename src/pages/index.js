import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import Layout from "@/components/layout/layout";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session);

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="grid grid-cols-3 gap-x-11 gap-y-9 w-full text-white font-bold">
      Content
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar>{page}</Sidebar>
    </Layout>
  );
};
