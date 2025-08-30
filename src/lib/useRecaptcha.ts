import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';

interface UseRecaptchaReturn {
  executeRecaptcha: (action: string) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const { executeRecaptcha: executeGoogleRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!executeGoogleRecaptcha) {
      setError('reCAPTCHA not initialized');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await executeGoogleRecaptcha(action);
      return token;
    } catch (err) {
      console.error('reCAPTCHA execution failed:', err);
      setError('Failed to execute reCAPTCHA');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeRecaptcha,
    isLoading,
    error,
  };
};

// Common reCAPTCHA actions
export const RECAPTCHA_ACTIONS = {
  CONTACT_FORM: 'contact_form',
  TESTIMONIAL_FORM: 'testimonial_form',
  SIGNUP: 'signup',
  LOGIN: 'login',
  BOOK_SERVICE: 'book_service',
  REGISTER_EVENT: 'register_event',
  FORGOT_PASSWORD: 'forgot_password',
  APPLY: 'apply',
} as const;
