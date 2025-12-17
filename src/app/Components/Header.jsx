'use client'

import React, { useState } from "react"
import Image from "next/image"
import { assets } from "../Assets/assets"
import axios from "axios"
import { toast } from "react-toastify"

const Header = () => {
  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("email", email)

      const response = await axios.post('/api/email', formData)

      if (response.data.success) {
        toast.success(response.data.msg)
        setEmail("")
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error("Server error")
      console.error(error)
    }
  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />

        <button className="flex items-center gap-2 font-medium py-3 px-4 sm:py-3 border border-black shadow-[-7px_7px_0px_#000000]">
          Get started
          <Image src={assets.arrow} width={20} height={20} alt="arrow" />
        </button>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>

        <p className="mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
          Welcome to our blog — your space for fresh perspectives, practical insights,
          and inspiring ideas. We explore technology, creativity, productivity,
          and more, bringing you thoughtfully curated posts designed to inform,
          inspire, and empower.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_8px_#000000]"
          aria-label="Subscribe to newsletter"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-4 outline-none w-full"
            required
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header
