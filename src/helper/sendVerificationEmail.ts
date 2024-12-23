import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../emailFormat/verificatonEmail";
import {render } from "@react-email/components";

export async function sendVerificationEmail(
    email: string,
    username: string,
    otp: string,
): Promise<ApiResponse> {
    try {
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          });

        const emailHtml = render(VerificationEmail({ username, otp }));

        const mailoption = {
            from: 'Echoes Anonymous <process.env.EMAIL_USER>',
            to: email,
            subject: "Verification Code for Echoes Anonymous",
            html: emailHtml,
        };

        const info = await transport.sendMail(mailoption);
        console.log("Message sent: %s", info.messageId);
        return {
            success: true,
            message: "Verification code sent successfully to your email",
        };

    } catch (error) {
        console.log("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}






























