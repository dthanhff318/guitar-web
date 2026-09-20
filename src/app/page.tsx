import { Hero } from "@/components/sections/Hero";
import { SiteNav } from "@/components/ui/SiteNav";

export default function Home() {
  return (
    <main id="top">
      <SiteNav />
      <Hero />

      {/* Phase 2 sections land here — specs, craft, gallery, reserve. */}
      <section
        id="specs"
        className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-6 py-28"
      >
        <p className="font-display text-[0.7rem] uppercase tracking-[0.4em] text-ember-400">
          Sắp ra mắt
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold uppercase leading-tight text-bone sm:text-5xl">
          Danh mục sản phẩm, câu chuyện thương hiệu và form liên hệ
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
          Phần hero và banner 3D đã hoàn thiện. Các mục còn lại đang là khung tạm
          để trang có thể cuộn và hiệu ứng camera theo scroll có điểm kết thúc.
        </p>
      </section>
    </main>
  );
}
