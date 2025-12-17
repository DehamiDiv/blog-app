import { ConnectDB } from "@/lib/config/db.js";
import EmailModel from "@/lib/models/EmailModel.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, msg: "Email is required" },
        { status: 400 }
      );
    }

    await EmailModel.create({ email });

    return NextResponse.json({
      success: true,
      msg: "Email Subscribed Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
