import { ConnectDB } from "@/lib/config/db.js";
import EmailModel from "@/lib/models/EmailModel.js";
import { NextResponse } from "next/server";

/* ---------- POST: Save Email ---------- */
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
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}

/* ---------- GET: Fetch Emails ---------- */
export async function GET() {
  try {
    await ConnectDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
 export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({success:true,msg:"Email Deleted"})
 }