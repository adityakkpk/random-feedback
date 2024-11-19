import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { EmailElementProps } from "@react-email/components";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "93341ak@gmail.com",
      to: email,
      subject: "Random Feedbacks Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
