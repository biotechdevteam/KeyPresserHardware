// Server-side reCAPTCHA verification utility
export interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<RecaptchaVerifyResponse> {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('reCAPTCHA secret key not configured');
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data: RecaptchaVerifyResponse = await response.json();
    return data;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    throw new Error('Failed to verify reCAPTCHA token');
  }
}

// Helper function to check if reCAPTCHA verification passed with good score
export function isRecaptchaValid(verifyResponse: RecaptchaVerifyResponse, minScore = 0.5): boolean {
  return (
    verifyResponse.success &&
    verifyResponse.score !== undefined &&
    verifyResponse.score >= minScore
  );
}

// Middleware function for API routes
export async function validateRecaptcha(token: string, minScore = 0.5): Promise<{
  valid: boolean;
  error?: string;
  score?: number;
}> {
  try {
    const verifyResponse = await verifyRecaptcha(token);
    
    if (!verifyResponse.success) {
      return {
        valid: false,
        error: 'reCAPTCHA verification failed',
      };
    }

    if (verifyResponse.score !== undefined && verifyResponse.score < minScore) {
      return {
        valid: false,
        error: `reCAPTCHA score too low: ${verifyResponse.score}`,
        score: verifyResponse.score,
      };
    }

    return {
      valid: true,
      score: verifyResponse.score,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'reCAPTCHA validation error',
    };
  }
}
