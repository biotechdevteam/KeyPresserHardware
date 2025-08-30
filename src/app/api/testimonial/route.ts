import { NextRequest, NextResponse } from 'next/server';
import { validateRecaptcha } from '@/lib/utils/recaptchaVerify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, rating, comment, serviceId, eventId, recaptchaToken } = body;

    // Validate required fields
    if (!userId || !type || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate type-specific requirements
    if (type === 'testimonial' && !serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required for testimonials' },
        { status: 400 }
      );
    }

    if (type === 'review' && !eventId) {
      return NextResponse.json(
        { error: 'Event ID is required for reviews' },
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
    console.log(`Testimonial submitted with reCAPTCHA score: ${recaptchaResult.score}`);

    // Process the testimonial submission
    // This is where you would:
    // 1. Save to database
    // 2. Update aggregated ratings
    // 3. Send notifications
    // etc.

    console.log('Testimonial submission:', {
      userId,
      type,
      rating,
      comment: comment.substring(0, 100) + '...', // Log truncated comment
      serviceId,
      eventId,
      recaptchaScore: recaptchaResult.score,
    });

    return NextResponse.json({
      success: true,
      message: `${type === 'testimonial' ? 'Testimonial' : 'Review'} submitted successfully`,
      recaptchaScore: recaptchaResult.score,
    });

  } catch (error) {
    console.error('Testimonial API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
