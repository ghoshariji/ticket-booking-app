import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <footer className="bg-gray-900 rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMAX_logo.svg/512px-IMAX_logo.svg.png"
                className="h-8"
                width={40}
                height={40}
                alt="Movie Booking Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                MovieMax
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-400 sm:text-center">
            © 2023{" "}
            <a href="#" className="hover:underline">
              MovieMax™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Page;
