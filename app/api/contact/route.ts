import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Use env-driven sender/recipient with safe defaults (Resend sandbox domain)
    const fromAddress =
      process.env.RESEND_FROM || "Tarek Portfolio <onboarding@resend.dev>";
    const toAddress = process.env.RESEND_TO || "tarekalambhuiyan@gmail.com";

    // HTML escaping helper
    const escapeHtml = (str: string) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const subject = `Portfolio Contact: Message from ${safeName}`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    // Mailto fallback for client-side open
    const mailtoLink = `mailto:${encodeURIComponent(toAddress)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      emailId: data?.id,
      mailtoLink,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 },
    );
  }
}



