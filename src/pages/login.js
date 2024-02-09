import * as React from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  if (status === "authenticated") {
    // console.log(session);
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    if (!formData.get("email") || !formData.get("password")) return;

    setLoading(true);

    const response = await signIn("login", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setLoading(false);

    if (response.error) {
      // console.log(response);
      return;
    }

    router.push("/");
  };

  return (
    <div className="w-full h-screen bg-[#dee7ef]">
      <div className="w-full px-8 md:px-32 py-16 mx-auto">
        <div className="w-full flex justify-center md:justify-between mt-16">
          <div className="w-full md:w-1/2 gradient-bg py-20 mx-auto rounded-l-xl">
            <div className="w-fit mx-auto font-bold text-[#F1F2F6] md:text-4xl text-2xl">
              Welcome Back
            </div>
            <div className="w-2/3 md:w-1/2 mx-auto">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mt-12">
                  <label className="text-white font-semibold text-xl mb-1">
                    Email
                  </label>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="bg-[#F1F2F6] w-full px-4 py-2 rounded placeholder:text-[#73C2EF]"
                    />
                  </div>
                </div>
                <div className="mt-12">
                  <label className="text-white font-semibold text-xl mb-1">
                    Password
                  </label>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      minLength={8}
                      className="bg-[#F1F2F6] w-full px-4 py-2 rounded placeholder:text-[#73C2EF]"
                    />
                  </div>
                </div>
                <div className="flex justify-end text-white mt-9">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="bg-[#F88F3C] text-white w-full rounded py-3"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Login"}
                  </button>
                </div>
                <div className="mt-4 text-white text-center">
                  {"Don't have an account yet?"}
                  <Link href={"/register"} className="underline">
                    Register.
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-col justify-between w-1/2 md:flex hidden bg-[#F1F2F6] text-[#374971] text-center  rounded-r-xl">
            <div className="font-bold text-4xl mt-12">Hello again!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
