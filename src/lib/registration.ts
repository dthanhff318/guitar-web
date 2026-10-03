/**
 * Shared shape and validation for the "Đăng ký học" enquiry form.
 * Imported by both the client form and the API route so the rules
 * can never drift apart.
 */

export type RegistrationInput = {
  name: string;
  phone: string;
  email: string;
  note: string;
};

export const NAME_MAX_LENGTH = 100;
export const NOTE_MAX_LENGTH = 1000;

/** Field name -> Vietnamese message shown next to the input. */
export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

/**
 * Deliberately permissive: one @, no spaces, a dot in the domain. Anything
 * stricter rejects valid addresses, and the real proof of validity is that
 * the centre can reply to it.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Vietnamese mobile numbers are 10 digits starting with 0, but people also
 * type the +84 form and sprinkle in spaces, dots or dashes. Strip the noise
 * first, then check what's left looks like a reachable VN number.
 */
const PHONE_SEPARATORS = /[\s.()-]/g;

/** Normalised to the leading-0 local form so the centre can dial it as-is. */
export function normalisePhone(value: string) {
  const compact = value.replace(PHONE_SEPARATORS, "");
  if (compact.startsWith("+84")) return `0${compact.slice(3)}`;
  if (compact.startsWith("84") && compact.length === 11) return `0${compact.slice(2)}`;
  return compact;
}

const PHONE_PATTERN = /^0\d{9}$/;

export function validateRegistration(input: RegistrationInput): RegistrationErrors {
  const errors: RegistrationErrors = {};

  const name = input.name.trim();
  if (!name) {
    errors.name = "Vui lòng nhập họ tên.";
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Họ tên tối đa ${NAME_MAX_LENGTH} ký tự.`;
  }

  const phone = normalisePhone(input.phone);
  if (!phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Số điện thoại chưa đúng (10 số, bắt đầu bằng 0).";
  }

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
