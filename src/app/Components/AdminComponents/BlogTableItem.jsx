'use client'

import React from 'react'
import Image from 'next/image'
import { assets } from '@/app/Assets/assets'
import toast from 'react-hot-toast'

const BlogTableItem = ({ authorImg, author, title, date, deleteBlog, mongoId }) => {
  const BlogDate = date ? new Date(date) : null

  // Handle delete with confirmation
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlog(mongoId)
      toast.success('Blog deleted successfully')
    }
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">

      {/* Author */}
      <td className="hidden sm:flex items-center gap-3 px-6 py-4">
        <Image
          src={authorImg || assets.profile_icon}
          alt={author || "No author"}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <p className="text-gray-900 font-medium">{author || 'No author'}</p>
      </td>

      {/* Blog Title */}
      <td className="px-6 py-4">{title || 'No title'}</td>

      {/* Blog Date */}
      <td className="px-6 py-4">{BlogDate ? BlogDate.toDateString() : 'No date'}</td>

      {/* Action */}
      <td
        onClick={handleDelete}
        className="px-6 py-4 cursor-pointer text-red-500 font-bold hover:text-red-700"
      >
        X
      </td>

    </tr>
  )
}

export default BlogTableItem
