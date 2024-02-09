import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, err } = await fetch("http://localhost:8080/v1/users/forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (err) {
      // TODO handle error
      // console.log(data);
      return;
    }
    setSent(true);
  };

  return (
    <div className="w-full h-screen bg-[#dee7ef]">
      <div className="w-full px-8 md:px-32 py-16 mx-auto">
  
        <div className="w-full flex justify-center md:justify-between mt-16">
          <div className="w-full md:w-1/2 gradient-bg py-20 mx-auto rounded-l-xl">
            <div className="w-fit mx-auto font-bold text-[#F1F2F6] md:text-4xl text-2xl">
              Forgot Password?
            </div>
            <div className="w-2/3 md:w-1/2 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="mt-12">
                  <div className="text-white font-semibold text-xl mb-1">
                    Email
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-[#F1F2F6] w-full px-4 py-2 rounded placeholder:text-[#73C2EF]"
                    />
                  </div>
                </div>
                <div className="flex justify-end text-white mt-9">
                  <Link href={"/login"}>Trying to login?</Link>
                </div>
                <div className="mt-10">
                  {sent ? (
                    <div className="text-white text-center">
                      Check your email for further instructions
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#F88F3C] text-white w-full rounded py-3"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="mt-4 text-white text-center">
                  {"Don't have an account yet?"}
                  <Link href="/register" className="underline">
                    Register.
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-col justify-between w-1/2 md:flex hidden bg-[#F1F2F6] text-[#374971] text-center  rounded-r-xl">
            <div className="font-bold text-4xl mt-12">Hello again!</div>
            <div className="font-light text-4xl mt-2">
              Enter your email to reset your password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
