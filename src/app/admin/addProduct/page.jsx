"use client";

import { assets } from "@/app/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Page() {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_Img.png",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success(response.data.msg);

        // reset form
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/author_Img.png",
        });
      } else {
        toast.error(response.data.msg || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl mb-3">Upload Thumbnail</p>

      {/* Upload image */}
      <label htmlFor="image" className="cursor-pointer inline-block">
        {!image ? (
          <Image
            src={assets.upload_area}
            width={140}
            height={70}
            alt="Upload"
          />
        ) : (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-[140px] h-[70px] object-cover"
          />
        )}
      </label>

      <input
        type="file"
        id="image"
        accept="image/*"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />

      <p className="text-xl mt-4">Blog Title</p>
      <input
        name="title"
        value={data.title}
        onChange={onChangeHandler}
        className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
        type="text"
        placeholder="Type here"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        value={data.description}
        onChange={onChangeHandler}
        className="w-full sm:w-[500px] mt-2 px-4 py-3 border"
        placeholder="Write content here"
        required
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        value={data.category}
        onChange={onChangeHandler}
        className="w-40 mt-2 px-4 py-3 border"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />

      <button
        type="submit"
        className="mt-8 w-40 h-12 rounded-lg
             bg-gradient-to-r from-blue-500 to-cyan-500
             text-white font-semibold
             hover:from-blue-600 hover:to-cyan-600
             transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Add
      </button>
    </form>
  );
}
