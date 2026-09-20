import { CONTACT } from "@/lib/site";

const CHANNELS = [
  {
    href: CONTACT.facebook,
    label: "Fanpage",
    value: "Trung tâm Guitar Trung Hiếu",
    external: true,
  },
  {
    href: CONTACT.zalo,
    label: "Zalo",
    value: CONTACT.phone,
    external: true,
  },
  {
    href: CONTACT.phoneHref,
    label: "Hotline",
    value: CONTACT.phone,
    external: false,
  },
];

export function Contact() {
  return (
    <section id="lien-he" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-center font-display text-[0.7rem] uppercase tracking-[0.4em] text-ember-600">
        Liên hệ
      </p>
      <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl">
        Kết nối với Trung Hiếu
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group rounded-3xl border border-smoke bg-white/70 p-6 text-center backdrop-blur-sm transition hover:border-ember-500 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
          >
            <p className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-ember-600">
              {channel.label}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-bone">
              {channel.value}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-smoke bg-white/70 p-7 text-center backdrop-blur-sm">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-bone">
          {CONTACT.name}
        </p>
        <p className="mt-2 text-sm text-muted">{CONTACT.address}</p>
        <a
          href={CONTACT.phoneHref}
          className="mt-3 inline-block font-display text-2xl font-bold text-ember-600 transition hover:text-ember-700"
        >
          {CONTACT.phone}
        </a>
      </div>
    </section>
  );
}
