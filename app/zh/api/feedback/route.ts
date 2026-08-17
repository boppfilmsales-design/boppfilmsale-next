import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = (form.get("name") as string) || "";
    const company = (form.get("company") as string) || "";
    const email = (form.get("email") as string) || "";
    const phone = (form.get("phone") as string) || "";
    const message = (form.get("message") as string) || "";
    const lang = (form.get("lang") as string) || "cn";

    if (!name || !message) {
      return NextResponse.json({ error: "姓名和留言内容为必填" }, { status: 400 });
    }

    await execute(
      "INSERT INTO feedback (lang, name, company, email, phone, content) VALUES (?, ?, ?, ?, ?, ?)",
      [lang, name, company, email, phone, message]
    );

    return NextResponse.redirect(
      lang === "en" ? "/en/feedback?sent=1" : "/feedback?sent=1"
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
}
