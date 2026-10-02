import { CONTACT } from "@/lib/site";
import { validateRegistration } from "@/lib/registration";

/**
 * Resend's shared sender works without owning a domain, but it can only
 * deliver to the address that owns the Resend account. Set RESEND_FROM to
 * something like "Website <dangky@domain-cua-ban.vn>" once a domain is verified.
 */
const DEFAULT_FROM = "Trung Hieu Guitar <onboarding@resend.dev>";

/** Overridable so the delivery path can be exercised against a stub. */
const RESEND_ENDPOINT = process.env.RESEND_ENDPOINT ?? "https://api.resend.com/emails";

/** Keep user text from breaking out of the HTML body we build below. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { email, note } = (payload ?? {}) as Record<string, unknown>;
  const input = {
    email: typeof email === "string" ? email.trim() : "",
    note: typeof note === "string" ? note.trim() : "",
  };

  // Re-validate server-side; the client check is only a convenience.
  const errors = validateRegistration(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[dang-ky] RESEND_API_KEY chưa được cấu hình");
    return Response.json(
      { error: "Hệ thống gửi email chưa được cấu hình. Vui lòng gọi hotline." },
      { status: 500 },
    );
  }

  const noteHtml = input.note
    ? escapeHtml(input.note).replace(/\n/g, "<br>")
    : "<em>(không có ghi chú)</em>";

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: [CONTACT.inbox],
        // Lets the centre hit "Reply" and land in the student's inbox.
        reply_to: input.email,
        subject: `Đăng ký học guitar — ${input.email}`,
        html: `
          <h2>Đăng ký học mới</h2>
          <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
          <p><strong>Ghi chú:</strong><br>${noteHtml}</p>
          <hr>
          <p style="color:#5e6f68;font-size:12px">Gửi từ form đăng ký trên website.</p>
        `,
      }),
    });

    if (!response.ok) {
      // Resend puts the real reason in the body; it never contains the API key.
      console.error("[dang-ky] Resend lỗi", response.status, await response.text());
      return Response.json(
        { error: "Không gửi được đăng ký. Vui lòng thử lại hoặc gọi hotline." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[dang-ky] Không gọi được Resend", cause);
    return Response.json(
      { error: "Không gửi được đăng ký. Vui lòng thử lại hoặc gọi hotline." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
