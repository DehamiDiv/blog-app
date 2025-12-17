import { assets } from "@/app/Assets/assets";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className='py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        
        {/* Welcome Section */}
        <div className="md:col-span-3 mb-4">
            <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2'>
                Admin Dashboard
            </h1>
            <p className='text-gray-500 text-lg'>
                Manage your content, subscribers, and analytics from one place.
            </p>
        </div>

        {/* Quick Action Cards */}
        <Link href="/admin/addProduct" className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image src={assets.add_icon} width={80} height={80} alt="Add" />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                     <Image src={assets.add_icon} width={24} height={24} alt="Add" className="group-hover:invert transition-all"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Blog</h2>
                <p className="text-gray-500 text-sm">Create and publish new content to your site.</p>
            </div>
        </Link>

        <Link href="/admin/blogList" className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image src={assets.blog_icon} width={80} height={80} alt="List" />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Image src={assets.blog_icon} width={24} height={24} alt="List" className="group-hover:invert transition-all"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Blogs</h2>
                <p className="text-gray-500 text-sm">Edit, delete, or view your existing posts.</p>
            </div>
        </Link>

        <Link href="/admin/subscriptions" className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image src={assets.email_icon} width={80} height={80} alt="Subs" />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Image src={assets.email_icon} width={24} height={24} alt="Subs" className="group-hover:invert transition-all"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Subscriptions</h2>
                <p className="text-gray-500 text-sm">View and manage newsletter subscribers.</p>
            </div>
        </Link>

    </div>
  )
}

export default Page