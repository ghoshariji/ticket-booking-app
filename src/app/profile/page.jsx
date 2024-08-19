"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../_navbar/navbar";
// import { toast, ToastContainer } from "react-toastify";
const Page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleImageInput = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      //const url = URL.createObjectURL(file);
      //console.log(url);
      //setImageUrl(url);
    }
    setImage(e.target.files[0]);
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
    const byteArray = Uint8Array.from(atob(data), c => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: contentType });
    const url = URL.createObjectURL(blob);
    console.log(url);
    setImageUrl(url);
    //window.open(url)
    return () => URL.revokeObjectURL(url)

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

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <>
      <Navbar />
      {/* <ToastContainer /> */}
      <div className="bg-gray-300 antialiased min-h-screen flex items-center justify-center">
        <div className="container mx-auto my-20">
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile Picture"
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                  width={128}
                  height={128}
                />
              ) : (
                <Image
                  src="data:image/png;base64,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"
                  alt="Profile Picture"
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                  width={128}
                  height={128}
                />
              )}
            </div>

            <div className="mt-16">
              <h1 className="font-bold text-center text-3xl text-gray-900">
                Pantazi Software
              </h1>
              <p className="text-center text-sm text-gray-400 font-medium">
                UI Components Factory
              </p>
              <div className="my-5 px-6">
                <a
                  href="#"
                  className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                >
                  Connect with <span className="font-bold">@pantazisoft</span>
                </a>
              </div>

              <div className="flex justify-between items-center my-5 px-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >
                  Email
                </a>
              </div>

              <div className="w-full">
                <h3 className="font-medium text-gray-900 text-left px-6">
                  Recent activities
                </h3>
                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                  >
                    Edit Name
                  </button>

                  <input
                    type="file"
                    onChange={handleImageInput}
                    placeholder="Added new profile picture"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                  />
                  {image && (
                    <>
                      {" "}
                      <button onClick={handleUploadImage}>
                        Submit {image.name}
                      </button>
                    </>
                  )}
                  <button
                    href="#"
                    className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                  >
                    Edit Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
