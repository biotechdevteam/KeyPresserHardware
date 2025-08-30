import { NextRequest, NextResponse } from 'next/server';
import { validateRecaptcha } from '@/lib/utils/recaptchaVerify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, eventId, notes, recaptchaToken } = body;

    // Validate required fields
    if (!userId || !eventId || !notes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate notes content (should include how they heard and expectations)
    if (notes.length < 20) {
      return NextResponse.json(
        { error: 'Please provide more detailed information' },
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
    console.log(`Event registration submitted with reCAPTCHA score: ${recaptchaResult.score}`);

    // Process the event registration
    // This is where you would:
    // 1. Check event capacity and availability
    // 2. Validate user eligibility
    // 3. Save registration to database
    // 4. Send confirmation emails
    // 5. Update event attendee count
    // 6. Generate tickets/confirmation codes
    // etc.

    console.log('Event registration submission:', {
      userId,
      eventId,
      notes: notes.substring(0, 200) + '...', // Log truncated notes
      recaptchaScore: recaptchaResult.score,
    });

    return NextResponse.json({
      success: true,
      message: 'Event registration submitted successfully',
      registrationId: 'reg_' + Date.now(), // Generate a unique registration ID
      recaptchaScore: recaptchaResult.score,
    });

  } catch (error) {
    console.error('Event registration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
