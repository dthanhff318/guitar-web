export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="leading-none">
          <span className="block font-display text-sm font-semibold uppercase tracking-[0.28em] text-bone">
            Trung Hieu
          </span>
          <span className="block font-display text-[0.6rem] uppercase tracking-[0.42em] text-ember-500">
            Guitar Center
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { href: "#specs", label: "Sản phẩm" },
            { href: "#craft", label: "Về chúng tôi" },
            { href: "#reserve", label: "Liên hệ" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted transition hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#reserve"
          className="rounded-full bg-bone px-5 py-2 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition hover:bg-ember-600"
        >
          Đặt hàng
        </a>
      </nav>
    </header>
  );
}
