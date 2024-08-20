"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../_navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { addCart, deleteCart } from "../../redux/slice/cartSlice";
import { addPrice, deletePrice } from "../../redux/slice/cartTotalPrice";
import { toast, ToastContainer } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const Page = () => {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const fetchData = async () => {
    const res = await fetch("api/ticket");
    const data = await res.json();
    console.log(data);
    // in the updated value setting all the value from the response value
    const updatedData = data.message.map((val, ind) => ({
      name: val.destinationS,
      value: val.isCancel ? 0 : 1,
    }));
    // upodating the state value
    setChartData(updatedData);
    console.log("Data" + JSON.stringify(data));
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Ticket Booking</h1>
        {ticketData.map((ticket, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Train No: {ticket.trainNo}</h2>
            <p>
              <strong>From:</strong> {ticket.destinationS} &nbsp;
              <strong>To:</strong> {ticket.destinationE}
            </p>
            <p>
              <strong>Departure Time:</strong> {ticket.timeS} &nbsp;
              <strong>Arrival Time:</strong> {ticket.timeE}
            </p>
            <p>
              <strong>Price:</strong> ${ticket.price}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {ticket.isCancel ? (
                <span style={{ color: "red" }}>Cancelled</span>
              ) : (
                <span style={{ color: "green" }}>Active</span>
              )}
            </p>
            <button
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => addToCart(ticket)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
