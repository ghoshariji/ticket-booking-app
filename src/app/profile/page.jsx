"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../_navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "../_footer/page";

const Page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log(session);
  if (!session) {
    router.push("/login");
    return null;
  }
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Preview the image before uploading
      // const url = URL.createObjectURL(file);
      // setImageUrl(url);
    }
    setImage(file);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      const email = "a@gmail.com";
      const formData = new FormData();
      formData.append("image", image);
      formData.append("email", email);
      const response = await fetch("api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      fetchImageData();
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const newProfileImage = (data, contentType) => {
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: contentType });
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  };

  const fetchImageData = async () => {
    try {
      const email = "a@gmail.com";
      const res = await fetch("api/getProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      newProfileImage(data.data.profileImage, data.data.contentType);
      console.log(data.data);
    } catch (error) {
      console.log("Error" + error);
    }
  };

  if(session)
  {
  useEffect(() => {
    fetchImageData()
  }, []);
  }
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 antialiased min-h-screen flex items-center justify-center">
        <div className="container mx-auto my-20">
          <div className="bg-gray-800 relative shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile Picture"
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-yellow-400 transition duration-200 transform hover:scale-110"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="rounded-full mx-auto absolute -top-20 w-32 h-32 bg-gray-700 flex items-center justify-center text-gray-400 text-2xl">
                  No Image
                </div>
              )}
            </div>

            <div className="mt-16">
              <h1 className="font-bold text-center text-4xl text-yellow-400">
                Movie App
              </h1>
              <p className="text-center text-sm text-gray-300 font-medium">
                Explore and Enjoy Movies
              </p>
              <div className="my-5 px-6">
                <a
                  href="#"
                  className="text-yellow-400 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-gray-800 hover:text-yellow-500"
                >
                  Follow <span className="font-bold">@movieapp</span>
                </a>
              </div>

              <div className="flex justify-between items-center my-5 px-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Email
                </a>
              </div>

              <div className="w-full">
                <h3 className="font-medium text-yellow-400 text-left px-6">
                  Recent Activities
                </h3>
                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <button
                    href="#"
                    className="w-full border-t border-gray-700 text-gray-300 py-4 pl-6 pr-3 block hover:bg-gray-700 transition duration-150"
                  >
                    Edit Name
                  </button>

                  <label
                    htmlFor="file-upload"
                    className="w-full flex items-center justify-center border border-gray-700 bg-gray-800 text-gray-300 py-4 px-6 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleImageInput}
                      className="hidden"
                    />
                    <span className="text-center">New Image</span>
                  </label>
                  {image && (
                    <button
                      onClick={handleUploadImage}
                      className="mt-2 w-full border-t border-gray-700 text-gray-300 py-4 pl-6 pr-3 block bg-yellow-400 hover:bg-yellow-500 transition duration-150"
                    >
                      Submit {image.name}
                    </button>
                  )}
                  <button
                    href="#"
                    className="w-full border-t border-gray-700 text-gray-300 py-4 pl-6 pr-3 block hover:bg-gray-700 transition duration-150"
                  >
                    Edit Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
