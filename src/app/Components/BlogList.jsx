"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on category
  const filteredBlogs =
    menu === "All"
      ? blogs
      : blogs.filter((item) => item.category === menu);

  return (
    <div>
      {/* Category Menu */}
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-sm ${
              menu === cat ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-around gap-6 gap-y-10 mb-16 xl:mx-24">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found</p>
        ) : (
          filteredBlogs.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image || "/placeholder.png"}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
