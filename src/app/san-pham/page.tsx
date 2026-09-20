import type { Metadata } from "next";

import { Contact } from "@/components/sections/Contact";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Sản phẩm | Trung tâm Guitar Trung Hiếu",
  description:
    "Guitar classic, acoustic, guitar điện và phụ kiện chính hãng tại Trung tâm Guitar Trung Hiếu.",
};

// TODO: replace with the centre's real catalogue (name, price, photo).
const PRODUCTS = [
  { name: "Guitar classic", note: "Đàn tập cho người mới bắt đầu" },
  { name: "Guitar acoustic", note: "Đệm hát, thùng gỗ nguyên tấm" },
  { name: "Guitar điện", note: "Solo, luyện kỹ thuật nâng cao" },
  { name: "Phụ kiện", note: "Bao đàn, capo, dây, pick, máy lên dây" },
];

export default function ProductsPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-display text-[0.7rem] uppercase tracking-[0.35em] text-ember-600">
          Sản phẩm
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl">
          Đàn và phụ kiện
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Học viên của trung tâm được tư vấn chọn đàn phù hợp với thể trạng và
          mục tiêu học. Liên hệ hotline để được báo giá chi tiết.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="rounded-3xl border border-smoke bg-white/70 p-5 backdrop-blur-sm"
            >
              <ImagePlaceholder label={product.name} ratio="1 / 1" />
              <h2 className="font-display text-base font-bold uppercase tracking-tight text-bone">
                {product.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {product.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
