import { NextRequest, NextResponse } from 'next/server';
import { validateRecaptcha } from '@/lib/utils/recaptchaVerify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, serviceId, bookingDate, description, recaptchaToken } = body;

    // Validate required fields
    if (!userId || !serviceId || !bookingDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(bookingDate)) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Check if booking date is in the future
    const today = new Date();
    const selectedDate = new Date(bookingDate);
    if (selectedDate <= today) {
      return NextResponse.json(
        { error: 'Booking date must be in the future' },
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

    // Log the reCAPTCHA score for monitoring
    console.log(`Service booking submitted with reCAPTCHA score: ${recaptchaResult.score}`);

    // Process the service booking
    // This is where you would:
    // 1. Check service availability
    // 2. Validate user permissions
    // 3. Save booking to database
    // 4. Send confirmation emails
    // 5. Update service schedule
    // etc.

    console.log('Service booking submission:', {
      userId,
      serviceId,
      bookingDate,
      description: description?.substring(0, 100) + '...' || 'No description',
      recaptchaScore: recaptchaResult.score,
    });

    return NextResponse.json({
      success: true,
      message: 'Service booking submitted successfully',
      bookingId: 'booking_' + Date.now(), // Generate a unique booking ID
      recaptchaScore: recaptchaResult.score,
    });

  } catch (error) {
    console.error('Service booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
