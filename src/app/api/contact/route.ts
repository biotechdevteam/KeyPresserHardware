import { NextRequest, NextResponse } from 'next/server';
import { validateRecaptcha } from '@/lib/utils/recaptchaVerify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, recaptchaToken } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }

    const recaptchaResult = await validateRecaptcha(recaptchaToken, 0.5);
    
    if (!recaptchaResult.valid) {
      return NextResponse.json(
        { error: recaptchaResult.error || 'reCAPTCHA validation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      recaptchaScore: recaptchaResult.score,
    });

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
