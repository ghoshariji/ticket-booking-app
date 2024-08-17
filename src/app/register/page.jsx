"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Spin from "../../component/Loader";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(post , "fromt")
    try {
      await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setLoading(false);
      //toast.success("Registration Succesfully");
    //   setTimeout(() => {
    //     router.push("/login");
    //   }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-1 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Signup in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    onChange={handleInput}
                    value={post.name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
                  <div className="text-sm"></div>
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
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter your location
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="location"
                    type="text"
                    autoComplete="name"
                    required
                    onChange={handleInput}
                    value={post.location}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter your phone number
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="phone"
                    type="text"
                    autoComplete="name"
                    required
                    onChange={handleInput}
                    value={post.phone}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Go to Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
