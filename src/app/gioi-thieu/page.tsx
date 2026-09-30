import type { Metadata } from "next";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Photo } from "@/components/ui/Photo";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Giới thiệu | Trung tâm Guitar Trung Hiếu",
  description:
    "Trung tâm Guitar Trung Hiếu — đào tạo guitar chuyên nghiệp tại Hà Nội, từ cơ bản đến nâng cao, cho cả trẻ em và người lớn.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-28">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="font-display text-[0.7rem] uppercase tracking-[0.35em] text-ember-600">
          Giới thiệu
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl">
          Về Trung tâm Guitar Trung Hiếu
        </h1>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Trung tâm Guitar Trung Hiếu là đơn vị đào tạo guitar chuyên nghiệp
            tại Hà Nội, tập trung vào các chương trình học từ cơ bản đến nâng
            cao, dành cho cả trẻ em và người lớn.
          </p>
          <p>
            Trung tâm được xây dựng với định hướng giúp học viên có thể học
            guitar một cách bài bản nhưng dễ tiếp cận, phù hợp với nhiều trình độ
            và mục tiêu khác nhau. Từ những người chưa từng chơi đàn, người muốn
            học đệm hát, đến những học viên muốn phát triển kỹ thuật và theo đuổi
            guitar chuyên sâu hơn.
          </p>
        </div>

        <Photo
          src="/image/teaching2.jpeg"
          alt="Lớp guitar tại trung tâm: các học viên ngồi tập đàn cùng giáo viên, tường treo đàn classic và acoustic."
          priority
        />

        <Section title="Học guitar theo lộ trình phù hợp">
          <p>
            Mỗi học viên có khả năng tiếp thu và mục tiêu khác nhau. Vì vậy, giáo
            viên không chỉ hướng dẫn theo giáo trình mà còn theo sát quá trình
            học, trực tiếp chỉnh sửa kỹ thuật và điều chỉnh nội dung phù hợp với
            từng học viên.
          </p>
          <p>
            Các nội dung từ tư thế, cách cầm đàn, bấm hợp âm, chuyển hợp âm, giữ
            nhịp đến các kỹ thuật chơi nâng cao đều được hướng dẫn từng bước, kết
            hợp giữa kiến thức và thực hành.
          </p>
          <p>
            Học viên được luyện tập thông qua những bài hát phù hợp với trình độ
            và sở thích, từ đó dễ dàng áp dụng những gì đã học vào việc chơi đàn
            thực tế.
          </p>
        </Section>

        <Photo
          src="/image/teaching.jpeg"
          alt="Giáo viên hướng dẫn trực tiếp một học viên đang tập bấm hợp âm theo bản nhạc trên giá."
        />

        <Section title="Đội ngũ giáo viên">
          <p>
            Trung tâm chú trọng xây dựng đội ngũ giáo viên có chuyên môn và kinh
            nghiệm giảng dạy. Các giáo viên được đào tạo từ Học viện Âm nhạc Quốc
            gia Việt Nam, có nền tảng chuyên môn vững chắc và phương pháp hướng
            dẫn phù hợp với từng nhóm học viên.
          </p>
          <p>
            Trong mỗi buổi học, giáo viên trực tiếp quan sát, hướng dẫn và sửa
            lỗi để học viên hình thành kỹ thuật đúng ngay từ đầu.
          </p>
        </Section>

        <ImagePlaceholder label="Ảnh đội ngũ giáo viên" ratio="4 / 3" />

        <Section title="Môi trường học tập">
          <p>
            Trung Hiếu hướng đến một môi trường học guitar nghiêm túc nhưng thoải
            mái, để học viên có thể duy trì việc học lâu dài mà không bị nhàm
            chán.
          </p>
          <p>
            Các lớp được tổ chức với số lượng học viên phù hợp, đồng thời có hình
            thức học nhóm và học 1-1 để đáp ứng nhu cầu và thời gian khác nhau.
          </p>
          <p>
            Bên cạnh việc học tại lớp, Trung Hiếu cũng khuyến khích học viên chủ
            động luyện tập và có cơ hội tham gia các hoạt động, chương trình biểu
            diễn để nâng cao sự tự tin và khả năng chơi đàn.
          </p>
        </Section>

        <ImagePlaceholder label="Ảnh học viên biểu diễn / hoạt động ngoại khóa" />

        <Section title="Trung Hiếu hướng đến điều gì?">
          <p>
            Trung tâm không đặt mục tiêu để học viên chỉ học thuộc một vài bài
            hát mà hướng đến là giúp mỗi học viên nắm được nền tảng, chơi đàn
            đúng kỹ thuật và có khả năng tự học, tự phát triển sau quá trình học
            tại trung tâm.
          </p>
          <p>
            Dù bạn bắt đầu từ con số 0 hay đã có nền tảng, chúng tôi luôn cố gắng
            xây dựng một lộ trình phù hợp để việc học guitar trở nên rõ ràng và
            hiệu quả hơn.
          </p>
        </Section>

        <p className="mt-12 rounded-3xl border border-smoke bg-white/70 p-6 text-center font-display text-sm uppercase leading-relaxed tracking-[0.12em] text-bone backdrop-blur-sm">
          Trung tâm Guitar Trung Hiếu
          <span className="mt-2 block text-xs font-normal tracking-[0.18em] text-muted">
            Guitar từ cơ bản đến nâng cao · Luyện thi các trường Năng khiếu
          </span>
        </p>
      </article>

      <Contact />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-2">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight text-bone sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}
