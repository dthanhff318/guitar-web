"use client";

import { useState } from "react";

import { RegistrationDialog } from "./RegistrationDialog";

/**
 * Opens the registration form. The dialog is only mounted while open, so the
 * hero's canvas isn't competing with an invisible overlay.
 */
export function RegisterButton({
  className,
  children,
  onOpen,
}: {
  className?: string;
  children: React.ReactNode;
  /** Lets the mobile nav close itself when the dialog takes over. */
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          onOpen?.();
        }}
        className={className}
      >
        {children}
      </button>

      {open ? <RegistrationDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
