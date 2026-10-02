"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CONTACT } from "@/lib/site";
import {
  NOTE_MAX_LENGTH,
  validateRegistration,
  type RegistrationErrors,
} from "@/lib/registration";

type Status = "idle" | "sending" | "sent";

export function RegistrationDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const emailId = useId();
  const noteId = useId();
  const titleId = useId();
  const emailRef = useRef<HTMLInputElement>(null);

  // The trigger can live inside a flex/transformed ancestor, which would
  // otherwise size and clip this fixed overlay. Portal to body to escape it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Focus the first field, and close on Escape from anywhere in the dialog.
  // Gated on `mounted`: before the portal renders there is no input to focus.
  useEffect(() => {
    if (mounted) emailRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, mounted]);

  // Keep the page behind the overlay from scrolling.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    const found = validateRegistration({ email, note });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/dang-ky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, note }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(data.error ?? "Không gửi được đăng ký. Vui lòng thử lại.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError("Mất kết nối. Vui lòng thử lại hoặc gọi hotline.");
      setStatus("idle");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-bone/40 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-smoke bg-coal p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-full text-muted transition hover:bg-ash hover:text-bone"
        >
          <svg className="w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-ember-50 text-ember-600">
              <svg className="w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              id={titleId}
              className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-bone"
            >
              Đã gửi đăng ký
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Trung tâm sẽ liên hệ lại với anh/chị trong thời gian sớm nhất. Cần
              gấp, vui lòng gọi{" "}
              <a
                href={CONTACT.phoneHref}
                className="font-semibold text-ember-600 hover:underline"
              >
                {CONTACT.phone}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-bone px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ember-600"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-ember-600">
              Tuyển sinh 2026
            </p>
            <h2
              id={titleId}
              className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-bone"
            >
              Đăng ký học thử
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Để lại email, trung tâm sẽ liên hệ tư vấn lớp phù hợp.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label
                  htmlFor={emailId}
                  className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-bone"
                >
                  Email <span className="text-ember-600">*</span>
                </label>
                <input
                  ref={emailRef}
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                  placeholder="email@example.com"
                  className={`mt-2 w-full rounded-xl border bg-ash px-4 py-3 text-sm text-bone outline-none transition placeholder:text-muted/60 focus:border-ember-500 focus:bg-coal ${
                    errors.email ? "border-red-500" : "border-smoke"
                  }`}
                />
                {errors.email ? (
                  <p id={`${emailId}-error`} className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={noteId}
                  className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-bone"
                >
                  Ghi chú
                </label>
                <textarea
                  id={noteId}
                  value={note}
                  rows={4}
                  maxLength={NOTE_MAX_LENGTH}
                  onChange={(event) => setNote(event.target.value)}
                  aria-invalid={Boolean(errors.note)}
                  placeholder="Độ tuổi, thời gian học mong muốn, dòng guitar quan tâm…"
                  className={`mt-2 w-full resize-none rounded-xl border bg-ash px-4 py-3 text-sm text-bone outline-none transition placeholder:text-muted/60 focus:border-ember-500 focus:bg-coal ${
                    errors.note ? "border-red-500" : "border-smoke"
                  }`}
                />
                {errors.note ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.note}</p>
                ) : null}
              </div>

              {formError ? (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-bone px-6 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Đang gửi…" : "Gửi đăng ký"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
