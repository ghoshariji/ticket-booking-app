"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../_navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../../redux/slice/cartSlice";
import { addPrice } from "../../redux/slice/cartTotalPrice";
import { toast, ToastContainer } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/component/Footer";

const Page = () => {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState(null);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/ticket");
    const data = await res.json();
    const updatedData = data.message.map((val) => ({
      name: val.destinationS,
      value: val.isCancel ? 0 : 1,
    }));
    setChartData(updatedData);
    setTicketData(data.message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (val) => {
    dispatch(addCart(val));
    dispatch(addPrice(val.price));
    toast.success("Added to Cart");
  };

  if (!ticketData) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="p-6 lg:p-12 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Movie Shows</h1>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#ff6347" />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {ticketData.map((ticket, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-2">Train No: {ticket.trainNo}</h2>
              <p className="mb-2">
                <strong>From:</strong> {ticket.destinationS} &nbsp;
                <strong>To:</strong> {ticket.destinationE}
              </p>
              <p className="mb-2">
                <strong>Departure Time:</strong> {ticket.timeS} &nbsp;
                <strong>Arrival Time:</strong> {ticket.timeE}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${ticket.price}
              </p>
              <p className="mb-4">
                <strong>Status:</strong>{" "}
                {ticket.isCancel ? (
                  <span className="text-red-500">Cancelled</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </p>
              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => addToCart(ticket)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
