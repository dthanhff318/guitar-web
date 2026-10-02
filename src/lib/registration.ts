/**
 * Shared shape and validation for the "Đăng ký học" enquiry form.
 * Imported by both the client form and the API route so the rules
 * can never drift apart.
 */

export type RegistrationInput = {
  email: string;
  note: string;
};

export const NOTE_MAX_LENGTH = 1000;

/** Field name -> Vietnamese message shown next to the input. */
export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

/**
 * Deliberately permissive: one @, no spaces, a dot in the domain. Anything
 * stricter rejects valid addresses, and the real proof of validity is that
 * the centre can reply to it.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistration(input: RegistrationInput): RegistrationErrors {
  const errors: RegistrationErrors = {};

  const email = input.email.trim();
  if (!email) {
    errors.email = "Vui lòng nhập email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Email chưa đúng định dạng.";
  }

  if (input.note.length > NOTE_MAX_LENGTH) {
    errors.note = `Ghi chú tối đa ${NOTE_MAX_LENGTH} ký tự.`;
  }

  return errors;
}
