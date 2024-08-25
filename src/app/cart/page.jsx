"use client";

import React from "react";
import Navbar from "../_navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { addCart, deleteCart } from "../../redux/slice/cartSlice";
import { addCart, deleteCart } from "@/redux/slice/cartSlice";
import { addPrice, deletePrice } from "@/redux/slice/cartTotalPrice";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "../_footer/page";
const Page = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const dataPrice = useSelector((state) => state.cartPrice);
  const { data: session, status } = useSession();
  const router = useRouter()
  if (!session) {
    router.push("/login");
    return null;
  }
  const handleBuy = async (val, price) => {
    try {
      const res = await fetch("api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1, movies: val, totalPrice: price }),
      });
      const data = await res.json()
      toast.success(data.message)
    } catch (error) {
      console.log("Error " + error);
    }
  };

  const handleAddCart = (val) => {
    dispatch(deleteCart(val.id));
    dispatch(deletePrice(val.price));
    console.log("Come");
    toast.info("Deleted From Cart");
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <section className="bg-gray-900 py-8 antialiased text-white md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-bold sm:text-2xl">
            Your Movie Cart
          </h2>

          {data.map((val, ind) => (
            <div key={ind} className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-8">
              <div className="flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="rounded-lg border border-gray-800 bg-gray-800 p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <a href="#" className="shrink-0">
                      {/* <Image
                        className="h-20 w-20 rounded-md"
                        src="https://via.placeholder.com/150" // Replace with your movie-related image
                        alt="Movie Poster"
                        height={200}
                        width={200}
                      /> */}
                    </a>

                    <div className="flex flex-col items-end">
                      <p className="text-xl font-bold">{val.price}</p>
                      <button
                        type="button"
                        className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                        onClick={() => handleAddCart(val)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a href="#" className="text-lg font-semibold hover:underline">
                      {val.destinationE}
                    </a>
                    <p className="text-gray-400 mt-1">
                      {val.destinationS}
                    </p>
                    <p className="text-gray-400 mt-1">
                      Departure: {val.timeS} | Arrival: {val.timeE}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-800 bg-gray-900 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-white">
          <p>Subtotal</p>
          <p>{dataPrice}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-400">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-700 transition-colors"
            onClick={() => handleBuy(data, dataPrice)}
          >
            Checkout
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <button
            type="button"
            className="font-medium text-indigo-400 hover:text-indigo-300"
            onClick={() => window.location.href = '/'}
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
