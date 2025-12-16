"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

import { assets } from "@/app/Assets/assets";
import Footer from "@/app/Components/Footer";

const Page = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: params.id,
        },
      });

      // IMPORTANT FIX
      setData(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchBlogData();
    }
  }, [params.id]);

  if (!data) return null;

  return (
    <>
      <div className="bg-gray-200 py-6 px-5 md:px-12 lg:px-28">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={130}
              alt="logo"
              className="w-[130px]"
            />
          </Link>

          <button className="flex items-center gap-2 font-medium py-2 px-5 border border-black shadow-[-5px_5px_0px_#000]">
            Get Started
            <Image src={assets.arrow} alt="" />
          </button>
        </div>

        {/* TITLE */}
        <div className="text-center my-24">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>

          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt="author"
          />

          <p className="mt-2 text-lg">{data.author}</p>
        </div>

        {/* CONTENT */}
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image
            className="border-4 border-white"
            src={data.image}
            width={1280}
            height={720}
            alt="blog"
          />

          <h2 className="my-8 text-[26px] font-semibold">Introduction</h2>
          <p>{data.description}</p>

          <div className="my-24">
            <p className="font-semibold my-4">
              Share this article on social media
            </p>

            <div className="flex gap-4">
              <Image src={assets.facebook_icon} width={40} alt="" />
              <Image src={assets.twitter_icon} width={40} alt="" />
              <Image src={assets.googleplus_icon} width={40} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
