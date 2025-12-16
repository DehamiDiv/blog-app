'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import BlogTableItem from '@/app/Components/AdminComponents/BlogTableItem'

const Page = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog')
      setBlogs(response.data.blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId }
      })
      toast.success(response.data.msg)
      fetchBlogs()
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Delete failed')
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th className="hidden sm:table-cell px-6 py-3">Author Name</th>
              <th className="px-6 py-3">Blog Title</th>
              <th className="px-6 py-3">Blog Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => (
              <BlogTableItem
                key={item._id}
                mongoId={item._id}
                author={item.author}
                authorImg={item.authorImg}
                title={item.title}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
