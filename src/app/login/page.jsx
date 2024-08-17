"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spin from "../../component/Loader";
export default function Login() {
//   const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
//   useEffect(() => {
//     if (!session) {
//       router.push("/login");
//     } else {
//       if (session.user.isAdmin) {
//         router.push("/admin");
//       } else {
//         router.push("/home");
//       }
//     }
//     if (!session || status === "loading") {
//       router.push("/login");
//     }
//   }, [session, router, status]);

  const [post, setPost] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: post.email,
      password: post.password,
    });

    if (res.error) {
      toast.error("Login Failed");
      console.log("Error:", res.error);
      setLoading(false);
    } else {
      toast.success("Login Successfully");
      setLoading(false);
      router.push("/home")
      // setTimeout(() => {
      //   if (res.user.isAdmin) {
      //     router.push("/admin");
      //   } else {
      //     router.push("/home");
      //   }
      // }, 1000);
    }
  };
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleInput}
                    value={post.email}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleInput}
                    value={post.password}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Go to Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}


