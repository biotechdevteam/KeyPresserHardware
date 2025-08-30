import { NextRequest, NextResponse } from "next/server";
import { validateRecaptcha } from "@/lib/utils/recaptchaVerify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name, recaptchaToken } = body;

    // Validate action
    if (!action || !["signup", "signin", "forgot"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid or missing action" },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    const recaptchaResult = await validateRecaptcha(recaptchaToken, 0.5);
    if (!recaptchaResult.valid) {
      return NextResponse.json(
        { error: recaptchaResult.error || "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    // Handle signup
    if (action === "signup") {
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: "Missing required fields for signup" },
          { status: 400 }
        );
      }
      // Simulate user creation
      return NextResponse.json({
        success: true,
        message: "Signup successful",
        userId: "user_" + Date.now(),
        recaptchaScore: recaptchaResult.score,
      });
    }

    // Handle signin
    if (action === "signin") {
      if (!email || !password) {
        return NextResponse.json(
          { error: "Missing required fields for signin" },
          { status: 400 }
        );
      }
      // Simulate authentication
      return NextResponse.json({
        success: true,
        message: "Signin successful",
        userId: "user_" + Date.now(),
        recaptchaScore: recaptchaResult.score,
      });
    }

    // Handle forgot password
    if (action === "forgot") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required for password reset" },
          { status: 400 }
        );
      }
      // Simulate password reset request
      return NextResponse.json({
        success: true,
        message: "Password reset link sent to email",
        recaptchaScore: recaptchaResult.score,
      });
    }

    // Fallback error
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
