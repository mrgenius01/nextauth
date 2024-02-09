import * as React from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formRef = React.useRef(null);

  if (status === "authenticated") {
    router.push("/");
  }

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passMatch, setPassMatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passMatch) return;

    const formData = new FormData(formRef.current);
    if (
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("name") ||
      !formData.get("surname")
    )
      return;

    setLoading(true);
    const response = await signIn("register", {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    setLoading(false);

    if (response.error) return;

    // router.push("/questions");
  };

  useEffect(() => {
    if (password && password.length > 0 && password === password2) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }, [password, password2]);

  return (
    <div className="w-full h-screen bg-[#dee7ef]">
      <div className="w-full px-8 md:px-32 py-16 mx-auto">
        <div className="w-full flex justify-center md:justify-between mt-16">
          <div className="flex-col justify-between w-1/2 md:flex hidden gradient-bg text-[#F1F2F6] text-center rounded-l-xl">
            <div className="font-bold text-4xl mt-12">Hello again!</div>
          </div>
          <div className="w-full md:w-1/2 py-16 mx-auto bg-[#F1F2F6] rounded-r-xl">
            <div className="w-fit mx-auto font-bold text-[#374971] md:text-4xl text-2xl">
              Join Us
            </div>
            <div className="w-2/3 md:w-1/2 mx-auto">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mt-6">
                  <div className="flex justify-between">
                    <div className="w-5/12">
                      <label className="text-[#73C2EF] font-semibold text-xl mb-1">
                        Name
                      </label>
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          required
                          className="bg-white w-full px-4 py-2 rounded placeholder:text-[#B0D8EF]"
                        />
                      </div>
                    </div>
                    <div className="w-5/12">
                      <label className="text-[#73C2EF] font-semibold text-xl mb-1">
                        Surname
                      </label>
                      <div>
                        <input
                          type="text"
                          name="surname"
                          placeholder="Your surname"
                          required
                          className="bg-white w-full px-4 py-2 rounded placeholder:text-[#B0D8EF]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-[#73C2EF] font-semibold text-xl mb-1 mt-6">
                    Email
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="bg-white w-full px-4 py-2 rounded placeholder:text-[#B0D8EF]"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-[#73C2EF] font-semibold text-xl mb-1">
                    Password
                  </label>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                      title="Password should contain at least one uppercase letter, one lowercase letter, a number and one of these characters: !@#$%^&*_=+-"
                      className="bg-white w-full px-4 py-2 rounded placeholder:text-[#B0D8EF]"
                    />
                    {!passMatch &&
                    password?.length > 0 &&
                    password2?.length > 0 ? (
                      <p className="mt-1 ml-2 text-red-600 text-xs font-semibold">
                        {"Passwords didn't match."}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-[#73C2EF] font-semibold text-xl mb-1">
                    Retype Password
                  </label>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter your password again"
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                      minLength={8}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                      title="Password should contain at least one uppercase letter, one lowercase letter, a number and one of these characters: !@#$%^&*_=+-"
                      className="bg-white w-full px-4 py-2 rounded placeholder:text-[#B0D8EF]"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-[#F88F3C] text-white w-full rounded py-3"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Register"}
                  </button>
                </div>
                <div className="mt-4 text-[#73C2EF] text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Login.
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
