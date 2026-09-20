import type { Metadata } from "next";

import { CourseBlock, CourseLayout } from "@/components/ui/CourseLayout";

export const metadata: Metadata = {
  title: "Lớp Guitar người lớn (từ 16 tuổi) | Trung Hieu Guitar Center",
  description:
    "Lớp guitar đệm hát, cổ điển và solo dành cho người lớn — lộ trình theo mục tiêu riêng, lịch học linh hoạt.",
};

// TODO: replace with the centre's final copy for the adult programme.
const CURRICULUM = [
  "Làm quen với cấu tạo đàn và cách chỉnh dây.",
  "Tư thế cầm đàn, kỹ thuật tay phải và tay trái.",
  "Hệ thống hợp âm cơ bản và vòng hợp âm thông dụng.",
  "Các điệu đệm phổ biến: ballad, slow rock, bolero, disco.",
  "Kỹ thuật fingerstyle và solo theo trình độ.",
  "Cảm âm, dò hợp âm và tự đệm một bài hát mới.",
  "Luyện tập theo bài hát do học viên tự chọn.",
  "Phương pháp tự luyện tập hiệu quả tại nhà.",
];

export default function AdultCoursePage() {
  return (
    <CourseLayout
      eyebrow="Dành cho người lớn"
      title="Lớp Guitar người lớn (từ 16 tuổi)"
    >
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          Lớp guitar dành cho người lớn tại Trung tâm Guitar Trung Hiếu được xây
          dựng theo mục tiêu của từng học viên: đệm hát để sinh hoạt cùng bạn bè,
          chơi guitar cổ điển bài bản, hay luyện solo và fingerstyle chuyên sâu.
        </p>
        <p>
          Giáo viên sẽ trao đổi để xác định trình độ hiện tại và mong muốn của
          bạn, từ đó thiết kế lộ trình riêng. Bạn có thể bắt đầu từ con số không,
          hoặc tiếp tục từ những gì đã tự học trước đó.
        </p>
        <p>
          Lịch học được sắp xếp linh hoạt theo thời gian làm việc, phù hợp với
          người đi làm và sinh viên.
        </p>
      </div>

      <CourseBlock heading="Nội dung học">
        <ul className="space-y-2.5">
          {CURRICULUM.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CourseBlock>

      <CourseBlock heading="Hình thức học">
        <p>
          Học viên có thể chọn lớp nhóm để học cùng bạn bè với chi phí tiết
          kiệm, hoặc lớp 1 kèm 1 để giáo viên theo sát và đẩy nhanh tiến độ.
        </p>
        <p>
          Mỗi buổi học kéo dài 60 phút, kết hợp giữa hướng dẫn kỹ thuật mới và
          thực hành trên bài hát cụ thể.
        </p>
      </CourseBlock>
    </CourseLayout>
  );
}
