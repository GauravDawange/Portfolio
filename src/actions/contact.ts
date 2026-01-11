"use server";

import { Resend } from "resend";
import { z } from "zod";

// Ensure API key is treated as a string (non-null assertion)
const resend = new Resend(process.env.RESEND_API_KEY || "re_B1EKox5o_3pi4r6wWDWfNxjJQrvTEiyXg");

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

export async function submitContactForm(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    // Validate
    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
        // Accessing .issues directly to avoid potential type conflicts
        return { success: false, error: result.error.issues[0].message };
    }

    const { name, email, subject, message } = result.data;

    try {
        // 1. Send Admin Email (To You)
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "gauravdawange07@gmail.com",
            subject: `New Portfolio Message: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        // 2. Send Thank You Email (To User)
        await resend.emails.send({
            from: "Gaurav Dawange <onboarding@resend.dev>",
            to: email,
            subject: "Thank you for getting in touch!",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Hello ${name},</h2>
                    <p>Thank you for reaching out. I have received your message regarding "<strong>${subject}</strong>".</p>
                    <p>I typically respond within 24 hours. Looking forward to connecting with you soon.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p><strong>Gaurav Dawange</strong></p>
                    <p style="color: #888; font-size: 12px;">Software Engineer</p>
                </div>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error("Email Error:", error);
        return { success: false, error: "Failed to send message. Please try again." };
    }
}
