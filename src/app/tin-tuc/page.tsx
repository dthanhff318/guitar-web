import type { Metadata } from "next";

import { Contact } from "@/components/sections/Contact";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Tin tức | Trung tâm Guitar Trung Hiếu",
  description:
    "Hoạt động, lịch khai giảng và chương trình biểu diễn của Trung tâm Guitar Trung Hiếu.",
};

// TODO: replace with real posts, ideally sourced from a CMS.
const POSTS = [
  {
    date: "2026-01-15",
    display: "15/01/2026",
    title: "Khai giảng lớp guitar trẻ em khóa mùa xuân",
    excerpt:
      "Lớp mới dành cho các bé 6 – 15 tuổi, học thử miễn phí trong buổi đầu tiên.",
  },
  {
    date: "2026-01-02",
    display: "02/01/2026",
    title: "Đêm nhạc học viên cuối năm",
    excerpt:
      "Học viên các lớp cùng biểu diễn, ghi lại một năm luyện tập tại trung tâm.",
  },
  {
    date: "2025-12-10",
    display: "10/12/2025",
    title: "Hướng dẫn chọn đàn cho người mới bắt đầu",
    excerpt:
      "Kích thước, chất liệu và tầm giá nên cân nhắc khi mua cây đàn đầu tiên.",
  },
];

export default function NewsPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-display text-[0.7rem] uppercase tracking-[0.35em] text-ember-600">
          Tin tức
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl">
          Hoạt động của trung tâm
        </h1>

        <div className="mt-12 space-y-6">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="grid gap-5 rounded-3xl border border-smoke bg-white/70 p-5 backdrop-blur-sm sm:grid-cols-[14rem_1fr] sm:items-center"
            >
              <div className="[&>div]:my-0">
                <ImagePlaceholder label="Ảnh bài viết" ratio="4 / 3" />
              </div>
              <div>
                <time
                  dateTime={post.date}
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted"
                >
                  {post.display}
                </time>
                <h2 className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-tight text-bone">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
