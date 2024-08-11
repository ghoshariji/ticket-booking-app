"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [ticketData, setTicketData] = useState(null);
  const fetchData = async () => {
    const res = await fetch("api/ticket");
    const data = await res.json();
    console.log("Data" + JSON.stringify(data));
    setTicketData(data.message);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!ticketData) {
    return <div>Loading...</div>;
  }

  return (
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
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default page;
