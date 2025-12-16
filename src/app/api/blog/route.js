import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { ConnectDB } from "../../lib/config/db";
import BlogModel from "../../lib/models/BlogModel";

// Connect DB once
ConnectDB();

/* ---------- GET : Get all blogs OR single blog ---------- */
export async function GET(req) {
  try {
    const blogId = req.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ success: true, blog });
    }

    const blogs = await BlogModel.find({});
    return NextResponse.json({ success: true, blogs });

  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}

/* ---------- POST : Add blog ---------- */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    /* ---------- IMAGE ---------- */
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { success: false, msg: "Image file is required" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const fileName = `${timestamp}_${image.name}`;
    const filePath = `./public/${fileName}`;

    await writeFile(filePath, imageBuffer);

    const imgUrl = `/${fileName}`;

    /* ---------- BLOG DATA ---------- */
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
      image: imgUrl,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog Added Successfully",
    });

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/* ---------- DELETE : Delete blog ---------- */
export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete blog image from public folder
    if (blog.image) {
      try {
        await unlink(`./public${blog.image}`);
      } catch (err) {
        console.warn("Failed to delete image:", err.message);
      }
    }

    // Delete blog from DB
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, msg: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
