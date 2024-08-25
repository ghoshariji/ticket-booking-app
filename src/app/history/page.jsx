"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../_navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Footer from "../_footer/page";

const Page = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log(session);
  if (!session) {
    router.push("/login");
    return null;
  }
  const fetchData = async () => {
    try {
      //const userId = localStorage.getItem("userId")
      const userId = 1;
      const res = await fetch(`/api/history?userId=${userId}`);
      const data = await res.json();
      let count = 1;
      const updatedData = data.data.map((val) => ({
        name: count++,
        value: val.priceMovie,
        movieTitle: val.movieName.join(", "), // Assuming movieName is an array
      }));
      setNewData(updatedData);
      setData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]); 
  return (
    <div>
      <Navbar />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={newData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(tick) => `Movie ${tick}`} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ff6347" />
        </LineChart>
      </ResponsiveContainer>
      <div className="bg-gray-900 p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-white font-semibold text-lg">Movie Purchases</h2>
            <span className="text-xs text-gray-400">Details of purchased movies</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              New Report
            </button>
            <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              Create
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider">
                  Movie Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider">
                  Movie Id
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider">
                  Purchased Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, ind) => (
                <tr key={ind}>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                    <div className="flex items-center">
                      <div className="w-20 h-20 mr-4">
                        {/* <Image
                          src={`https://via.placeholder.com/80x120?text=Movie+${ind + 1}`} // Placeholder for movie image
                          alt="Movie Poster"
                          width={80}
                          height={120}
                          className="rounded"
                        /> */}
                      </div>
                      <div>
                        {val.movieName.join(", ")}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                    {val.movieId.join(", ")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                    {new Date(val.purchasedDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                    ${val.priceMovie}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-gray-900 border-t border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-400">Showing 1 to {data.length} of {data.length} Entries</span>
            <div className="inline-flex mt-2">
              <button className="text-sm text-white bg-red-600 py-2 px-4 rounded-l">
                Prev
              </button>
              <button className="text-sm text-white bg-red-600 py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
